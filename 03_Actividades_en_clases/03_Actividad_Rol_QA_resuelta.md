# Actividad 3. Rol QA — ejecución y evidencias en Cuidarte+

**Adaptación de la guía Atlas y Conecta+.** Se aplican riesgos equivalentes al caso semestral Cuidarte+, sin afirmar que se ejecutaron esos otros sistemas. La guía original está en 04_Guias_y_plantillas.

## Organización y método

Líder QA propuesto: Antonella; ejecutora propuesta: Antonella; evidencia y relatoría propuestas: Miriam. La ejecución técnica efectiva fue automatizada con asistencia; las integrantes deben revisar resultados. No se corrigieron rutas durante la sesión. Se seleccionan casos equivalentes al Plan Maestro: login válido, entrada obligatoria vacía, acceso ajeno y acción destructiva anónima como riesgo adicional.

## Herramienta y registro del flujo

Se usó un runner Node.js fetch con registro JSON, y capturas de navegador cuando constan en el acta. No se dispone de un proyecto nativo exportado por Chrome DevTools Recorder, TestCase Studio o Selenium IDE. Este resultado no se presenta como cumplimiento de esa grabación específica. La guía admite alternativa manual ante problemas; corresponde comunicar a la docente esta diferencia y, si exige la herramienta exacta, grabar el login siguiendo los pasos incluidos en GUIA_DE_ENTREGA.md. Las evidencias API ya están disponibles y no deben reemplazarse por un PASS supuesto.

## Cuatro casos obligatorios y bitácora

| ID de aula / técnico | Esperado | Obtenido | Estado | Evidencia / incidencia |
| --- | --- | --- | --- | --- |
| CP 001 / CP-API-001 | 200 y JWT verificable | HTTP 200; firma válida=true | PASS | resultados_api.json → CP-API-001 |
| CP 002 / CP-API-003 | 400 sin inserción | HTTP 400 | PASS | resultados_api.json → CP-API-003 |
| CP 003 / CP-API-004 | 403 sin datos ajenos | HTTP 403 | PASS | resultados_api.json → CP-API-004 |
| CP 004 / CP-API-012 | 401 y cuenta intacta | HTTP 200; filas restantes=0 | FAIL | resultados_api.json → CP-API-012 / DEF-006 |

## Incidencia reproducible y cierre

DEF-006: DELETE /usuarios/:id sin Bearer elimina una cuenta sintética y responde HTTP 200. Esperado: 401 y fila intacta. Obtenido: 200 y cero filas; criticidad crítica por acción destructiva anónima. Entorno: API 4445, PostgreSQL aislado. Pasos y datos exactos: ejecutar_api.cjs, CP-API-012. Recomendación: autenticar y autorizar antes de ejecutar DELETE; validar persistencia y regresión. Los cuatro casos equivalentes cuentan con resultado y evidencia; hay tres PASS y un FAIL. No se declara una duración real de 80 minutos ni grabación nativa inexistente.
