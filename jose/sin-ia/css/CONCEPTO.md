# Conceptos básicos de CSS (vistos en este ejercicio)

Formato usado: **definición + metáfora + ejemplo de tu código**.

---

## Variables CSS con `:root` y `var()`

### `:root`

**Definición**: Selector que apunta al elemento raíz del documento (`html`). Se usa para declarar variables globales reutilizables.

**Metáfora**: Es el almacén central de ladrillos de Senior Cat: desde ahí se reparten los mismos materiales a toda la obra.

**Ejemplo de tu código**:
```css
:root {
	--espacio-pequeno: 8px;
	--espacio-medio: 16px;
	--espacio-grande: 32px;
}
```

### `var(--nombre-variable)`

**Definición**: Función que recupera el valor de una variable CSS para reutilizarlo en propiedades.

**Metáfora**: En vez de medir cada ladrillo cada vez, pides "el ladrillo mediano" por nombre y siempre recibes el mismo tamaño.

**Ejemplo de tu código**:
```css
main {
	margin: var(--espacio-grande);
}
```

---

## Selectores descendientes

### `main h2`

**Definición**: Selecciona todos los `h2` que estén dentro de `main` (hijos directos o no).

**Metáfora**: Es como decir: "pinta todas las puertas tipo h2 que estén dentro del edificio main".

**Ejemplo de tu código**:
```css
main h2 {
	margin-top: 0;
	margin-bottom: var(--espacio-medio);
}
```

---

## Flexbox para alinear en fila

### `display: flex`

**Definición**: Activa el modo flex para distribuir elementos hijos en una fila o columna de forma flexible.

**Metáfora**: Senior Cat coloca una cinta transportadora para ordenar ladrillos en línea.

**Ejemplo de tu código**:
```css
nav {
	display: flex;
}
```

### `gap`

**Definición**: Crea separación uniforme entre elementos dentro de un contenedor flex o grid.

**Metáfora**: Es el espacio de seguridad entre ladrillos para que no queden pegados.

**Ejemplo de tu código**:
```css
nav {
	gap: 16px;
}
```

### `flex-wrap: wrap`

**Definición**: Permite que los elementos pasen a la siguiente línea cuando no caben en una sola.

**Metáfora**: Si la fila de ladrillos se llena, empiezas una nueva fila abajo sin romper la pared.

**Ejemplo de tu código**:
```css
form {
	display: flex;
	flex-wrap: wrap;
}
```

---

## Clases y selectores combinados

### `.campo`

**Definición**: Selector de clase que aplica estilos a cualquier elemento con `class="campo"`.

**Metáfora**: Es una etiqueta de tipo de ladrillo reutilizable en varios puntos.

**Ejemplo de tu código**:
```css
.campo {
	display: flex;
	flex-direction: column;
	flex: 0 1 220px;
	max-width: 260px;
}
```

### `.campo input, .campo textarea`

**Definición**: Selector descendiente que aplica estilos a `input` y `textarea` que están dentro de `.campo`.

**Metáfora**: Solo ajustas las piezas que están dentro de un módulo concreto de la obra.

**Ejemplo de tu código**:
```css
.campo input,
.campo textarea {
	width: 100%;
}
```

### `.acciones-formulario input[type="submit"]`

**Definición**: Selector específico para el botón de envío dentro del contenedor de acciones.

**Metáfora**: Es como decir "solo pinta de otro color el botón final de esta zona".

**Ejemplo de tu código**:
```css
.acciones-formulario input[type="submit"] {
	margin-top: var(--espacio-pequeno);
}
```

---

## Listas anidadas y jerarquía visual

### `li > ul, li > ol`

**Definición**: Selector de hijo directo. Aplica estilos solo a sublistas que cuelgan directamente de un `li`.

**Metáfora**: Solo cuentas los ladrillos del piso inmediatamente inferior, no todos los del edificio.

**Ejemplo de tu código**:
```css
li > ul,
li > ol {
	display: block;
	margin-left: 20px;
	padding-left: 12px;
}
```

### `list-style-position: inside`

**Definición**: Coloca números/viñetas dentro de la caja del elemento de lista.

**Metáfora**: La numeración queda dentro del mismo ladrillo, no colgando fuera del borde.

**Ejemplo de tu código**:
```css
ol {
	list-style-position: inside;
}
```

---

## Conceptos vistos en `tarjeta perfil`

### `display: flex`

**Definición**: Convierte un elemento en contenedor flexible para ordenar a sus hijos de forma controlada.

**Metáfora**: Senior Cat activa una cinta de montaje para colocar ladrillos en orden.

**Ejemplo de tu código (aplicado al layout de página)**:
```css
body {
	display: flex;
}
```

---

### `flex-direction: column`

**Definición**: Define que los hijos del contenedor flex se coloquen en vertical (de arriba a abajo).

**Metáfora**: En vez de poner ladrillos en fila horizontal, los apilas por pisos.

**Ejemplo de tu código (aplicado al layout de página)**:
```css
body {
	flex-direction: column;
}
```

---

### `line-height` relativo

**Definición**: Controla la altura de línea del texto. Un valor relativo (por ejemplo `1.5`) se adapta al tamaño de fuente.

**Metáfora**: Es la separación entre filas de ladrillos de texto: ni muy pegadas ni muy separadas.

**Ejemplo de tu código**:
```css
body {
	font-size: 15px;
	line-height: 1.5;
}
```

---

### `min-height: 100vh`

**Definición**: Obliga a que el bloque tenga al menos el alto de la ventana, aunque haya poco contenido.

**Metáfora**: Aunque pongas pocos ladrillos, la pared llega como mínimo hasta el techo.

**Ejemplo de tu código**:
```css
body {
	min-height: 100vh;
}
```

---

### Centrado de bloque con `max-width` + `width` + márgenes auto

**Definición**: Se limita el ancho máximo del bloque, se mantiene flexible y se centra horizontalmente con márgenes automáticos.

**Metáfora**: Construyes una tarjeta con ancho controlado y la colocas justo en el centro del muro.

**Ejemplo de tu código**:
```css
main {
	max-width: 700px;
	width: 90%;
	margin-left: auto;
	margin-right: auto;
}
```

---

### `padding` (espacio interno) vs `margin` (espacio externo)

**Definición**:
- `padding`: aire dentro del bloque, entre contenido y borde.
- `margin`: aire fuera del bloque, entre bloques.

**Metáfora**:
- `padding` = espacio dentro del ladrillo.
- `margin` = espacio entre ladrillos.

**Ejemplo de tu código**:
```css
header {
	padding: 50px;
	margin-bottom: 30px;
}

main section {
	padding: 16px;
	margin-bottom: 50px;
}
```
