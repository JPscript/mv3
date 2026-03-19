# CLASE10 - Estructura real de la app, componentes y router

**Fecha:** 2026-03-17  
**Horario:** 16:30 - 20:30  
**Receso:** 18:00 - 18:30  
**Nivel:** inicial  
**Clase anterior de referencia:** jp/bitacora/CLASE9.md  
**Lema del grupo Ladrillos:** Construyendo el futuro del desarrollo web, un ladrillo a la vez.  
**Mentor de la sesión:** Senior Cat 🐱

---

## Contexto y continuidad con CLASE9

En CLASE9 se montó el andamio Angular con el tutorial oficial. En CLASE10 ya empezamos la obra real del proyecto: generar la estructura verdadera de la app de restaurantes, maquetar sin servicios y dejar el router listo.

---

## Tema y objetivo del día

### Tema central

Generación de componentes reales del proyecto, layout común y configuración correcta del router.

### Objetivo general

1. Crear la estructura real de páginas y layout del proyecto.
2. Dejar la app navegable con contenido hardcoded.
3. Montar `header`, `footer` y `router-outlet`.
4. Configurar las rutas principales y las rutas del CRUD visual de restaurantes.

---

## Componentes realmente creados en clase

```bash
ng g c components/pages/home
ng g c components/pages/perfil
ng g c components/pages/login
ng g c components/pages/registro
ng g c components/pages/mapa
ng g c components/pages/home/components/restaurante-card
ng g c components/pages/home/restaurante
ng g c components/pages/home/crear-restaurante
ng g c components/pages/home/actualizar-restaurante
ng g c components/pages/home/borrar-restaurante
ng g c components/layout/header
ng g c components/layout/footer
```

---

## Sentido de la estructura

```text
components/
├─ layout/
│  ├─ header/
│  └─ footer/
└─ pages/
   ├─ home/
   │  ├─ components/
   │  │  └─ restaurante-card/
   │  ├─ restaurante/
   │  ├─ crear-restaurante/
   │  ├─ actualizar-restaurante/
   │  └─ borrar-restaurante/
   ├─ perfil/
   ├─ login/
   ├─ registro/
   └─ mapa/
```

- `layout` contiene las piezas estables de navegación.
- `pages` contiene las vistas que cambian con el router.
- `home` concentra la primera navegación del dominio restaurantes.
- `restaurante-card` nace como ladrillo visual reutilizable, aunque todavía no se explota del todo en esta clase.

---

## Configuración correcta del router trabajada en CLASE10

```ts
import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { PerfilComponent } from './components/pages/perfil/perfil.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegistroComponent } from './components/pages/registro/registro.component';
import { MapaComponent } from './components/pages/mapa/mapa.component';
import { RestauranteComponent } from './components/pages/home/restaurante/restaurante.component';
import { CrearRestauranteComponent } from './components/pages/home/crear-restaurante/crear-restaurante.component';
import { ActualizarRestauranteComponent } from './components/pages/home/actualizar-restaurante/actualizar-restaurante.component';
import { BorrarRestauranteComponent } from './components/pages/home/borrar-restaurante/borrar-restaurante.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'home/restaurante/:id', component: RestauranteComponent },
  { path: 'home/crear-restaurante', component: CrearRestauranteComponent },
  { path: 'home/actualizar-restaurante/:id', component: ActualizarRestauranteComponent },
  { path: 'home/borrar-restaurante/:id', component: BorrarRestauranteComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'mapa', component: MapaComponent },
  { path: '**', redirectTo: 'home' },
];
```

Estructura base esperada en la app:

```html
<app-header></app-header>
<main>
  <router-outlet></router-outlet>
</main>
<app-footer></app-footer>
```

---

## Plan por bloques de tiempo

### 16:30 - 16:50 | Repaso de CLASE9 y objetivo del día

- Diferencia entre tutorial y proyecto real.
- Presentación del mapa de componentes.

### 16:50 - 17:30 | Generación de componentes

- Crear páginas y layout con Angular CLI.
- Explicar la estructura de carpetas resultante.

### 17:30 - 18:00 | Primer layout real

- Montar header, footer y contenedor principal.
- Preparar la app para navegar entre páginas.

### 18:00 - 18:30 | ⏸ RECESO

### 18:30 - 19:15 | Router del proyecto

- Configurar `app.routes.ts`.
- Probar navegación entre `home`, `perfil`, `login`, `registro` y `mapa`.
- Añadir las rutas del CRUD visual.

### 19:15 - 20:00 | Maquetación hardcoded inicial

- Añadir contenido mínimo hardcoded a las páginas.
- Preparar botones, enlaces y vistas vacías con intención clara.

### 20:00 - 20:30 | Cierre y revisión

---

## Actividades diferenciadas

### sin-ia

1. Generar exactamente los mismos componentes creados en clase.
2. Dejar cada página con un título y un contenido provisional.
3. Comprobar que todas las rutas navegan sin error.
4. Escribir qué hace `router-outlet` dentro de la aplicación.

### con-ia

1. Pedir a la IA una propuesta de estructura visual para las páginas creadas.
2. Mantener la estructura de componentes trabajada en clase.
3. Pedir a la IA una explicación de por qué `header` y `footer` deben quedar fuera del cambio de ruta.
4. Reescribir esa explicación con palabras propias.

---

## Entregables mínimos del día

- [ ] Componentes creados con CLI.
- [ ] Router configurado.
- [ ] Header y footer visibles.
- [ ] Navegación funcional entre páginas principales.
- [ ] Primer contenido hardcoded en pantalla.

---

## Checklist de cierre

- [ ] Sé diferenciar componente de página, layout y componente interno.
- [ ] La app navega correctamente con el router.
- [ ] Tengo claro que hoy todavía no usamos servicios.
- [ ] Entiendo por qué primero montamos la estructura y luego conectamos la API.
- [ ] Autoevaluación personal completada (1-5).

---

## Predicción de la siguiente clase (CLASE11)

1. Crear bien el componente `RestauranteCard`.
2. Consumirlo desde `HomeComponent`.
3. Renderizar varias tarjetas hardcoded con `@for`.
4. Mejorar la organización visual del home.
