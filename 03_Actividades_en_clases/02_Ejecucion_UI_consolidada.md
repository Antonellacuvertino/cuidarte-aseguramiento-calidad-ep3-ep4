# Actividad 2. Ejecución y evidencias de interfaz — consolidación

**Proyecto:** Cuidarte+ · **Integrantes:** Antonella Cuvertino y Miriam Hammami · **Fecha:** 20 de octubre de 2026.

## Fuente y alcance

Se conserva el PDF original de la actividad 01-10, que declara cinco PASS: acceso/login SPA, dashboard, búsqueda de pacientes, registro/PDF y confirmación de eliminación. Son antecedentes históricos del equipo, no una nueva ejecución validada de toda la UI. No se modifican las capturas originales ni se inventan resultados de un estudio de usabilidad.

## Contraste con evidencia técnica actual

El login y el transporte de PDF tienen checkpoints API exitosos. Sin embargo, el backend elimina físicamente el examen: CP-API-007 confirma cero filas después de DELETE. Por ello, CP-UI-05 solo puede interpretarse como confirmación visual y actualización de lista; no demuestra soft delete. La mención de búsqueda “sin latencia perceptible” no reemplaza una medición: el lote API actual tiene p95 de 8698 ms.

## Matriz de alcance

| Caso histórico | Estado en PDF | Validación actual / limitación |
| --- | --- | --- |
| CP-UI-01 | PASS declarado | CP-API-001 confirma login técnico; ver acta de capturas para nuevo recorrido UI |
| CP-UI-02 | PASS declarado | Captura actual si consta en acta; sin evaluación completa de widgets |
| CP-UI-03 | PASS declarado | No se midió búsqueda de UI; no extrapolar tiempo de API |
| CP-UI-04 | PASS declarado | CP-API-006 valida transferencia e integridad de bytes |
| CP-UI-05 | PASS declarado | Persistencia FAIL: no cumple borrado lógico |

## Evidencia y pendientes

El PDF original contiene las evidencias aportadas. Las capturas nuevas y su acta, cuando existan, se guardan en 06_Evidencias/capturas. La evaluación WCAG AA requiere teclado, foco, etiquetas, contraste, zoom y lectores, además de usuarios adultos mayores para usabilidad; no se declara completada por disponer de capturas.
