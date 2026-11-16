# Cuidarte+ · Examen final EP5 / EP6 · Encargo 3

**Antonella Cuvertino · Duoc UC**  
**Carrera:** Ingeniería Informática, Desarrollo de Software  
**Asignatura:** ISY1102 · Seguridad y Calidad en el Desarrollo de Software  
**Sección:** 02V · **Docente:** Luis Manuel Yagi Figueroa  
**Presentación:** 17 de noviembre de 2026

## Entrega en AVA

| Elemento | Archivo | Estado |
|---|---|---|
| Informe con el formato oficial EP5 | [01 · Informe final](01_Informe_Final_EP5.pdf) | Preparado: seis apartados, 12 fichas, ejecución, mitigación y mantenimiento. |
| Diapositivas utilizadas | [02 · Presentación EP6](02_Presentacion_EP6.pdf) | Preparadas: 10 láminas para exposición individual de 10 minutos. |
| Video individual | Grabar y subir el MP4 de Antonella | **Pendiente de grabación.** El guion está en el archivo 03. |

## Preparación y soporte

| Archivo | Contenido |
|---|---|
| [03 · Guion, defensa y video](03_Guion_Defensa_y_Video.pdf) | Explicación por lámina, 8 preguntas argumentadas y checklist de grabación. |
| [04 · Editables, evidencias y guía](04_Editables_Evidencias_y_Guia.zip) | Informe Word, PowerPoint con notas, diagramas, JSON históricos, hashes y pautas oficiales. En Word, actualizar el índice al abrir; el PDF ya está paginado. |
| [05 · Guías y actividades de clases](05_Guias_y_actividades_clases.zip) | Actividades y material de clase conservados como antecedentes en PDF dentro del ZIP. Su autoría histórica permanece en los originales. |

Para estudiar: abrir primero la presentación y luego el guion. Para AVA: entregar el informe, las diapositivas y el video grabado, según la indicación del docente. Los ZIP son soporte y guías; no reemplazan el video.

## Alcance de los resultados

Evidencia de ejecución histórica del **20 de octubre de 2026**, interpretada en la preparación final del 16 de noviembre. API: 12 verificaciones, 6 PASS y 6 FAIL en el resumen original; dos escenarios no ejercitaron el flujo pretendido y requieren retest. SonarQube: 1 bug, 72 code smells, 3 hotspots, 0 vulnerabilidades clasificadas; gate OK sin condiciones explícitas y cobertura 0,0% sin LCOV.

Jest, Cypress, SCA, ZAP, JMeter y el pipeline Actions son **propuestas sin ejecución acreditada**. La ráfaga de 200 solicitudes se ejecutó con Node, no con JMeter. La SQLi declarada no está corroborada en el archivo indicado y el escenario IDOR guardado bloqueó el acceso entre pacientes. El informe detalla las limitaciones y las contradicciones entre CSV y JSON.

**Dictamen académico: CERTIFICADO CON RESERVAS. Producción BLOQUEADA** hasta cerrar los riesgos y acreditar los retests. No equivale a certificación legal ni a autorización de uso clínico.

Los entregables EP3/EP4 anteriores se conservan en el historial Git y en el respaldo local; esta portada corresponde a la entrega final individual.
