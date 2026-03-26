# CLASE5 - PostgreSQL + setup NestJS + pruebas con Postman

**Fecha:** 2026-03-09  
**Horario:** 16:30 - 20:30  
**Receso:** 18:00 - 18:30  
**Nivel:** inicial-intermedio  
**Clase anterior de referencia:** `jp/bitacora/CLASE4.md`  
**Lema del grupo Ladrillos:** Construyendo el futuro del desarrollo web, un ladrillo a la vez.  
**Mentor de la sesión:** Senior Cat 🐱

---

## Tema y objetivo del día

### Tema central
Preparación de entorno backend completo para `api-recetas`: base de datos PostgreSQL, arranque de NestJS y validación de endpoints con Postman.

### Objetivo general
Dejar la API levantada y probada de extremo a extremo, partiendo desde un `pull` del repo y ejecutando scripts de base de datos hasta validar endpoints en Postman.

### Objetivo pedagógico
Que el alumnado entienda el flujo real de trabajo backend por capas:
1. base de datos lista,
2. proyecto backend instalado y ejecutando,
3. pruebas de API con cliente HTTP.

---

## Contexto real de la sesión

Antes de levantar NestJS se preparó todo en PostgreSQL mediante scripts y terminal. Después se hizo `pull` del repo, `npm install`, arranque del proyecto y pruebas en Postman importando colección/documento en un workspace nuevo.

> Nota clave: todo lo necesario está dentro de `jp/sin-ia/nestjs/api-recetas`:
- scripts de PostgreSQL (`scripts/`),
- colección/documentación de Postman (`postman/`),
- código de la API (`src/`).

---

## Plan por bloques de tiempo

## 16:30 - 17:15 | Apertura + capa de datos (PostgreSQL)

### Objetivo del bloque
Dejar la base de datos preparada para que la API tenga dónde leer/escribir.

### Paso a paso del docente
1. Explica por qué primero se levanta la base de datos y no la API.
2. Muestra estructura de `api-recetas/scripts/`.
3. Ejecuta scripts SQL en orden correcto desde terminal.
4. Verifica tablas/datos mínimos con consultas simples.

### Paso a paso del estudiante
1. Entra a la carpeta del proyecto:
```bash
cd jp/sin-ia/nestjs/api-recetas
```
2. Revisa scripts disponibles (ejemplo):
```bash
Get-ChildItem .\scripts
```
3. Ejecuta scripts con `psql` en orden (ajustar según nombres reales):
```bash
psql -U postgres -f .\scripts\01-create-db.sql
psql -U postgres -f .\scripts\02-schema.sql
psql -U postgres -f .\scripts\03-seed.sql
```
4. Valida estructura:
```bash
psql -U postgres -d recetas_db -c "\dt"
```

### Qué hace, por qué y para qué
- Qué: crea DB, tablas y datos iniciales.
- Por qué: la API depende de esta capa para funcionar.
- Para qué: evitar errores de conexión o tablas inexistentes al arrancar NestJS.

### Diferenciación
- `sin-ia`: ejecutar manualmente, entender cada script.
- `con-ia`: pedir a IA explicación de cada script SQL y luego validarlo contra el resultado real en `psql`.

---

## 17:15 - 18:00 | Setup y arranque de NestJS

### Objetivo del bloque
Levantar la API local conectada a PostgreSQL.

### Paso a paso del docente
1. Explica flujo tras `pull`: instalar dependencias, revisar `.env`, arrancar servidor.
2. Muestra comando de desarrollo de NestJS.
3. Comprueba endpoint de salud o endpoint base.

### Paso a paso del estudiante
1. Actualiza código:
```bash
git pull
```
2. Instala dependencias:
```bash
npm install
```
3. Verifica/ajusta `.env` según `.env.example`.
4. Arranca API en modo desarrollo:
```bash
npm run start:dev
```
5. Comprueba que está viva (ejemplo):
```bash
curl http://localhost:3000
```

### Qué hace, por qué y para qué
- `git pull`: trae último estado del proyecto.
- `npm install`: instala librerías requeridas.
- `start:dev`: ejecuta NestJS con recarga en caliente para desarrollo.

### Diferenciación
- `sin-ia`: revisar manualmente errores de consola y resolverlos paso a paso.
- `con-ia`: usar IA para sugerir diagnóstico, pero ejecutar y validar manualmente cada ajuste.

---

## 18:00 - 18:30 | Receso
- Pausa activa.
- Mensaje de Senior Cat: "si los cimientos están firmes, el edificio backend no se cae".

---

## 18:30 - 19:30 | Pruebas API con Postman

### Objetivo del bloque
Validar que los endpoints funcionen desde un cliente real.

### Paso a paso del docente
1. Muestra carpeta `postman/` dentro de `api-recetas`.
2. Crea workspace nuevo en Postman.
3. Importa colección/documento del proyecto.
4. Ejecuta requests clave y analiza respuesta.

### Paso a paso del estudiante
1. Abrir Postman.
2. Crear workspace nuevo (ej. `api-recetas-clase5`).
3. Importar archivo de `postman/`.
4. Probar endpoints principales (GET/POST/PUT/DELETE según colección).
5. Verificar códigos de estado y body esperado.

### Qué hace, por qué y para qué
- Importar colección: evita escribir requests a mano.
- Probar endpoints: confirma que backend responde de forma real.
- Revisar status codes: valida contrato mínimo de API.

### Diferenciación
- `sin-ia`: completar pruebas y registrar resultados manualmente.
- `con-ia`: pedir a IA hipótesis sobre errores de response, luego comprobar en Postman + logs.

---

## 19:30 - 20:00 | Práctica autónoma + correcciones

### Objetivo del bloque
Corregir errores detectados y dejar entorno estable.

### Paso a paso del docente
1. Recoge fallos frecuentes del grupo.
2. Prioriza resolución por impacto (DB -> API -> Postman).
3. Repite prueba final de endpoints críticos.

### Paso a paso del estudiante
1. Resolver errores de conexión DB/API.
2. Reintentar requests que fallaron.
3. Dejar evidencia de pruebas correctas.

---

## 20:00 - 20:30 | Cierre y entregables

### Entregables mínimos del día
- API `api-recetas` levantada en local.
- Scripts PostgreSQL ejecutados correctamente.
- Workspace/colección de Postman importado y probado.
- Evidencia mínima (capturas o registro breve) de requests exitosos.
- Registro de dudas en `DUDAS.md` (si aplica).
- Predicción de tema siguiente.

### Checklist técnico
- [ ] PostgreSQL operativo.
- [ ] Scripts SQL ejecutados en orden.
- [ ] NestJS arranca sin error crítico.
- [ ] Endpoint base responde.
- [ ] Colección Postman importada.
- [ ] Requests clave responden con códigos esperados.

### Errores frecuentes y solución
1. `password authentication failed` (PostgreSQL):
- Revisar usuario/password y `pg_hba.conf` local.
2. `relation does not exist`:
- Faltó ejecutar scripts o se ejecutaron fuera de orden.
3. `ECONNREFUSED` desde API:
- DB apagada o host/puerto mal configurado en `.env`.
4. `Cannot GET ...` en Postman:
- URL o método HTTP incorrecto.
5. `Module not found` en Nest:
- Dependencias no instaladas (`npm install`).

### Autoevaluación de cierre
- ¿Cómo me sentí hoy (1-5)?
- ¿Qué parte entendí mejor?
- ¿Dónde me bloqueé?
- ¿Qué duda dejo en `DUDAS.md`?

### Predicción de la siguiente clase
Pasar de validación backend en Postman a consumo desde frontend (HTML/CSS/JS) para construir operaciones CRUD visibles para usuario final.
