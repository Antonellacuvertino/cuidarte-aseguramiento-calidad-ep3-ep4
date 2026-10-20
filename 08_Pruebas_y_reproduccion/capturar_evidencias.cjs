const {chromium}=require('playwright');const {Pool}=require('pg');const fs=require('fs'),path=require('path'),{spawn}=require('child_process');
const root=path.resolve(__dirname,'..'),out=path.join(root,'06_Evidencias/capturas');
const pool=new Pool({connectionString:process.env.DATABASE_URL});
const procs=[];let browser;
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function ready(url){for(let i=0;i<60;i++){try{if((await fetch(url)).ok)return}catch{}await sleep(1000)}throw Error('Servicio no accesible: '+url)}
async function main(){
 browser=await chromium.launch({headless:true,channel:'msedge',args:['--no-proxy-server']});const page=await browser.newPage({viewport:{width:1440,height:1050}});
 await page.goto('file:///'+path.join(root,'06_Evidencias/api/Resumen_resultados.html').replaceAll('\\','/'));await page.screenshot({path:path.join(out,'resultados_api.png'),fullPage:true});
 const acta={date:new Date().toISOString(),tool:'Playwright Chromium; capturas reales de navegador',captures:[{file:'resultados_api.png',source:'Resumen HTML generado a partir del JSON de ejecución; no es UI de la app'}],ui_status:'PENDIENTE'};
 const state=path.resolve(root,'../.qa_tools/sonar_state.json');
 if(fs.existsSync(state)){
  try{
   const creds=JSON.parse(fs.readFileSync(state,'utf8'));await page.goto('http://127.0.0.1:9000/sessions/new');
   await page.locator('input[name="login"]').fill('admin');await page.locator('input[name="password"]').fill(creds.password);await page.getByRole('button',{name:/log in/i}).click();
   await page.goto('http://127.0.0.1:9000/dashboard?id=isy1102-cuidarte');await page.waitForTimeout(5000);await page.screenshot({path:path.join(out,'sonarqube_dashboard.png'),fullPage:true});acta.captures.push({file:'sonarqube_dashboard.png',source:'Panel real localhost:9000, proyecto isy1102-cuidarte'});
   await page.goto('http://127.0.0.1:9000/project/issues?id=isy1102-cuidarte');await page.waitForTimeout(3000);await page.screenshot({path:path.join(out,'sonarqube_issues.png'),fullPage:true});acta.captures.push({file:'sonarqube_issues.png',source:'Listado real de issues SonarQube'});
  }catch(e){acta.sonar_screenshot_error=e.message}
 }
 if(!process.argv.includes('--sonar-only'))try{
  const u=await pool.query("SELECT nombre_usuario FROM usuarios WHERE nombre_usuario LIKE 'qa_admin_%' ORDER BY id DESC LIMIT 1");if(!u.rowCount)throw Error('Cuenta sintética no disponible');
  const log=fs.openSync(path.join(root,'06_Evidencias/api/navegador_servidores.log'),'w');
  procs.push(spawn(process.execPath,[path.join(root,'07_Codigo/BACKEND/src/app.js')],{cwd:path.join(root,'07_Codigo/BACKEND'),env:{...process.env,PORT:'4445',JWT_SECRET:'qa_synthetic_jwt_key_for_isolated_tests'},stdio:['ignore',log,log],windowsHide:true}));
  procs.push(spawn(process.execPath,[path.join(root,'07_Codigo/FRONTEND/node_modules/vite/bin/vite.js'),'--host','127.0.0.1','--port','3334'],{cwd:path.join(root,'07_Codigo/FRONTEND'),env:{...process.env,VITE_API_URL:'http://127.0.0.1:4445'},stdio:['ignore',log,log],windowsHide:true}));
  await ready('http://127.0.0.1:4445/');await ready('http://127.0.0.1:3334/');
  await page.goto('http://127.0.0.1:3334/login',{waitUntil:'domcontentloaded',timeout:90000});await page.locator('input[name="nombre_usuario"]').fill(u.rows[0].nombre_usuario,{timeout:90000});await page.locator('input[name="password"]').fill('Synthetic123!');
  await page.screenshot({path:path.join(out,'interfaz_login.png'),fullPage:true});
  await page.getByRole('button',{name:/iniciar sesi[oó]n/i}).click();await page.waitForURL('**/home',{timeout:30000});await page.waitForTimeout(6000);await page.screenshot({path:path.join(out,'interfaz_dashboard.png'),fullPage:true});
  acta.captures.push({file:'interfaz_login.png',source:'Cuidarte+ real en 3334; datos sintéticos'},{file:'interfaz_dashboard.png',source:'Navegación real posterior a login como administrador sintético'});acta.ui_status='PASS para login y redirección /home únicamente';
 }catch(e){acta.ui_status='BLOCKED';acta.ui_error=e.message}
 fs.writeFileSync(path.join(out,'acta_capturas.json'),JSON.stringify(acta,null,2));console.log(JSON.stringify(acta));
}
main().catch(e=>{console.error(e.message);process.exitCode=1}).finally(async()=>{for(const p of procs)p.kill();if(browser)await browser.close();await pool.end()});
