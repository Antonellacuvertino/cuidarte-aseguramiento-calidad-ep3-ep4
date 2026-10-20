# Actividad 1. Estrategia de pruebas — actualización de experiencia 2

**Proyecto:** Cuidarte+ · **Integrantes:** Antonella Cuvertino y Miriam Hammami · **Fecha:** 20 de octubre de 2026.

## Objetivo y alcance

Priorizar riesgos sobre datos de salud, permisos, integridad y continuidad. Incluye login, usuarios/roles, pacientes, exámenes, PDF y auditoría. Excluye pagos, facturación e instrumentos médicos. El PDF original se conserva en esta misma carpeta; esta actualización incorpora el estado real sin alterar retrospectivamente el trabajo anterior.

## Riesgos, estrategia y recursos

Crítico: acceso no autorizado y escalamiento; se ejecutan casos negativos por actor y recurso. Alto: credenciales, borrado y auditoría; se contrasta respuesta con base. Rendimiento: se miden tiempos y un lote breve de 200 solicitudes, sin equipararlo a JMeter sostenido. Accesibilidad: se planifica WCAG 2.1 AA con revisión manual y adultos mayores. Enfoque mixto Shift-Left; SAST, integración y pruebas exploratorias complementarias.

Roles propuestos: Antonella QA/DevSecOps y automatización; Miriam diseño, trazabilidad y cumplimiento. Ambas revisan evidencias. Recursos: Windows, Docker, PostgreSQL 15, Node.js, SonarQube, navegador y datos sintéticos. Cronograma relativo: semana 1 entorno y unitarias; semana 2 integración y roles; semana 3 E2E, DAST y carga; semana 4 accesibilidad, retest e informe.

## Entrada y salida

Entrada: versión y criterios conocidos, entorno aislado y cuentas por rol. Salida: todos los críticos y altos ejecutados, cero abiertos de esas severidades, cobertura backend >80%, DAST/SAST revisados y accesibilidad/carga completas. No se cumple la salida en esta iteración.

## Estado y evidencia

Se ejecutaron doce checkpoints API: seis PASS y seis FAIL. No se implementaron remediaciones. SonarQube se documenta con exportaciones reales si están presentes en 06_Evidencias/sonarqube. Los ocho casos maestros y su correspondencia se encuentran en el informe EP3, apartado 4. El 100% de cobertura ERS no es demostrable sin la ERS completa.

## Mejora continua

Priorizar autorización de mutaciones y roles; después hash de contraseña, soft delete, auditoría y demoras. Repetir la suite y ampliar a Jest/Supertest, DAST, E2E, WCAG y carga sostenida. No usar datos personales reales para pruebas.
