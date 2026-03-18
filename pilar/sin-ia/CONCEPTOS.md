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

## Conceptos JS iniciales

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

   Angular

Framework de desarrollo web basado en TypeScript que permite crear aplicaciones frontend estructuradas mediante componentes, servicios y módulos.

Angular CLI

Herramienta de línea de comandos que permite crear, ejecutar, configurar y mantener proyectos Angular automáticamente mediante comandos.

Ejemplos de uso:

crear proyectos

generar componentes

ejecutar el servidor de desarrollo

compilar la aplicación

ng new

Comando de Angular CLI que crea una nueva aplicación Angular con toda la estructura inicial del proyecto.

Ejemplo:

ng new guia-restaurantes
ng serve

Comando que inicia el servidor de desarrollo de Angular y permite visualizar la aplicación en el navegador mientras se trabaja.

Por defecto la aplicación se ejecuta en:

http://localhost:4200
ng generate (ng g)

Comando utilizado para crear automáticamente elementos de Angular como componentes, servicios, módulos o interfaces.

Ejemplo:

ng g c restaurante-card
Componente (Component)

Unidad básica de construcción de la interfaz en Angular.

Un componente está formado por:

TypeScript → lógica

HTML → estructura

CSS / SCSS → estilos

Los componentes permiten dividir la aplicación en bloques reutilizables de interfaz.

Template

Archivo HTML asociado a un componente donde se define cómo se muestra la información en la interfaz.

Permite usar sintaxis propia de Angular para mostrar datos o controlar el flujo de renderizado.

Interpolación

Mecanismo que permite mostrar datos del componente en el template HTML.

Se representa con:

{{ variable }}

Ejemplo:

<h1>{{ nombreRestaurante }}</h1>
Directivas

Instrucciones que Angular utiliza dentro del HTML para modificar el comportamiento o la estructura del DOM.

Ejemplos:

@if → mostrar contenido condicionalmente

@for → iterar listas de datos

@Input

Decorador que permite pasar datos de un componente padre a un componente hijo.

Se utiliza para reutilizar componentes mostrando información diferente.

@Output

Decorador que permite enviar eventos desde un componente hijo hacia un componente padre.

Se usa cuando un componente necesita comunicar una acción hacia arriba.

Servicio (Service)

Clase de Angular que contiene lógica reutilizable de la aplicación, especialmente para:

comunicación con APIs

manejo de datos

lógica de negocio

Los servicios suelen utilizarse junto con HttpClient.

CRUD

Modelo de operaciones básicas que se pueden realizar sobre datos en una aplicación:

Create → crear datos

Read → leer datos

Update → actualizar datos

Delete → eliminar datos

API

Interfaz que permite que una aplicación frontend se comunique con un backend mediante peticiones HTTP.

En el proyecto se utiliza una API creada con NestJS.

Endpoint

Ruta específica dentro de una API que permite realizar una operación concreta.

Ejemplo:

GET /restaurants
Interface (TypeScript)

Estructura que define la forma que deben tener los datos dentro de una aplicación.

Permite tipar objetos para mejorar la organización y evitar errores.

Ejemplo:

export interface Restaurante {
  id: number;
  nombre: string;
  direccion: string;
}
Router

Sistema de navegación de Angular que permite moverse entre diferentes páginas o vistas dentro de una aplicación sin recargar la página.

Ejemplo de rutas:

/restaurantes
/restaurantes/:id
ng build

Comando que compila la aplicación Angular para producción, generando los archivos optimizados que se publicarán en un servidor.

localhost

Dirección que apunta al servidor local del propio ordenador, utilizada para probar aplicaciones durante el desarrollo.

Ejemplo:

http://localhost:4200

TypeScript (tipado fuerte)

Lenguaje de programación que extiende JavaScript añadiendo tipado fuerte (strong typing).

Esto significa que las variables, funciones y objetos deben declarar el tipo de dato que utilizan, lo que permite detectar errores durante el desarrollo antes de ejecutar el programa.

Ejemplo:

let nombre: string = "Restaurante Central";
let puntuacion: number = 4.5;

El tipado fuerte mejora:

la seguridad del código

la legibilidad

la detección temprana de errores

Angular utiliza TypeScript como lenguaje principal de desarrollo.

DOM (Document Object Model)

El DOM es la representación estructurada de una página web en forma de árbol de objetos que el navegador crea a partir del HTML.

Gracias al DOM, JavaScript puede:

leer el contenido de la página

modificar elementos HTML

cambiar estilos

responder a eventos del usuario

Ejemplo de interacción con el DOM en JavaScript:
const titulo = document.querySelector("h1");
titulo.textContent = "Nuevo título";

En frameworks como Angular, la manipulación del DOM se realiza principalmente a través de templates y data binding, evitando modificarlo directamente con JavaScript.

MICROFRONTEDNS