# CLASE11 - RestauranteCard y composición del Home

**Fecha:** 2026-03-18  
**Horario:** 16:30 - 20:30  
**Receso:** 18:00 - 18:30  
**Nivel:** inicial  
**Clase anterior de referencia:** jp/bitacora/CLASE10.md  
**Lema del grupo Ladrillos:** Construyendo el futuro del desarrollo web, un ladrillo a la vez.  
**Mentor de la sesión:** Senior Cat 🐱

---

## Contexto y continuidad con CLASE10

En CLASE10 se levantó la estructura del proyecto y el router. En CLASE11 nos centramos en un ladrillo clave del home: `RestauranteCard`, y en cómo reutilizarlo dentro de la página principal.

---

## Tema y objetivo del día

### Tema central

Crear un componente visual reutilizable y consumirlo desde `HomeComponent` con datos hardcoded.

### Objetivo general

1. Definir la responsabilidad de `RestauranteCard`.
2. Pasar datos desde `HomeComponent` al componente hijo.
3. Renderizar varias tarjetas hardcoded en el home.
4. Mejorar la composición visual de la página principal.

---

## Lo que realmente se trabajó

- creación y uso de `components/pages/home/components/restaurante-card`,
- uso del componente dentro de `HomeComponent`,
- organización de datos hardcoded para simular una lista de restaurantes,
- preparación del home para convertirse después en listado conectado a API.

---

## Modelo mental del día

- `HomeComponent` actúa como capataz: tiene la lista y decide qué mostrar.
- `RestauranteCardComponent` es un ladrillo reutilizable: recibe datos y pinta una tarjeta.
- La app sigue hardcodeada, pero ya empieza a parecerse a su versión final.

---

## Ejemplo de estructura trabajada

```ts
export class HomeComponent {
  restaurantes = [
    {
      id: 1,
      nombre: 'La Esquina de Senior Cat',
      descripcion: 'Brunch y platos suaves para empezar el día.',
      imagen: 'https://placehold.co/600x400',
      categoria: 'Brunch',
    },
    {
      id: 2,
      nombre: 'Bistró Ladrillos',
      descripcion: 'Pasta y cocina mediterránea para compartir.',
      imagen: 'https://placehold.co/600x400',
      categoria: 'Mediterránea',
    },
  ];
}
```

```html
@for (restaurante of restaurantes; track restaurante.id) {
  <app-restaurante-card [restaurante]="restaurante"></app-restaurante-card>
}
```

---

## Plan por bloques de tiempo

### 16:30 - 16:50 | Repaso de CLASE10

- Verificar router y páginas creadas.
- Detectar qué parte del home necesita reutilización.

### 16:50 - 17:30 | Construcción de `RestauranteCard`

- Definir el HTML de una tarjeta.
- Añadir estilos base.
- Decidir qué datos recibe.

### 17:30 - 18:00 | Integración en `HomeComponent`

- Crear lista hardcoded.
- Renderizar múltiples tarjetas.
- Revisar composición visual.

### 18:00 - 18:30 | ⏸ RECESO

### 18:30 - 19:15 | Ajustes visuales del home

- Mejorar títulos, bloques y espaciados.
- Añadir botones o enlaces con intención de navegación futura.

### 19:15 - 20:00 | Práctica autónoma

- Añadir más tarjetas hardcoded.
- Revisar si la tarjeta debe enseñar categoría, imagen, descripción y acción.

### 20:00 - 20:30 | Cierre

---

## Actividades diferenciadas

### sin-ia

1. Construir `RestauranteCard` con datos recibidos por `@Input`.
2. Renderizar al menos 4 tarjetas en el home.
3. Hacer que cada tarjeta tenga una estructura consistente.
4. Escribir qué ventaja tiene separar Home y Card.

### con-ia

1. Pedir a la IA una propuesta visual para `RestauranteCard`.
2. Aplicarla solo si mantiene la estructura trabajada en clase.
3. Pedir a la IA una mejora de copy para títulos y botones.
4. Explicar con palabras propias por qué este componente será útil cuando conectemos la API.

---

## Entregables mínimos del día

- [ ] `RestauranteCard` creado y utilizado.
- [ ] Home con varias tarjetas hardcoded.
- [ ] Datos del home organizados para simular un listado real.
- [ ] Dudas registradas en `DUDAS.md`.

---

## Checklist de cierre

- [ ] Entiendo qué significa reutilizar un componente.
- [ ] Sé qué datos viven en Home y cuáles solo se muestran en la Card.
- [ ] La página principal ya se parece a una app de restaurantes real.
- [ ] Tengo claro que aún no estamos consumiendo la API.
- [ ] Autoevaluación personal completada (1-5).

---

## Predicción de la siguiente clase (CLASE12)

1. Terminar toda la app hardcodeada.
2. Revisar el backend `api-recetas` ya mejorado.
3. Estudiar el README y la colección de Postman para mapear endpoints.
4. Preparar la transición de datos falsos a datos reales.
