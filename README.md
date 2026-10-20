# Cuidarte+ — Entrega EP3 y defensa EP4

**ISY1102 · Duoc UC · Sección 002v**  
**Antonella Cuvertino y Miriam Hammami · 20 de octubre de 2026**

Informe, actividades y defensa del aseguramiento de calidad del sistema clínico Cuidarte+. **Dictamen: NO CERTIFICADO para producción.** El código es un caso didáctico vulnerable; las pruebas usan una base separada y datos sintéticos.

## Abrir primero

- [Guía de entrega y ensayo](GUIA_DE_ENTREGA.md).
- [Informe Word con formato oficial](01_Informe_EP3/Informe_EP3_Cuidarte_Formato_Oficial.docx) y [PDF](01_Informe_EP3/Informe_EP3_Cuidarte.pdf).
- [Presentación PowerPoint](02_Presentacion_EP4/Presentacion_EP4_Cuidarte.pptx) y [PDF](02_Presentacion_EP4/Presentacion_EP4_Cuidarte.pdf).
- [Guion individual](02_Presentacion_EP4/Guion_defensa_individual.md), con tiempos y preguntas probables.
- [Correspondencia con la pauta EP4](02_Presentacion_EP4/Mapa_pauta_EP4.md).

## Organización

| Carpeta | Contenido |
|---|---|
| 01_Informe_EP3 | Informe en estructura oficial, Word editable, PDF y fuente Markdown |
| 02_Presentacion_EP4 | Diapositivas, guion individual y mapa de indicadores |
| 03_Actividades_en_clases | Las dos actividades anteriores originales y cuatro desarrollos actualizados, cada uno en Word, PDF y Markdown |
| 04_Guias_y_plantillas | Plantilla EP3, pauta EP4 y las dos guías nuevas originales |
| 05_Antecedentes | Informe EP1 original |
| 06_Evidencias | JSON de ejecución, carga y SonarQube; bitácora, matriz y defectos CSV; capturas y acta |
| 07_Codigo | Snapshot sanitizado del sistema, sin corregir sus defectos; ver NOTA_SNAPSHOT.md |
| 08_Pruebas_y_reproduccion | Runner y configuración para repetir análisis y pruebas |

## Resultados que sí están sustentados

Suite API: **12 checkpoints ejecutados, 6 PASS y 6 FAIL**. Defectos: dos críticos (escalamiento de rol y eliminación anónima) y cuatro graves (contraseñas, borrado físico, auditoría y latencia). El lote de 200 solicitudes es una prueba breve independiente; no acredita usuarios sostenidos, disponibilidad mensual o JMeter. Las métricas definitivas de SonarQube se consultan en sus JSON originales y en el informe final.

Los ocho casos maestros no equivalen a doce ejecuciones integrales. Los cinco PASS UI de la actividad anterior son antecedentes históricos. No hay ERS íntegra ni feedback docente adjuntos; no se declara 100% de cobertura ERS. No se inventan métricas de código, resultados DAST ni auditoría WCAG.

## Reproducir

Consulte [08_Pruebas_y_reproduccion/README.md](08_Pruebas_y_reproduccion/README.md). Las pruebas crean registros sintéticos y ejecutan acciones destructivas únicamente sobre esos registros en `cuidarte_qa`. El runner rechaza otras bases. Se conserva el estado evaluado para observar los defectos antes de proponer corrección.

## Autoría y uso académico

Las fuentes originales se conservan. La consolidación y la ejecución técnica se realizaron con asistencia automatizada; no se atribuyen retrospectivamente a una integrante. Las estudiantes deben revisar los datos y explicar por sí mismas el proyecto, porque la pauta EP4 evalúa individualmente 10 minutos de defensa y 5 de preguntas.

No se asignan sanciones automáticas a los defectos. Las referencias legales y sus fechas están en el informe. Esta entrega no es una certificación jurídica ni una certificación ISO de organismo acreditado.
