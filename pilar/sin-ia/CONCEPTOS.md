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
<br>Ejemplo: `<p>Hola</p>` -> Todo eso es un elemento.

- **Etiqueta**: Es la parte que va entre < >. Indica el tipo de contenido.
<br>Ejemplo: `<p>, <h1>, <img>`

- **Atributo**: Proporciona información adicional a una etiqueta.
<br>Ejemplo: `<img src="foto.jpg" alt="Foto de perfil">` -> Aquí src y alt son atributos.

### HTML BÁSICO

- **`<!DOCTYPE html>`**: Indica que el documento es HTML5.

- **`<html>`**: Es el elemento raíz de la página. Todo el contenido va dentro de esta etiqueta.

- **`<head>`**: Contiene metainformación (no visible en la página).

- **`<title>`**: Define el título que aparece en la pestaña del navegador.

- **`<body>`**: Contiene todo el contenido visible de la página.

- **Encabezados**: `<h1>` es el más importante (solo puede haber 1 por página) y `<h6>` el menos importante.

- **`<p>`**: Define un párrafo.

- **`<img>`**: Inserta una imagen.
<br>Ejemplo: `<img src="imagen.jpg" alt="Descripción" width="300" height="200">`

### MÁS ETIQUETAS IMPORTANTES

- **`<a>`**: Crea enlaces.
<br>Ejemplo: `<a href="https://google.com">Ir a Google</a>`

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

- **`<td>`**: Table data → celda normal. Atributos importantes en tablas: 
<br>- **Colspan**: Permite que una celda ocupe varias columnas. 
<br>Ejemplo: `<td colspan="2">Texto</td>`
<br>- **Rowspan**: Permite que una celda ocupe varias filas. 
<br>Ejemplo: `<td rowspan="2">Texto</td>`

### FORMULARIOS EN HTML

- **`<form>`**: Define un formulario. Atributos importantes: 
<br>- **action**: URL donde se envían los datos.
<br>- **method**: GET o POST.

- **`<input>`**: Campo de entrada de datos. 
<br>Tipos importantes: text, password, email, number, checkbox, radio, submit.
<br>Ejemplo: `<input type="text" name="nombre">`

- **`<label>`**: Etiqueta descriptiva para un input. 
<br> Ejemplo: `<label for="email">Correo</label>`
<br>`<input type="email" id="email">`

- **`<textarea> `**: Campo de texto largo.

- **`<select>`**: Lista desplegable.

- **`<option>`**: Opciones dentro de un select.

## CONCEPTOS CSS

- **CSS**: se utiliza para dar estilo y diseño.HTML estructura el contenido, CSS se encarga de colores, tamaños, espacios, posiciones y apariencia visual.

### SELECTORES (4 formas de aplicar CSS)

- **Selector**: Es la parte del CSS que indica a qué elemento HTML se le van a aplicar los estilos.<br>
    `p {`<br>
      `color: red;`<br>
    `} `

- **Selector de clase (.)**: utiliza el punto para aplicar estilos a los elementos que tengan esa clase. <br>
  `.titulo {`<br>
    `color: blue;`<br>
 `}` <br>
 `<h1 class="titulo">Hola</h1>`

- **Selector de ID (#):** Se utiliza # para aplicar estilos a un elemento.<br>
  `#menu {`<br>
    `background-color: black;`<br>
  `}`<br>
  `<div id="menu"></div>`

- **CSS Inline**: dentro de la etiqueta HTML.
<br> `<p style="color:red;">Hola</p>`

- **CSS Interno**: dentro del propio archivo HTML usando `<style>`. <br>
  `<style>`<br>
  `p {`<br>
   ` color: blue;`<br>
  `}`<br>
  `</style>`

- **CSS Externo**:un archivo .css separado.
<br>`<link rel="stylesheet" href="styles.css">`

- **Import CSS**: Importar un CSS dentro de otro.
<br> `@import url("styles.css");`

### DISPLAY

- **display**: Define cómo se comporta un elemento en la página. Tipos principales:
<br>- block → ocupa todo el ancho
<br>- inline → ocupa solo el espacio del contenido
<br>- inline-block → mezcla de inline y block
<br>- none → oculta el elemento
<br>- flex → activa flexbox

### FLEXBOX

- **Flexbox**: Sistema de layout que permite organizar elementos fácilmente. Para activarlo: `display: flex;` Propiedades importantes:
<br>- justify-content → alinea elementos horizontalmente. Ejemplo:`justify-content: center;`
<br>- align-items → alinea elementos verticalmente. Ejemplo: `align-items: center;`
<br>- flex-direction → define la dirección. Ejemplo: `flex-direction: row;`
<br> *Valores:row, column

### ESPACIADO

- **Padding**: Espacio interior entre contenido y borde.
<br>Ejemplo:`padding: 20px;`

- **Margin**: Espacio exterior entre elementos.

<br>Ejemplo:`margin: 20px;`

### BORDES

- **Border**: Permite añadir un borde alrededor del elemento.
<br>Ejemplo:`border: 1px solid black;`

### COLORES Y FONDOS

- **color**: Cambia el color del texto.
<br>Ejemplo:`color: red;`

- **background-color**: Cambia el color de fondo.
<br>Ejemplo:`background-color: blue;`

### TAMAÑOS

- **width**: Define el ancho de un elemento.
<br>Ejemplo:`width: 200px;`

- **height**: Define la altura de un elemento.
<br>Ejemplo:`height: 100px;`

### TIPOGRAFÍA

- **font-size**: Cambia el tamaño del texto.
<br>Ejemplo:`font-size: 20px;`

- **font-family**: Cambia la fuente.
<br>Ejemplo:`font-family: Arial, sans-serif;`

- **font-weight**: Define el grosor del texto.
<br>Ejemplo:`font-weight: bold;`

- **text-align**: Alinea el texto. Valores comunes: left, center, right, justify.
<br>Ejemplo:`text-align: center;`

### POSITION

- **position**: Permite controlar cómo se posiciona un elemento dentro de la página Valores principales:
<br> static: Es el posicionamiento por defecto. El elemento sigue el flujo normal de la página.
<br> relative: El elemento se posiciona relativamente a su posición original.
<br> absolute: El elemento se posiciona respecto a su contenedor más cercano que tenga position diferente de static.
<br> fixed: El elemento queda fijo en la pantalla, aunque el usuario haga scroll.
<br> sticky: El elemento actúa como relative hasta que se alcanza un punto de scroll y entonces se vuelve fijo.

### Z-INDEX

- **z-index**: Controla qué elemento se muestra por encima de otro cuando se superponen. Cuanto mayor sea el número, más arriba se mostrará el elemento.
<br>Ejemplo:`z-index: 10;`

### CSS GRID

- **Grid**: permite organizar elementos en filas y columnas.

### RESPONSIVE DESIGN

- **Media Query**: Permite aplicar estilos diferentes dependiendo del tamaño de pantalla del dispositivo.

### PSEUDO-CLASES

- **Pseudo-clases**: Permiten aplicar estilos cuando un elemento está en un estado específico.
<br> :hover → cuando paso el ratón por encima
<br> :active → cuando hago clic
<br> :focus → cuando un elemento está seleccionado
<br> :visited → enlaces ya visitados

### PSEUDO-ELEMENTOS

- **Pseudo-elementos**: Permiten aplicar estilos a partes específicas de un elemento.
<br> ::before → inserta contenido antes del elemento
<br> ::after → inserta contenido después
<br> ::first-letter → primera letra
<br> ::first-line → primera línea

### OVERFLOW

- **overflow**: Controla qué pasa cuando el contenido de un elemento es más grande que su contenedor.
<br> overflow: hidden;
<br> overflow: scroll;
<br> overflow: auto;

### OPACITY

- **opacity**: Controla la transparencia de un elemento. Valores:
<br> 1 → totalmente visible
<br> 0 → completamente transparente

### CURSOR

- **cursor**: Cambia el tipo de cursor cuando pasa por un elemento.

## Conceptos JS iniciales (explicación breve y clara)

1. **`fetch(url)`**
   - **Qué es:** función para pedir datos a una API.
   - **Para qué sirve:** traer información real desde internet.
   - **Qué problema resuelve:** evita hardcodear datos manualmente.

2. **`async/await`**
   - **Qué es:** forma legible de trabajar con operaciones asíncronas.
   - **Para qué sirve:** esperar la respuesta de la API antes de usarla.
   - **Qué problema resuelve:** evita cadenas de `.then()` difíciles de mantener en nivel inicial.

3. **`array.map()`**
   - **Qué es:** método que transforma cada elemento del array.
   - **Para qué sirve:** convertir datos crudos en tarjetas HTML.
   - **Qué problema resuelve:** render repetitivo y desordenado.

4. **Render en DOM (`innerHTML`)**
   - **Qué es:** volcar HTML generado dentro de un contenedor.
   - **Para qué sirve:** mostrar tarjetas dinámicas en pantalla.
   - **Qué problema resuelve:** pasar de datos en memoria a interfaz visible.
