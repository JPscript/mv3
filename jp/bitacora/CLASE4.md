# CLASE4 - JavaScript + HTML + CSS con APIs

## Nota importante de organización

- Por error, esta sesión fue nombrada inicialmente como **CLASE3**.
- La versión correcta es **CLASE4** y está en la carpeta `jp/bitacora`.
- No está en la carpeta de `adrian_ruiz`.

## Referencias de arranque (sin saber nada)

### Referencia 1: recorrer un array y pintarlo en HTML

```html
<!DOCTYPE html>
<html>
<body>
<h1>JavaScript Arrays</h1>
<h2>Looping an Array</h2>

<p id="demo"></p>

<script>
const fruits = ["Banana", "Orange", "Apple", "Mango"];
let fLen = fruits.length;

let text = "<ul>";
for (let i = 0; i < fLen; i++) {
  text += "<li>" + fruits[i] + "</li>";
}
text += "</ul>";

document.getElementById("demo").innerHTML = text;
</script>

</body>
</html>
```

### Referencia 2: base de `fetch` con `async/await`

```js
async function loadData() {
  try {
    let response = await fetch("data.json");
    let data = await response.json();
    console.log(data);
  } catch (error) {
    console.log("Network error");
  }
}
```

**Fecha:** 2026-03-05  
**Horario:** 16:30 - 20:30  
**Receso:** 18:00 - 18:20  
**Lema del grupo Ladrillos:** Construyendo el futuro del desarrollo web, un ladrillo a la vez.  
**Mentor de la sesión:** Senior Cat 🐱

---

## Tema y objetivo del día

### Tema central
Introducción práctica a JavaScript integrada con HTML + CSS.

### Objetivo general
Construir una página que consuma una API pública y renderice tarjetas con datos (mínimo: imagen, título y descripción).

### Objetivo pedagógico
Que el alumnado entienda cómo pasar de una estructura estática a una vista dinámica usando:
- `fetch`
- `async/await` básico
- transformación de datos con `map`
- render en DOM

---

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

---

## Plan por bloques de tiempo

## 16:30 - 17:00 | Apertura + cimientos del proyecto

### Objetivo del bloque
Entender el reto y preparar estructura base del proyecto.

### Paso a paso del docente
1. Presenta el reto del día con metáfora: “hoy levantamos una fachada dinámica, ladrillo a ladrillo con Senior Cat”.
2. Muestra 3 APIs públicas sugeridas:
   - Rick and Morty API
   - Pokémon API
   - TheMealDB
3. Explica criterios mínimos del entregable (imagen, título, descripción por tarjeta).
4. Guía creación de archivos:
   - `index.html`
   - `styles.css`
   - `script.js`

### Paso a paso del estudiante
1. Elige una API pública.
2. Crea estructura inicial de archivos.
3. Vincula CSS y JS en `index.html`.
4. Deja un contenedor vacío de tarjetas para usar después.

### Diferenciación
- **sin-ia:** elección de API y estructura guiadas por checklist del docente.
- **con-ia:** puede pedir a IA propuesta de estructura, pero debe justificar cada archivo creado.

---

## 17:00 - 18:00 | Práctica guiada (núcleo técnico)

### Objetivo del bloque
Consumir API y renderizar tarjetas funcionales.

### Paso a paso del docente (sin saltos)
1. Explica cómo inspeccionar JSON de la API (campos útiles).
2. Define en pizarra los 3 campos mínimos para cada tarjeta.
3. Implementa función asíncrona `loadData()` con `fetch` + `await`.
4. Muestra manejo básico de errores con `try/catch`.
5. Explica `map` para transformar datos en HTML.
6. Renderiza resultado en un contenedor con `innerHTML`.
7. Prueba en vivo y corrige errores comunes de ruta/campos.

### Paso a paso del estudiante
1. Crea constante `API_URL`.
2. Escribe función `loadData()`.
3. Convierte respuesta a JSON.
4. Selecciona array correcto (`results`, `meals`, etc.).
5. Usa `map` para crear tarjetas.
6. Inserta tarjetas en el DOM.
7. Ejecuta pruebas y corrige errores de campos `undefined`.

### Diferenciación
- **sin-ia:** implementar siguiendo guía línea por línea.
- **con-ia:** usar IA para primer borrador, luego depurar manualmente con DevTools.

---

## 18:00 - 18:20 | Receso
- Pausa activa.
- Recordatorio de Senior Cat: “un buen constructor descansa para volver con precisión”.

---

## 18:20 - 19:20 | Práctica autónoma con mejoras

### Objetivo del bloque
Mejorar la UI y robustecer el flujo de datos.

### Paso a paso del docente
1. Propone mejoras mínimas:
   - estado de carga
   - mensaje de error
   - diseño de tarjetas responsive
2. Revisa avances por parejas (feedback rápido).
3. Pide evidencias de funcionamiento (captura + código).

### Paso a paso del estudiante
1. Añade mensaje “Cargando datos...”.
2. Añade `catch` con mensaje amigable.
3. Mejora CSS (grid/flex, espaciado, jerarquía visual).
4. Verifica responsive en móvil/tablet/escritorio.

### Diferenciación
- **sin-ia:** foco en comprensión de cada línea y estilo básico consistente.
- **con-ia:** reto extra: pedir a IA refactor de estilos y luego comparar pros/contras.

---

## 19:20 - 20:00 | Revisión técnica + demo breve

### Objetivo del bloque
Validar calidad funcional y visual antes del cierre.

### Paso a paso del docente
1. Ejecuta checklist común de validación.
2. Pide demo corta de 1-2 estudiantes por modalidad.
3. Marca fallos frecuentes y correcciones en vivo.

### Paso a paso del estudiante
1. Pasa checklist funcional.
2. Pasa checklist visual.
3. Ajusta pendientes.
4. Prepara entrega final.

---

## 20:00 - 20:30 | Cierre, entrega y predicción

### Objetivo del bloque
Cerrar con evidencia, reflexión y proyección a CLASE4.

### Paso a paso del docente
1. Recoge entregables por modalidad.
2. Conduce autoevaluación rápida.
3. Solicita registro de dudas en `DUDAS.md`.
4. Pide predicción del siguiente tema.

### Paso a paso del estudiante
1. Entrega proyecto final.
2. Escribe autoevaluación (cómo se sintió y qué le costó).
3. Registra dudas (si hay).
4. Escribe predicción de CLASE4.

---

## Ejercicio guiado del día (estilo profesor, sin saltos)

## Parte A - HTML (estructura)
1. Crea el archivo `index.html`.
2. Agrega `header` con título y subtítulo de la API elegida.
3. Agrega `main` con sección de estado (`loading/error`) y contenedor `#cards`.
4. Vincula `styles.css` y `script.js`.

## Parte B - CSS (presentación)
1. Define estilos base (`body`, tipografía, fondo).
2. Crea un grid responsive para `#cards`.
3. Diseña `.card` con imagen, título y descripción.
4. Ajusta espaciado y contraste.

## Parte C - JS (datos dinámicos)
1. Define `const API_URL = '...'`.
2. Crea referencias DOM: `cardsContainer`, `status`.
3. Escribe `async function loadData()` con `try/catch/finally`.
4. Dentro de `try`, usa `await fetch(API_URL)` y `await response.json()`.
5. Extrae array de datos.
6. Usa `map` para generar HTML de tarjetas.
7. Inserta resultado en `cardsContainer.innerHTML`.
8. En `catch`, muestra mensaje de error.
9. Llama `loadData()` al final del script.

---

## Solución detallada (qué hace, por qué y para qué sirve)

## `index.html`
```html
<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tarjetas desde API</title>
  <link rel="stylesheet" href="./styles.css" />
  <script src="./script.js" defer></script>
</head>
<body>
  <header class="top">
    <h1>Tarjetas dinámicas con API</h1>
    <p>Senior Cat construye datos reales, ladrillo a ladrillo.</p>
  </header>

  <main class="layout">
    <p id="status">Cargando datos...</p>
    <section id="cards" class="cards"></section>
  </main>

  <script src="./script.js"></script>
</body>
</html>
```

**Explicación docente**
- **Qué hace:** define estructura visual y puntos de montaje del contenido dinámico.
- **Por qué así:** separa responsabilidades (estructura en HTML, estilo en CSS, lógica en JS).
- **Para qué sirve:** permite escalar el proyecto sin mezclar todo en un solo archivo.

## `styles.css`
```css
* { box-sizing: border-box; }
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #f4f6fb;
  color: #1f2937;
}

.top {
  padding: 1rem;
  background: #111827;
  color: #fff;
}

.layout {
  width: min(1100px, 92%);
  margin: 1rem auto 2rem;
}

#status {
  margin: 0 0 1rem;
  font-weight: 700;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 16px rgba(0,0,0,.08);
}

.card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.card .content {
  padding: .8rem;
}

.card h3 {
  margin: 0 0 .5rem;
  font-size: 1rem;
}

.card p {
  margin: 0;
  font-size: .92rem;
  line-height: 1.35;
}
```

**Explicación docente**
- **Qué hace:** convierte datos en una interfaz legible y responsive.
- **Por qué así:** `grid + minmax` simplifica adaptación a distintos tamaños.
- **Para qué sirve:** asegura experiencia de usuario consistente en móvil y escritorio.

## `script.js` (ejemplo con Rick and Morty API)
```js
const API_URL = 'https://rickandmortyapi.com/api/character';

const statusEl = document.getElementById('status');
const cardsEl = document.getElementById('cards');

function getDescription(character) {
  return `${character.species} - ${character.status}`;
}

function cardTemplate(character) {
  return `
    <article class="card">
      <img src="${character.image}" alt="${character.name}" />
      <div class="content">
        <h3>${character.name}</h3>
        <p>${getDescription(character)}</p>
      </div>
    </article>
  `;
}

async function loadData() {
  statusEl.textContent = 'Cargando datos...';

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error('No se pudo obtener la información de la API.');
    }

    const data = await response.json();
    const items = data.results || [];

    const cardsHtml = items
      .map((item) => cardTemplate(item))
      .join('');

    cardsEl.innerHTML = cardsHtml;
    statusEl.textContent = `Tarjetas renderizadas: ${items.length}`;
  } catch (error) {
    statusEl.textContent = `Error: ${error.message}`;
    cardsEl.innerHTML = '';
  }
}

loadData();
```

**Explicación docente**
- **Qué hace:** consume API, transforma datos y renderiza tarjetas.
- **Por qué así:** separa funciones (`cardTemplate`, `getDescription`, `loadData`) para facilitar lectura y mantenimiento.
- **Para qué sirve:** establece base real para proyectos donde frontend depende de backend/API.

---

## Checklist de validación (funcional + visual)

### Funcional
- [ ] La página carga sin errores de consola.
- [ ] Se hace petición real a la API.
- [ ] Se renderizan tarjetas con imagen, título y descripción.
- [ ] Hay mensaje de carga inicial.
- [ ] Si falla la API, aparece mensaje de error claro.

### Visual
- [ ] Tarjetas alineadas y con espaciado consistente.
- [ ] Imágenes no deformadas (`object-fit: cover`).
- [ ] Texto legible y contraste correcto.
- [ ] Diseño usable en móvil y escritorio.

---

## Errores frecuentes y cómo corregirlos

1. **`Cannot read properties of undefined`**
   - Causa: usar campo incorrecto del JSON.
   - Solución: inspeccionar `data` con `console.log(data)` y ajustar `data.results`.

2. **No renderiza nada en pantalla**
   - Causa: selector DOM mal escrito (`#cards`).
   - Solución: revisar `id` exacto en HTML y JS.

3. **Error CORS o 404**
   - Causa: endpoint inválido o API restringida.
   - Solución: probar endpoint en navegador/postman y cambiar API si es necesario.

4. **Tarjetas desordenadas en móvil**
   - Causa: layout fijo sin responsive.
   - Solución: usar grid con `auto-fit` y `minmax`.

5. **Imagen rota**
   - Causa: campo de imagen no existe para esa API.
   - Solución: adaptar plantilla al nombre de campo correcto o usar imagen fallback.

---

## Entregable final por modalidad

### `sin-ia`
- Código funcional en HTML/CSS/JS hecho manualmente.
- Mínimo 8 tarjetas renderizadas.
- Mini texto (5-8 líneas): qué entendió de `fetch`, `map` y render DOM.

### `con-ia`
- Código funcional en HTML/CSS/JS con iteraciones de prompt.
- Registro de 2-3 prompts usados + qué corrigió manualmente.
- Mini texto (5-8 líneas): qué propuso la IA, qué errores detectó y cómo los corrigió.

---

## Cierre de clase

### Autoevaluación rápida
1. ¿Cómo me sentí hoy (1-5)?
2. ¿Qué parte entendí mejor?
3. ¿Qué parte necesito practicar más?

### Registro de dudas
- Si hay dudas, documentarlas en `DUDAS.md`.

### Predicción CLASE4
- Posible foco: eventos de usuario + filtros/búsquedas sobre tarjetas + paginación simple.
- Meta: pasar de “mostrar datos” a “interactuar con datos”.

---

## Próximo paso recomendado
Crear una segunda versión del ejercicio con buscador por nombre para reforzar manipulación de DOM y eventos.
