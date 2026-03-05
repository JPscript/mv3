# CSS medio (sin IA) — Tarjetas de servicios

## Opciones propuestas (mínimo 5)
1. Tarjetas de servicios.
2. Tarjetas de productos.
3. Tarjetas de películas.
4. Tarjetas de cursos.
5. Tarjetas de equipo.

## Opción elegida
- Tarjetas de servicios.

## Paso a paso docente
1. Crea contenedor `.cards` en HTML con varias `.card` dentro.
2. En CSS, define variables en `:root` (`--gap`, `--accent`).
3. Convierte `.cards` en grid de 3 columnas.
4. Estiliza cada `.card` con borde, padding y radio.
5. Ajusta títulos (`h3`) para mejorar jerarquía visual.
6. Estiliza enlaces y estado `:hover`.
7. Agrega media query para tablet (2 columnas).
8. Agrega media query para móvil (1 columna).
9. Revisa espaciados para evitar bloques “apretados”.
10. Verifica que todas las tarjetas mantengan el mismo patrón visual.

## Solución completa explicada

```css
:root{--gap:1rem;--accent:#5c6cff}
.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--gap)}
.card{padding:1rem;border:1px solid #ddd;border-radius:12px;background:#fff}
.card h3{margin-top:0}
.card a{color:var(--accent);text-decoration:none}
.card a:hover{text-decoration:underline}
@media(max-width:900px){.cards{grid-template-columns:repeat(2,1fr)}}
@media(max-width:600px){.cards{grid-template-columns:1fr}}
```

- Grid distribuye tarjetas de forma limpia y escalable.
- Media queries garantizan lectura en móvil.

## Qué resuelve este ejercicio
- Construye una sección reusable de servicios para landing pages reales.
- Te entrena en layout adaptable, clave para frontend profesional.
