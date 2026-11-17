# Cuidarte+ · Entrega EP5 y defensa EP6 · 17 noviembre 2026

**Antonella Cuvertino · Duoc UC · Ingeniería Informática, Desarrollo de Software**  
ISY1102 · Sección 02V · Docente Luis Manuel Yagi Figueroa

## Archivos para entregar y preparar el video

| Archivo | Contenido |
|---|---|
| [01 · Informe EP5](01_Informe_EP5_AntonellaCuvertino_2026-11-17.pdf) | Informe académico en seis apartados, con 14 capturas integradas junto a los resultados; casos, fechas, incidencias, mitigación y mantenimiento. |
| [02 · Presentación EP6](02_Presentacion_EP6_AntonellaCuvertino_2026-11-17.pdf) | Diez láminas actualizadas con el informe y capturas reales; notas orales en el PPTX del ZIP. |
| [03 · Guía para grabar hoy](03_Guia_Video_y_Defensa_2026-11-17.pdf) | Requisitos verificados, cámara/pantalla recomendadas, guion literal por lámina y preguntas. **Empieza aquí para grabar.** |
| [04 · Evidencias y capturas](04_Evidencias_y_Capturas_2026-11-17.pdf) | Copia complementaria de capturas y recorrido. Las evidencias ya están integradas en el informe 01; no es necesario adjuntarlo por separado. |
| [05 · Código y evidencias](05_Codigo_y_Evidencias_EP5_2026-11-17.zip) | Código antes/después sin credenciales privadas, colección Postman, JMX/JTL/HTML, ZAP, SonarQube, registro maestro, capturas, Word y PPTX. |
| [06 · Guías y actividades de clases](06_Guias_y_actividades_clases.zip) | Antecedentes de clase conservados en ZIP; su autoría histórica no se altera. |

La pauta EP6 asigna 10 minutos de exposición y 5 de preguntas; no fija una duración independiente para el video ni exige repetir todas las pruebas en vivo. Se recomienda un video de unos 10 minutos con cámara, voz y presentación con evidencias.


**AVA:** informe 01 con evidencias integradas, diapositivas 02 y video individual. El documento 04 es un respaldo opcional, no un anexo obligatorio. **El video debe grabarlo Antonella; está pendiente.**

## Registro coherente desde la evidencia

El registro maestro distingue EJECUTADA, BLOCKED y PENDIENTE; una ejecución enlaza caso, fecha UTC, obtenido, artefacto e incidencia. Los pendientes no tienen conclusiones medidas. Se corrige la contradicción del antecedente entre la página 12 (proyectadas) y la 23 (resultados). No se mezclan los datos de octubre con las corridas actuales ni se suman unidades diferentes.

| Conjunto | Resultado real |
|---|---|
| Node / integración ·16 noviembre | Mismos 20 casos: 8 PASS/12 FAIL antes →15 PASS/5 FAIL después. |
| Postman / Newman ·17 noviembre | 9 solicitudes y 12 aserciones por fase: 8/12 aprobadas antes →11/12 después. |
| JMeter carga 50 ·17 noviembre | 350 muestras, 50 hilos observados, p95 5031 ms, cero errores HTTP. FAIL de latencia. |
| JMeter estrés 200 ·17 noviembre | 1727 muestras, 200 hilos observados, p95 5034 ms, cero errores HTTP. FAIL de latencia. |
| ZAP pasivo ·17 noviembre | 15 instancias /6 tipos de alerta en cuatro rutas; no equivale a explotación ni DAST activo exhaustivo. |
| SonarQube ·17 noviembre | CE SUCCESS; 1 bug, 72 smells, 3 hotspots, 0 vulnerabilidades clasificadas, 0% cobertura sin LCOV. Gate OK con conditions vacío. |

El timeout del cliente Sonar no detuvo el trabajo del servidor: el identificador y SUCCESS se recuperaron de la API CE y se conserva su procedencia. Los intentos bloqueados están separados de los defectos de aplicación.

## Acceso para ensayar

App QA: **http://127.0.0.1:3344/login**. Según actividad 01-10: **admin / Admin** y **medico / medico**, respetando mayúsculas. Se recrearon solo en QA y se verificaron por API y navegador; no se afirma acceso al entorno histórico 3333.

En VS Code, el laboratorio contiene Iniciar-Laboratorio.ps1, Abrir-App.ps1 y Abrir-Evidencias.ps1. API antes 4446, después 4447; PostgreSQL QA 15444. Las pruebas automáticas también usan fixtures qa_final; no confundirlos con las credenciales de la actividad.

## Reservas y límites

Siguen abiertos permisos e inmutabilidad de auditoría, rollback del cambio de rol, baja lógica, hash de contraseñas y latencia. La UI muestra dos avisos de error iguales (hallazgo leve). Corregirlos requiere su propia intervención y retest; no se declaran imposibles. WCAG completo, restauración y GitHub Actions permanecen pendientes.

**Dictamen académico con reservas; producción BLOQUEADA.** Un scanner no certifica cumplimiento legal ni elimina los defectos dinámicos. El informe diferencia Ley 19.628 aplicable y transición de Ley 21.719 al 1 de diciembre de 2026 según la fuente oficial consultada; la aplicación de Ley 21.663 depende del sujeto y del incidente.
