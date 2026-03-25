# CLASE6 - Frontend CRUD de recetas (HTML + CSS + JS, multipagina)

**Fecha:** 2026-03-10  
**Horario:** 16:30 - 20:30  
**Receso:** 18:00 - 18:30  
**Nivel:** intermedio  
**Clase anterior de referencia:** `jp/bitacora/CLASE5.md`  
**Lema del grupo Ladrillos:** Construyendo el futuro del desarrollo web, un ladrillo a la vez.  
**Mentor de la sesión:** Senior Cat 🐱

---

## Tema y objetivo del dia

### Tema central
Construccion de frontend CRUD de recetas solo con HTML, CSS y JavaScript, conectando con la API de recetas.

### Objetivo general
Entregar una mini aplicacion multipagina con una home de 4 tarjetas (C/R/U/D), donde cada flujo CRUD funciona con `fetch` y manejo basico de errores UI.

### Objetivo pedagogico
Que el alumnado entienda el paso de backend probado en Postman (CLASE5) a interfaz usable por personas reales:
- lectura y escritura de datos desde UI,
- navegacion por paginas,
- validacion de formularios,
- confirmaciones de acciones destructivas.

---

## Arquitectura de paginas del ejercicio

1. `index.html` (home CRUD)
- 4 tarjetas:
  - C -> `create.html`
  - R -> `read.html`
  - U -> `update.html`
  - D -> `delete.html`

2. `create.html`
- Formulario para nueva receta.
- Flujo con 2 llamadas POST (ejemplo tipico):
  - POST de imagen/asset.
  - POST de receta con referencia a imagen.

3. `read.html`
- Listado de todas las recetas en tarjetas.
- Click en tarjeta -> `detail.html?id=...`.

4. `detail.html`
- Vista de una unica receta por ID.

5. `update.html`
- Selector/listado de recetas.
- Formulario de edicion para receta seleccionada.
- Envio con PUT o PATCH.

6. `delete.html`
- Listado de recetas.
- Click en tarjeta -> confirmacion explicita.
- Si confirma -> DELETE.

---

## Plan por bloques de tiempo

## 16:30 - 17:00 | Apertura y diseño del flujo

### Objetivo del bloque
Entender la arquitectura multipagina y los endpoints necesarios.

### Paso a paso del docente
1. Relaciona CLASE5 (API validada) con CLASE6 (UI conectada).
2. Dibuja flujo de navegacion CRUD en pizarra.
3. Define campos minimos de receta y rutas de API.
4. Asigna estructura de carpetas y archivos frontend.

### Paso a paso del estudiante
1. Crear carpeta del frontend CRUD.
2. Crear archivos base (`index`, `create`, `read`, `detail`, `update`, `delete`, `styles.css`, `app.js` o js separados).
3. Crear home con 4 tarjetas C/R/U/D y enlaces.

### Diferenciacion
- `sin-ia`: maquetacion manual completa + decisiones explicadas.
- `con-ia`: IA para borrador de estructura, pero validacion y correccion manual obligatoria.

---

## 17:00 - 18:00 | Implementacion guiada Create + Read

### Objetivo del bloque
Tener funcionando creacion y lectura de recetas.

### Paso a paso del docente
1. Guiar `create.html` con formulario validado.
2. Explicar flujo de 2 POST para imagen + receta.
3. Guiar `read.html` para listar tarjetas via GET.
4. Guiar navegacion a detalle al hacer click en tarjeta.

### Paso a paso del estudiante
1. Implementar `create.html` con campos requeridos.
2. Validar campos antes de enviar.
3. Ejecutar primer POST (imagen/archivo) y recuperar referencia.
4. Ejecutar segundo POST (receta) con referencia de imagen.
5. Implementar GET en `read.html` y render de tarjetas.
6. Agregar click a `detail.html?id=...`.

### Flujo `fetch` trabajado
- `POST` (x2 en Create).
- `GET` lista en Read.
- `GET` detalle por id.

### Diferenciacion
- `sin-ia`: escribir funciones `fetch` manualmente y depurar consola.
- `con-ia`: proponer funciones con IA y auditar errores de logica manualmente.

---

## 18:00 - 18:30 | Receso
- Pausa activa.
- Recordatorio de Senior Cat: "si el plano esta claro, cada ladrillo encaja mejor".

---

## 18:30 - 19:20 | Implementacion guiada Update + Delete

### Objetivo del bloque
Completar operaciones de actualizacion y borrado con confirmacion.

### Paso a paso del docente
1. Guiar pantalla de seleccion de receta para editar.
2. Explicar diferencia `PUT` vs `PATCH`.
3. Guiar flujo de borrado con confirmacion obligatoria.
4. Reforzar feedback visual (mensajes exito/error).

### Paso a paso del estudiante
1. Cargar recetas en `update.html`.
2. Seleccionar receta y precargar formulario.
3. Enviar cambios con `PUT` o `PATCH`.
4. Cargar recetas en `delete.html`.
5. Al click, pedir confirmacion (`confirm(...)` o modal simple).
6. Ejecutar DELETE solo si confirma.

### Flujo `fetch` trabajado
- `PUT`/`PATCH` para Update.
- `DELETE` para Delete.

### Diferenciacion
- `sin-ia`: implementar flujo completo con logs de depuracion.
- `con-ia`: usar IA para refactor del codigo y verificar que no rompa comportamiento.

---

## 19:20 - 20:00 | Practica autonoma + QA funcional

### Objetivo del bloque
Probar CRUD completo en flujo real de usuario.

### Paso a paso del docente
1. Entregar checklist funcional por operacion.
2. Hacer mini code review por parejas.
3. Pedir correccion de errores criticos antes del cierre.

### Paso a paso del estudiante
1. Ejecutar pruebas Create/Read/Update/Delete.
2. Corregir errores de endpoint, CORS o payload.
3. Validar mensajes de exito/error en UI.

---

## 20:00 - 20:30 | Cierre, entregables y prediccion

### Entregables minimos
- Home CRUD con 4 tarjetas navegables.
- `create.html` funcional con 2 POST.
- `read.html` + `detail.html` funcionales.
- `update.html` funcional con PUT/PATCH.
- `delete.html` funcional con confirmacion + DELETE.
- Estilos basicos consistentes en todas las paginas.
- Registro de dudas en `DUDAS.md` si aplica.

### Checklist funcional por operacion

#### Create
- [ ] Valida campos obligatorios.
- [ ] Ejecuta 2 POST en el orden correcto.
- [ ] Muestra feedback de exito/error.

#### Read
- [ ] Lista recetas en tarjetas.
- [ ] Cada tarjeta navega a detalle.

#### Detail
- [ ] Lee id por query string.
- [ ] Muestra receta individual.

#### Update
- [ ] Permite seleccionar receta.
- [ ] Precarga datos.
- [ ] Guarda cambios con PUT/PATCH.

#### Delete
- [ ] Solicita confirmacion antes de borrar.
- [ ] Solo borra si el usuario confirma.
- [ ] Refresca lista tras borrar.

### Validaciones de formulario y UI (obligatorias)
- Campos requeridos en create/update.
- Mensajes claros para:
  - carga,
  - exito,
  - error de red,
  - error de validacion.

### Errores frecuentes y solucion
1. `404` en fetch:
- Revisar ruta base y endpoint exacto.
2. `400/422` al crear/editar:
- Revisar payload y nombres de propiedades.
3. Tarjeta no navega a detalle:
- Revisar query string (`?id=`) y lectura con `URLSearchParams`.
4. Borrado sin confirmacion:
- Falta implementar condicion previa a DELETE.
5. UI no se actualiza tras cambios:
- Volver a pedir datos o actualizar DOM despues de cada operacion.

### Autoevaluacion de cierre
- ¿Como me senti hoy (1-5)?
- ¿Que operacion CRUD domino mejor?
- ¿En cual me costo mas y por que?
- ¿Que duda registro en `DUDAS.md`?

### Prediccion de la siguiente clase
Posible foco CLASE7:
- mejora UX del CRUD (busqueda/filtros/paginacion),
- modularizacion de JS,
- validaciones mas robustas,
- estado de carga y manejo de errores mas fino.
