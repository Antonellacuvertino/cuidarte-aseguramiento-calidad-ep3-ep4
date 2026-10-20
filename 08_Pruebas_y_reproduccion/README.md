# Reproducción del ambiente QA

## Alcance

La ejecución original usó Node.js 22.16.0, PostgreSQL 15.19 y una base nueva `cuidarte_qa`. El código evaluado está en `07_Codigo`. La copia de configuración fue sanitizada; no se remediaron sus defectos. Ejecutar únicamente en entorno local y con datos sintéticos.

## API y base sintéticas

Desde esta carpeta, con Docker Desktop operativo:

```powershell
docker compose -f compose.qa.yml up -d db
npm install
$env:DATABASE_URL='postgres://qa:qa_local_synthetic@127.0.0.1:15443/cuidarte_qa'
node ejecutar_api.cjs
```

Esperar a que PostgreSQL esté listo antes de ejecutar el runner. Este inicia y detiene la API en 4445, crea cuentas con prefijo `qa_` y ejecuta doce checkpoints. Los FAIL son resultados esperados del estado vulnerable evaluado, no un fallo del runner. El lote separado lanza 200 consultas paralelas y guarda tiempos. Cada ejecución agrega datos sintéticos nuevos; no elimina bases preexistentes.

## SonarQube

```powershell
docker compose -f compose.qa.yml up -d sonar
```

Abrir `http://localhost:9000`, iniciar con la cuenta inicial de la instalación nueva y cambiar su contraseña cuando corresponda. Crear el proyecto `isy1102-cuidarte`, generar un token y asignarlo a `$env:SONAR_TOKEN` sin guardarlo en Git. Copiar `sonar-project.properties` a `07_Codigo` si no está allí y ejecutar:

```powershell
$source=(Resolve-Path ../07_Codigo).Path
docker run --rm -e SONAR_TOKEN -e SONAR_HOST_URL=http://host.docker.internal:9000 -v "${source}:/usr/src" sonarsource/sonar-scanner-cli:latest
```

Las imágenes `community` y `latest` son móviles: para reproducir exactamente la versión, consultar `06_Evidencias/sonarqube/servidor.json`, `versiones.json` y `imagenes_docker.txt` si está disponible. Los resultados originales se conservan aun si se ejecuta después una versión distinta.

## Interfaz y capturas

Para un recorrido visual, mantener una API y base disponibles, instalar dependencias del frontend y ejecutar Vite con `VITE_API_URL=http://127.0.0.1:4445` y puerto 3334. El script `capturar_evidencias.cjs` automatiza capturas si Playwright y Chromium están disponibles; su acta delimita exactamente qué se observó. No equivale a una auditoría WCAG.

## Interpretación

Los JSON de SonarQube no contienen credenciales. Un hotspot no equivale a vulnerabilidad explotada; un gate no equivale a cumplimiento legal. La cobertura de código requiere LCOV y no se infiere de un número de endpoints probados. Los estados de la suite API, los ocho casos maestros y la UI histórica tienen alcances y denominadores distintos.

Para detener el ambiente: `docker compose -f compose.qa.yml stop`. No es necesario borrar volúmenes para revisar los entregables.
