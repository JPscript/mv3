# API Restaurantes y Recetas

Backend de práctica del grupo Ladrillos: Construyendo el futuro del desarrollo web, un ladrillo a la vez.

Esta API sigue el enfoque de Senior Cat: primero una base clara, luego capas pequeñas y comprobables. Por eso el proyecto separa auth, usuarios, restaurantes, recetas, comentarios y valoraciones en módulos distintos.

---

## 1. Objetivo

Entregar a los alumnos una API completa para construir el frontend de un proyecto de restaurantes.

Incluye:

- autenticación JWT con nombre y contraseña,
- perfil de usuario,
- CRUD de restaurantes,
- CRUD de recetas asociadas a un restaurante,
- comentarios sobre restaurantes,
- valoraciones por restaurante,
- subida de imágenes locales para usuarios, restaurantes y recetas,
- scripts SQL reales para crear, migrar y poblar PostgreSQL.

---

## 2. Modelo de dominio

La relación principal quedó así:

- un restaurante tiene muchas recetas,
- cada receta pertenece a un solo restaurante,
- un usuario puede comentar restaurantes,
- un usuario puede valorar un restaurante una sola vez,
- las imágenes se guardan en `files/` y en base de datos se persiste la URL pública.

Tablas principales:

- `users`
- `restaurants`
- `recipes`
- `comments`
- `ratings`

---

## 3. Stack

- NestJS
- TypeORM
- PostgreSQL
- `class-validator` y `class-transformer`
- JWT con `@nestjs/jwt`
- hash de contraseñas con `bcryptjs`
- subida de archivos con Multer

---

## 4. Estructura

```text
api-recetas/
├─ files/                                  # imágenes locales servidas en /files
├─ postman/
│  └─ api-recetas.postman_collection.json
├─ scripts/
│  ├─ 00_create_database.sql
│  ├─ 01_create_tables.sql
│  ├─ 02_seed_recipes.sql
│  ├─ 03_crud_examples.sql
│  ├─ 04_add_image_url_column.sql
│  ├─ 05_fix_mojibake_tildes.sql
│  └─ 06_upgrade_restaurant_domain.sql
├─ src/
│  ├─ auth/
│  ├─ comments/
│  ├─ common/
│  ├─ ratings/
│  ├─ recipes/
│  ├─ restaurants/
│  ├─ users/
│  ├─ app.module.ts
│  └─ main.ts
├─ .env
└─ .env.example
```

---

## 5. Variables de entorno

Ejemplo real:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=1234
DB_CLIENT_ENCODING=UTF8
DB_NAME=api_recetas_db
APP_URL=http://localhost:3000
DB_LOGGING=true
JWT_SECRET=senior-cat-secret-local
JWT_EXPIRES_IN=7d
```

Notas:

- `DB_CLIENT_ENCODING=UTF8` ayuda a evitar problemas de mojibake.
- `APP_URL` se usa para construir `image_url` y `fotografia_url`.
- `JWT_SECRET` y `JWT_EXPIRES_IN` controlan la autenticación.

---

## 6. Scripts SQL

### `00_create_database.sql`
- crea la base `api_recetas_db`.

### `01_create_tables.sql`
- crea todas las tablas del dominio actual,
- crea índices,
- crea triggers para `updated_at`.

### `02_seed_recipes.sql`
- reinicia datos e inserta usuarios, restaurantes, recetas, comentarios y ratings coherentes.

### `03_crud_examples.sql`
- deja ejemplos SQL de lectura, actualización e inserción para que el alumno compare ORM vs SQL.

### `04_add_image_url_column.sql`
- migración antigua para el momento en que la API solo tenía recetas.

### `05_fix_mojibake_tildes.sql`
- repara textos dañados por problemas de codificación.

### `06_upgrade_restaurant_domain.sql`
- migra una base vieja de recetas al modelo completo de restaurantes.

---

## 7. Preparar la base de datos

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\run-psql-utf8.ps1 -ScriptPath .\scripts\00_create_database.sql -Password 1234
powershell -ExecutionPolicy Bypass -File .\scripts\run-psql-utf8.ps1 -ScriptPath .\scripts\01_create_tables.sql -Database api_recetas_db -Password 1234
powershell -ExecutionPolicy Bypass -File .\scripts\run-psql-utf8.ps1 -ScriptPath .\scripts\02_seed_recipes.sql -Database api_recetas_db -Password 1234
```

Si ya existía una versión anterior de la base:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\run-psql-utf8.ps1 -ScriptPath .\scripts\06_upgrade_restaurant_domain.sql -Database api_recetas_db -Password 1234
powershell -ExecutionPolicy Bypass -File .\scripts\run-psql-utf8.ps1 -ScriptPath .\scripts\02_seed_recipes.sql -Database api_recetas_db -Password 1234
```

---

## 7.1 Actualizar una API anterior

Si un alumno ya tenía la versión vieja de `api-recetas`, estos son los pasos mínimos para que todo vuelva a funcionar con el dominio nuevo.

### Caso A: quiere conservar su base anterior y migrarla

1. actualizar el código del proyecto,
2. ejecutar `npm install`,
3. revisar que su `.env` tenga `JWT_SECRET`, `JWT_EXPIRES_IN` y `DB_CLIENT_ENCODING=UTF8`,
4. correr `06_upgrade_restaurant_domain.sql`,
5. correr `02_seed_recipes.sql` si quiere datos completos de ejemplo,
6. arrancar la API con `npm run start:dev`.

### Caso B: quiere empezar desde cero

1. crear la base con `00_create_database.sql`,
2. crear tablas con `01_create_tables.sql`,
3. poblar datos con `02_seed_recipes.sql`,
4. arrancar la API con `npm run start:dev`.

### Recomendación para evitar mojibake en Windows

- usar `run-psql-utf8.ps1` para ejecutar cualquier `.sql` del proyecto,
- no abrir ni guardar los scripts con codificación ANSI o Windows-1252,
- si la base ya quedó con textos rotos como `cÃ­trica`, correr `05_fix_mojibake_tildes.sql` con el mismo lanzador seguro.

### Qué cambia respecto a la versión vieja

- ahora existe auth con JWT,
- ahora existen `users`, `restaurants`, `comments` y `ratings`,
- `recipes` necesita `restaurant_id`,
- los endpoints de escritura importantes requieren token,
- la subida de imágenes ya no es solo para recetas.

### Señales de que la actualización salió bien

- `GET /restaurants` devuelve restaurantes con `total_recetas` y `rating_summary`,
- `POST /auth/login` responde con `access_token`,
- `GET /recipes` devuelve cada receta con `restaurant_id`,
- la API levanta sin errores de tablas faltantes.

---

## 8. Arranque del proyecto

Instalar dependencias:

```bash
npm install
```

Desarrollo:

```bash
npm run start:dev
```

Producción local:

```bash
npm run build
npm run start:prod
```

La API sirve archivos desde:

- `GET /files/:filename`

---

## 9. Usuarios seed para clase

Todos los usuarios del seed usan la misma contraseña:

- `password`: `seniorcat123`

Usuarios disponibles:

| Usuario | Contraseña |
|---|---|
| `Senior Cat` | `seniorcat123` |
| `Luna Dev` | `seniorcat123` |
| `Mateo Front` | `seniorcat123` |
| `Valeria Maps` | `seniorcat123` |
| `Nico Comentarios` | `seniorcat123` |

Con eso el grupo puede probar login con distintas identidades sin reconstruir la base en cada ejercicio. Senior Cat deja todos los ladrillos alineados para que el acceso sea directo.

Cualquiera de esos usuarios ya puede:

- iniciar sesión,
- consultar perfil,
- crear restaurantes,
- crear recetas,
- comentar,
- valorar,
- subir su imagen de perfil.

---

## 10. Autenticación

### Registro
- `POST /auth/register`

Payload:

```json
{
	"nombre": "nuevo-usuario",
	"password": "clave123"
}
```

### Login
- `POST /auth/login`

Payload:

```json
{
	"nombre": "Senior Cat",
	"password": "seniorcat123"
}
```

Respuesta esperada:

```json
{
	"access_token": "jwt",
	"token_type": "Bearer",
	"user": {
		"id": 1,
		"nombre": "Senior Cat",
		"image_url": "http://localhost:3000/files/user-senior-cat.jpg"
	}
}
```

### Perfil autenticado
- `GET /auth/profile`
- header: `Authorization: Bearer <token>`

---

## 11. Endpoints principales

Base URL recomendada para pruebas locales:

- `http://127.0.0.1:3000`

### Usuarios

- `GET /users/me`
- `PATCH /users/me`
- `POST /users/me/image`

### Restaurantes

- `GET /restaurants`
- `GET /restaurants/:id`
- `POST /restaurants`
- `PATCH /restaurants/:id`
- `DELETE /restaurants/:id`
- `POST /restaurants/:id/image`

### Recetas

- `GET /recipes`
- `GET /recipes/:id`
- `GET /recipes/restaurant/:restaurantId`
- `POST /recipes`
- `PATCH /recipes/:id`
- `DELETE /recipes/:id`
- `POST /recipes/:id/image`

### Comentarios de restaurante

- `GET /restaurants/:restaurantId/comments`
- `POST /restaurants/:restaurantId/comments`

### Ratings de restaurante

- `GET /restaurants/:restaurantId/ratings/summary`
- `GET /restaurants/:restaurantId/ratings/me`
- `POST /restaurants/:restaurantId/ratings`

---

## 12. Qué es público y qué requiere token

| Tipo | Endpoint | Uso en frontend |
|---|---|---|
| Público | `POST /auth/register` | crear cuenta |
| Público | `POST /auth/login` | obtener JWT |
| Público | `GET /restaurants` | listado principal |
| Público | `GET /restaurants/:id` | detalle agregado del restaurante |
| Público | `GET /restaurants/:restaurantId/comments` | ver comentarios |
| Público | `GET /restaurants/:restaurantId/ratings/summary` | ver promedio y distribución |
| Público | `GET /recipes` | listado general de recetas |
| Público | `GET /recipes/:id` | detalle de receta |
| Público | `GET /recipes/restaurant/:restaurantId` | recetas de un restaurante |
| Público | `GET /files/:filename` | servir imágenes |
| Protegido | `GET /auth/profile` | validar token activo |
| Protegido | `GET /users/me` | perfil propio |
| Protegido | `PATCH /users/me` | editar perfil |
| Protegido | `POST /users/me/image` | subir imagen de perfil |
| Protegido | `POST /restaurants` | crear restaurante |
| Protegido | `PATCH /restaurants/:id` | editar restaurante |
| Protegido | `DELETE /restaurants/:id` | borrar restaurante |
| Protegido | `POST /restaurants/:id/comments` | comentar autenticado |
| Protegido | `GET /restaurants/:id/ratings/me` | ver mi rating |
| Protegido | `POST /restaurants/:id/ratings` | crear o actualizar rating |
| Protegido | `POST /restaurants/:id/image` | subir imagen del restaurante |
| Protegido | `POST /recipes` | crear receta |
| Protegido | `PATCH /recipes/:id` | editar receta |
| Protegido | `DELETE /recipes/:id` | borrar receta |
| Protegido | `POST /recipes/:id/image` | subir imagen de receta |

Idea guía para el alumnado: primero se levantan los ladrillos públicos del catálogo y después Senior Cat abre la puerta protegida con el token.

---

## 13. Contratos útiles para frontend

### `GET /restaurants`
Devuelve una lista con:

- datos base del restaurante,
- `total_recetas`,
- `rating_summary`.

### `GET /restaurants/:id`
Devuelve un detalle agregado con:

- datos base del restaurante,
- `recipes`,
- `comments` con datos mínimos del usuario,
- `rating_summary`.

Esto simplifica mucho el frontend del alumno porque reduce llamadas manuales y deja más foco en la interfaz.

---

## 14. Subida de imágenes

La estrategia es la misma para usuarios, restaurantes y recetas:

1. se envía `multipart/form-data`,
2. el archivo debe ir en el campo `image`,
3. Multer lo guarda en `files/`,
4. el backend genera URL pública,
5. esa URL se persiste en PostgreSQL.

Límite actual:

- 5 MB por archivo.

Solo se aceptan MIME types de imagen.

---

## 15. Postman

La colección actualizada está en:

- `postman/api-recetas.postman_collection.json`

Incluye:

- login y persistencia automática del token,
- consulta de perfil,
- listado y detalle de restaurantes,
- creación de restaurante,
- creación de receta,
- comentario autenticado,
- rating autenticado,
- subida de imagen.

### Cómo usarla en clase

Orden recomendado para testear toda la API:

1. abrir la carpeta `Publico/1. Auth` y ejecutar `POST login Senior Cat`,
2. abrir `Protegido/1. Auth y Users` y ejecutar `GET profile`,
3. seguir en `Protegido/1. Auth y Users` con `GET me`,
4. pasar a `Protegido/2. Restaurants` y ejecutar `POST create restaurant`,
5. reutilizar `restaurantId` para comentario, rating e imagen del restaurante,
6. pasar a `Protegido/3. Recipes` y ejecutar `POST create recipe`,
7. reutilizar `recipeId` para edición e imagen de la receta,
8. si se quiere limpiar la práctica, terminar con `DELETE recipe` y `DELETE restaurant`.

### Qué variables rellena sola la colección

- `authToken` después del login,
- `restaurantId` después de crear un restaurante,
- `recipeId` después de crear una receta.

### Qué variables debe cambiar el alumno manualmente

- `userImagePath`
- `restaurantImagePath`
- `recipeImagePath`

Esas tres rutas deben apuntar a archivos reales del equipo del alumno cuando quiera probar subidas de imágenes.

### Cómo quedó separada la colección

#### Carpeta `Publico`

Incluye todo lo que no necesita token:

- `POST /auth/register`
- `POST /auth/login`
- `GET /restaurants`
- `GET /restaurants/:id`
- `GET /restaurants/:restaurantId/comments`
- `GET /restaurants/:restaurantId/ratings/summary`
- `GET /recipes`
- `GET /recipes/:id`
- `GET /recipes/restaurant/:restaurantId`
- `GET /files/:filename`

Subcarpetas en orden:

- `1. Auth`
- `2. Restaurants`
- `3. Recipes`
- `4. Files`

#### Carpeta `Protegido`

Incluye todo lo que sí necesita `Authorization: Bearer <token>`:

- `GET /auth/profile`
- `GET /users/me`
- `PATCH /users/me`
- `POST /users/me/image`
- `POST /restaurants`
- `PATCH /restaurants/:id`
- `DELETE /restaurants/:id`
- `POST /restaurants/:id/comments`
- `GET /restaurants/:id/ratings/me`
- `POST /restaurants/:id/ratings`
- `POST /restaurants/:id/image`
- `POST /recipes`
- `PATCH /recipes/:id`
- `DELETE /recipes/:id`
- `POST /recipes/:id/image`

Subcarpetas en orden:

- `1. Auth y Users`
- `2. Restaurants`
- `3. Recipes`

---

## 16. Validación hecha sobre esta versión

Se verificó en runtime:

- compilación correcta con `npm run build`,
- `GET /restaurants`,
- `GET /restaurants/:id`,
- rechazo `401` en endpoint protegido sin token,
- `POST /auth/login`,
- `GET /auth/profile`,
- `POST /restaurants`,
- `POST /recipes`,
- `POST /restaurants/:restaurantId/comments`,
- `POST /restaurants/:restaurantId/ratings`.

Senior Cat deja aquí una API ya utilizable para que el alumnado construya el frontend ladrillo a ladrillo.

---

## 14) Troubleshooting rápido

### “Cannot find module './recipes.service'”
- Revisar `tsconfig` en modo Nest estándar (`commonjs` + `node`).
- Reiniciar TypeScript Server de VS Code si el error persiste visualmente.

### No veo logs SQL
- Verifica `DB_LOGGING=true`.
- Reinicia servidor (`npm run start:dev`).

### `column image_url does not exist`
- Ejecuta `scripts/04_add_image_url_column.sql`.

### Puerto 3000 ocupado
- Cierra proceso que usa el puerto o cambia `PORT`.

---

## 15) Checklist final

- [ ] DB creada y tabla `recipes` disponible.
- [ ] Columna `image_url` existente.
- [ ] API levantada.
- [ ] SQL logging visible en consola.
- [ ] CRUD funcional.
- [ ] Subida de imagen funcional.
- [ ] URL pública accesible desde navegador/frontend.
