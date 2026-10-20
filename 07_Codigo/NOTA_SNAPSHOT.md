# Alcance del snapshot

Se conserva el código didáctico evaluado sin remediar vulnerabilidades. Se omitieron archivos .env, uploads y el dump con datos preexistentes. El esquema init.sql permite crear una base vacía. La única sustitución de src es la conexión de respaldo de db.js: se reemplazó la credencial original por una credencial sintética local. Los README originales se sustituyeron para no propagar secretos. Esta sanitización de configuración no corrige los defectos evaluados. Las pruebas usan DATABASE_URL y datos creados expresamente para QA.
