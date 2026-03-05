---
name: comentador-javascript
description: Explica el código JavaScript al detalle para nivel principiante. 
user-invokable: true
disable-model-invocation: false
argument-hint: "<codigo_js>"
---

# Skill: Comentador de JavaScript para principiantes

Este documento describe un “skill” que puedes invocar cuando quieras que un fragmento de código JavaScript sea comentado y explicado con detalle. El propósito es que un alumno o cualquier persona con nivel inicial entienda la lógica de programación, qué hace cada variable, función, estructura de control y por qué se utiliza.

---

## ¿Qué hace el skill?

1. Recibe un bloque de código JavaScript (puede ser un script completo o un pequeño fragmento/snippet).
2. Recorre el código y, línea por línea o bloque por bloque, inserta comentarios de JavaScript (// ... o /* ... */) que:
    * Definen la función de las variables, constantes y estructuras de datos (arrays, objetos).
    * Explican el flujo de control (condicionales if/else, bucles for/while).
    * Describen qué hacen las funciones, qué parámetros reciben y qué devuelven (return).
    * Aclaran la interacción con el navegador (manipulación del DOM, eventos) si aplica.
3. Explica, en un lenguaje sencillo, términos nuevos o conceptos clave (como callbacks, promesas, o el uso de const vs let).
4. Devuelve el mismo código original con los comentarios intercalados.

---

## Uso sugerido

- **Entrada**: tu código JavaScript sin comentarios.
- **Salida**: el mismo código con comentarios detallados.
- **Formato**: conservar la indentación y estructura; los comentarios deben ser lo más claros y breves posible, pero suficientemente descriptivos para un principiante en programación.

>Ejemplo de entrada:
>
>JavaScript
>const boton = document.querySelector('#miBoton');
>boton.addEventListener('click', function() {
>let mensaje = '¡Hola, mundo!';
>alert(mensaje);
>});
>
>
>Ejemplo de salida:
>JavaScript
>// Declaramos una constante llamada 'boton' (usamos 'const' porque su valor no cambiará).
>// document.querySelector busca en la página web el elemento que tenga el ID 'miBoton'.
>const boton = document.querySelector('#miBoton');
>// addEventListener "escucha" lo que hace el usuario. Aquí espera a que haga 'click' en el botón.
>// Cuando se hace clic, se ejecuta la función que está a continuación.
>boton.addEventListener('click', function() {
>// Declaramos una variable 'mensaje' (usamos 'let' para variables que podrían cambiar).
>// Le asignamos un texto (string).
>let mensaje = '¡Hola, mundo!';
>
>// alert() muestra una pequeña ventana emergente en el navegador con el mensaje.
>alert(mensaje);
>});

---