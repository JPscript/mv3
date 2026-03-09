# JS básico (sin IA) — Contador smart

## Opciones propuestas (mínimo 5)
1. Contador smart.
2. Conversor simple.
3. Promedio de notas.
4. Lista mini.
5. Adivina número.

## Opción elegida
- Contador smart.

## Paso a paso docente
1. Crea estructura HTML mínima: título, número, mensaje y 2 botones.
2. Conecta `script.js` al final del `body`.
3. En JS, declara estado inicial `total = 0`.
4. Captura elementos del DOM con `getElementById`.
5. Crea función `render()` para pintar número y mensaje.
6. Implementa regla de mensajes:
  - 0: "Empezamos"
  - 1 a 9: "Vas bien"
  - 10 o más: "¡Modo Senior Cat activado!"
7. Asocia click de "Sumar" para incrementar y volver a renderizar.
8. Asocia click de "Reiniciar" para volver a 0 y renderizar.
9. Llama `render()` al cargar para evitar interfaz vacía.
10. Prueba manual de profesor: 0, 1, 9, 10 y reset.

## Solución completa explicada

```html
<h1>Contador</h1>
<p id="contador">0</p>
<p id="mensaje">Empezamos</p>
<button id="sumar-btn">Sumar</button>
<button id="reset-btn">Reiniciar</button>
<script src="./script.js"></script>
```

```js
let total = 0;
const contador = document.getElementById('contador');
const mensaje = document.getElementById('mensaje');
const sumarBtn = document.getElementById('sumar-btn');
const resetBtn = document.getElementById('reset-btn');

function render() {
  contador.textContent = total;
  if (total === 0) mensaje.textContent = 'Empezamos';
  else if (total < 10) mensaje.textContent = 'Vas bien';
  else mensaje.textContent = '¡Modo Senior Cat activado!';
}

sumarBtn.addEventListener('click', () => { total += 1; render(); });
resetBtn.addEventListener('click', () => { total = 0; render(); });
render();
```

- `render()` centraliza actualización de interfaz.
- `addEventListener` conecta interacción usuario-lógica.

## Qué resuelve este ejercicio
- Introduce patrón fundamental estado + render en frontend.
- Base para escalar a componentes más complejos.
