# TESTING en restaurantes2

## Objetivo

Este documento sirve como guía de introducción al testing para el proyecto `restaurantes2`.

La idea no es solo definir palabras, sino construir una base práctica para que cualquier alumno entienda:

- qué es testing,
- qué tipos de testing existen,
- cuáles tienen más sentido en un proyecto Angular como este,
- qué situación real tiene ahora mismo `restaurantes2`,
- y cómo empezar a agregar tests de forma ordenada en sus propios proyectos.

Piensa este documento como el equivalente de `LOGIN.md`, pero para testing: una guía de obra. Senior Cat no solo quiere que el edificio funcione; quiere comprobar, ladrillo a ladrillo, que no se cae cuando hagamos cambios.

---

## 1. Qué es testing

Testing significa comprobar que una aplicación hace lo que esperamos.

Dicho de forma simple:

- escribimos código,
- después verificamos si ese código se comporta correctamente,
- y repetimos esa comprobación cada vez que cambiamos algo.

Los tests sirven para responder preguntas como estas:

- ¿este componente se crea correctamente?
- ¿este servicio llama al endpoint correcto?
- ¿este guard bloquea una ruta cuando no hay sesión?
- ¿el formulario muestra error si faltan campos?
- ¿una refactorización rompió algo que antes funcionaba?

Un test no sustituye al pensamiento. Un test es una comprobación automática que nos ayuda a detectar roturas antes de que lleguen al usuario.

---

## 2. Por qué merece la pena hacer testing

Los beneficios más importantes son estos:

1. detecta errores antes
2. da confianza al refactorizar
3. obliga a pensar mejor la estructura del código
4. reduce miedo a tocar partes antiguas del proyecto
5. documenta comportamientos esperados

En un proyecto educativo, además, testing enseña algo muy valioso:

- no basta con escribir código que “parece funcionar”
- hay que demostrar que funciona en distintos escenarios

---

## 3. Qué estado tiene hoy este proyecto

Antes de hablar en abstracto, conviene mirar la realidad de `restaurantes2`.

### Qué existe ahora mismo

En el proyecto ya hay base de testing:

- existe script `test` en `package.json`
- existe builder de tests en `angular.json`
- existen archivos `.spec.ts`
- existen dependencias de testing como `vitest` y `jsdom`

### Qué significa eso

Esto quiere decir que el proyecto no está “vacío de testing” del todo.

Tiene un andamio inicial, pero todavía no tiene una estrategia sólida ni una batería útil de pruebas.

### Qué pasa hoy al ejecutar tests

Al ejecutar:

```bash
npm test -- --watch=false
```

el proyecto sí arranca el runner de tests, pero muchos tests fallan.

### Problemas observados ahora mismo

Los fallos actuales muestran sobre todo estos problemas:

1. hay muchos tests generados automáticamente que solo comprueban `should create`
2. varios componentes necesitan dependencias que el test no está proporcionando
3. aparecen errores como `No provider found for ActivatedRoute`
4. hay tests desactualizados, por ejemplo el de `app.spec.ts`, que todavía espera un título antiguo

### Conclusión realista

La conclusión correcta no es “no hay testing”.

La conclusión correcta es:

- hay base de testing,
- pero está incompleta,
- y necesita ser convertida en tests útiles y mantenibles.

Ese es exactamente el tipo de situación que suele encontrarse en proyectos reales.

---

## 4. Tipos de testing que existen

Aquí viene una parte importante: no existe un solo tipo de test.

Hay varios niveles y varias finalidades.

### 4.1. Testing manual

Es probar la app a mano.

Ejemplos:

- abrir login y probar credenciales válidas
- probar credenciales inválidas
- recargar la página
- entrar a perfil
- crear un restaurante

Ventajas:

- rápido al principio
- útil para explorar
- muy bueno para entender el flujo de usuario

Problemas:

- no queda automatizado
- es fácil olvidar casos
- no escala bien
- cada persona prueba de manera distinta

### 4.2. Unit testing

Prueba una unidad pequeña de código aislada.

Ejemplos típicos:

- un servicio
- una función
- un guard
- un componente pequeño con dependencias simuladas

La idea es comprobar una pieza concreta sin depender de todo el sistema.

Ejemplo mental:

- “si llamo a `authService.handleUnauthorized()`, ¿limpia la sesión?”

### 4.3. Integration testing

Prueba varias piezas funcionando juntas.

Ejemplos:

- componente + servicio mockeado
- guard + router
- formulario + validación + navegación

La pregunta aquí ya no es solo “¿esta pieza sola funciona?”, sino:

- “¿estas piezas encajan bien entre sí?”

### 4.4. End-to-end testing (E2E)

Prueba el flujo completo como si fuera un usuario real.

Ejemplos:

- abrir la app
- ir a login
- rellenar formulario
- iniciar sesión
- comprobar que aparece perfil

Normalmente este tipo de tests se hace con herramientas como Playwright o Cypress.

En este proyecto, hoy no hay base E2E montada.

### 4.5. Smoke testing

Son pruebas rápidas para comprobar que lo más importante no está roto.

Ejemplos:

- la app arranca
- home renderiza
- login abre
- perfil protegido redirige si no hay sesión

Es como una comprobación de “humo”: si aquí ya falla, no tiene sentido seguir.

### 4.6. Regression testing

Son pruebas que verifican que algo que antes funcionaba sigue funcionando después de cambios.

Ejemplo:

- antes el login redirigía bien a restaurantes,
- hicimos cambios en auth,
- un test de regresión confirma que no se rompió.

### 4.7. Acceptance testing

Prueba si una funcionalidad cumple lo que el negocio o el enunciado pedían.

Ejemplo:

- “un usuario no autenticado no puede entrar a perfil”
- “al iniciar sesión correctamente se redirige al listado”

No se centra tanto en clases o funciones concretas, sino en requisitos.

---

## 5. Qué tipos de testing tienen más sentido en este proyecto

En `restaurantes2`, por el momento, los tipos más útiles serían estos:

1. unit testing
2. integration testing ligero
3. smoke testing básico

¿Por qué?

Porque ahora mismo el proyecto está en una fase donde conviene primero asegurar:

- servicios
- guards
- interceptor
- formularios
- navegación básica

Los E2E serían un paso posterior, cuando la base unitaria e integrada ya esté más estable.

---

## 6. Qué se suele testear en Angular

En Angular hay varias piezas muy habituales para testing.

### Servicios

Ejemplos de cosas a comprobar:

- que se crean
- que llaman a la URL correcta
- que transforman bien una respuesta
- que actualizan estado interno

### Componentes

Ejemplos:

- que renderizan
- que muestran un mensaje cuando hay error
- que llaman a un método al pulsar un botón
- que reaccionan a cambios de estado

### Guards

Ejemplos:

- dejan pasar si hay sesión
- redirigen si no la hay

### Interceptores

Ejemplos:

- añaden algo a la request
- reaccionan a un `401`

### Pipes o funciones utilitarias

Si existieran, son candidatas muy buenas para tests unitarios porque suelen ser pequeñas y predecibles.

---

## 7. Qué herramientas usa hoy `restaurantes2`

Según el estado actual del proyecto:

- `npm test` ejecuta `ng test`
- Angular usa el builder `@angular/build:unit-test`
- el runner observado es `Vitest`
- el entorno incluye `jsdom`

Esto es importante porque significa que el proyecto ya tiene una base moderna de tests unitarios en Angular 21.

No hace falta empezar desde cero absoluto.

---

## 8. Ejemplos típicos de tests que tiene sentido enseñar aquí

Aquí viene la parte más práctica. No vamos a implementar todos estos tests ahora mismo, pero sí a usarlos como ejemplos pedagógicos dentro del documento.

### 8.0. Qué es `TestBed`

`TestBed` es la herramienta de Angular para construir un entorno de pruebas.

Piensa en `TestBed` como un mini Angular preparado solo para el test.

Sirve para cosas como estas:

- declarar qué componente quieres probar,
- registrar providers,
- inyectar servicios,
- simular una parte pequeña de la app sin levantarla entera.

Las dos operaciones que más vas a ver son:

```ts
TestBed.configureTestingModule({...})
TestBed.inject(...)
```

#### `configureTestingModule({...})`

Sirve para decirle al test qué piezas necesita ese entorno.

Ejemplos:

- imports,
- providers,
- mocks,
- configuración mínima del caso.

#### `inject(...)`

Sirve para pedir una dependencia ya preparada dentro de ese entorno de prueba.

Ejemplo:

```ts
service = TestBed.inject(Restaurantes);
```

Eso significa:

- “dame la instancia del servicio `Restaurantes` dentro del entorno de test”.

### Ejemplo sencillo explicado paso a paso

```ts
import { TestBed } from '@angular/core/testing';
import { Restaurantes } from './restaurantes';

describe('Restaurantes', () => {
  let service: Restaurantes;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Restaurantes);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
```

Qué hace cada parte:

1. `describe('Restaurantes', ...)`
   Agrupa los tests del servicio `Restaurantes`.

2. `let service: Restaurantes`
   Declara una variable donde guardaremos la instancia real del servicio en el test.

3. `beforeEach(...)`
   Se ejecuta antes de cada test. Sirve para preparar el entorno limpio cada vez.

4. `TestBed.configureTestingModule({})`
   Crea el entorno mínimo de Angular para esta prueba.

5. `TestBed.inject(Restaurantes)`
   Pide la instancia del servicio dentro de ese entorno.

6. `expect(service).toBeTruthy()`
   Comprueba que el servicio existe y se pudo crear.

### Importante en este proyecto

Aquí hay un detalle que tú detectaste bien: en `restaurantes2` no existe un servicio llamado `Restaurantes` en la misma carpeta que el ejemplo mostraba de forma genérica.

El servicio real del proyecto está en:

- `src/app/components/pages/home/services/restaurantes.ts`

Por eso, si queremos un ejemplo realista para este proyecto, el import correcto sería este:

```ts
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { Restaurantes } from './restaurantes';

describe('Restaurantes', () => {
  let service: Restaurantes;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });

    service = TestBed.inject(Restaurantes);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
```

Y ese ejemplo tendría sentido dentro del archivo real:

- `src/app/components/pages/home/services/restaurantes.spec.ts`

### 8.1. Test típico de servicio

Caso:

- comprobar que un servicio existe

Ejemplo realista para este proyecto:

```ts
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { Restaurantes } from './restaurantes';

describe('Restaurantes', () => {
  let service: Restaurantes;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });

    service = TestBed.inject(Restaurantes);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
```

Qué enseña este test:

- cómo montar `TestBed`
- cómo inyectar un servicio
- cómo preparar providers mínimos para un servicio real
- cómo hacer una primera comprobación mínima

### 8.2. Test típico de formulario de login

Caso:

- si faltan campos, debe mostrar mensaje de error

Ejemplo orientativo:

```ts
it('should show error if nombre or password are empty', () => {
  component.nombre = '';
  component.password = '';

  component.submitLogin();

  expect(component.errorMessage).toBe('Debes completar nombre y contraseña.');
});
```

Qué enseña:

- que un componente también tiene lógica testeable
- que no todo test depende del DOM

### 8.3. Test típico de navegación tras login

Caso:

- si login sale bien, debe navegar a `/restaurantes`

Ejemplo orientativo:

```ts
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { vi } from 'vitest';

it('should navigate to restaurantes on successful login', () => {
  const router = TestBed.inject(Router);
  const authServiceMock = TestBed.inject(AuthService);

  vi.spyOn(router, 'navigate').mockResolvedValue(true);
  authServiceMock.login.mockReturnValue(of(mockAuthResponse));

  component.nombre = 'Senior Cat';
  component.password = 'seniorcat123';

  component.submitLogin();

  expect(router.navigate).toHaveBeenCalledWith(['/restaurantes']);
});
```

Qué enseña:

- mock de servicio
- mock de router
- comprobación de `next`

### 8.4. Test típico de error en login

Caso:

- si login falla, debe mostrar error y no navegar

Ejemplo orientativo:

```ts
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { vi } from 'vitest';

it('should show error when login fails', () => {
  const router = TestBed.inject(Router);
  const authServiceMock = TestBed.inject(AuthService);

  vi.spyOn(router, 'navigate').mockResolvedValue(true);
  authServiceMock.login.mockReturnValue(throwError(() => new Error('fail')));

  component.nombre = 'Senior Cat';
  component.password = 'incorrecta';

  component.submitLogin();

  expect(component.errorMessage).toBe('No se pudo iniciar sesión. Revisa tus credenciales.');
  expect(router.navigate).not.toHaveBeenCalled();
});
```

### 8.5. Test típico de guard

Caso:

- si no hay sesión, debe redirigir a login

Ejemplo orientativo:

```ts
import { Router } from '@angular/router';
import { firstValueFrom, isObservable, of } from 'rxjs';

async function resolveGuardResult(result: ReturnType<typeof authGuard>) {
  if (isObservable(result)) {
    return firstValueFrom(result);
  }

  return result;
}

it('should redirect to login when session is not valid', async () => {
  const authServiceMock = TestBed.inject(AuthService);
  const router = TestBed.inject(Router);

  authServiceMock.ensureSessionReady.mockReturnValue(of(false));

  const loginTree = router.createUrlTree(['/login']);
  const result = await TestBed.runInInjectionContext(() => resolveGuardResult(authGuard({} as never, {} as never)));

  expect(router.serializeUrl(result as ReturnType<typeof router.createUrlTree>)).toBe(
    router.serializeUrl(loginTree),
  );
});
```

### Por qué aparecía el error de tipos en el guard

El error:

```ts
Argument of type 'MaybeAsync<GuardResult>' is not assignable to parameter of type 'Observable<GuardResult>'
```

aparece porque un guard en Angular no está obligado a devolver solo un `Observable`.

Puede devolver:

- un booleano,
- un `UrlTree`,
- un `Promise`,
- o un `Observable`.

Angular agrupa esas opciones bajo el tipo `MaybeAsync<GuardResult>`.

Por eso, si en un test intentamos pasar el resultado del guard directamente a `firstValueFrom(...)`, TypeScript protesta: no siempre tiene garantía de que eso sea un `Observable`.

La forma más clara de resolverlo es normalizar el resultado con una pequeña función auxiliar como `resolveGuardResult(...)`.

### 8.6. Test típico de interceptor

Caso:

- si una request devuelve `401`, el servicio de auth debe limpiar sesión

Aquí el objetivo pedagógico no es memorizar toda la API del test, sino entender el comportamiento esperado.

La idea sería comprobar:

1. que sale una request
2. que vuelve `401`
3. que se llama a `handleUnauthorized()`

---

## 9. Qué errores típicos de testing están apareciendo aquí ahora mismo

Esto es muy útil para alumnos, porque muchos errores de test no vienen de la lógica del componente, sino del entorno de prueba.

### Error típico 1. Faltan providers

Ejemplo real observado:

- `No provider found for ActivatedRoute`

Qué significa:

- el componente usa `ActivatedRoute`
- pero en el test no se configuró esa dependencia

Qué enseña:

- un test no ejecuta mágicamente toda la app real
- hay que suministrar dependencias, mocks o providers mínimos

### Error típico 2. Test viejo, código nuevo

Ejemplo real observado:

- `app.spec.ts` sigue esperando un título antiguo que ya no existe

Qué significa:

- el test quedó desactualizado

Qué enseña:

- un test también es código y también se mantiene

### Error típico 3. Test demasiado superficial

Muchos specs solo tienen:

```ts
it('should create', () => {
  expect(component).toBeTruthy();
});
```

Eso no está mal como primer ladrillo, pero se queda corto.

Qué falta después:

- validar comportamiento
- comprobar estados
- comprobar mensajes
- comprobar navegación
- comprobar integración con servicios

---

## 10. Paso a paso para agregar testing en un proyecto como este

Esta parte es la más importante como guía de trabajo.

Si un alumno tuviera que añadir testing a su propio proyecto, el orden recomendado sería este.

### Paso 1. Comprobar qué base de testing ya existe

Antes de escribir tests, revisar:

- `package.json`
- `angular.json`
- si existen `.spec.ts`
- qué comando ejecuta los tests

Objetivo:

- no construir encima de suposiciones falsas

### Paso 2. Ejecutar el runner actual

Ejemplo:

```bash
npm test -- --watch=false
```

Objetivo:

- ver qué pasa hoy realmente
- detectar si ya hay tests
- detectar si fallan por configuración o por lógica

### Paso 3. Clasificar los archivos a testear

No empezar escribiendo tests al azar.

Hacer una lista de piezas:

1. servicios
2. componentes con formularios
3. guards
4. interceptores
5. páginas críticas

En `restaurantes2`, una clasificación razonable sería:

1. `auth.service.ts`
2. `auth.guard.ts`
3. `auth.interceptor.ts`
4. `login.ts`
5. `registro.ts`
6. `perfil.ts`
7. `restaurantes.ts`

### Paso 4. Empezar por piezas pequeñas

Lo más recomendable es empezar por tests unitarios simples.

Orden razonable:

1. servicios
2. guards
3. componentes con validación local
4. navegación

No empezar por el caso más complejo del proyecto.

### Paso 5. Escribir primero el comportamiento esperado

Antes del código del test, pensar en una frase clara.

Ejemplos:

- “debe mostrar error si faltan campos”
- “debe navegar a restaurantes cuando login sale bien”
- “debe redirigir a login si no hay sesión”

Si no puedes describir bien el comportamiento, tampoco vas a testearlo bien.

### Paso 6. Añadir mocks mínimos

Muchos tests fallan porque el componente depende de:

- `Router`
- `ActivatedRoute`
- `HttpClient`
- un servicio propio

Entonces hay que decidir qué simular.

Ejemplos:

- mock de `Router`
- mock de `ActivatedRoute`
- spy de un servicio

### Paso 7. Ejecutar tests frecuentemente

No esperar a escribir 20 tests para probar.

Mejor:

1. escribir un test
2. ejecutar
3. corregir
4. seguir

### Paso 8. Mejorar tests vacíos o desactualizados

Si ya existen `.spec.ts`, no hace falta borrarlos todos.

Se puede hacer esto:

1. conservar los útiles
2. arreglar los rotos por configuración
3. reemplazar los triviales por pruebas más valiosas

### Paso 9. Construir una pequeña base de smoke tests

Un buen mínimo para un proyecto como este sería:

1. home crea correctamente
2. login valida campos vacíos
3. login navega en éxito
4. login muestra error en fallo
5. guard redirige si no hay sesión
6. perfil carga usuario autenticado

### Paso 10. Luego ampliar a integración ligera

Cuando ya haya tests básicos estables, se pueden añadir casos como:

- interacción entre componente y servicio
- comportamiento del interceptor ante `401`
- rutas protegidas

---

## 11. Propuesta concreta de primer bloque de tests para restaurantes2

Si quisiéramos empezar de forma sensata en este proyecto, el primer bloque recomendable sería este:

### Bloque 1. Auth y navegación

1. `login.ts`
   - error si faltan campos
   - navegación en login correcto
   - mensaje en login fallido

2. `registro.ts`
   - error si faltan campos
   - error si contraseñas no coinciden
   - navegación en registro correcto

3. `auth.guard.ts`
   - deja pasar si `ensureSessionReady()` devuelve `true`
   - redirige si devuelve `false`

4. `auth.service.ts`
   - actualiza estado tras login correcto
   - limpia sesión en `handleUnauthorized()`

### Bloque 2. Servicios de dominio

5. `restaurantes.ts`
   - pide listado
   - pide restaurante por id
   - llama a create/update/delete con la URL correcta

### Bloque 3. Componentes clave

6. `perfil.ts`
   - carga perfil al iniciar
   - muestra error si falla

7. `header.ts`
   - muestra links públicos si no hay sesión
   - muestra perfil/logout si sí hay sesión

---

## 12. Qué no debería hacer un alumno al empezar con testing

Errores comunes:

1. intentar testear todo a la vez
2. empezar por el flujo más difícil
3. copiar tests sin entenderlos
4. dejar tests rotos “para luego” indefinidamente
5. pensar que `should create` ya es suficiente

La buena estrategia es progresiva. Igual que en construcción: primero se nivelan los cimientos, luego se levantan muros, después se afina el acabado.

---

## 13. Diferencia entre “hacer testing” y “tener archivos spec”

Esto es importante.

No es lo mismo:

- tener muchos `.spec.ts`

que:

- tener una estrategia de testing útil.

Puedes tener muchos archivos de test y seguir sin una red de seguridad real.

Lo que importa no es la cantidad de `.spec.ts`.

Lo que importa es que los tests comprueben comportamientos relevantes.

---

## 14. Cómo debería pensar un alumno cuando escribe un test

La pregunta base no es:

- “¿cómo escribo un expect?”

La pregunta base es:

- “¿qué comportamiento quiero proteger?”

Una buena secuencia mental sería:

1. qué hace esta pieza
2. qué podría salir mal
3. qué escenario es importante comprobar
4. qué dependencias necesito simular
5. qué resultado espero ver

Esa forma de pensar vale más que memorizar cualquier framework.

---

## 15. Resumen final

Testing no es un extra decorativo.

Es una forma de comprobar que el proyecto sigue firme cuando añadimos cambios.

En `restaurantes2`, hoy ya existe una base de tests, pero:

- hay tests generados automáticamente,
- varios fallan por configuración,
- y todavía falta una estrategia clara.

El camino recomendado para este proyecto es:

1. entender el estado actual,
2. empezar por unit tests pequeños,
3. arreglar dependencias y mocks,
4. convertir tests vacíos en tests útiles,
5. construir una base de smoke e integración ligera.

Si alguien sigue este documento paso a paso, debería poder empezar a añadir testing real a sus propios proyectos sin perderse.

---

## 16. Checklist de testing para usar como rúbrica

Esta checklist sirve como guía rápida de revisión. Se puede usar como autoevaluación del alumno o como rúbrica simple de corrección.

### A. Base del entorno

- existe un comando claro para ejecutar tests
- el proyecto tiene configuración de testing funcional
- los tests arrancan sin errores de entorno básicos

### B. Calidad mínima de los tests

- el proyecto no depende solo de `should create`
- hay al menos un test de comportamiento real
- los nombres de los tests explican qué se espera
- los tests se entienden sin leer demasiada implementación interna

### C. Cobertura recomendada para Angular

- hay tests de servicios importantes
- hay tests de formularios clave
- hay tests de guards o control de acceso
- hay tests de navegación básica cuando aplica
- hay tests de mensajes de error en flujos críticos

### D. Uso correcto de mocks

- las dependencias externas están mockeadas cuando hace falta
- el test no falla por providers ausentes fáciles de resolver
- se mockean solo las dependencias necesarias
- el mock ayuda a comprobar comportamiento, no solo a silenciar errores

### E. Valor pedagógico

- el test enseña un caso útil del proyecto
- el alumno puede explicar qué protege ese test
- el test está relacionado con una funcionalidad real
- los casos elegidos ayudan a entender mejor la arquitectura

### F. Señales de buen trabajo

- login valida campos vacíos
- login maneja éxito y error
- auth o guard protegen acceso correctamente
- servicios llaman a endpoints correctos
- los tests siguen pasando después de pequeños cambios no relacionados

### G. Preguntas de autoevaluación para el alumno

1. ¿Qué comportamiento importante protege este test?
2. ¿Qué se rompería en la app si este test empezara a fallar?
3. ¿Estoy comprobando una conducta real o solo que Angular crea el componente?
4. ¿Podría otra persona entender el test sin que yo se lo explique?
5. ¿Este test me da confianza para refactorizar?

Si la mayoría de respuestas es “sí”, el test probablemente está bien orientado.