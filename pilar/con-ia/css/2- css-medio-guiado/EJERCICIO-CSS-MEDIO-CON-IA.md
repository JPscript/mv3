# CSS medio (con IA)

## Opciones propuestas (mínimo 5)
1. Tarjetas servicios.
2. Dashboard.
3. Landing neón.
4. Tabla precios.
5. Perfil lollipop.

## Opción elegida
- Tarjetas servicios.

## Paso a paso docente (con IA)
1. Pide a la IA una propuesta visual de tarjetas en modo oscuro.
2. Aplica estilos base en `body` y valida contraste.
3. Genera layout con `flex-wrap` para adaptabilidad rápida.
4. Ajusta tamaño mínimo de tarjeta (`flex-basis`) para evitar cortes.
5. Revisa botones: tamaño táctil y legibilidad de texto.
6. Pide iteración para mejorar spacing interno de tarjeta.
7. Comprueba visual en diferentes anchos de ventana.
8. Documenta decisiones: qué mantuviste y qué descartaste de la IA.

## Solución completa explicada

```css
:root{--bg:#0f1320;--card:#171d2e;--text:#eaf0ff;--accent:#5ee6ff}
body{background:var(--bg);color:var(--text);font-family:system-ui}
.cards{display:flex;flex-wrap:wrap;gap:1rem}
.card{flex:1 1 280px;background:var(--card);padding:1rem;border-radius:14px}
.card button{background:var(--accent);border:none;padding:.5rem .8rem;border-radius:999px}
```

- Flex + wrap crea layout adaptable con poco código.
- Se revisa manualmente contraste y espaciado final.

## Qué resuelve este ejercicio
- Te enseña diseño iterativo asistido por IA con criterios de UX.
- Consolida habilidades de layout flexible para componentes reutilizables.
