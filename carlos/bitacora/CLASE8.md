# CLASE8 - Fundamentos HTTP para CRUD con fetch

**Fecha:** 2026-03-12  
**Horario:** 16:30 - 18:00  
**Receso de referencia del curso:** 18:00 - 18:30 (no aplico por cierre de sesion a las 18:00)  
**Nivel:** inicial-intermedio  
**Clase anterior de referencia:** jp/bitacora/CLASE6.md y jp/bitacora/CLASE7.md  
**Lema del grupo Ladrillos:** Construyendo el futuro del desarrollo web, un ladrillo a la vez.  
**Mentor de la sesion:** Senior Cat

---

## Tema y objetivo del dia

### Tema central
CRUD con `fetch` y formularios, con explicacion profunda de las consultas HTTP que sostienen todo el flujo.

### Objetivo general
Que el alumnado entienda que, aunque cambie el lenguaje, la estructura de una consulta HTTP se mantiene: `URL`, `metodo`, `headers`, `body` y respuesta del servidor.

### Progresion respecto a CLASE6 y CLASE7
- En CLASE6 se diseno el plano CRUD multipagina.
- En CLASE7 se construyo la estructura real y se consolido `create`.
- En CLASE8 se reforzo el cimiento conceptual: leer y escribir consultas HTTP con criterio, para luego cerrar `read`, `delete` y `update` sin copiar a ciegas.

---

## Lo trabajado en clase (contenido real)

## 1. Explicacion a fondo de consultas HTTP
Se explico que las consultas HTTP representan entre el 80% y 90% del trafico de internet en escenarios web habituales, y por eso dominar su estructura es una habilidad base del curso.

Partes explicadas en nivel inicial-intermedio:
1. URL: a donde viaja la peticion.
2. Metodo: que accion quiero hacer (`GET`, `POST`, `PATCH`, `DELETE`).
3. Headers: metadatos (ejemplo clasico: `Content-Type: application/json`).
4. Body: datos enviados (normalmente JSON en create/update).
5. Respuesta: codigo HTTP + cuerpo de respuesta.

## 2. Documento multilenguaje para una misma peticion
Se uso como referencia principal:
- jp/sin-ia/js/CLASE7/crud/create/PETICION_POST_RECIPES_MULTILENGUAJE.md

Objetivo pedagogico de este documento:
- Mostrar que JavaScript, Python, Java, C#, Go, etc. cambian en sintaxis, pero no en la estructura de la consulta HTTP.
- Reforzar que el alumno debe pensar primero en el protocolo y despues en el lenguaje.

## 3. Guia natural para resolver update
Se reviso la guia en lenguaje natural dentro de:
- jp/sin-ia/js/CLASE7/crud/update/script.js

Idea trabajada:
1. Listar recetas.
2. Mostrar tarjeta/modal con formulario editable.
3. Comparar datos originales vs datos editados.
4. Construir objeto `cambios` solo con diferencias.
5. Enviar `PATCH` solo si hay cambios.

Este bloque dejo claro el siguiente ladrillo a construir: implementar la logica real de `update` en codigo ejecutable.

---

## Plan por bloques de tiempo

## 16:30 - 16:50 | Apertura y repaso de continuidad
- Repaso rapido de CLASE6 y CLASE7.
- Alineacion de objetivo: entender HTTP antes de terminar todas las pantallas CRUD.

## 16:50 - 17:25 | Clase guiada de consultas HTTP
- Desglose de URL, headers, metodos y body.
- Relacion directa con endpoints ya usados en `create`.
- Lectura comentada de ejemplos de request/response.

## 17:25 - 17:50 | Documento multilenguaje + analisis comparado
- Trabajo guiado con el documento `PETICION_POST_RECIPES_MULTILENGUAJE.md`.
- Comparacion entre lenguajes para detectar lo comun (estructura HTTP) y lo variable (sintaxis).

## 17:50 - 18:00 | Cierre tecnico de update
- Revision de pasos en lenguaje natural del `update/script.js`.
- Definicion de tarea para la siguiente clase: pasar guia a implementacion funcional con `PATCH`.

---

## Actividades diferenciadas

## sin-ia
1. Identificar manualmente en ejemplos reales: URL, metodo, headers y body.
2. Explicar con sus palabras por que `Content-Type` y `body` deben coincidir.
3. Reescribir la guia de `update` como pseudocodigo propio antes de programar.

## con-ia
1. Pedir a IA una tabla comparativa de la misma peticion POST en 3 lenguajes.
2. Verificar manualmente que los campos del JSON sean correctos para la API del curso.
3. Usar IA para proponer funcion de diff (`objeto original` vs `objeto editado`) y luego explicar linea por linea sin leer literal.

Prompt sugerido para con-ia:
"Dame una implementacion de update con PATCH para recetas: compara datos originales y formulario, arma objeto de cambios y envia solo las claves modificadas. Despues explica por que esto reduce errores y trafico innecesario."

---

## Entregables minimos del dia
- Resumen personal de las 5 partes de una consulta HTTP.
- Ejemplo comentado de una peticion POST a `/recipes` identificando URL, headers y body.
- Registro en `DUDAS.md` de al menos una duda tecnica sobre `PATCH` o comparacion de cambios.
- Checklist de pasos para implementar `update` en la proxima clase.

---

## Checklist de cierre
- [ ] Puedo reconocer URL, metodo, headers y body en una consulta real.
- [ ] Entiendo por que la misma logica HTTP se repite en distintos lenguajes.
- [ ] Identifique el objetivo concreto pendiente de `update`.
- [ ] Registre dudas en `DUDAS.md`.
- [ ] Autoevaluacion personal completada (1-5).

### Autoevaluacion sugerida
- Que parte de HTTP me quedo mas clara hoy?
- Que parte sigo confundiendo?
- Estoy listo para transformar la guia de update en codigo funcional?

---

## Prediccion de la siguiente clase
Posible foco CLASE9:
1. Implementar `update` funcional completo con `PATCH`.
2. Completar `read` y `delete` con render y confirmacion.
3. Agregar feedback visual de carga, exito y error para mejorar UX del CRUD.
