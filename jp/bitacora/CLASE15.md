# CLASE15 - Login real contra la API y JWT guardado en cookie

**Fecha:** 2026-03-25  
**Horario:** 16:30 - 20:30  
**Receso:** 18:00 - 18:30  
**Nivel:** intermedio  
**Clase anterior de referencia:** jp/bitacora/CLASE14.md  
**Lema del grupo Ladrillos:** Construyendo el futuro del desarrollo web, un ladrillo a la vez.  
**Mentor de la sesión:** Senior Cat 🐱

---

## Contexto y continuidad con CLASE14

Si CLASE14 salió bien, la app ya debería estar bastante menos hardcodeada. Ahora toca un ladrillo nuevo y muy importante: autenticar contra la API real, obtener el JWT y aprender a conservarlo en una cookie para poder usarlo en peticiones protegidas.

## Referencia visual del wireframe

El boceto también muestra con bastante claridad tres pantallas relacionadas con identidad de usuario:

- `Login`,
- `Registro`,
- `Perfil`.

Eso hace que CLASE15 no sea una clase abstracta sobre auth, sino una sesión para darle vida a esas pantallas del wireframe. El objetivo es que dejen de ser cajas dibujadas en la pizarra y pasen a formar parte del recorrido real de la aplicación.

---

## Tema y objetivo del día

### Tema central

Implementar login real contra `api-recetas`, guardar el JWT en una cookie y empezar a usarlo para acciones autenticadas.

### Objetivo general

1. Conectar el formulario de login con `POST /auth/login`.
2. Entender qué devuelve el backend al autenticarse.
3. Guardar el token JWT en una cookie.
4. Leer y reutilizar esa sesión para peticiones protegidas.
5. Empezar a reflejar en la interfaz que el usuario ya está autenticado.

---

## Endpoints protagonistas del día

### Auth

- `POST /auth/login`
- `GET /auth/profile`

### Protegidos recomendados para probar sesión

- `POST /restaurants`
- `POST /restaurants/:restaurantId/comments`
- `POST /restaurants/:restaurantId/ratings`

---

## Qué debe quedar claro en esta clase

- Qué es un JWT.
- Qué significa guardar un token en cliente.
- Diferencia entre guardarlo en `localStorage` y guardarlo en cookie.
- Cómo leer el token desde Angular para reutilizarlo.
- Cómo hacer que la UI se comporte distinto si hay sesión activa.
- Cómo conecta el flujo `login -> perfil` con el wireframe general del proyecto.

No se busca seguridad avanzada total en esta sesión. Se busca que el flujo completo quede entendido y funcionando.

---

## Plan por bloques de tiempo

### 16:30 - 16:50 | Repaso del estado real de la app

- Revisar qué quedó conectado en CLASE14.
- Confirmar que ya se puede concentrar el esfuerzo en auth.

### 16:50 - 17:30 | Login real contra la API

- Conectar formulario de login.
- Enviar credenciales a `POST /auth/login`.
- Inspeccionar la respuesta del backend.

### 17:30 - 18:00 | Guardar JWT en cookie

- Explicar qué es una cookie en este contexto.
- Guardar el token recibido.
- Leer la cookie desde el frontend.
- Decidir cómo reutilizarla para peticiones siguientes.

### 18:00 - 18:30 | ⏸ RECESO

### 18:30 - 19:15 | Perfil y primer uso de sesión

- Llamar a `GET /auth/profile`.
- Mostrar nombre o datos básicos del usuario logueado.
- Cambiar parte del header o la UI según haya sesión.

### 19:15 - 20:00 | Primera petición protegida real

- Usar el token guardado para una acción protegida.
- Probar comentario, rating o creación según el estado de la app.
- Detectar errores típicos de auth y corregirlos.

### 20:00 - 20:30 | Cierre

- Revisar el flujo login → cookie → petición protegida.
- Dejar lista la app para la clase final de Leaflet y remate.

---

## Actividades diferenciadas

### sin-ia

1. Conectar el login con `POST /auth/login`.
2. Guardar el JWT en una cookie y comprobar que existe.
3. Usar esa sesión para recuperar perfil o ejecutar una petición protegida.
4. Explicar por escrito qué hace el token y por qué la cookie sirve para conservar la sesión.

### con-ia

1. Pedir a la IA una propuesta de `AuthService` y revisarla línea a línea.
2. Pedir a la IA una forma sencilla de guardar y leer cookie en Angular.
3. Pedir a la IA ayuda para diferenciar `localStorage` frente a cookie y justificar la elección.
4. Pedir a la IA una propuesta de integración de perfil o header autenticado y adaptarla al proyecto.

---

## Entregables mínimos del día

- [ ] Login real conectado a backend.
- [ ] JWT guardado en cookie.
- [ ] Perfil o estado de sesión visible en la UI.
- [ ] Al menos una petición protegida probada.
- [ ] Dudas en `DUDAS.md`.

---

## Checklist de cierre

- [ ] Entiendo qué devuelve el backend en el login.
- [ ] Entiendo qué es un JWT a nivel práctico.
- [ ] Sé dónde se está guardando el token en el frontend.
- [ ] Puedo explicar cómo una petición protegida usa la sesión guardada.
- [ ] Autoevaluación personal completada (1-5).

---

## Predicción de la siguiente clase (CLASE16)

1. Entender Leaflet con calma.
2. Integrar mapa con sentido dentro de la app.
3. Terminar y rematar la aplicación Angular.

