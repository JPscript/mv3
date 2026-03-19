# CLASE15 - Leaflet con coordenadas reales y cierre funcional de la app

**Fecha:** 2026-03-25  
**Horario:** 16:30 - 20:30  
**Receso:** 18:00 - 18:30  
**Nivel:** intermedio  
**Clase anterior de referencia:** jp/bitacora/CLASE14.md  
**Lema del grupo Ladrillos:** Construyendo el futuro del desarrollo web, un ladrillo a la vez.  
**Mentor de la sesión:** Senior Cat 🐱

---

## Contexto y continuidad con CLASE14

CLASE14 dejó la app mucho más cerca de su versión real. CLASE15 es la jornada de ensamblaje fuerte: meter coordenadas reales, reforzar el mapa y eliminar la mayor parte del hardcoded que aún sobreviva.

---

## Tema y objetivo del día

### Tema central

Integrar Leaflet con datos reales y cerrar la mayor parte de la funcionalidad pendiente.

### Objetivo general

1. Sustituir coordenadas hardcodeadas por coordenadas reales de restaurantes.
2. Mostrar mapa funcional y coherente con los datos del backend.
3. Revisar navegación, detalle, CRUD y sesión.
4. Dejar la app prácticamente terminada antes de la última clase.

---

## Foco técnico del día

- `mapa` como página útil y no solo decorativa,
- detalle de restaurante enlazado con posición,
- revisión de errores de integración,
- retirada sistemática de restos hardcoded.

---

## Plan por bloques de tiempo

### 16:30 - 16:50 | Repaso de CLASE14

- Ver qué ya funciona con datos reales.
- Hacer lista corta de pendientes críticos.

### 16:50 - 17:30 | Leaflet con coordenadas del backend

- Usar latitud y longitud reales.
- Verificar marcador y centro del mapa.
- Ajustar errores típicos de Leaflet en Angular.

### 17:30 - 18:00 | Mapa y navegación

- Enlazar visualmente mapa, home y detalle.
- Revisar si la página `mapa` debe mostrar uno o varios restaurantes.

### 18:00 - 18:30 | ⏸ RECESO

### 18:30 - 19:15 | Limpieza funcional final

- Quitar placeholders.
- Corregir textos temporales.
- Revisar formularios, botones y flujos de sesión.

### 19:15 - 20:00 | Prueba integral de la app

- Login.
- Listado.
- Detalle.
- Mapa.
- Acciones protegidas.

### 20:00 - 20:30 | Cierre y preparación de la última clase

---

## Actividades diferenciadas

### sin-ia

1. Hacer visible el mapa con coordenadas reales.
2. Revisar y corregir enlaces rotos.
3. Eliminar textos hardcoded que ya tengan equivalente real.
4. Probar el flujo principal de la app de inicio a fin.

### con-ia

1. Pedir a la IA ayuda para depurar el mapa si hay problemas de render.
2. Pedir una lista de chequeo de integración frontend-backend y seguirla.
3. Pedir ayuda para detectar qué piezas del UI siguen desacopladas del backend.
4. Justificar después cada ajuste final aplicado.

---

## Entregables mínimos del día

- [ ] Mapa funcionando con coordenadas reales.
- [ ] Flujo principal revisado de forma completa.
- [ ] Gran parte del hardcoded eliminada.
- [ ] Lista clara de remates para la última clase.
- [ ] Dudas en `DUDAS.md`.

---

## Checklist de cierre

- [ ] El mapa ya forma parte real del proyecto.
- [ ] Sé qué pantallas siguen necesitando remate.
- [ ] La app está casi lista para el cierre final.
- [ ] Tengo claro qué mejorar mañana en UX/UI y perfil.
- [ ] Autoevaluación personal completada (1-5).

---

## Predicción de la siguiente clase (CLASE16)

1. Pulido UX/UI.
2. Página de perfil más potente y cuidada.
3. Revisión final del proyecto.
4. Entrega y cierre del bloque Angular.
