# Conceptos básicos de HTML

A continuación se detallan las etiquetas y elementos HTML que usamos en los ejercicios, con definición, metáfora y ejemplos basados en tu código.

---

## Estructura base del documento

### `<!DOCTYPE html>`

**Definición**: Declaración que indica al navegador que el documento usa la versión HTML5. Debe ser la primera línea del archivo.

**Metáfora**: Es como el encabezado de un documento oficial que dice "Este es un documento HTML moderno". Le dice al navegador qué reglas seguir.

**Ejemplo de tu código**:
```html
<!DOCTYPE html>
<html lang="es">
```

---

### `<html>`

**Definición**: Elemento raíz que engloba todo el contenido del documento HTML. El atributo `lang` especifica el idioma del contenido.

**Metáfora**: Es como la carpeta que contiene todas las páginas de un documento. Todo el contenido debe estar dentro de esta carpeta.

**Ejemplo de tu código**:
```html
<html lang="es">
  <!-- Todo tu contenido aquí -->
</html>
```

El `lang="es"` indica que el contenido está en español, lo que ayuda a lectores de pantalla y buscadores.

---

### `<head>`

**Definición**: Sección que contiene metadatos del documento (información sobre la página que no se muestra visualmente). Incluye título, codificación, enlaces a CSS y scripts.

**Metáfora**: Es como la ficha técnica de un libro: no es parte de la historia, pero contiene información importante sobre el libro (título, autor, editorial).

**Ejemplo de tu código**:
```html
<head>
    <meta charset="UTF-8">
    <title>Perfil personal</title>
</head>
```

---

### `<meta charset="UTF-8">`

**Definición**: Etiqueta que especifica la codificación de caracteres del documento. UTF-8 permite mostrar correctamente acentos, eñes y símbolos especiales.

**Metáfora**: Es como elegir el diccionario correcto para leer un texto. UTF-8 es el diccionario universal que entiende todos los idiomas y símbolos.

**Ejemplo de tu código**:
```html
<meta charset="UTF-8">
```

Sin esto, palabras como "programación" o "José" podrían verse mal.

---

### `<title>`

**Definición**: Define el título que aparece en la pestaña del navegador. No se muestra en el contenido visible de la página.

**Metáfora**: Es como el título en el lomo de un libro en un estante. Te dice qué contiene sin tener que abrirlo.

**Ejemplo de tu código**:
```html
<title>Perfil personal</title>
```

Este texto aparece en la pestaña del navegador, no en la página.

---

### `<body>`

**Definición**: Contiene todo el contenido visible de la página: texto, imágenes, enlaces, formularios, etc.

**Metáfora**: Es el contenido del libro, las páginas que realmente lees. Todo lo que el usuario ve está aquí.

**Ejemplo de tu código**:
```html
<body>
    <header>
        <h1>Mi perfil</h1>
    </header>
    <!-- Todo el contenido visible -->
</body>
```

---

## Etiquetas semánticas de estructura

### `<header>`

**Definición**: Sección de cabecera que suele contener el título principal, logo, navegación o introducción de la página o sección.

**Metáfora**: Es como el encabezado de un periódico que lleva el nombre y el menú principal. Identifica la página y ayuda a navegar.

**Ejemplo de tu código**:
```html
<header>
    <h1>Mi perfil</h1>
    <nav>
        <a href="#uno">Presentacion</a>
        <a href="#dos">Habilidades</a>
        <a href="#tres">Proyectos</a>
        <a href="#cuatro">Contacto</a>
    </nav>
</header>
```

Tu header incluye el título principal y la navegación.

---

### `<nav>`

**Definición**: Contenedor semántico para bloques de navegación. Agrupa enlaces que permiten moverse dentro de la página o a otras páginas.

**Metáfora**: Es como el índice de un libro o el mapa de un centro comercial. Te muestra los lugares a los que puedes ir.

**Ejemplo de tu código**:
```html
<nav>
    <a href="#uno">Presentacion</a>
    <a href="#dos">Habilidades</a>
    <a href="#tres">Proyectos</a>
    <a href="#cuatro">Contacto</a>
</nav>
```

Los enlaces con `#` llevan a secciones dentro de la misma página.

---

### `<main>`

**Definición**: Contiene el contenido principal de la página. Solo debe haber un `<main>` por documento y no debe estar dentro de `<header>`, `<footer>` o `<aside>`.

**Metáfora**: Es el texto principal de un artículo de revista, sin contar el título superior ni el pie de página. Es lo importante.

**Ejemplo de tu código**:
```html
<main>
    <section id="uno">
        <h2>Jose Sanchez Rodriguez</h2>
        <p>Soy estudiante de programacion y estoy aprendiendo frontend</p>
    </section>
    <!-- Más secciones -->
</main>
```

---

### `<section>`

**Definición**: Subdivisión temática del contenido. Agrupa contenido relacionado bajo un mismo tema y suele llevar su propio encabezado (`<h2>`, `<h3>`).

**Metáfora**: Es como un capítulo de un libro. Cada sección trata un tema específico dentro del contenido general.

**Ejemplo de tu código**:
```html
<section id="dos">
    <h2>Habilidades</h2>
    <p>Mis habilidades en programacion son</p>
    <ol>
        <li>Java nivel iniciado</li>
        <li>SQL nivel iniciado</li>
    </ol>
</section>
```

Cada una de tus secciones (`#uno`, `#dos`, etc.) trata un tema: presentación, habilidades, proyectos, contacto.

---

### `<footer>`

**Definición**: Pie de página que suele contener información secundaria: copyright, autor, enlaces de contacto, redes sociales.

**Metáfora**: Es como la contraportada de un libro o el pie de una carta. Cierra el contenido con información complementaria.

**Ejemplo de tu código**:
```html
<footer>
    <p>Gracias por visitar mi perfil</p>
    <img src="descarga.jpg" alt="imagen de toastman, es un meme de clase">
</footer>
```

---

## Títulos y párrafos

### `<h1>`, `<h2>`, `<h3>`...

**Definición**: Etiquetas de encabezado que marcan la jerarquía de la información. `<h1>` es el más importante, `<h2>` el segundo nivel, y así sucesivamente hasta `<h6>`.

**Metáfora**: Es como el sistema de numeración de un documento: 1. Título principal, 1.1 Subtítulo, 1.1.1 Sub-subtítulo. Organiza la información por niveles.

**Regla importante**: Solo debe haber un `<h1>` por página (el título principal).

**Ejemplo de tu código**:
```html
<h1>Mi perfil</h1>  <!-- Título principal, solo uno -->

<h2>Jose Sanchez Rodriguez</h2>  <!-- Sección principal -->
<h2>Habilidades</h2>              <!-- Otra sección principal -->
<h2>Proyectos</h2>                <!-- Otra sección principal -->
```

---

### `<p>`

**Definición**: Párrafo de texto. Agrupa un bloque de texto relacionado.

**Metáfora**: Es como un párrafo en un libro. Cada idea o grupo de frases relacionadas va en su propio párrafo.

**Ejemplo de tu código**:
```html
<p>Soy estudiante de programacion y estoy aprendiendo frontend</p>
<p>¿Que hice antes de estudiar programacion?</p>
```

---

## Listas

### `<ul>` (Lista desordenada)

**Definición**: Lista sin orden específico, mostrada con viñetas. Ideal para elementos que no tienen una secuencia particular.

**Metáfora**: Es como una lista de compras. El orden no importa, solo enumeras cosas relacionadas.

**Ejemplo de tu código**:
```html
<ul>
    <li>El grado de economia</li>
    <li>El master de mercados financieros</li>
</ul>
```

Tus estudios anteriores no necesitan estar en orden de importancia.

---

### `<ol>` (Lista ordenada)

**Definición**: Lista numerada donde el orden sí importa. Se usa cuando hay una secuencia, jerarquía o pasos.

**Metáfora**: Es como una receta de cocina. Los pasos están numerados porque el orden importa.

**Ejemplo de tu código**:
```html
<ol>
    <li>Java nivel iniciado</li>
    <li>SQL nivel iniciado</li>
    <li>Conceptos de backend</li>
    <li>HTML básicos</li>
</ol>
```

Tus habilidades están numeradas para mostrar prioridad o progresión.

---

### `<li>` (Elemento de lista)

**Definición**: Elemento individual dentro de una lista (`<ul>` o `<ol>`). Cada ítem va en su propio `<li>`.

**Metáfora**: Es cada línea de tu lista. No puede existir solo, siempre debe estar dentro de una lista.

**Ejemplo de tu código**:
```html
<li>Java nivel iniciado</li>
```

Cada habilidad es un `<li>` dentro de tu `<ol>`.

---

## Enlaces e imágenes

### `<a href="...">`

**Definición**: Enlace o hipervínculo. El atributo `href` indica el destino: una URL externa, otra página del sitio, o un ancla dentro de la misma página (`#id`).

**Metáfora**: Es como un portal o puerta que te lleva a otro lugar cuando haces clic. Puede ser a otra habitación (misma página) o a otro edificio (otra página/sitio).

**Ejemplo de tu código**:
```html
<!-- Enlace interno (ancla) -->
<a href="#uno">Presentacion</a>

<!-- Enlace externo -->
<a href="https://github.com/josemsr98">Mi perfil de GitHub</a>
```

Los enlaces con `#` llevan a secciones con ese `id` en la misma página.

---

### `<img>`

**Definición**: Inserta una imagen. El atributo `src` indica la ruta del archivo y `alt` proporciona texto alternativo para accesibilidad.

**Metáfora**: Es como pegar una foto en un álbum. `src` dice dónde está la foto, y `alt` es la descripción que escribes debajo.

**Ejemplo de tu código**:
```html
<img src="descarga.jpg" alt="imagen de toastman, es un meme de clase">
```

El `alt` es importante para accesibilidad: si la imagen no carga o alguien usa lector de pantalla, sabrán qué había.

---

## Formularios

### `<form>`

**Definición**: Contenedor de un formulario. Agrupa controles de entrada (inputs, selects, textareas) que el usuario puede completar y enviar.

**Metáfora**: Es como un formulario en papel. Agrupa todas las preguntas y campos que el usuario debe completar.

**Ejemplo de tu código**:
```html
<form>
    <label for="nombre">Nombre:</label>
    <input type="text" id="nombre" name="nombre">
    <!-- Más campos -->
    <button type="submit">Enviar</button>
</form>
```

---

### `<label>`

**Definición**: Etiqueta que describe un campo de formulario. El atributo `for` debe coincidir con el `id` del campo para crear una conexión accesible.

**Metáfora**: Es la pregunta o instrucción en un formulario en papel. Le dice al usuario qué debe escribir en cada campo.

**Ejemplo de tu código**:
```html
<label for="correo">Correo electrónico:</label>
<input type="email" id="correo" name="correo">
```

---

### `<input>`

**Definición**: Campo de entrada para formularios. El atributo `type` define qué tipo de dato acepta (`text`, `email`, `password`, `number`, etc.).

**Metáfora**: Es la línea en blanco donde escribes tu respuesta en un formulario. El `type` indica qué tipo de respuesta se espera.

**Ejemplo de tu código**:
```html
<input type="text" id="nombre" name="nombre">
<input type="email" id="correo" name="correo">
```

El tipo `email` valida que el formato sea de correo electrónico.

---

### `<textarea>`

**Definición**: Campo de texto ampliado para entrada multilínea. Ideal para mensajes, comentarios o descripciones largas.

**Metáfora**: Es como un cuaderno dentro del formulario, con espacio para escribir varias líneas, no solo una.

**Ejemplo de tu código**:
```html
<textarea id="mensaje" name="mensaje"></textarea>
```

---

### `<button type="submit">`

**Definición**: Botón que envía el formulario cuando se hace clic. El `type="submit"` indica que su función es enviar los datos.

**Metáfora**: Es el botón "Enviar" de un formulario en papel. Cuando lo presionas, entregas el formulario completo.

**Ejemplo de tu código**:
```html
<button type="submit">Enviar</button>
```

---

## Atributos importantes en formularios

### Atributo `id`

**Definición**: Identificador único que se asigna a un elemento HTML para diferenciarlo de todos los demás en la página. No puede repetirse en el mismo documento. Se usa para conectar labels, aplicar estilos con CSS y manipular con JavaScript.

**Metáfora**: Es como el DNI de una persona. Cada elemento tiene su propio número único que lo distingue del resto, permitiendo localizarlo de forma exacta en cualquier momento.

**Ejemplo de tu código**:
```html
<section id="uno">  
    <h2>Jose Sanchez Rodriguez</h2>
</section>

<a href="#uno">Presentacion</a>  <!-- El enlace lleva a esa sección -->
```

En tu formulario:
```html
<input type="text" id="nombre" name="nombre">
```

El `id="nombre"` identifica únicamente ese campo en toda la página.

---

### Atributo `for` en `<label>`

**Definición**: Establece una conexión explícita entre la etiqueta `<label>` y un campo de formulario mediante el `id` de ese campo. Crea una relación accesible entre ambos elementos.

**Metáfora**: Es como una flecha luminosa que señala directamente. El `for` del label apunta al campo que describe, iluminando la conexión entre pregunta y respuesta.

**Ejemplo de tu código**:
```html
<label for="correo">Correo electrónico:</label>
<input type="email" id="correo" name="correo">
```

El `for="correo"` del label busca y conecta con el `id="correo"` del input. Son como dos piezas de un rompecabezas que encajan.

---

### Conexión `label` + `id` (Accesibilidad)

**Definición**: La combinación correcta de `<label for="...">` con el `id="..."` correspondiente crea una asociación accesible. Al hacer clic en el texto del label, el campo asociado recibe el foco automáticamente.

**Metáfora**: Es como una etiqueta pegada en un frasco. El label dice qué contiene el frasco (campo), y al tocar la etiqueta, automáticamente abres el frasco (el cursor se posiciona en el campo).

**Beneficios prácticos**:
- **Accesibilidad**: Los lectores de pantalla leen el label cuando el usuario navega al campo
- **Usabilidad**: Aumenta el área clicable (muy útil en móviles y para checkboxes/radios)
- **Semántica**: Establece una relación clara entre descripción y campo

**Ejemplo completo de tu código**:
```html
<label for="mensaje">Mensaje:</label>
<textarea id="mensaje" name="mensaje"></textarea>
```

**Pruébalo**: Haz clic en el texto "Mensaje:" y verás cómo el cursor se posiciona automáticamente en el textarea. Esto es especialmente útil en móviles donde tocar un campo pequeño puede ser difícil.

---

### Atributo `name`

**Definición**: Define el nombre del campo que se enviará al servidor cuando se envíe el formulario. Es el identificador que usa el backend para recibir y procesar los datos del formulario.

**Metáfora**: Es como la etiqueta en un sobre de correo o paquete. Cuando envías el formulario (el paquete), el `name` indica qué información contiene cada campo para que el destinatario (servidor) sepa qué es cada cosa.

**Diferencia con `id`**:
- **`id`**: Para el navegador (conectar labels, CSS, JavaScript) - debe ser único en toda la página
- **`name`**: Para el servidor (envío de datos) - puede repetirse en casos específicos (radios, checkboxes del mismo grupo)

**Ejemplo de tu código**:
```html
<input type="text" id="nombre" name="nombre">
<!-- id: el navegador lo usa para conectar con label, CSS, JS -->
<!-- name: el servidor lo usa para recibir el valor cuando envías el form -->
```

En la práctica, es común que `id` y `name` tengan el mismo valor (como en tu código), pero cumplen funciones diferentes.

**Qué pasa cuando envías el formulario**:
Si escribes "José Sánchez" en el campo nombre y "jose@email.com" en el campo correo, el servidor recibirá:
```
nombre=José+Sánchez
correo=jose@email.com
```

El `name` es la clave, el valor es lo que escribiste.

---

### Formulario completo con buenas prácticas

**Tu código completo analizado**:
```html
<form>
    <label for="nombre">Nombre:</label>
    <input type="text" id="nombre" name="nombre">
    
    <label for="correo">Correo electrónico:</label>
    <input type="email" id="correo" name="correo">
    
    <label for="mensaje">Mensaje:</label>
    <textarea id="mensaje" name="mensaje"></textarea>
    
    <button type="submit">Enviar</button>
</form>
```

**Cada campo tiene**:
1. ✅ Un `<label>` con `for` que apunta al campo → Accesibilidad
2. ✅ Un `id` único para que el label se conecte → Usabilidad
3. ✅ Un `name` para enviar el dato al servidor → Funcionalidad
4. ✅ Un `type` apropiado según el dato esperado → Validación

**Por qué tu formulario está bien hecho**:
- Los labels están correctamente conectados con `for` e `id`
- Usas `type="email"` que valida formato de correo automáticamente
- Usas `<textarea>` para mensajes largos (correcto) en lugar de `input`
- El botón `type="submit"` envía el formulario cuando se hace clic

**Mejora opcional** que podrías agregar:
```html
<input type="text" id="nombre" name="nombre" required>
<input type="email" id="correo" name="correo" required>
<textarea id="mensaje" name="mensaje" required></textarea>
```

El atributo `required` hace que el campo sea obligatorio (el navegador no permite enviar el formulario si está vacío).

---

## Conceptos vistos en `indexclase2.html` (Clase 2)

### Ruta relativa en `<link rel="stylesheet">`

**Definición**: Una ruta relativa conecta archivos usando la posición de carpetas, sin depender del nombre del ordenador ni del disco.

**Metáfora**: Senior Cat lo explica como moverte por un edificio con planos: "sube dos pisos y entra a CSS" (`../../css/...`) en vez de memorizar una dirección completa que cambia en cada ciudad.

**Ejemplo de tu código**:
```html
<link rel="stylesheet" href="../../css/styles.css">
```

---

### `id` para navegación interna

**Definición**: El atributo `id` identifica de forma única una sección. Los enlaces del menú usan `href="#id"` para saltar a ese bloque.

**Metáfora**: Es como ponerle nombre a cada habitación de la casa: luego el menú funciona como un cartel que te lleva directo a "Contacto" o "Habilidades".

**Ejemplo de tu código**:
```html
<a href="#Contacto"><b>Contacto</b></a>
...
<section id="Contacto">
```

---

### `class` para reutilizar estilos

**Definición**: `class` agrupa elementos para aplicarles el mismo estilo desde CSS. A diferencia de `id`, una clase se puede repetir muchas veces.

**Metáfora**: Si `id` es una puerta con nombre único, `class` es un tipo de ladrillo que puedes usar en muchas zonas de la obra.

**Ejemplo de tu código**:
```html
<div class="campo">
    <label for="nombre">Nombre:</label>
    <input type="text" id="nombre" name="nombre">
</div>

<div class="campo">
    <label for="correo">Correo electrónico:</label>
    <input type="email" id="correo" name="correo">
</div>
```

---

### `for` (label) + `id` (input)

**Definición**: `for` en `<label>` debe coincidir con el `id` del campo para mejorar accesibilidad y usabilidad.

**Metáfora**: Es como una etiqueta con el nombre exacto del cajón. Si coincide, siempre abres el cajón correcto.

**Ejemplo de tu código**:
```html
<label for="correo">Correo electrónico:</label>
<input type="email" id="correo" name="correo">
```

---

### Varias clases en un mismo elemento

**Definición**: Puedes poner varias clases separadas por espacios para combinar estilos base + estilos especiales.

**Metáfora**: Un mismo ladrillo puede ser "ladrillo base" y además "ladrillo de esquina" para añadir un comportamiento extra.

**Ejemplo de tu código**:
```html
<div class="campo campo-mensaje">
    <label for="mensaje">Opinion:</label>
    <textarea id="mensaje" name="mensaje"></textarea>
</div>
```