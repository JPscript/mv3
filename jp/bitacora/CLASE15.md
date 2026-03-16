# CLASE15 - Mapa con Leaflet + Revisión General + Deploy

**Fecha:** 2026-03-22 (estimada)
**Horario:** 16:30 - 20:30
**Receso:** 18:00 - 18:30
**Nivel:** intermedio
**Clase anterior de referencia:** jp/bitacora/CLASE14.md
**Lema del grupo Ladrillos:** Construyendo el futuro del desarrollo web, un ladrillo a la vez.
**Mentor de la sesión:** Senior Cat 🐱

---

## Contexto y continuidad con CLASE14

En CLASE14 el edificio cobró vida social: comentarios, estrellas y favoritos.
Hoy ponemos la **señalización exterior del edificio**: el mapa con la ubicación de cada restaurante.
Y al final del día, el edificio se inaugura oficialmente: deploy en producción.

---

## Tema y objetivo del día

### Tema central

Integración de Leaflet para mapas interactivos + revisión y refactor del proyecto + deploy.

### Objetivo general

1. Mapa en la página de detalle con marcador en la ubicación del restaurante.
2. Mapa global en una página de exploración con todos los restaurantes.
3. Marcadores clicables que navegan al detalle.
4. Revisión general: errores pendientes, UI pulida, responsive básico.
5. Build de producción y deploy en Vercel o GitHub Pages.

---

## Conceptos clave del día

### ¿Por qué Leaflet y no Google Maps?

```
Leaflet: open source, sin clave de API, sin factura inesperada.
Ideal para proyectos de aprendizaje y proyectos pequeños/medianos en producción.
Google Maps: más potente (Street View, Places, Directions) pero requiere tarjeta de crédito.
Para este proyecto: Leaflet es la elección correcta.
```

### Instalar Leaflet

```bash
# Instalar librería y tipos TypeScript
npm install leaflet @types/leaflet

# Añadir el CSS de Leaflet en angular.json
# (en styles, dentro de projects > tu-app > architect > build > options)
# "node_modules/leaflet/dist/leaflet.css"
```

```json
// angular.json — sección styles
"styles": [
  "src/styles.scss",
  "node_modules/leaflet/dist/leaflet.css"
]
```

### Crear un mapa básico con Leaflet

```typescript
// El truco principal: el div donde se monta el mapa DEBE tener un tamaño
// (height en CSS). Si no, el mapa no aparece. Error muy común.

import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  AfterViewInit,
} from "@angular/core";
import * as L from "leaflet";

@Component({
  selector: "app-mapa",
  standalone: true,
  template: `<div id="mapa" style="height: 400px; width: 100%;"></div>`,
})
export class MapaComponent implements AfterViewInit, OnDestroy {
  @Input() lat = 40.416775; // Madrid por defecto
  @Input() lng = -3.70379;
  @Input() zoom = 15;
  @Input() nombre = "Restaurante";

  private mapa?: L.Map;

  ngAfterViewInit() {
    // AfterViewInit: el DOM está listo. Aquí y no en ngOnInit porque
    // Leaflet necesita que el div #mapa exista en el DOM.
    this.iniciarMapa();
  }

  private iniciarMapa() {
    this.mapa = L.map("mapa").setView([this.lat, this.lng], this.zoom);

    // Capa de tiles de OpenStreetMap (gratuita, sin API key)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(this.mapa);

    // Marcador con popup
    L.marker([this.lat, this.lng])
      .addTo(this.mapa)
      .bindPopup(`<b>${this.nombre}</b>`)
      .openPopup();
  }

  ngOnDestroy() {
    // IMPORTANTE: destruir el mapa al desmontar el componente.
    // Si no, Leaflet lanza error "Map container is already initialized"
    // cuando navegas al detalle por segunda vez.
    this.mapa?.remove();
  }
}
```

### Fix del ícono de marcador (bug conocido de Leaflet + Webpack)

```typescript
// Leaflet busca los íconos en una ruta que Webpack/Angular no encuentra.
// Solución en el componente o en main.ts:
import * as L from "leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadowUrl from "leaflet/dist/images/marker-shadow.png";

const IconoFix = L.icon({
  iconUrl,
  shadowUrl: iconShadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = IconoFix;
```

### Mapa global con múltiples marcadores

```typescript
// mapa-global.component.ts
// Carga todos los restaurantes y pone un marcador por cada uno.
// Al clicar el popup, navega al detalle.

export class MapaGlobalComponent implements AfterViewInit, OnDestroy {
  private mapa?: L.Map;
  private router = inject(Router);
  private restaurantesSvc = inject(RestaurantesService);

  ngAfterViewInit() {
    this.mapa = L.map("mapa-global").setView([40.416775, -3.70379], 12);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(this.mapa);

    this.restaurantesSvc.getAll().subscribe((restaurantes) => {
      restaurantes.forEach((r) => {
        const popup = L.popup().setContent(
          `<b>${r.nombre}</b><br>
           <a href="/restaurantes/${r.id}">Ver detalle →</a>`,
        );
        L.marker([r.lat, r.lng]).addTo(this.mapa!).bindPopup(popup);
      });
    });
  }

  ngOnDestroy() {
    this.mapa?.remove();
  }
}
```

---

## Referencia rápida: comandos del día

```bash
# Instalar Leaflet
npm install leaflet @types/leaflet

# Componente de mapa individual (para el detalle)
ng g c shared/mapa

# Componente de mapa global (página de exploración)
ng g c mapa-global/mapa-global

# Build de producción
ng build
# Genera la carpeta dist/ lista para subir al servidor

# Deploy en Vercel (si tienen cuenta)
npm install -g vercel
vercel   # seguir los pasos interactivos
```

---

## Integrar el mapa en la página de detalle

```html
<!-- restaurante-detalle.component.html — añadir tras los datos -->
@if (restaurante && restaurante.lat && restaurante.lng) {
<section class="ubicacion">
  <h3>Ubicación</h3>
  <app-mapa
    [lat]="restaurante.lat"
    [lng]="restaurante.lng"
    [nombre]="restaurante.nombre"
  />
</section>
}
```

---

## Plan por bloques de tiempo

### 16:30 - 16:50 | Repaso CLASE14 + objetivo del día

- Verificar que comentarios, puntuación y favoritos funcionan.
- Presentar Leaflet: qué es, por qué y cómo se integra en Angular.

### 16:50 - 17:30 | Mapa en el detalle del restaurante

- Instalar Leaflet + fix de angular.json.
- Componente `MapaComponent` con `AfterViewInit` y `OnDestroy`.
- Mapa visible en la página de detalle con el marcador del restaurante.

### 17:30 - 18:00 | Fix del ícono + mapa global

- Resolver el bug del ícono (muy frecuente, vale la pena verlo en clase).
- Comenzar el mapa global con múltiples marcadores.

### 18:00 - 18:30 | ⏸ RECESO

### 18:30 - 19:00 | Revisión general del proyecto

- Recorrer todas las páginas buscando errores en consola.
- Verificar navegación completa: lista → detalle → mapa → favoritos.
- Responsive básico: que la app no se rompa en móvil.

### 19:00 - 19:30 | Build de producción

- `ng build` — revisar warnings.
- Revisar el contenido de `dist/`.
- Opción A: deploy en Vercel.
- Opción B: servir estático con `npx serve dist/nombre-app`.

### 19:30 - 20:00 | Demo final

- Cada alumno hace una demo de 2-3 minutos de su app.
- Señalar el ladrillo favorito de cada proyecto.

### 20:00 - 20:30 | Cierre del bloque Angular + retrospectiva

---

## Actividades diferenciadas

### sin-ia

1. Instalar Leaflet y mostrar el mapa en la página de detalle.
2. Marcador con popup mostrando el nombre del restaurante.
3. Hacer `ng build` sin errores.
4. Escribir la retrospectiva en `CLASE15.md`: qué aprendí, qué me costó más, qué haría diferente.

### con-ia

1. Todo lo anterior + mapa global con todos los marcadores.
2. Cluster de marcadores cuando hay muchos restaurantes juntos (librería `leaflet.markercluster`).
3. Deploy en Vercel con variable de entorno para la URL de la API.

**Prompt sugerido para con-ia:**

> "Tengo un componente Angular con Leaflet que muestra múltiples marcadores de restaurantes. Genera la integración con leaflet.markercluster para agrupar marcadores cuando el zoom es bajo. Incluye la instalación del paquete y los tipos TypeScript necesarios."

---

## Retrospectiva del bloque Angular (incluir en el entregable)

Responde brevemente cada punto:

1. **¿Qué fue lo más sorprendente de Angular respecto a JS vanilla?**
2. **¿Qué concepto te costó más entender?** (Routing, HttpClient, signals, interceptors...)
3. **¿Qué parte del proyecto te generó más orgullo?**
4. **¿Qué añadirías si tuvieras una semana más?**
5. **Del 1 al 5, ¿cómo calificarías tu dominio de Angular al terminar esta semana?**

---

## Entregables mínimos del día

- [ ] Mapa visible en la página de detalle con marcador funcional.
- [ ] `ng build` completado sin errores.
- [ ] App accesible al menos en local (localhost o deploy).
- [ ] Retrospectiva del bloque Angular escrita.
- [ ] Dudas finales en `DUDAS.md`.

---

## Checklist de cierre

- [ ] Entiendo por qué Leaflet necesita `AfterViewInit` y no `OnInit`.
- [ ] Sé por qué hay que llamar `mapa.remove()` en `OnDestroy`.
- [ ] El build de producción genera la carpeta `dist/` sin errores.
- [ ] Tengo el proyecto corriendo y puedo enseñárselo a alguien.
- [ ] Retrospectiva completada.
- [ ] Autoevaluación final del bloque Angular (1-5).

---

## Resumen del bloque Angular (CLASE9 - CLASE15)

| Clase | Ladrillo construido                                           |
| ----- | ------------------------------------------------------------- |
| 9     | CLI, componentes, tutorial oficial, arquitectura del proyecto |
| 10    | Router, HttpClient, lista de restaurantes real                |
| 11    | Detalle, child routes, @Input, forkJoin                       |
| 12    | Reactive Forms, validaciones, POST y PATCH                    |
| 13    | Auth JWT, guards, interceptor, signals                        |
| 14    | Comentarios, puntuación, favoritos, @Output                   |
| 15    | Mapas Leaflet, build de producción, deploy                    |

**El edificio está en pie. Senior Cat aplaude desde el último piso. 🐱🏗️**

---

## Próximos pasos sugeridos (proyecto futuro)

- Añadir SSR con Angular Universal para mejorar el SEO.
- Migrar el estado global a NgRx para proyectos más grandes.
- Añadir notificaciones en tiempo real con WebSockets (NestJS + Socket.io).
- Tests unitarios con Jest y tests e2e con Cypress.
