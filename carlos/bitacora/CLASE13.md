# CLASE13 - Primer servicio HTTP real en Angular 21

**Fecha:** 2026-03-23  
**Horario:** 16:30 - 20:30  
**Receso:** 18:00 - 18:30  
**Nivel:** intermedio  
**Clase anterior de referencia:** jp/bitacora/CLASE12.md  
**Lema del grupo Ladrillos:** Construyendo el futuro del desarrollo web, un ladrillo a la vez.  
**Mentor de la sesión:** Senior Cat 🐱

---

## Contexto y continuidad con CLASE12

CLASE12 cerró la maqueta hardcodeada y dejó preparado el terreno para empezar a reemplazar datos falsos por datos reales. En esta sesión, Senior Cat nos hizo dar el primer paso importante: conectar `Home` con la API usando Angular 21 y entender con detalle qué hace cada pieza técnica.

## Referencia visual del wireframe

En la carpeta `jp/bitacora/CLASE 13-16/` hay un boceto que nos sirve como plano de obra. Ese wireframe deja ver cinco piezas muy claras del proyecto:

- una página principal de restaurantes (`Home`),
- una vista de detalle de restaurante,
- una pantalla de `Login`,
- una pantalla de `Registro`,
- una pantalla de `Perfil`.

Para CLASE13, el foco no era construir todo ese edificio todavía, sino colocar el primer ladrillo técnico que sostiene el resto: traer el listado real de restaurantes para que la página principal dejara de depender de datos inventados.

---

## Tema y objetivo del día

### Tema central

Crear el primer servicio HTTP real en Angular 21, registrarlo correctamente en `app.config.ts`, definir una `interface` para tipar la respuesta y consumir `GET /restaurants` desde `Home`.

### Objetivo general

1. Entender cómo Angular 21 configura HTTP con `provideHttpClient()`.
2. Generar un servicio con `ng g s` y observar el cambio de naming del CLI moderno.
3. Crear y comprender una `interface` TypeScript para la respuesta de restaurantes.
4. Consumir `GET /restaurants` desde `Home` con `Observable` y `subscribe`.
5. Diferenciar claramente `interface`, `type` y la idea de contrato de forma.

---

## Qué hicimos realmente en esta clase

Si miramos el wireframe, esta clase corresponde sobre todo al primer bloque visual del proyecto: la pantalla de restaurantes. Ahí aparecen una cabecera, un buscador, una lista de tarjetas y la entrada hacia una vista más detallada. Por eso tuvo sentido empezar por `GET /restaurants`: antes de pensar en login, mapa o perfil, Senior Cat nos hizo asegurar que la base del listado estuviera viva con datos reales.

### 1. Configuración global de HTTP en Angular 21

En `restaurantes2`, añadimos `provideHttpClient()` dentro de `app.config.ts` para que Angular pudiera inyectar `HttpClient` en los servicios.

Idea clave:

- `app.config.ts` concentra infraestructura global,
- `provideRouter(routes)` activa rutas,
- `provideHttpClient()` activa el cliente HTTP.

Sin ese paso, el servicio podía estar bien escrito, pero Angular no sabría entregar una instancia de `HttpClient`.

### 2. Generación del servicio con Angular 21

Generamos el servicio con CLI moderno:

```bash
ng g s restaurantes
```

Primeras llamadas trabajadas en clase:

- `GET /restaurants`
- `GET /restaurants/:id`

Angular 21 ya no obliga a generar nombres como `RestaurantesService` o archivos `restaurantes.service.ts` por defecto. El CLI moderno reduce boilerplate y genera nombres más cortos. Aun así, se explicó que seguir usando el sufijo `Service` puede ser una convención válida si el equipo quiere más claridad.

### 3. Creación de la interface `Restaurante`

Definimos una `interface` para describir la forma de los datos que devuelve la API.

Puntos explicados en clase:

- una `interface` no crea objetos,
- una `interface` no existe en runtime,
- una `interface` describe la forma esperada de un objeto,
- funciona como contrato entre backend, servicio y componente.

También se aclaró por qué muchas veces se usa `interface` para objetos de dominio y no `type`:

- `interface` expresa muy bien un contrato de objeto,
- `type` es más general y flexible,
- `type` se reserva mejor para uniones, intersecciones, tuplas o alias más complejos,
- para un modelo como `Restaurante`, `interface` se entiende muy bien en una primera etapa de aprendizaje.

### 4. Creación del servicio HTTP real

El servicio generado quedó responsable de hablar con la API y no de pintar nada en pantalla.

Conceptos trabajados:

- `@Injectable({ providedIn: 'root' })`,
- `inject(HttpClient)` como forma moderna de pedir dependencias,
- `private readonly` para expresar intención,
- `Observable<Restaurante[]>` como tipo de retorno de una petición HTTP,
- métodos `getAll()` y `getById(id)`.

Se insistió mucho en esta separación:

- el componente muestra datos,
- el servicio llama a la API,
- la interface tipa la respuesta.

### 5. Uso del servicio dentro de `Home`

En `Home` dejamos de usar datos hardcodeados y pasamos a consumir `getAll()`.

Puntos explicados paso a paso:

- inyección del servicio con `inject(Restaurantes)`,
- creación del estado local `restaurantes: Restaurante[] = []`,
- uso de `errorMessage` para mostrar fallos de carga,
- carga automática dentro de `ngOnInit()`,
- uso de `subscribe({ next, error })` para reaccionar a la respuesta.

Aquí apareció uno de los conceptos clave de la clase:

- `Observable` no es el dato en sí,
- `Observable` es el flujo por el que el dato llegará,
- `subscribe()` es el lugar donde reaccionamos cuando la respuesta llega o falla.

---

## Configuración base de servicios en Angular moderno

La idea en Angular moderno, incluyendo Angular 21 con enfoque standalone, quedó así:

1. `main.ts` arranca la aplicación,
2. `app.config.ts` registra router y cliente HTTP,
3. cada servicio se genera con `ng g s`,
4. cada servicio puede usar `inject(HttpClient)` como forma moderna,
5. los componentes consumen los servicios y ya no guardan la lógica HTTP dentro de ellos.

### `app.config.ts`

```ts
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideRouter(routes),
		provideHttpClient(),
	],
};
```

### Estructura sugerida para servicios

```text
src/app/
├─ components/pages/home/services/
│  └─ restaurantes.ts
├─ interfaces/
│  └─ restaurante.ts
└─ app.config.ts
```

### Ejemplo de servicio en Angular moderno

```ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurante } from '../interfaces/restaurante';

@Injectable({ providedIn: 'root' })
export class Restaurantes {
	private readonly http = inject(HttpClient);
	private readonly apiUrl = 'http://127.0.0.1:3000';

	getAll(): Observable<Restaurante[]> {
		return this.http.get<Restaurante[]>(`${this.apiUrl}/restaurants`);
	}

	getById(id: number): Observable<Restaurante> {
		return this.http.get<Restaurante>(`${this.apiUrl}/restaurants/${id}`);
	}
}
```
### Regla práctica consolidada en esta clase

- componentes muestran y reaccionan,
- servicios llaman a la API,
- interfaces tipan respuestas,
- `app.config.ts` concentra la infraestructura global.

---

## Plan por bloques de tiempo

### 16:30 - 16:50 | Repaso de CLASE12 y estrategia de conexión

- Revisar qué pantallas van primero a datos reales.
- Presentar el orden lógico de conexión.

### 16:50 - 17:30 | `provideHttpClient` y primer servicio real

- Configurar cliente HTTP.
- Crear servicio Angular con CLI moderno.
- Hacer la primera llamada a `GET /restaurants`.
- Dejar preparada la `interface Restaurante` y la URL base de la API.

### 17:30 - 18:00 | Entender la teoría detrás del código

- Explicar qué es un servicio.
- Explicar qué es `inject(HttpClient)`.
- Explicar qué es un `Observable`.
- Explicar qué hacen `next` y `error` dentro de `subscribe()`.
- Explicar por qué se usó `interface` y no `type` para `Restaurante`.

### 18:00 - 18:30 | ⏸ RECESO

### 18:30 - 19:15 | `Home` consumiendo el servicio

- Reemplazar datos fake por datos reales.
- Cargar restaurantes en `ngOnInit()`.
- Mostrar errores de carga en pantalla.
- Enviar datos reales al componente `RestauranteCard`.

### 19:15 - 20:00 | Lectura comentada del código

- Comentar `app.config.ts`, `restaurantes.ts`, `home.ts`, `home.html` e `interface`.
- Explicar cada import y cada concepto nuevo con detalle.
- Dejar la base lista para que en la siguiente clase se consuma también `getById()`.

### 20:00 - 20:30 | Cierre

---

## Actividades diferenciadas

### sin-ia

1. Conectar `HomeComponent` con `GET /restaurants`.
2. Crear la `interface Restaurante` según la respuesta del backend.
3. Explicar por escrito qué significa `private readonly`, `Observable` y `subscribe()`.
4. Diferenciar con sus palabras cuándo usar `interface` y cuándo usar `type`.
5. Dejar `Home` cargando restaurantes reales al iniciar.

### con-ia

1. Pedir a la IA ayuda para definir la `interface Restaurante` y revisar si coincide con el backend real.
2. Pedir a la IA una propuesta de servicio HTTP moderno con `inject(HttpClient)` y justificar cada línea.
3. Pedir a la IA explicación de `Observable`, `next`, `error` y `subscribe()` y reformularla con palabras propias.
4. Pedir a la IA la diferencia entre `interface` y `type` y resumirla con un ejemplo del proyecto.
5. Pedir a la IA comentarios pedagógicos dentro del código y revisar que no cambien la lógica.

---

## Entregables mínimos del día

- [ ] Servicio HTTP configurado.
- [ ] `provideHttpClient()` añadido en `app.config.ts`.
- [ ] `interface Restaurante` creada y explicada.
- [ ] Home consumiendo restaurantes reales con `getAll()`.
- [ ] Explicación escrita de `Observable`, `subscribe`, `next` y `error`.
- [ ] Explicación escrita de `interface` frente a `type`.
- [ ] Dudas en `DUDAS.md`.

---

## Checklist de cierre

- [ ] Sé crear un servicio Angular para llamar a la API.
- [ ] Entiendo qué se configura en `app.config.ts` y qué se deja dentro de cada servicio.
- [ ] Entiendo qué es una `interface` y por qué la usamos con objetos de API.
- [ ] Entiendo qué es un `Observable` y por qué una petición HTTP no devuelve el dato al instante.
- [ ] Entiendo qué hace `subscribe()`.
- [ ] Distingo razonablemente entre `interface` y `type`.
- [ ] Autoevaluación personal completada (1-5).

---

## Predicción de la siguiente clase (CLASE14)

1. Consumir `getById(id)` para el detalle de restaurante.
2. Empezar a mostrar `total_recetas` y `rating_summary` en la interfaz.
3. Seguir quitando hardcoded y acercar más la app a `api-recetas`.
