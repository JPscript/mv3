# CLASE9 - Angular: arranque del proyecto y primer contacto real

**Fecha:** 2026-03-16  
**Horario:** 16:30 - 20:30  
**Receso:** 18:00 - 18:30  
**Nivel:** inicial  
**Clase anterior de referencia:** jp/bitacora/CLASE8.md  
**Lema del grupo Ladrillos:** Construyendo el futuro del desarrollo web, un ladrillo a la vez.  
**Mentor de la sesión:** Senior Cat 🐱

---

## Nota de continuidad con CLASE8

En CLASE8 se trabajó HTTP, rutas y mentalidad cliente-servidor. Ese cimiento sigue siendo válido, pero en CLASE9 no construimos aún la app final de restaurantes: hoy levantamos el andamio Angular y dejamos la aplicación base funcionando.

---

## Tema y objetivo del día

### Tema central

Primer contacto real con Angular mediante la creación del proyecto, el arranque del servidor y la lectura básica de su estructura.

### Objetivo general

Que el alumnado:

1. Instale Angular CLI y deje una aplicación funcionando en `localhost:4200`.
2. Entienda la estructura base de un proyecto Angular recién creado.
3. Sepa arrancar y recompilar la app durante el desarrollo.
4. Distinga entre arranque del proyecto, trabajo real del curso y material extra de apoyo.

---

## Plan por bloques de tiempo

### 16:30 - 16:50 | Apertura y cambio de piso

- Repaso breve: del DOM y `fetch` en JS vanilla a la idea de framework.
- Metáfora del grupo Ladrillos: Angular no te da solo ladrillos, te da planos, grúas y una cuadrilla coordinada.
- Presentación del objetivo de la semana: construir la app Guía de Restaurantes paso a paso.

### 16:50 - 17:30 | Instalación y primer `ng serve`

- Instalar Angular CLI.
- Crear una app nueva con `ng new`.
- Ejecutar `ng serve --open`.
- Leer la estructura inicial del proyecto.

### 17:30 - 18:00 | Lectura de la estructura generada

- Observar `src/`, `main.ts`, `app.config.ts` y componente raíz.
- Entender qué archivos son de arranque y cuáles se editarán más adelante.
- Identificar dónde se configurará router y servicios en las próximas clases.

### 18:00 - 18:30 | ⏸ RECESO

### 18:30 - 19:15 | Primeras pruebas y lectura guiada

- Resolver dudas de instalación y estructura.
- Confirmar que la app recompila al guardar cambios.
- Identificar qué piezas serán reutilizables en la app del proyecto.

### 19:15 - 20:00 | Comandos básicos del CLI

- Repasar `ng new`, `ng serve`, `ng build`, `ng g c`.
- Entender qué crea el CLI y por qué no conviene crear archivos Angular a mano.

### 20:00 - 20:30 | Cierre y puente hacia CLASE10

- Registrar dudas.
- Explicar que en la clase siguiente ya empezamos la estructura real de la app.
- Dejar el tutorial y la referencia de CLI como material extra en un documento aparte.

---

## Comandos base trabajados

```bash
ng new nombre-del-proyecto
ng serve
ng serve --open
ng build
ng version
```

---

## Qué sí hicimos en CLASE9

- instalar Angular CLI,
- crear la app Angular,
- levantar el proyecto en local,
- entender la estructura inicial del framework.

## Qué no hicimos todavía en CLASE9

- no construimos aún la app de restaurantes real,
- no generamos todavía la estructura completa de páginas y layout,
- no conectamos la API,
- no configuramos aún el router del proyecto final.

## Material extra recomendado

El tutorial y la referencia ampliada del CLI quedan movidos al documento:

- `jp/bitacora/CLASE9-TUTORIAL-ANGULAR.md`

---

## Actividades diferenciadas

### sin-ia

1. Confirmar que la app arranca en `localhost:4200`.
2. Identificar qué archivo arranca la aplicación y qué archivo define un componente.
3. Escribir qué función cumple `app.config.ts` aunque todavía no esté completo.
4. Dejar escrito en `DUDAS.md` qué parte de la estructura inicial resultó más confusa.

### con-ia

1. Pedir a la IA una explicación comparando Angular con JS vanilla.
2. Pedir a la IA una tabla simple de términos: componente, template, CLI, `main.ts` y `app.config.ts`.
3. Reescribir esas definiciones con palabras propias.
4. Registrar en `DUDAS.md` qué parte entiendes y cuál no.

---

## Entregables mínimos del día

- [ ] Angular CLI instalado.
- [ ] Proyecto Angular creado.
- [ ] `ng serve` funcionando en `localhost:4200`.
- [ ] Dudas registradas en `DUDAS.md`.
- [ ] Documento extra de tutorial localizado para repaso autónomo.

---

## Checklist de cierre

- [ ] Tengo claro que hoy fue una clase de arranque, no de construcción final.
- [ ] Sé arrancar un proyecto Angular desde cero.
- [ ] Puedo explicar qué hace `ng serve`.
- [ ] Puedo localizar el componente raíz de la app.
- [ ] Autoevaluación personal completada (1-5).

### Autoevaluación sugerida

- ¿Qué fue lo más distinto de Angular respecto a JS vanilla?
- ¿Qué parte de la estructura inicial me pareció más clara?
- ¿Qué parte necesito volver a revisar en el documento extra?

---

## Predicción de la siguiente clase (CLASE10)

1. Generar la estructura real de páginas del proyecto Guía de Restaurantes.
2. Crear header, footer y páginas base.
3. Dejar el router configurado con navegación real.
4. Empezar toda la app hardcodeada antes de conectar la API.
