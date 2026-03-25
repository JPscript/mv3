# LOGIN en restaurantes2

## Objetivo

Este documento explica paso a paso cómo quedó implementado el login en `restaurantes2`, cómo se guarda el JWT en una cookie creada desde Angular y cómo se reutiliza esa sesión para acceder a rutas y endpoints privados.

---

## 1. Qué devuelve el backend

La API `api-recetas` expone estos endpoints:

- `POST /auth/login`
- `POST /auth/register`
- `GET /auth/profile`

Tanto `login` como `register` devuelven una respuesta con esta forma:

```ts
{
	access_token: string,
	token_type: 'Bearer',
	user: {
		id: number,
		nombre: string,
		image_url: string | null,
		created_at: string,
		updated_at: string,
	}
}
```

Ese `access_token` es el JWT que luego necesitamos mandar al backend en endpoints privados.

---

## 2. Dónde se centraliza la autenticación

Toda la lógica principal de auth vive en:

- `src/app/services/auth.service.ts`

Ese servicio se encarga de:

1. llamar a `login` y `register`,
2. guardar el JWT en cookie,
3. reconstruir la sesión al arrancar la app,
4. cargar el perfil autenticado,
5. limpiar la sesión al hacer logout.

### Sobre el `constructor` en Angular 21

En este proyecto usamos mucho `inject()`, que es una forma moderna de pedir dependencias en Angular 21.

Eso no significa que `constructor` esté mal o haya dejado de servir.

`constructor` sigue siendo válido y sigue siendo Angular moderno cuando se usa con sentido.

En `auth.service.ts` se mantiene porque ahí necesitamos ejecutar una acción apenas se crea el servicio:

1. comprobar si ya existía una cookie con token,
2. intentar reconstruir la sesión,
3. dejar la app lista para saber si el usuario sigue autenticado o no.

O sea: `inject()` se usa para pedir dependencias y `constructor` se usa para ejecutar lógica inicial. Las dos cosas pueden convivir perfectamente en Angular 21.

---

## 3. Qué es un `signal` y por qué lo usamos en login

Un `signal` es una forma de guardar estado reactivo en Angular.

Dicho de forma simple:

- guarda un valor actual,
- permite leer ese valor,
- permite cambiarlo,
- y Angular puede reaccionar cuando cambia.

En este proyecto usamos señales porque el login necesita varios datos que pueden cambiar a lo largo del tiempo:

- el token,
- el usuario actual,
- si la autenticación ya terminó de comprobarse o no.

En `auth.service.ts` aparecen estas señales:

- `token`
- `currentUserState`
- `authReadyState`

### Qué significa cada una

#### `token`

Guarda el JWT actual.

- si vale un string, hay un token cargado,
- si vale `null`, no hay token en memoria.

#### `currentUserState`

Guarda el usuario autenticado en memoria.

- si vale un objeto `User`, sabemos quién está logueado,
- si vale `null`, la app todavía no tiene usuario cargado o la sesión está cerrada.

#### `authReadyState`

Guarda si la aplicación ya terminó de comprobar el estado de auth.

Esto es importante porque no es lo mismo:

- “todavía no sé si hay sesión”,
- que “ya comprobé y no hay sesión”.

### Por qué no usamos variables normales

Podríamos guardar estos valores en propiedades normales, pero perderíamos parte de la reactividad.

Con `signal`, Angular tiene un mecanismo más claro para saber que el estado cambió. Es como si Senior Cat fuera moviendo ladrillos con etiquetas visibles para toda la obra: cuando cambia una pieza importante, el resto del edificio sabe que tiene que reajustarse.

### Cómo se leen

Los signals se leen como funciones:

```ts
this.token()
this.currentUser()
this.authReady()
```

Por eso en plantillas y componentes aparece ese estilo de llamada con paréntesis.

### Qué hace `computed`

`computed` crea un valor derivado a partir de uno o varios signals.

Ejemplo del proyecto:

```ts
readonly isLoggedIn = computed(() => this.token() !== null);
```

Eso significa:

- no guardamos manualmente otro booleano,
- Angular calcula `isLoggedIn()` mirando el token,
- si el token cambia, `isLoggedIn()` cambia solo.

---

## 4. Cómo se guarda la cookie

En esta primera fase, la cookie la escribe Angular usando `document.cookie`.

Idea simplificada:

```ts
document.cookie = `api_recetas_token=${token}; path=/; max-age=604800; samesite=lax`;
```

Esto significa:

- nombre de la cookie: `api_recetas_token`,
- dura 7 días,
- es válida en toda la app (`path=/`),
- usa `SameSite=Lax` como mínimo básico.

### Importante

Esta cookie **no es HttpOnly**, porque la crea el frontend. Eso sirve para aprender el flujo y dejar funcionando la app con la API actual, pero no ofrece la seguridad máxima.

---

## 5. Cómo se recupera la cookie

El mismo `AuthService` lee la cookie cuando arranca la aplicación.

La lectura se hace recorriendo `document.cookie`, que llega como una cadena de texto con todas las cookies del navegador.

Proceso:

1. separar cookies por `;`,
2. buscar la que empieza por `api_recetas_token=`,
3. decodificar su valor,
4. guardarlo en un signal para que el resto de la app lo use.

---

## 6. Cómo se usa el token en peticiones privadas

El token no se añade manualmente en cada componente.

Para eso existe un interceptor en:

- `src/app/interceptors/auth.interceptor.ts`

Ese interceptor:

1. pregunta al `AuthService` si hay token,
2. si existe, clona la request,
3. añade `Authorization: Bearer <token>`,
4. deja que la petición siga hacia el backend.

Así, componentes como crear, actualizar o borrar restaurante no tienen que repetir esa lógica.

---

## 7. Cómo se protege una ruta

La protección de rutas se hace con:

- `src/app/guards/auth.guard.ts`

Ese guard:

1. consulta al `AuthService`,
2. comprueba si la sesión ya está lista,
3. si hay login, deja pasar,
4. si no hay login, redirige a `/login`.

Rutas privadas actuales:

- `/perfil`
- `/restaurantes/crear-restaurante`
- `/restaurantes/actualizar-restaurante/:id`
- `/restaurantes/borrar-restaurante/:id`

---

## 8. Cómo se reconstruye la sesión al recargar la página

Cuando la app arranca:

1. `AuthService` intenta leer la cookie,
2. si encuentra token, llama a `GET /auth/profile`,
3. si el backend lo valida, reconstruye el usuario en memoria,
4. si falla, limpia cookie y deja la app como sesión cerrada.

Eso permite que el usuario siga “logueado” aunque recargue la página.

### Qué papel cumple el `constructor` aquí

En el momento en que Angular crea el `AuthService`, su `constructor` se ejecuta automáticamente.

Ahí ocurre esta decisión:

1. si `token()` ya tiene valor porque la cookie existía, se intenta `loadProfile()`,
2. si no había token, se marca `authReadyState` como `true` y la app sabe que no hay sesión previa.

Ese `constructor` no está ahí para pedir dependencias. Para eso ya usamos `inject()`. Está ahí para arrancar el proceso inicial de reconstrucción de sesión.

---

## 9. Cómo funciona el login paso a paso y por qué redirige a restaurantes

El flujo real del login se reparte entre dos archivos:

- `src/app/components/pages/login/login.ts`
- `src/app/services/auth.service.ts`

### Paso 1. El usuario completa el formulario

En `login.html`, los campos están conectados con:

```ts
[(ngModel)]="nombre"
[(ngModel)]="password"
```

Eso hace que el componente `login.ts` vaya guardando lo que el usuario escribe en las propiedades:

- `nombre`
- `password`

### Paso 2. El formulario llama a `submitLogin()`

Cuando el usuario envía el formulario, Angular ejecuta:

```ts
submitLogin()
```

Ese método:

1. limpia errores anteriores,
2. valida que los campos no estén vacíos,
3. pone `isSubmitting = true`,
4. llama a `authService.login(...)`.

### Paso 3. `authService.login(...)` devuelve un Observable

El servicio hace esta petición:

```ts
return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, credentials)
```

Eso no devuelve directamente el resultado final, sino un `Observable`.

Un `Observable` representa algo asincrónico que puede terminar más tarde. En este caso, la respuesta HTTP del backend.

### Paso 4. `subscribe(...)` espera el resultado

En `login.ts`, el componente hace:

```ts
.subscribe({
	next: () => { ... },
	error: () => { ... },
})
```

Esto significa:

- `next` se ejecuta si la petición sale bien,
- `error` se ejecuta si la petición falla.

### Cuándo entra en `next`

`next` se ejecuta cuando el backend responde correctamente, por ejemplo con código `200` y una respuesta válida con:

- `access_token`
- `token_type`
- `user`

Antes de llegar a `next`, dentro del servicio ocurre esto:

1. `tap(...)` intercepta la respuesta correcta,
2. `applyAuthResponse(...)` guarda el token en cookie,
3. guarda el token en el signal `token`,
4. guarda el usuario en `currentUserState`,
5. marca auth como lista.

Después de eso, el control vuelve al componente y se ejecuta:

```ts
void this.router.navigate(['/restaurantes']);
```

Por eso, justo después de un login correcto, la app redirige al listado de restaurantes.

### Cuándo entra en `error`

`error` se ejecuta si la petición no consigue una respuesta correcta.

Ejemplos:

- nombre o contraseña incorrectos,
- backend apagado,
- error de red,
- respuesta rechazada por el servidor.

En ese caso:

1. el Observable no pasa por el camino correcto final,
2. el componente entra en `error`,
3. se quita el estado de carga,
4. se muestra el mensaje de error,
5. no se navega a `/restaurantes`.

En resumen: no es `subscribe` quien “decide” arbitrariamente. La decisión depende del resultado real de la petición HTTP.

- si el backend responde bien, Angular ejecuta `next`,
- si la petición falla, Angular ejecuta `error`.

---

## 10. Cómo funciona el logout

El logout actual es frontend-driven:

1. se borra la cookie del token,
2. se limpia el usuario en memoria,
3. se redirige al login.

No hay todavía un endpoint `/auth/logout` en el backend.

---

## 11. Flujo visual del login en la app

Este bloque resume el recorrido completo de la sesión como una cadena de pasos. La idea es poder mirar el flujo entero de una vez, como si Senior Cat siguiera el camino del ladrillo desde que entra en obra hasta que queda colocado en el edificio.

### Flujo principal: login → cookie → signal → interceptor → guard → perfil

1. `login.html` recoge `nombre` y `password`
	El usuario escribe sus datos en el formulario y Angular los guarda en las propiedades del componente gracias a `[(ngModel)]`.

2. `login.ts` ejecuta `submitLogin()`
	El componente valida que los campos tengan contenido y llama a `authService.login(...)`.

3. `auth.service.ts` hace `POST /auth/login`
	El servicio envía las credenciales al backend y espera una respuesta con `access_token`, `token_type` y `user`.

4. Si el backend responde bien, entra `tap(...)`
	Antes de volver al componente, el servicio aprovecha `tap` para ejecutar `applyAuthResponse(response)`.

5. `applyAuthResponse(...)` guarda la sesión
	Aquí se colocan varias piezas clave:
	- se escribe la cookie con el JWT,
	- se guarda el JWT en el signal `token`,
	- se guarda el usuario en el signal `currentUserState`,
	- se marca `authReadyState` como listo.

6. El componente `login.ts` entra en `next`
	Como la petición salió bien, el `subscribe` ejecuta `next` y navega a `/restaurantes`.

7. El header y la UI reaccionan a los signals
	Como `token` y `currentUserState` ya cambiaron, la app puede mostrar que la sesión está iniciada, enseñar el nombre del usuario y activar opciones privadas.

8. El interceptor añade el Bearer token en peticiones privadas
	Cada vez que sale una request HTTP, `auth.interceptor.ts` pregunta al servicio si existe token.
	Si existe, añade:

	```ts
	Authorization: Bearer <token>
	```

9. El guard protege rutas privadas
	Si el usuario intenta entrar, por ejemplo, en `/perfil`, el `authGuard` llama a `ensureSessionReady()`.

10. `ensureSessionReady()` decide si ya hay sesión válida
	- si la auth ya estaba lista, responde enseguida,
	- si había token pero faltaba validar, llama a `loadProfile()`,
	- si no había token, devuelve `false`.

11. Si la sesión es válida, Angular deja entrar
	El guard devuelve `true` y la navegación continúa.

12. `perfil.ts` pide `GET /auth/profile`
	La página de perfil carga los datos del usuario autenticado usando el token que el interceptor manda automáticamente.

13. `perfil.html` muestra el usuario actual
	Si todo fue bien, la pantalla enseña nombre, id, imagen y el botón para cerrar sesión.

### Flujo resumido en una sola línea

1. formulario de login
2. `submitLogin()`
3. `authService.login()`
4. backend responde con token + user
5. cookie
6. signal `token`
7. signal `currentUserState`
8. `next` navega a `/restaurantes`
9. interceptor añade Bearer
10. guard valida acceso
11. perfil carga `/auth/profile`
12. la UI muestra la sesión

### Qué pasa si algo falla

1. Si `POST /auth/login` falla, el `subscribe` entra en `error`
	No se guarda cookie, no se actualizan signals y no se navega a `/restaurantes`.

2. Si más adelante una petición protegida devuelve `401`
	El interceptor llama a `handleUnauthorized()` y la sesión se limpia.

3. Si al recargar la app la cookie existe pero el token ya no sirve
	El `constructor` del `AuthService` intenta reconstruir sesión con `loadProfile()`.
	Si el backend responde `401`, se borra la sesión y la app vuelve a estado cerrado.

---

## 12. Diferencia con una cookie HttpOnly real

### Lo que tenemos ahora

- Angular escribe la cookie.
- Angular puede leer la cookie.
- Angular usa el token para montar el header Bearer.

### Lo que sería más seguro en producción

Una cookie HttpOnly real implicaría:

1. que el backend haga `Set-Cookie`,
2. que Angular no pueda leer ni escribir la cookie,
3. que el navegador la envíe automáticamente,
4. que el backend autentique leyendo la cookie.

Eso todavía no está implementado en `api-recetas`.

---

## 13. Archivos clave del flujo

- `src/app/services/auth.service.ts`
- `src/app/interceptors/auth.interceptor.ts`
- `src/app/guards/auth.guard.ts`
- `src/app/components/pages/login/login.ts`
- `src/app/components/pages/registro/registro.ts`
- `src/app/components/pages/perfil/perfil.ts`
- `src/app/app.config.ts`
- `src/app/app.routes.ts`

---

## 14. Orden recomendado para construir este login desde cero

Si alguien tuviera que levantar este flujo por su cuenta, lo más claro es construirlo en este orden. La idea es no poner ladrillos sueltos: primero definimos las piezas base, luego la lógica central, después la conexión global y por último las pantallas que la usan. Senior Cat aquí actuaría como capataz: primero prepara materiales, luego monta la estructura y al final abre las puertas del edificio.

### Paso 1. Entender qué devuelve el backend

Antes de crear archivos en Angular, conviene revisar la API:

- `POST /auth/login`
- `POST /auth/register`
- `GET /auth/profile`

Esto se revisa primero porque el frontend necesita saber:

- qué campos enviar (`nombre`, `password`),
- qué forma tiene la respuesta,
- qué endpoints son públicos y cuáles requieren token.

Si este paso se salta, luego aparecen errores de tipos, nombres mal escritos o peticiones mal montadas.

### Paso 2. Crear `src/app/interfaces/user.ts`

Este archivo define cómo es el usuario público que devuelve el backend.

Qué hace:

- describe la forma de un usuario autenticado,
- evita usar `any`,
- permite que TypeScript avise si intentamos leer propiedades que no existen.

Dónde se usa:

- en `auth.service.ts`,
- en `auth-response.ts`,
- en `perfil.ts`,
- en cualquier componente que quiera mostrar datos del usuario.

Por qué va primero:

- porque muchas piezas de auth dependen del tipo `User`.

### Paso 3. Crear `src/app/interfaces/auth-response.ts`

Este archivo describe la respuesta de `login` y `register`.

Qué hace:

- define `access_token`,
- define `token_type`,
- define `user`.

Dónde se usa:

- en `auth.service.ts`, especialmente en `login()` y `register()`.

Por qué va ahora:

- porque ya sabemos cómo es `User`, así que ya podemos construir la respuesta completa del backend.

### Paso 4. Crear `src/app/services/auth.service.ts`

Este es el archivo más importante del flujo. Es el centro de mando de la autenticación.

Qué hace:

- llama a `/auth/login`,
- llama a `/auth/register`,
- llama a `/auth/profile`,
- guarda el token en cookie,
- lee el token al arrancar la app,
- reconstruye la sesión,
- expone el usuario actual,
- permite cerrar sesión.

Dónde se usa:

- en el interceptor,
- en el guard,
- en `login.ts`,
- en `registro.ts`,
- en `perfil.ts`,
- en `header.ts`,
- en cualquier componente que necesite saber si hay sesión abierta.

Por qué se crea aquí:

- porque casi todo lo demás depende de este servicio. Si no existe todavía, no tiene sentido crear el guard o el interceptor.

### Paso 5. Crear `src/app/interceptors/auth.interceptor.ts`

Cuando ya existe un servicio que sabe devolver el token, podemos automatizar las peticiones privadas.

Qué hace:

- intercepta cada request HTTP,
- pregunta al `AuthService` si hay token,
- si existe, añade `Authorization: Bearer ...`,
- si el backend responde `401`, invalida la sesión.

Dónde se usa:

- no se usa manualmente en componentes,
- se registra globalmente desde `app.config.ts`.

Por qué va antes de las pantallas:

- porque así login, perfil o crear restaurante no tienen que repetir a mano el header Authorization.

### Paso 6. Modificar `src/app/app.config.ts`

Aquí conectamos el interceptor al resto de la aplicación.

Qué hace:

- registra `HttpClient`,
- registra `withInterceptors([authInterceptor])`.

Dónde se usa:

- Angular lo carga al arrancar toda la aplicación.

Por qué este paso es importante:

- si el interceptor existe pero no se registra aquí, es como fabricar una puerta y no instalarla en el edificio.

### Paso 7. Crear `src/app/guards/auth.guard.ts`

Cuando el servicio ya sabe reconstruir sesión, el siguiente ladrillo es proteger rutas.

Qué hace:

- espera a que la sesión esté lista,
- comprueba si hay login activo,
- deja pasar o redirige a `/login`.

Dónde se usa:

- en `app.routes.ts`.

Por qué va después del servicio:

- porque depende de `ensureSessionReady()` y `isLoggedIn()` del `AuthService`.

### Paso 8. Modificar `src/app/app.routes.ts`

Una vez existe el guard, ya podemos decidir qué páginas son privadas.

Qué hace:

- define las rutas públicas,
- define las rutas privadas,
- conecta `canActivate: [authGuard]` en las rutas protegidas.

Dónde se usa:

- Angular Router lo consulta cada vez que el usuario navega.

Por qué este paso va aquí:

- porque antes no teníamos todavía un guard funcional para conectar.

### Paso 9. Crear `src/app/components/pages/login/login.ts` y `login.html`

Con la infraestructura base lista, ya podemos construir la primera pantalla real de autenticación.

Qué hace `login.ts`:

- guarda los datos del formulario,
- valida campos básicos,
- llama a `authService.login(...)`,
- navega al listado si todo sale bien,
- muestra un error si falla.

Qué hace `login.html`:

- pinta el formulario,
- enlaza inputs con `[(ngModel)]`,
- dispara `submitLogin()` al enviar,
- muestra mensajes de error y estado.

Dónde se usa:

- en la ruta `/login`.

### Paso 10. Crear `src/app/components/pages/registro/registro.ts` y `registro.html`

Después de login, el registro es natural porque reutiliza casi la misma infraestructura.

Qué hace `registro.ts`:

- guarda nombre y contraseñas,
- valida que los campos estén completos,
- valida longitud mínima,
- valida confirmación,
- llama a `authService.register(...)`,
- navega al listado cuando el backend crea la cuenta.

Qué hace `registro.html`:

- pinta el formulario de alta,
- muestra errores,
- ofrece un enlace para volver a login.

Dónde se usa:

- en la ruta `/registro`.

### Paso 11. Crear `src/app/components/pages/perfil/perfil.ts` y `perfil.html`

Esta pantalla sirve para comprobar que la sesión realmente funciona más allá del login inicial.

Qué hace `perfil.ts`:

- pide el perfil autenticado al backend,
- muestra errores si el perfil no carga,
- ofrece un botón de logout.

Qué hace `perfil.html`:

- muestra los datos del usuario actual,
- muestra un estado de carga,
- ofrece un enlace para volver al listado.

Dónde se usa:

- en la ruta privada `/perfil`.

Por qué es útil:

- porque confirma que el token sigue siendo válido al recargar y que el backend reconoce al usuario.

### Paso 12. Modificar `src/app/components/layout/header/header.ts` y `header.html`

Cuando el login ya existe, hace falta reflejarlo en la navegación.

Qué hace `header.ts`:

- expone `currentUser`,
- expone `isLoggedIn`,
- llama a `logout()`.

Qué hace `header.html`:

- muestra `Login` y `Registro` si no hay sesión,
- muestra `Perfil` y `Logout` si la sesión está abierta,
- enseña el nombre del usuario autenticado.

Dónde se usa:

- en el layout general de la aplicación.

Por qué este paso es importante:

- porque convierte el estado interno de auth en algo visible para el usuario.

### Paso 13. Conectar páginas privadas que usan auth

Una vez que login, interceptor y guard funcionan, ya se pueden construir flujos privados como:

- crear restaurante,
- actualizar restaurante,
- borrar restaurante,
- valorar,
- comentar.

Qué archivos suelen tocarse aquí:

- servicios de dominio como `restaurantes.ts`,
- componentes privados que llaman a endpoints protegidos,
- plantillas que muestran botones solo si `isLoggedIn()`.

Por qué este paso va al final:

- porque todas esas páginas dependen de la infraestructura anterior. Si se intentan hacer antes, el código acaba duplicando soluciones o usando atajos frágiles.

### Resumen mental del orden

El orden recomendado sería este:

1. entender backend,
2. crear interfaces,
3. crear `AuthService`,
4. crear interceptor,
5. registrarlo en `app.config.ts`,
6. crear guard,
7. conectarlo en rutas,
8. crear login,
9. crear registro,
10. crear perfil,
11. adaptar header,
12. extender a funcionalidades privadas.

Ese orden reduce errores porque cada archivo nuevo se apoya en uno anterior ya estable.

---

## 15. Resumen corto

En esta fase:

- el backend devuelve el JWT en JSON,
- Angular guarda ese JWT en una cookie,
- el interceptor lo convierte en `Authorization: Bearer ...`,
- el guard protege rutas privadas,
- la app reconstruye sesión con `/auth/profile`.

Es una solución funcional y útil para aprender el flujo completo de auth, aunque no es todavía la solución final más segura.