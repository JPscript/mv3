# CLASE16 - Leaflet con sentido y cierre final de la aplicación Angular

**Fecha:** 2026-03-26  
**Horario:** 16:30 - 20:30  
**Receso:** 18:00 - 18:30  
**Nivel:** intermedio  
**Clase anterior de referencia:** jp/bitacora/CLASE15.md  
**Lema del grupo Ladrillos:** Construyendo el futuro del desarrollo web, un ladrillo a la vez.  
**Mentor de la sesión:** Senior Cat 🐱

---

## Contexto y continuidad con CLASE15

Si CLASE15 salió bien, la app ya debería poder autenticarse y usar sesión real. La última sesión se centra en entender bien Leaflet, integrarlo con sentido dentro de la app y cerrar el proyecto Angular con el mayor nivel posible de coherencia funcional.

## Referencia visual del wireframe

En el wireframe aparece un icono de ubicación en la cabecera del `Home` y también una relación visual entre listado, detalle y navegación superior. Eso sugiere que el mapa no debe entrar como pantalla aislada o adorno final: debe sentirse como una extensión natural del flujo principal.

Senior Cat puede usar este boceto para remarcar una idea importante: el mapa aporta valor cuando ayuda a entender dónde está el restaurante, cómo se relaciona con el listado y cómo completa la experiencia general del proyecto.

---

## Tema y objetivo del día

### Tema central

Comprender Leaflet dentro del proyecto, conectar el mapa con el frontend real y rematar la aplicación completa.

### Objetivo general

1. Entender qué hace Leaflet y qué necesita para funcionar bien en Angular.
2. Integrar el mapa como parte real de la app y no como pantalla aislada.
3. Aprovechar latitud y longitud reales del backend cuando sea posible.
4. Terminar la aplicación con revisión funcional, visual y de navegación.

---

## Qué debe quedar claro en esta clase

- Qué papel cumple Leaflet en la app.
- Qué necesita un mapa para renderizar bien: contenedor, tamaño, estilos y datos.
- Cómo se relacionan `latitud` y `longitud` del backend con la vista de mapa.
- Cómo encajar mapa, listado y detalle en un recorrido lógico de usuario.
- Cómo el resultado final se parece al wireframe original, pero con comportamiento real y no solo con cajas dibujadas.

---

## Plan por bloques de tiempo

### 16:30 - 16:50 | Repaso del estado final tras CLASE15

- Confirmar si login y sesión ya funcionan.
- Detectar qué queda pendiente antes del cierre.

### 16:50 - 17:30 | Entender Leaflet dentro de Angular

- Revisar la estructura del componente `mapa`.
- Explicar estilos globales, contenedor y renderización.
- Explicar por qué a veces Leaflet falla si el tamaño del mapa no está bien resuelto.

### 17:30 - 18:00 | Conectar mapa con datos reales o semi-reales

- Usar coordenadas reales si ya están disponibles en el flujo actual.
- Revisar uno o varios marcadores.
- Enlazar el mapa con el resto de la navegación.

### 18:00 - 18:30 | ⏸ RECESO

### 18:30 - 19:15 | Cierre funcional de la app

- Revisar home, detalle, login, perfil y mapa.
- Corregir incoherencias visibles.
- Quitar restos de hardcode que todavía desentonen.

### 19:15 - 20:00 | Prueba integral y demo final

- Recorrido completo de la app.
- Verificación de errores.
- Explicación del flujo frontend-backend-mapa.

### 20:00 - 20:30 | Cierre del bloque Angular

- Balance final.
- Qué quedó bien.
- Qué quedaría para una versión 2.

---

## Actividades diferenciadas

### sin-ia

1. Revisar el componente `mapa` y explicar qué necesita Leaflet para renderizar bien.
2. Mostrar el mapa con datos coherentes con la app.
3. Corregir restos de hardcode o incoherencias visuales finales.
4. Preparar una mini demo del proyecto completo.

### con-ia

1. Pedir a la IA una explicación de por qué Leaflet puede fallar en Angular si el contenedor no tiene tamaño correcto.
2. Pedir ayuda para conectar el mapa con los datos del backend o del flujo real de la app.
3. Pedir una lista de chequeo final del proyecto y seguirla.
4. Justificar después qué arreglos finales se aplicaron y por qué.

---

## Entregables mínimos del día

- [ ] Mapa comprendido y funcional dentro de la app.
- [ ] Flujo principal de la app revisado de extremo a extremo.
- [ ] Restos duros de hardcode minimizados.
- [ ] Demo final preparada.
- [ ] Autoevaluación final del bloque Angular.

---

## Checklist de cierre

- [ ] Entiendo mejor cómo integrar Leaflet en Angular.
- [ ] La app tiene un flujo principal funcional.
- [ ] Puedo explicar cómo se conectan frontend, API y mapa.
- [ ] Puedo mostrar el proyecto de principio a fin sin perderme.
- [ ] Autoevaluación final completada (1-5).

### Autoevaluación sugerida

- ¿Qué parte del proyecto quedó mejor resuelta?
- ¿Qué me costó más: Angular, integración con backend, auth o mapa?
- ¿Qué mejoraría si tuviera una semana más?
