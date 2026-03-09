# CSS introducción (sin IA)

## Opciones propuestas (mínimo 5)
1. Mejorar perfil.
2. Tarjetas de servicios.
3. Landing básica.
4. Tabla de precios.
5. Dashboard simple.

## Opción elegida
- Mejorar perfil.

## Paso a paso docente
1. Crea (o abre) `styles.css` y vincúlalo desde `index.html`.
2. Define variables en `:root` para colores principales.
3. Aplica estilo base en `body` (`margin`, `font-family`, `background`, `color`).
4. Centra el contenido con `width:min(...)` en `header/main/footer`.
5. Convierte menú en `flex` para ordenar enlaces.
6. Da estilo a `section` con fondo, padding y bordes redondeados.
7. Diseña botón con color de acento y bordes redondos.
8. Verifica contraste visual y legibilidad del texto.
9. Revisión final: coherencia visual entre todas las secciones.

## Solución completa explicada

```css
:root { --bg:#f7f7fb; --text:#222; --accent:#6b5bff; }
body { margin:0; font-family:Arial,sans-serif; background:var(--bg); color:var(--text); }
header, main, footer { width:min(900px,92%); margin:0 auto; }
nav { display:flex; gap:.5rem; flex-wrap:wrap; }
section { background:#fff; padding:1rem; border-radius:12px; margin:1rem 0; }
button { background:var(--accent); color:#fff; border:none; padding:.6rem 1rem; border-radius:999px; }
```

- `:root` centraliza colores para mantenimiento.
- `width:min(...)` mejora responsive sin media query compleja.
- `display:flex` ordena enlaces de navegación.

## Qué resuelve este ejercicio
- Pasa de HTML “en bruto” a interfaz clara y usable.
- Introduce fundamentos de diseño escalable para clases futuras.
