# Guía de entrega y preparación de la defensa

## Archivos para entregar en AVA

1. Entregar el informe Word de `01_Informe_EP3`, acompañado de su PDF si la plataforma lo admite.
2. Entregar la presentación PowerPoint y/o PDF de `02_Presentacion_EP4`, según instrucción del docente.
3. Adjuntar la carpeta `03_Actividades_en_clases` con las cuatro actividades desarrolladas y los dos PDF previos conservados.
4. Adjuntar evidencias, fuentes y guías si se solicita el expediente completo. El ZIP contiene la misma estructura, sin dependencias instaladas ni secretos locales.
5. Mantener el repositorio privado. Si el docente necesita acceso, agregar su cuenta solo cuando se tenga el identificador correcto; no se envían invitaciones ni mensajes automáticamente.

La carpeta contiene cuatro actividades: estrategia, ejecución UI, rol QA y certificación. Los dos documentos nuevos de aula se preservan como guías originales en `04_Guias_y_plantillas`, separados de las respuestas. La evaluación anterior se conserva en `05_Antecedentes`.

## Consultar el análisis local conservado

Al terminar se detienen los contenedores QA para liberar recursos. En este equipo se pueden volver a iniciar con `docker start cuidarte-qa-db cuidarte-qa-sonar-lts`, con Docker Desktop activo. El panel queda en `http://localhost:9000`. Los datos de acceso local están fuera del repositorio, en `.qa_tools/Acceso_Sonar_Local.txt` del directorio CodigoFuenteB; ese archivo no se incluye en el ZIP. Las exportaciones y la presentación permiten defender el trabajo sin iniciar Docker.

## Preparación personal

Leer primero el resumen y los seis defectos del informe. Abrir `Guion_defensa_individual.docx` y ensayar las doce diapositivas con cronómetro. El tiempo asignado es 10 minutos y luego 5 de preguntas; no dividir el guion entre dos personas. Cada integrante debe comprender autenticación, RBAC/IDOR, persistencia, auditoría, carga y limitaciones del SAST.

La presentación incluye notas del orador con el mismo guion. El PDF permite exponer si PowerPoint o la conexión fallan. Conservar también las exportaciones JSON y las capturas de `06_Evidencias`.

## Qué falta comprobar antes de afirmar una certificación

- No se recibió la ERS íntegra ni retroalimentación docente; incorporar si se dispone de ellas y recalcular cobertura.
- Completar DAST, unitarias/cobertura instrumentada, WCAG y estudio de usuarios, carga sostenida y retest de correcciones.
- La actividad de rol QA pide una herramienta nativa de grabación. Las pruebas API y las capturas del navegador se entregan como evidencia técnica, pero no se afirma que sean una grabación de extensión. Si el docente exige ese archivo, completar el paso descrito a continuación.

## Grabación de CP 001 si la docente exige Chrome Recorder

Con el ambiente local habilitado y una cuenta sintética, abrir el login en Chrome. Entrar a DevTools con Ctrl+Shift+I; abrir More tools → Recorder. Crear `Cuidarte_CP001_Login`, iniciar grabación, ingresar credenciales sintéticas, comprobar redirección a `/home` y detener. Reproducir una vez y guardar captura del resultado; exportar JSON si está disponible. Guardarlo en `06_Evidencias/capturas` y anotar fecha, navegador, resultado y versión. No registrar tokens ni contraseñas reales.

No se debe marcar este punto como realizado hasta contar con su archivo y reproducción. La guía permite alternativa manual si la herramienta presenta problemas; comunicar la limitación al docente y aportar las capturas disponibles.

## Verificación final

Confirmar nombres de integrantes y sección; abrir Word, PowerPoint y PDF; comprobar que las diapositivas y el informe muestran los mismos valores de SonarQube; revisar que los enlaces de evidencia funcionen. No cambiar los FAIL a PASS para mejorar el aspecto de la entrega: el trabajo QA evalúa la calidad de la investigación y de la decisión.
