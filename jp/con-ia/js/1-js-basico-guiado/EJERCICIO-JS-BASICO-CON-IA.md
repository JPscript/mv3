# JS básico (con IA)

## Opciones propuestas (mínimo 5)
1. Contador smart.
2. To-do mini.
3. Conversor.
4. Promedio notas.
5. Juego número.

## Opción elegida
- Contador smart.

## Prompt base
"Crea un contador con sumar/reiniciar y mensajes según cantidad."

## Paso a paso docente (con IA)
1. Solicita versión inicial del contador y pégala en `script.js`.
2. Revisa nombres de variables para que sean claros.
3. Pide mejora para separar lógica de pintado (`draw/render`).
4. Verifica manualmente los tres estados de mensaje (0, intermedio, 10+).
5. Ajusta eventos de botones para evitar código duplicado.
6. Prueba reinicio y confirma que también actualiza mensaje.
7. Deja comentario en bitácora: qué aportó IA y qué validaste tú.

## Solución completa explicada

```js
let n = 0;
const out = document.getElementById('contador');
const msg = document.getElementById('mensaje');
document.getElementById('sumar-btn').onclick = () => { n++; draw(); };
document.getElementById('reset-btn').onclick = () => { n = 0; draw(); };
function draw(){ out.textContent = n; msg.textContent = n >= 10 ? '¡Modo Senior Cat activado!' : n === 0 ? 'Empezamos' : 'Vas bien'; }
draw();
```

- IA acelera el primer borrador; revisión manual mejora legibilidad y nombres.

## Qué resuelve este ejercicio
- Refuerza uso responsable de IA en lógica básica de interacción.
- Entrena validación funcional antes de dar una tarea por finalizada.
