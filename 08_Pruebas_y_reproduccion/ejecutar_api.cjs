/* Pruebas contra copia didáctica sin modificar sus rutas. Solo DB cuidarte_qa. */
const fs=require('fs'),path=require('path'),{spawn}=require('child_process');
const {Pool}=require('pg'),jwt=require('jsonwebtoken');
const root=path.resolve(__dirname,'..'), out=path.join(root,'06_Evidencias/api');
const pool=new Pool({connectionString:process.env.DATABASE_URL});
const base='http://127.0.0.1:4445', secret='qa_synthetic_jwt_key_for_isolated_tests';
const rows=[]; let server;
const pause=ms=>new Promise(r=>setTimeout(r,ms));
async function request(method,url,body,token){
 const start=performance.now(); const headers={}; if(token)headers.Authorization='Bearer '+token;
 if(body && !(body instanceof FormData))headers['Content-Type']='application/json';
 const r=await fetch(base+url,{method,headers,body:body instanceof FormData?body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(30000)});
 const buffer=Buffer.from(await r.arrayBuffer());let data;try{data=JSON.parse(buffer.toString())}catch{data={bytes:buffer.length,sha256:require('crypto').createHash('sha256').update(buffer).digest('hex')}}
 if(data?.token)data={...data,token:'[REDACTADO]',jwt_present:true};
 return {status:r.status,ms:Math.round(performance.now()-start),data,buffer};
}
function safe(r){return {status:r.status,ms:r.ms,data:r.data}}
async function test(id,name,req,fn){
 try {const x=await fn(); rows.push({id,name,requirement:req,status:x.pass?'PASS':'FAIL',expected:x.expected,observed:x.observed,evidence:x.evidence,date:new Date().toISOString(),executor:'Automatización QA asistida; validar por integrantes'});}
 catch(e){rows.push({id,name,requirement:req,status:'BLOCKED',observed:e.message,date:new Date().toISOString(),executor:'Automatización QA asistida'});}
 console.log(id,rows.at(-1).status);
}
async function main(){
 if(!process.env.DATABASE_URL?.endsWith('/cuidarte_qa'))throw new Error('Solo se admite DB aislada cuidarte_qa');
 const ver=await pool.query('select version()');
 // Datos exclusivos de esta ejecución. No se borra ninguna base existente.
 const tag=Date.now().toString(); const ids={};
 for(const [key,role] of [['admin','admin'],['medico','medico'],['a','paciente'],['b','paciente'],['disposable','paciente']]){
  const u=await pool.query('INSERT INTO usuarios(nombre_usuario,contrasena,correo) VALUES($1,$2,$3) RETURNING id',[`qa_${key}_${tag}`,'Synthetic123!',`qa_${key}_${tag}@example.test`]);
  ids[key]=u.rows[0].id;
  await pool.query('INSERT INTO usuario_roles(usuario_id,rol_id) SELECT $1,id FROM roles WHERE nombre=$2',[ids[key],role]);
 }
 for(const key of ['a','b']){
  const p=await pool.query("INSERT INTO pacientes(rut,primer_nombre,apellido_paterno,fecha_nacimiento,sexo,email,usuario_id) VALUES($1,'Paciente','Sintetico','1980-01-01','O',$2,$3) RETURNING id",[`QA-${key}-${tag}`,`qa_${key}@example.test`,ids[key]]);ids['p'+key]=p.rows[0].id;
 }
 const log=fs.openSync(path.join(out,'servidor_local.log'),'w');
 server=spawn(process.execPath,[path.join(root,'07_Codigo/BACKEND/src/app.js')],{cwd:path.join(root,'07_Codigo/BACKEND'),env:{...process.env,NODE_PATH:process.env.NODE_PATH||path.join(__dirname,'node_modules'),PORT:'4445',JWT_SECRET:secret},stdio:['ignore',log,log],windowsHide:true});
 for(let i=0;i<40;i++){try{if((await fetch(base+'/')).ok)break}catch{}await pause(500)}
 const token={};for(const key of ['admin','medico','a','b'])token[key]=jwt.sign({usuarioId:ids[key],nombreUsuario:`qa_${key}_${tag}`},secret,{expiresIn:'1h'});
 await test('CP-API-001','Login válido y JWT','RF-1.1',async()=>{
  const raw=await fetch(base+'/autenticacion/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({nombre_usuario:`qa_admin_${tag}`,password:'Synthetic123!'})});const d=await raw.json(); const valid=!!d.token&&jwt.verify(d.token,secret).usuarioId===ids.admin;
  return{pass:raw.status===200&&valid,expected:'200 y JWT verificable',observed:`HTTP ${raw.status}; firma válida=${valid}`,evidence:{http:raw.status,jwt_valid:valid}};
 });
 await test('CP-API-002','Credenciales inválidas','RF-1.1',async()=>{const r=await request('POST','/autenticacion/login',{nombre_usuario:`qa_admin_${tag}`,password:'Incorrecta'});return{pass:r.status===401,expected:'401',observed:`HTTP ${r.status}`,evidence:safe(r)}});
 await test('CP-API-003','Campos obligatorios de examen','RF-3.1',async()=>{const r=await request('POST','/examenes',{},token.medico);return{pass:r.status===400,expected:'400 sin inserción',observed:`HTTP ${r.status}`,evidence:safe(r)}});
 const ex=await request('POST','/examenes',{tipo_examen_medico_id:1,paciente_id:Number(ids.pa),diagnosis:'Documento de prueba sintético'},token.medico);ids.exam=ex.data.id;if(!ids.exam)throw new Error('No se pudo crear examen sintético');
 await test('CP-API-004','IDOR por paciente ajeno','NFR-SEG-4',async()=>{const r=await request('GET','/examenes/paciente/'+ids.pa,null,token.b);return{pass:r.status===403,expected:'403 sin datos ajenos',observed:`HTTP ${r.status}`,evidence:safe(r)}});
 await test('CP-API-005','JWT alterado y vencido','NFR-SEG-9',async()=>{const r=await request('GET','/examenes/'+ids.exam,null,token.a+'x');const expired=jwt.sign({usuarioId:ids.a},secret,{expiresIn:-1});const s=await request('GET','/examenes/'+ids.exam,null,expired);return{pass:r.status===401&&s.status===401,expected:'401 en ambos intentos',observed:`Alterado ${r.status}; vencido ${s.status}`,evidence:[safe(r),safe(s)]}});
 await test('CP-API-006','Registro y adjunto PDF','RF-3.1; RF-4.3/4.4',async()=>{
  const pdf=Buffer.from('%PDF-1.4\n% Documento sintetico QA sin datos personales\n%%EOF\n');const form=new FormData();form.append('examen_medico_id',ids.exam);form.append('paciente_id',ids.pa);form.append('documento',new Blob([pdf],{type:'application/pdf'}),'qa_sintetico.pdf');
  const r=await request('POST','/documentos',form,token.medico);const id=r.data.documento?.id;const s=await request('GET','/documentos/'+id,null,token.a);const b=await request('GET','/documentos/'+id,null,token.b);
  return{pass:ex.status===201&&r.status===201&&s.status===200&&s.buffer.equals(pdf)&&b.status===403,expected:'201; PDF íntegro para titular; 403 para ajeno',observed:`Crear ${ex.status}; subir ${r.status}; propio ${s.status}; ajeno ${b.status}`,evidence:[safe(ex),safe(r),safe(s),safe(b)]};
 });
 await test('CP-API-007','Persistencia de borrado lógico','RF-3.3',async()=>{const r=await request('DELETE','/examenes/'+ids.exam,null,token.admin);const q=await pool.query('SELECT * FROM examen_medico WHERE id=$1',[ids.exam]);return{pass:r.status===200&&q.rowCount===1,expected:'La fila permanece con marca lógica',observed:`HTTP ${r.status}; filas persistidas=${q.rowCount}`,evidence:{response:safe(r),rows_after:q.rowCount}}});
 await test('CP-API-008','Contraseña con hash adaptativo','NFR-SEG-2',async()=>{const q=await pool.query('SELECT contrasena FROM usuarios WHERE id=$1',[ids.admin]);const hashed=/^\$2[aby]\$/.test(q.rows[0].contrasena);return{pass:hashed,expected:'Hash bcrypt; no texto claro',observed:`Formato bcrypt=${hashed}; igualdad con entrada=${q.rows[0].contrasena==='Synthetic123!'}`,evidence:{bcrypt_format:hashed,equals_input:q.rows[0].contrasena==='Synthetic123!'}}});
 await test('CP-API-009','Auditoría de cambio de rol con origen','RF-5.1',async()=>{const r=await request('PUT','/usuarios/'+ids.b,{rol_id:2},token.admin);const q=await pool.query("SELECT column_name FROM information_schema.columns WHERE table_schema='public' AND table_name='auditoria'");const a=await pool.query('SELECT id,usuario_id,accion,fecha_hora FROM auditoria WHERE usuario_id=$1 ORDER BY id DESC LIMIT 1',[ids.admin]);const names=q.rows.map(x=>x.column_name);return{pass:r.status===200&&names.some(x=>/ip|origen/.test(x)),expected:'Cambio auditado con origen IP',observed:`HTTP ${r.status}; columnas=${names.join(', ')}`,evidence:{response:safe(r),columns:names,event:a.rows[0]}}});
 await test('CP-API-010','Médico no puede asignarse administrador','NFR-SEG-4',async()=>{const r=await request('PUT','/usuarios/'+ids.medico,{rol_id:1},token.medico);const q=await pool.query('SELECT r.nombre FROM usuario_roles ur JOIN roles r ON r.id=ur.rol_id WHERE usuario_id=$1',[ids.medico]);return{pass:r.status===403&&!q.rows.some(x=>x.nombre==='admin'),expected:'403 y rol médico conservado',observed:`HTTP ${r.status}; roles=${q.rows.map(x=>x.nombre)}`,evidence:{response:safe(r),roles:q.rows}}});
 await test('CP-API-011','Latencia de consulta menor de 300 ms','NFR-PERF-1',async()=>{const r=await request('GET','/examenes',null,token.admin);return{pass:r.status===200&&r.ms<300,expected:'200 y menos de 300 ms',observed:`HTTP ${r.status}; ${r.ms} ms`,evidence:{http:r.status,latency_ms:r.ms}}});
 await test('CP-API-012','Eliminar usuario sin autenticar','NFR-SEG-4',async()=>{const r=await request('DELETE','/usuarios/'+ids.disposable);const q=await pool.query('SELECT id FROM usuarios WHERE id=$1',[ids.disposable]);return{pass:r.status===401&&q.rowCount===1,expected:'401 y cuenta intacta',observed:`HTTP ${r.status}; filas restantes=${q.rowCount}`,evidence:{response:safe(r),rows_after:q.rowCount}}});
 // Carga breve: no sustituye estabilidad de 10 minutos ni JMeter.
 const batchStart=performance.now();let active=0,maxActive=0;
 const load=await Promise.all(Array.from({length:200},async()=>{active++;maxActive=Math.max(maxActive,active);const r=await request('GET','/examenes',null,token.admin).catch(e=>({status:0,ms:30000,error:e.message}));active--;return{http:r.status,ms:r.ms,error:r.error}}));
 const times=load.map(x=>x.ms).sort((a,b)=>a-b);const loadResult={tool:'Node.js fetch, lote breve de 200 solicitudes simultáneas',duration_ms:Math.round(performance.now()-batchStart),users:200,max_in_flight:maxActive,p50_ms:times[99],p95_ms:times[189],p99_ms:times[197],min_ms:times[0],max_ms:times.at(-1),http_5xx:load.filter(x=>x.http>=500).length,errors:load.filter(x=>x.http!==200).length,criterion:'p95 < 300 ms y cero errores; no acredita estabilidad prolongada',status:times[189]<300&&load.every(x=>x.http===200)?'PASS':'FAIL',samples:load,date:new Date().toISOString()};
 fs.writeFileSync(path.join(root,'06_Evidencias/carga/carga_200_real.json'),JSON.stringify(loadResult,null,2));
 const report={date:new Date().toISOString(),environment:{base,db:'cuidarte_qa; aislada; datos sintéticos',node:process.version,postgres:ver.rows[0].version},summary:{designed:rows.length,executed:rows.filter(x=>x.status!=='BLOCKED').length,pass:rows.filter(x=>x.status==='PASS').length,fail:rows.filter(x=>x.status==='FAIL').length,blocked:rows.filter(x=>x.status==='BLOCKED').length},cases:rows};
 fs.writeFileSync(path.join(out,'resultados_api.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report.summary));
}
main().catch(e=>{console.error(e.message);process.exitCode=1}).finally(async()=>{if(server)server.kill();await pool.end()});
