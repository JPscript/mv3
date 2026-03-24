
# Apuntes detallados y ejemplos: App de Restaurantes (Angular)

> Senior Cat te guía paso a paso para que entiendas cada ladrillo de tu app, con explicaciones para principiantes y ejemplos de código reales.

---

## 1. home.ts (Componente principal de la página Home)

**¿Qué es?**
Es el archivo TypeScript que controla la lógica de la página principal. Aquí se pide la lista de restaurantes y se conecta con las tarjetas visuales.

**¿Dónde está?**
`components/pages/home/home.ts`

**¿Qué hace?**
- Pide la lista de restaurantes al servicio.
- Guarda la lista en una variable reactiva (signal).
- Cuando el usuario hace click en una tarjeta, navega al detalle de ese restaurante.


**Fragmento de código clave (con comentarios para principiantes):**

```typescript
// Importamos lo necesario de Angular y nuestros archivos
import { Component, OnInit, signal } from '@angular/core'; 
// Component: para crear el componente. OnInit: ciclo de vida (se ejecuta al iniciar). signal: para variables reactivas.

import { RestauranteService } from '../../../services/restaurante.service'; 
// RestauranteService: es una clase propia, definida en services/restaurante.service.ts. Es el servicio que pide los datos a la API.

import { Restaurante } from '../../../models/restaurante.model'; 
// Restaurante: es una interfaz propia, definida en models/restaurante.model.ts. Define cómo es un restaurante (campos y tipos).

import { Router } from '@angular/router'; 
// Router: clase de Angular que permite navegar entre páginas.

@Component({
  // Aquí irían las opciones del componente (selector, template, etc.)
})
export class Home implements OnInit {
  // Creamos una variable reactiva para guardar la lista de restaurantes
  // signal<Restaurante[]>: signal es de Angular, Restaurante es la interfaz que importamos arriba
  listaRestaurantes = signal<Restaurante[]>([]);

  // El constructor "inyecta" el servicio y el router para poder usarlos
  // restauranteService: es una instancia de RestauranteService (nuestro servicio propio)
  // router: es una instancia de Router (de Angular)
  constructor(private restauranteService: RestauranteService, private router: Router) {}

  // Este método se ejecuta automáticamente al iniciar el componente (por OnInit)
  ngOnInit() {
    // Pedimos la lista de restaurantes al servicio (restauranteService)
    this.restauranteService.getRestaurantes().subscribe(
      (data) => {
        // Cuando llegan los datos, los guardamos en la variable reactiva
        this.listaRestaurantes.set(data);
      }
    );
  }

  // Esta función se llama cuando el usuario hace click en una tarjeta
  irADetalle(id: number) {
    // Navegamos a la página de detalle usando el id
    this.router.navigate([`restaurantes/${id}`]);
  }
}
```

**¿Cómo se conecta?**
- Usa el servicio para pedir datos.
- Pasa la lista a la vista (home.html).
- Recibe eventos de las tarjetas para navegar al detalle.

**¿Qué es un signal?**
Un signal es una variable "reactiva": si cambias su valor, la vista se actualiza sola. Es como un ladrillo inteligente que avisa cuando cambia.

---

## 2. home.html (Vista principal de la página Home)

**¿Qué es?**
El archivo HTML que muestra la lista de restaurantes y la navegación.

**¿Dónde está?**
`components/pages/home/home.html`

**¿Qué hace?**
- Muestra el título y la barra de navegación.
- Recorre la lista de restaurantes y muestra una tarjeta por cada uno.


**Fragmento de código clave (con comentarios para principiantes):**

```html
<!-- Título principal de la página -->
<h1>Lista de Restaurantes</h1>

<!-- Barra de navegación para ir a login o registro -->
<nav class="main-nav">
  <a routerLink="/login">Iniciar sesión</a> <!-- Enlace a la página de login -->
  <a routerLink="/registro">Registrarse</a> <!-- Enlace a la página de registro -->
</nav>

<!-- Contenedor de las tarjetas de restaurantes -->
<div class="tarjetas-container">
  <!-- Bucle para mostrar una tarjeta por cada restaurante -->
  @for (restaurante of listaRestaurantes(); track restaurante.id) {
    <!-- Componente de tarjeta, recibe los datos como propiedades -->
    <!-- app-restaurante-card es un componente propio, definido en restaurante-card.ts -->
    <app-restaurante-card
      [id]="restaurante.id" <!-- Le pasamos el id (campo de la interfaz Restaurante) -->
      [nombre]="restaurante.nombre" <!-- Le pasamos el nombre (campo de la interfaz Restaurante) -->
      [descripcion]="restaurante.descripcion" <!-- Le pasamos la descripción (campo de la interfaz Restaurante) -->
      [imagen]="restaurante.fotografia_url" <!-- Le pasamos la imagen (campo de la interfaz Restaurante) -->
      (verDetalle)="irADetalle($event)"> <!-- Escuchamos el evento para navegar al detalle. irADetalle es función del componente Home. -->
    </app-restaurante-card>
  }
</div>
```

**¿Cómo se conecta?**
- Usa la variable `listaRestaurantes()` del componente TypeScript.
- Cada tarjeta es un componente hijo que recibe datos y emite eventos.

**¿Qué es @for?**
Es una forma moderna de Angular para recorrer listas de forma reactiva y eficiente.

---

## 3. restaurante-card.ts (Componente de tarjeta de restaurante)

**¿Qué es?**
Un componente visual que muestra la información de un restaurante en formato de carta.

**¿Dónde está?**
`components/pages/home/components/restaurante-card/restaurante-card.ts`

**¿Qué hace?**
- Recibe los datos del restaurante como propiedades (inputs).
- Cuando se hace click, avisa al padre (Home) enviando el id.


**Fragmento de código clave (con comentarios para principiantes):**

```typescript
import { Component, input, output, EventEmitter } from '@angular/core'; // Importamos lo necesario

@Component({
  selector: 'app-restaurante-card', // Nombre de la etiqueta
  templateUrl: './restaurante-card.html', // HTML de la tarjeta
  styleUrl: './restaurante-card.css', // CSS de la tarjeta
  standalone: true, // Es independiente
})
export class RestauranteCard {
  // Estas variables reciben los datos del padre (Home)

  // input y output son funciones de Angular (importadas arriba)
  id = input<number>(); // El id del restaurante (lo recibe del padre Home)
  nombre = input<string>(); // El nombre (lo recibe del padre Home)
  descripcion = input<string>(); // La descripción (lo recibe del padre Home)
  imagen = input<string>(); // La imagen (lo recibe del padre Home)

  // Este output sirve para avisar al padre cuando se hace click

  // output es de Angular. Sirve para emitir eventos al padre (Home)
  verDetalle = output<number>();

  // Esta función se llama al hacer click en la tarjeta
  onCardClick() {
    // Emitimos el id al padre (Home) usando el output definido arriba
    this.verDetalle.emit(this.id() ?? -1);
  }
}
```

**¿Cómo se conecta?**
- Recibe datos del padre (`Home`) mediante inputs.
- Emite el evento `verDetalle` al padre cuando se hace click.

**¿Qué es un input/output?**
Un input es una propiedad que el padre le pasa al hijo. Un output es un "aviso" que el hijo le manda al padre.

---

## 4. restaurante-card.html (Vista de la tarjeta de restaurante)

**¿Qué es?**
El HTML que define cómo se ve la tarjeta de cada restaurante.

**¿Dónde está?**
`components/pages/home/components/restaurante-card/restaurante-card.html`

**¿Qué hace?**
- Muestra la imagen, el nombre y la descripción del restaurante.
- Cuando se hace click en la tarjeta, llama a la función para avisar al padre.


**Fragmento de código clave (con comentarios para principiantes):**

```html
<div class="card" (click)="onCardClick()"> <!-- Toda la tarjeta es clickable. onCardClick es función del componente RestauranteCard. -->
  <img [src]="imagen" class="card-img-top" alt="Imagen del restaurante"> <!-- Imagen. imagen es input recibido del padre. -->
  <h2 class="card-title">{{ nombre() }}</h2> <!-- Nombre del restaurante. nombre es input recibido del padre. -->
  <p class="card-descripcion">{{ descripcion() }}</p> <!-- Descripción. descripcion es input recibido del padre. -->
</div>
```

**¿Cómo se conecta?**
- Usa los datos recibidos como inputs.
- El click llama a la función que emite el evento al padre.

---

## 5. restaurante.model.ts (Modelo de datos Restaurante)

**¿Qué es?**
Una interfaz TypeScript que define cómo es un restaurante: qué campos tiene y de qué tipo son.

**¿Dónde está?**
`models/restaurante.model.ts`

**¿Qué hace?**
- Sirve como "plano" para saber qué datos tiene cada restaurante.
- Permite que el autocompletado y los errores sean más claros en el código.


**Fragmento de código clave (con comentarios para principiantes):**

```typescript
// Esto es una interfaz TypeScript: define cómo es un restaurante
// Se usa en el servicio y en los componentes para saber qué campos tiene cada restaurante
export interface Restaurante {
  id: number; // Identificador único (lo usa Home, RestauranteCard y la vista)
  nombre: string; // Nombre del restaurante (lo usa Home, RestauranteCard y la vista)
  descripcion: string; // Descripción breve (lo usa Home, RestauranteCard y la vista)
  fotografia_url: string; // URL de la imagen (lo usa Home, RestauranteCard y la vista)
  // Puedes añadir más campos si la API los devuelve
}
```

**¿Cómo se conecta?**
- Usado en el servicio y los componentes para tipar los datos correctamente.

---

## 6. restaurante.service.ts (Servicio para obtener restaurantes)

**¿Qué es?**
Un servicio Angular que se encarga de pedir la lista de restaurantes a la API.

**¿Dónde está?**
`services/restaurante.service.ts`

**¿Qué hace?**
- Define la URL de la API.
- Usa `HttpClient` para hacer la petición GET.
- Devuelve un Observable con la lista de restaurantes.


**Fragmento de código clave (con comentarios para principiantes):**

```typescript
import { Injectable } from '@angular/core'; // Injectable es de Angular. Permite que el servicio se pueda inyectar en otros componentes.
import { HttpClient } from '@angular/common/http'; // HttpClient es de Angular. Sirve para hacer peticiones HTTP (GET, POST, etc.)
import { Observable } from 'rxjs'; // Observable es de la librería rxjs. Permite manejar datos asíncronos (como respuestas de la API).
import { Restaurante } from '../models/restaurante.model'; // Restaurante es la interfaz propia que define cómo es un restaurante.

@Injectable({
  providedIn: 'root' // El servicio estará disponible en toda la app automáticamente (singleton)
})
export class RestauranteService {
  private apiUrl = 'http://localhost:3000/restaurants'; // URL de la API (puedes cambiarla si tu backend es diferente)

  constructor(private http: HttpClient) {} // Inyectamos HttpClient (de Angular) para poder hacer peticiones

  // Función para pedir la lista de restaurantes
  // Devuelve un Observable de array de Restaurante (usando la interfaz Restaurante)
  getRestaurantes(): Observable<Restaurante[]> {
    // Hacemos una petición GET y devolvemos los datos como Observable
    // this.http.get<Restaurante[]> usa la URL y espera que la respuesta sea un array de Restaurante
    return this.http.get<Restaurante[]>(this.apiUrl);
  }
}
```

**¿Cómo se conecta?**
- El componente `Home` usa este servicio para pedir los datos.
- El servicio usa el modelo `Restaurante` para tipar la respuesta.

**¿Qué es un Observable?**
Es una forma de manejar datos que pueden llegar en el futuro (por ejemplo, de una API). Permite suscribirse y reaccionar cuando llegan los datos.

---

## Resumen visual de conexiones

```mermaid
flowchart TD
  A[RestauranteService (servicio)] -- pide datos --> B[Home (componente)]
  B -- pasa lista --> C[RestauranteCard (componente)]
  C -- emite evento --> B
  B -- navega --> D[Detalle de restaurante]
  A -- usa modelo --> E[Restaurante (interfaz)]
  B -- usa modelo --> E
  C -- usa inputs --> B
```

---

## Glosario básico

- **Componente:** Un bloque de construcción visual y lógico en Angular.
- **Servicio:** Un "ayudante" que se encarga de tareas como pedir datos a la API.
- **Input:** Dato que el padre le pasa al hijo.
- **Output:** Evento que el hijo le manda al padre.
- **Signal:** Variable reactiva que actualiza la vista automáticamente.
- **Observable:** Objeto que "emite" datos en el futuro (por ejemplo, cuando llegan de la API).
- **Interfaz:** Plano que define cómo es un objeto (qué campos tiene y de qué tipo).

---

## Consejos de Senior Cat

- Lee el código y los comentarios, ¡son tus mejores amigos!
- Si algo no entiendes, busca el nombre en Google o pregunta a Senior Cat.
- Prueba a cambiar cosas y mira qué pasa: así se aprende de verdad.
- Recuerda: cada archivo es un ladrillo, y tú eres el arquitecto de tu app.

---

¿Quieres ejemplos de cómo se conectan otros archivos o tienes dudas de algún fragmento? ¡Dímelo y Senior Cat te ayuda a construir el futuro del desarrollo web, un ladrillo a la vez!
