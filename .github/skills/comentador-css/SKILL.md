---
name: comentador-css
description: Explica el código CSS al detalle para nivel principiante. 
user-invokable: true
disable-model-invocation: false
argument-hint: "<codigo_css>"
---

# Skill: Comentador de CSS para principiantes

Este documento describe un "skill" que puedes invocar cuando quieras que un fragmento de código CSS sea comentado y explicado con detalle. El propósito es que un alumno o cualquier persona con nivel inicial entienda qué hace cada selector, propiedad, valor y por qué se utiliza en el diseño web.

---

## ¿Qué hace el skill?

1. Recibe un bloque de código CSS (puede ser un archivo completo o un pequeño fragmento/snippet).
2. Recorre el código y, selector por selector o propiedad por propiedad, inserta comentarios CSS (/* ... */) que:
   * Definen la función del selector (qué elementos del HTML afecta).
   * Explican las propiedades CSS y sus valores (colores, tamaños, posiciones).
   * Describen conceptos clave como el modelo de caja (box model), flexbox, grid, etc.
   * Aclaran unidades de medida (px, em, rem), colores (hex, rgb, nombres) y funciones (como calc()).
   * Indican la jerarquía y cascada (especificidad, herencia).
3. Explica, en un lenguaje sencillo, términos nuevos o conceptos clave (como responsive design, pseudo-clases, animaciones).
4. Devuelve el mismo código original con los comentarios intercalados.

---

## Uso sugerido

- **Entrada**: tu código CSS sin comentarios.
- **Salida**: el mismo código con comentarios detallados.
- **Formato**: conservar indentación y estructura; los comentarios deben ser lo más claros y breves posible, pero suficientemente descriptivos para un principiante en CSS.

> Ejemplo de entrada:
> ```css
> body {
>   background-color: #f0f0f0;
>   font-family: Arial, sans-serif;
>   margin: 0;
> }
> 
> .container {
>   width: 80%;
>   margin: 0 auto;
>   padding: 20px;
> }
> ```

> Ejemplo de salida:
> ```css
> /* El selector 'body' afecta a todo el cuerpo de la página web */
> body {
>   /* background-color establece el color de fondo. #f0f0f0 es un color gris claro en formato hexadecimal */
>   background-color: #f0f0f0;
>   /* font-family define la fuente de texto. Aquí usamos Arial, y sans-serif como respaldo */
>   font-family: Arial, sans-serif;
>   /* margin: 0 elimina los márgenes por defecto del navegador */
>   margin: 0;
> }
> 
> /* .container es una clase CSS. Afecta a elementos HTML con class="container" */
> .container {
>   /* width: 80% hace que el ancho sea el 80% del contenedor padre */
>   width: 80%;
>   /* margin: 0 auto centra horizontalmente el elemento */
>   margin: 0 auto;
>   /* padding: 20px añade espacio interno de 20 píxeles alrededor del contenido */
>   padding: 20px;
> }
> ```

---

## Consejos para el autor del skill

- Mantener el lenguaje en español claro y directo.
- Asumir poca o ninguna experiencia previa en CSS.
- Evitar tecnicismos sin explicación; si aparecen, añadir una breve definición.
- No añadir comentarios que digan "esto se explica solo".
- Comentar también buenas prácticas (por ejemplo, usar unidades relativas como rem para accesibilidad, o explicar por qué se usa flexbox en lugar de floats).
- Incluir explicaciones sobre el modelo de caja cuando se usen propiedades relacionadas (margin, border, padding, width/height).

---