# Resumen Imagen 3 - API NestJS + Postman + Endpoints

## Idea central
La pizarra conecta tres piezas: cliente de pruebas (Postman), API de recetas (NestJS/Node) y base de datos (PostgreSQL).

## Arquitectura representada
- **Postman**: lugar donde disparamos requests HTTP y validamos respuestas.
- **API-Recetas** (`localhost:3000/recipes`): capa backend en JS/TS sobre Node, con framework NestJS.
- **PostgreSQL**: almacenamiento persistente de recetas.

## Los 6 endpoints trabajados
1. `GET    /recipes`
- Lista todas las recetas.

2. `GET    /recipes/:id`
- Devuelve una receta especifica.

3. `POST   /recipes`
- Crea una receta nueva.

4. `POST   /recipes/:id/image`
- Asocia/sube imagen para receta (flujo separado).

5. `PATCH  /recipes/:id`
- Actualiza parcialmente una receta.

6. `DELETE /recipes/:id`
- Elimina una receta por id.

## Flujo tecnico de puesta en marcha
1. `npm install`
- Instala dependencias del proyecto (definidas en `package.json`).

2. `npm run start:dev`
- Levanta la API en modo desarrollo.

3. Probar en Postman
- Importar coleccion.
- Ejecutar endpoints en orden logico.
- Validar codigos de estado y body.

## Que se esta aprendiendo aqui
- Relacion entre metodos HTTP y operaciones CRUD reales.
- Separar responsabilidades: test (Postman), logica (NestJS), datos (Postgres).
- Verificar API antes de construir UI frontend.

## Como explicarlo en clase (guion rapido)
- "Postman golpea la puerta; NestJS procesa; Postgres guarda/devuelve".
- "Cada endpoint representa una accion de negocio del CRUD".
- "Si falla algo, revisar capa por capa: request -> API -> DB".

## Error tipico a evitar
- Probar endpoints sin tener la API levantada o sin DB lista.
- Solucion: checklist previo: DB OK -> API OK -> Postman OK.
