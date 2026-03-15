# CLASE7 - CRUD con fetch y formularios (avance real guiado)

**Fecha:** 2026-03-11  
**Horario:** 16:30 - 20:30  
**Receso:** 18:00 - 18:30  
**Nivel:** inicial-intermedio  
**Clase anterior de referencia:** jp/bitacora/CLASE6.md  
**Lema del grupo Ladrillos:** Construyendo el futuro del desarrollo web, un ladrillo a la vez.  
**Mentor de la sesion:** Senior Cat

---

## Tema y objetivo del dia

### Tema central
Continuacion del CRUD de recetas con enfoque practico en organizacion de carpetas, documentos y conexion real con API usando `fetch`.

### Objetivo general
Dejar armado el esqueleto completo de CLASE7 y completar de forma guiada el flujo `create`, con estructura lista para terminar `read`, `delete` y despues `update`.

### Progresion respecto a CLASE6
En CLASE6 se planteo el ejercicio completo (C/R/U/D). En CLASE7 se bajo a obra: se construyo la estructura real de proyecto y se ejecuto de punta a punta la creacion de recetas (incluyendo subida de imagen), dejando `update` sin cerrar.

---

## Lo que hicimos hoy (documentos y carpetas)

## Estructura trabajada
Se trabajo dentro de:
- jp/sin-ia/js/CLASE7/crud/index.html
- jp/sin-ia/js/CLASE7/crud/global.css
- jp/sin-ia/js/CLASE7/crud/styles.css
- jp/sin-ia/js/CLASE7/crud/script.js

Subcarpetas por operacion CRUD:
- jp/sin-ia/js/CLASE7/crud/create/index.html
- jp/sin-ia/js/CLASE7/crud/create/script.js
- jp/sin-ia/js/CLASE7/crud/create/styles.css
- jp/sin-ia/js/CLASE7/crud/create/PETICION_POST_RECIPES_MULTILENGUAJE.md
- jp/sin-ia/js/CLASE7/crud/read/index.html
- jp/sin-ia/js/CLASE7/crud/read/script.js
- jp/sin-ia/js/CLASE7/crud/read/styles.css
- jp/sin-ia/js/CLASE7/crud/delete/index.html
- jp/sin-ia/js/CLASE7/crud/delete/script.js
- jp/sin-ia/js/CLASE7/crud/delete/styles.css
- jp/sin-ia/js/CLASE7/crud/update/index.html
- jp/sin-ia/js/CLASE7/crud/update/script.js
- jp/sin-ia/js/CLASE7/crud/update/styles.css

### Home CRUD
En `crud/index.html` se dejo la navegacion con 4 tarjetas (C, R, U, D) para entrar a cada modulo.

### Modulo Create (completado guiado)
En `crud/create/index.html` y `crud/create/script.js` se hizo:
1. Formulario con campos de receta e imagen.
2. Captura de datos con `FormData`.
3. Primer `POST` a `http://localhost:3000/recipes` con JSON para crear la receta.
4. Segundo `POST` a `http://localhost:3000/recipes/:id/image` para subir imagen.
5. Logs de depuracion para revisar payload, respuesta y errores.

### Modulo Read (estructura lista)
En `crud/read/index.html` quedo la pantalla base y `crud/read/script.js` quedo creado para completar listado de tarjetas en el siguiente avance.

### Modulo Delete (estructura lista)
En `crud/delete/index.html` quedo la pantalla base y `crud/delete/script.js` creado para implementar confirmacion + `DELETE` en siguiente bloque.

### Modulo Update (pendiente principal)
`crud/update/index.html` y `crud/update/script.js` quedaron iniciados. El script tiene notas de la logica esperada (comparar objeto original vs formulario y enviar `PATCH` solo con cambios), pero el flujo aun no esta terminado.

---

## Plan por bloques de la sesion (ejecutado)

## 16:30 - 17:00 | Repaso de CLASE6 y plan de obra
- Recordatorio del plano CRUD definido en CLASE6.
- Decision de dividir por carpetas (`create`, `read`, `update`, `delete`) para avanzar ladrillo por ladrillo.

## 17:00 - 18:00 | Implementacion guiada de Create
- Conexion formulario -> API.
- Envio de receta (POST JSON).
- Envio de imagen (POST multipart/form-data).
- Verificacion de respuestas en consola.

## 18:00 - 18:30 | Receso
- Pausa activa.
- Mensaje de Senior Cat: primero cimientos solidos (estructura + create estable), luego cerramos update sin romper nada.

## 18:30 - 19:20 | Armado de estructura de R/U/D
- Creacion de pantallas base para `read`, `update`, `delete`.
- Definicion de responsabilidades por script.
- Documentacion tecnica de peticion POST en create.

## 19:20 - 20:00 | Revision tecnica guiada
- Chequeo de rutas y nombres de archivos.
- Chequeo de endpoints usados en `create/script.js`.
- Identificacion de pendientes reales (sobre todo `update`).

## 20:00 - 20:30 | Cierre y entregables
- Consolidacion de avances en la carpeta CLASE7.
- Registro de dudas para continuar.

---

## Actividades diferenciadas

## sin-ia (fundamentos y pasos guiados)
1. Escribir manualmente HTML de cada modulo CRUD.
2. Construir `create/script.js` paso a paso con logs y validaciones basicas.
3. Explicar en voz alta por que se hacen 2 POST en create.
4. Dejar por escrito que falta para cerrar update.

## con-ia (retos avanzados con prompts)
1. Pedir a IA propuesta de refactor para `create/script.js` (funciones pequenas, manejo de errores, mensajes de UI).
2. Validar manualmente que no cambie el comportamiento del flujo de 2 POST.
3. Pedir a IA borrador de `read/script.js` y `delete/script.js`, luego auditarlo y corregirlo.
4. Para `update`, usar IA solo para idea base de diff de objetos y explicar cada linea en palabras propias.

Prompt sugerido para con-ia:
"Refactoriza mi script de create para separar crearReceta y subirImagen, manteniendo el flujo actual de dos POST, sin cambiar endpoints, y agrega manejo de error por estado HTTP. Despues explica por que cada cambio mejora mantenibilidad."

---

## Entregables minimos del dia
- Estructura de carpetas CRUD creada en CLASE7.
- Home CRUD navegable (`index.html` principal).
- Modulo `create` funcionando con POST de receta + POST de imagen.
- Archivos base de `read`, `delete` y `update` creados.
- Documento de referencia tecnica en `create/PETICION_POST_RECIPES_MULTILENGUAJE.md`.
- Registro de dudas en `DUDAS.md` si aplica.

---

## Checklist de cierre
- [ ] Puedo explicar la estructura de carpetas de CLASE7 sin mirar codigo.
- [ ] Entiendo por que `create` usa dos solicitudes POST.
- [ ] Identifique que parte de `update` quedo pendiente y por que.
- [ ] Registre dudas tecnicas en `DUDAS.md`.
- [ ] Autoevaluacion personal (1-5) sobre comprension de fetch + formularios.

### Autoevaluacion sugerida
- Como me senti hoy en clase (1-5)?
- Que ladrillo domino mejor: estructura, create o conexion API?
- En que punto me trabe?
- Que necesito practicar antes de CLASE8?

---

## Prediccion de la siguiente clase
Posible foco CLASE8:
1. Cerrar `update` correctamente con comparacion de datos y `PATCH` parcial.
2. Completar `read` con render de tarjetas reales.
3. Completar `delete` con confirmacion y refresco de lista.
4. Mejorar UX: mensajes de carga, exito y error sin depender solo de consola.
