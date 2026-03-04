 ## CONCEPTOS GENERALES

- **Frontend**: Es la parte visual de una web. Todo lo que el usuario ve e interactúa: botones, textos, imágenes, formularios… Se construye principalmente con HTML, CSS y JavaScript. (La parte tonta)

- **Backend**: Es la parte que no se ve. Es donde ocurre la lógica, la conexión con bases de datos, validaciones, autenticaciones, etc. 

- **API**: Es un puente de comunicación. Permite que una aplicación le pida datos a otra y reciba una respuesta.

- **SQL**: Es el lenguaje que se usa para comunicarse con bases de datos. Sirve para consultar, insertar, actualizar o borrar datos.

- **HTTP**: Es el protocolo que permite la comunicación entre el navegador y el servidor. Cada vez que entras a una web, se hace una petición HTTP y el servidor responde.

- **Archivo README.md**: Es un archivo de documentación (normalmente en Markdown) que explica qué es el proyecto, cómo se instala, cómo se usa y cualquier información relevante.

- **Archivo Agents.md**: Archivo que puede utilizarse para definir cómo deben comportarse agentes automatizados o sistemas dentro de un proyecto (según el entorno donde se use).

- **Archivo Copilot-instructions.md**: Archivo que se utiliza para dar instrucciones específicas a herramientas como GitHub Copilot sobre cómo debe generar el código dentro del proyecto.

- **Skills**: Son las capacidades o habilidades que tiene una IA para realizar tareas concretas.

- **Ventana de contexto**: Es el límite de información que una IA puede procesar en una sola conversación. Cuando se supera el número permitido de caracteres, empieza a perder precisión en las respuestas.

- **Metadatos**: Información sobre la página que no es visible directamente. Se colocan dentro de `<head>`.

## CONCEPTOS HTML

- **HTML**: Lenguaje de marcado estándar para crear páginas web. Sirve para estructurar el contenido (no para diseñarlo).

- **Elemento**: Es todo lo que va desde la etiqueta de apertura hasta la de cierre.
Ejemplo: `<p>Hola</p>` -> Todo eso es un elemento.

- **Etiqueta**: Es la parte que va entre < >. Indica el tipo de contenido.
Ejemplo: `<p>, <h1>, <img>`

- **Atributo**: Proporciona información adicional a una etiqueta.
Ejemplo: `<img src="foto.jpg" alt="Foto de perfil">` -> Aquí src y alt son atributos.

### HTML BÁSICO

- **`<!DOCTYPE html>`**: Indica que el documento es HTML5.

- **`<html>`**: Es el elemento raíz de la página. Todo el contenido va dentro de esta etiqueta.

- **`<head>`**: Contiene metainformación (no visible en la página).

- **`<title>`**: Define el título que aparece en la pestaña del navegador.

- **`<body>`**: Contiene todo el contenido visible de la página.

- **Encabezados `<h1> - <h6>`**: `<h1>` es el más importante (solo puede haber 1 por página) y `<h6>` el menos importante.

- **`<p>`**: Define un párrafo.

- **`<img>`**: Inserta una imagen.
Ejemplo: `<img src="imagen.jpg" alt="Descripción" width="300" height="200">`

### MÁS ETIQUETAS IMPORTANTES

- **`<a>`**: Crea enlaces.
Ejemplo: `<a href="https://google.com">Ir a Google</a>`

- **`<div>`**: Contenedor genérico. Se usa para agrupar contenido.

- **`<span>`**: Contenedor en línea, se usa para aplicar estilos a partes pequeñas de texto.

- **`<br>`**: Salto de línea.

- **`<hr>`**: Línea horizontal divisoria.

- **`<strong>`**:  Texto en negrita con importancia semántica.

- **`<em>`**: Texto en cursiva con énfasis. 

### LISTAS 

- **`<ul>`**: Lista con puntos.

- **`<ol>`**: Lista ordenada con numeros.

- **`<li>`**: Elemento de una lista.

### ETIQUETAS SEMÁNTICAS IMPORTANTES

 - **`<header>`**: Define la cabecera de una página.

- **`<nav>`**: Contiene enlaces de navegación.

- **`<main>`**: Contenido principal de la página.

- **`<section>`**: Agrupa contenido relacionado.

- **`<article>`**: Contenido independiente (por ejemplo, un post de blog).

- **`<aside>`**: Contenido secundario o lateral.

- **`<footer>`**: Pie de página.

### TABLAS EN HTML

- **`<table>`**: Define una tabla.

- **`<tr>`**: Table row → define una fila.

- **`<th>`**: Table header → celda de encabezado (va en negrita por defecto).

- **`<td>`**: Table data → celda normal.
Atributos importantes en tablas: **Colspan** (Permite que una celda ocupe varias columnas. 
Ejemplo: `<td colspan="2">Texto</td>`) y **Rowspan** (Permite que una celda ocupe varias filas. Ejemplo: `<td rowspan="2">Texto</td>`)

### FORMULARIOS EN HTML

- **`<form>`**: Define un formulario. Atributos importantes: **action** (URL donde se envían los datos) y **method** (GET o POST).

- **`<input>`**: Campo de entrada de datos. Tipos importantes:text, password, email, number, checkbox, radio, submit.
Ejemplo: `<input type="text" name="nombre">`

- **`<label>`**: Etiqueta descriptiva para un input. Ejemplo: `<label for="email">Correo</label>`
`<input type="email" id="email">`

- **`<textarea> `**: Campo de texto largo.

- **`<select>`**: Lista desplegable.

- **`<option>`**: Opciones dentro de un select.

## CONCEPTOS CSS