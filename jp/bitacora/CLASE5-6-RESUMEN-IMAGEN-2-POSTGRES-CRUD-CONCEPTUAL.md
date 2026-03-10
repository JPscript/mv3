# Resumen Imagen 2 - Postgres y CRUD por niveles

## Idea central
La pizarra explica CRUD desde la base de datos hasta el registro individual usando PostgreSQL como motor.

## Niveles de trabajo explicados

## 1) Nivel base de datos (DB)
- Ejemplo: `recetas_db`.
- En Postgres puedes tener varias bases de datos.
- Se introduce la idea: una DB contiene varias tablas.

## 2) Nivel tabla
- Una tabla tiene columnas (ejemplo en pizarra: `id`, `name`, `desc`).
- Se relaciona CRUD con operaciones de estructura:
  - C: `CREATE TABLE ...`
  - R: revisar estructura/consulta de tabla
  - U: `ALTER TABLE ...`
  - D: eliminar estructura (por ejemplo `DROP TABLE ...`)

## 3) Nivel registro (fila)
- Una tabla tiene muchos registros.
- CRUD sobre datos reales:
  - C: `INSERT ...`
  - R: `SELECT ...`
  - U: `UPDATE ...`
  - D: `DELETE ...`

## Que se esta aprendiendo aqui
- CRUD no es solo "botones": tambien aplica a estructura y datos.
- Diferenciar cambios de esquema vs cambios de contenido.
- Entender por que primero se prepara SQL y luego se levanta la API.

## Como explicarlo en clase (guion rapido)
- "Primero existe la base, luego las tablas, luego los registros".
- "Si no existe tabla, la API no puede insertar ni consultar".
- "CREATE/ALTER afectan estructura; INSERT/UPDATE/DELETE afectan datos".
- "Este orden evita errores como relation does not exist".

## Error tipico a evitar
- Ejecutar scripts SQL fuera de orden.
- Solucion: correrlos secuencialmente y validar cada paso (`\\dt`, `SELECT`).
