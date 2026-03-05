# CSS introducción (con IA)

## Opciones propuestas (mínimo 5)
1. Rediseño perfil.
2. Tarjetas servicios.
3. Dashboard pastel.
4. Landing neón.
5. Pricing table.

## Opción elegida
- Tarjetas servicios.

## Prompt base
"Crea estilos para 6 tarjetas responsive con hover, jerarquía visual y botones consistentes."

## Paso a paso docente (con IA)
1. Solicita a la IA una propuesta inicial de paleta y layout.
2. Aplica el CSS en archivo local y revisa que no rompa el HTML.
3. Pide optimización responsive con 2 breakpoints.
4. Comprueba manualmente la rejilla en móvil, tablet y escritorio.
5. Ajusta contraste de texto sobre fondos de color.
6. Pide a la IA mejorar consistencia de botones y estados hover.
7. Revisa performance visual: sombras y efectos sin exceso.
8. Cierra con checklist de calidad (coherencia, legibilidad, responsive).

## Solución completa explicada

```css
:root{--bg:#fff7fc;--card:#fff;--a:#ff5fa2;--b:#7b6dff}
body{font-family:'Segoe UI',sans-serif;background:var(--bg);margin:0}
.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem}
.card{background:var(--card);padding:1rem;border-radius:14px;box-shadow:0 6px 16px #0001}
.card:hover{transform:translateY(-2px)}
button{background:linear-gradient(90deg,var(--a),var(--b));color:#fff;border:none;border-radius:999px;padding:.5rem .9rem}
@media (max-width:800px){.grid{grid-template-columns:repeat(2,1fr)}}
@media (max-width:560px){.grid{grid-template-columns:1fr}}
```

- La IA acelera el estilo base, pero se revisa manualmente responsive y contraste.

## Qué resuelve este ejercicio
- Enseña a usar IA para acelerar diseño sin perder control técnico.
- Refuerza validación visual multi-dispositivo.
