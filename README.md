# Cuidarte+ · Examen final EP5 / EP6

**Antonella Cuvertino · Duoc UC**  
**Carrera:** Ingeniería Informática, Desarrollo de Software  
**ISY1102 · Sección 02V · Docente:** Luis Manuel Yagi Figueroa  
**Defensa:** 17 de noviembre de 2026

## Pruebas y correcciones realizadas

| Campaña API / integración | PASS | FAIL | Bloqueados |
|---|---:|---:|---:|
| Antes: versión original | 8 | 12 | 0 |
| Después: versión con cambios | 15 | 5 | 0 |

Son los **mismos 20 casos y criterios**, ejecutados en dos bases QA independientes con datos sintéticos. Siete casos cambian de FAIL a PASS; ninguno de los PASS iniciales pasa a FAIL. Los JSON, intentos previos, hashes y validación de retiro de triggers están en el ZIP 05.

Correcciones verificadas: autenticación y autorización antes de borrar o crear usuarios; restricción del cambio de roles a admin; validación de rol_id; actor numérico y transacción del borrado; IP en actualización del sistema médico. Un primer parche IP actuó en la rama equivocada, falló y fue corregido; se conserva ese intento.

**Siguen fallando:** permisos de auditoría, rollback del cambio de rol, baja lógica de exámenes, hash de contraseñas y latencia por delayMiddleware(5000). No se afirma que sean imposibles de corregir: la propuesta y el alcance de cada pendiente están documentados. La API puede responder y aun así incumplir un requisito.

**UI adicional:** login incorrecto y llegada a home verificados con Playwright/Edge. Se detectan dos avisos de error iguales: hallazgo leve abierto (UI-03), separado de los 20 casos API.

## Qué entregar y qué estudiar

| Archivo | Uso |
|---|---|
| [01 · Informe final](01_Informe_Final_EP5.pdf) | Formato oficial: seis apartados, fichas, ejecución, causas, correcciones, retest y mantenimiento. |
| [02 · Presentación EP6](02_Presentacion_EP6.pdf) | Diez láminas para exposición individual de diez minutos. |
| [03 · Guion y defensa](03_Guion_Defensa_y_Video.pdf) | Explicación por lámina, ocho preguntas y preparación del video. |
| [04 · Recorrido de pruebas y capturas](04_Recorrido_Pruebas_y_Capturas.pdf) | Comandos, recorrido paso a paso, capturas reales y qué demuestra cada evidencia. **Empieza aquí para ensayar.** |
| [05 · Código, pruebas y evidencias](05_Codigo_Pruebas_y_Evidencias.zip) | Código antes/después sin credenciales, runner, JSON, capturas, reporte HTML interactivo, Word, PowerPoint y pautas. |
| [06 · Guías y actividades de clases](06_Guias_y_actividades_clases.zip) | Antecedentes de clase en PDF dentro del ZIP; originales con autoría histórica conservada. |

**AVA:** informe, diapositivas utilizadas y video individual. **Video: pendiente de grabación personal por Antonella.** Los ZIP no reemplazan el video. Las capturas del reporte identifican que visualizan JSON; las capturas de login/home provienen del navegador real. El plan también indica la captura de cambios en VS Code que debe tomar la estudiante.

## Reproducción local

En el workspace: `03_LABORATORIO_FINAL/00_EMPIEZA_AQUI.md` explica el recorrido. Iniciar Docker Desktop y ejecutar `Iniciar-Laboratorio.ps1`; luego `Ejecutar-Pruebas.ps1 -Fase antes` y `-Fase despues`. Un exit code 1 significa que hay pruebas FAIL; no se cambia el test para ocultarlas. Las bases están aisladas: API antes 4446, API después 4447, PostgreSQL QA 15444 y app 3344.

El ZIP 05 contiene `Laboratorio/Recorrido_Pruebas.html` para revisar caso por caso. Es un reporte estático de las corridas conservadas; las nuevas corridas requieren regenerarlo. No contiene claves de SonarQube, `.env`, JWT ni dumps clínicos. `db.js` se exporta sin el fallback privado y exige DATABASE_URL; esa adaptación de configuración está declarada.

## Alcance y decisión

La campaña actual usa **Node fetch + pg**, y el recorrido UI usa **Playwright con Edge**. No se denomina Jest, Cypress ni JMeter a esas ejecuciones. El pipeline Actions, ZAP, JMeter y demás controles sin corrida siguen propuestos. Las métricas SonarQube de octubre son antecedentes; **no hay nuevo SAST sobre el parche**. SQLi se probó en login y se bloqueó; no acredita todas las rutas. IDOR se bloqueó en los escenarios definidos.

**Dictamen académico: CERTIFICADO CON RESERVAS. Producción BLOQUEADA** por los defectos abiertos. Las mejoras verificadas no equivalen a certificación legal ni autorización de uso clínico.
