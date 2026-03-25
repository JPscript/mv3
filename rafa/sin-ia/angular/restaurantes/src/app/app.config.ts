// Importamos tipos y funciones base desde Angular.
// `ApplicationConfig` define la forma del objeto de configuracion global.
// `provideBrowserGlobalErrorListeners` registra listeners globales para que Angular
// pueda reaccionar mejor ante errores que ocurren en el navegador.
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
// `provideRouter` activa el sistema de rutas de la aplicacion.
import { provideRouter } from '@angular/router';
// `routes` contiene el array con las paginas y sus rutas.
import { routes } from './app.routes';
// `provideHttpClient` habilita HttpClient para toda la aplicacion.
// Sin esto, los servicios no podrian hacer peticiones HTTP con Angular.
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';

// Esta es la configuracion principal de la aplicacion standalone.
// Piensa en este archivo como el lugar donde conectamos los servicios globales
// que estaran disponibles en todo el proyecto.
export const appConfig: ApplicationConfig = {
  providers: [
    // Registra el manejo global de ciertos errores del navegador.
    provideBrowserGlobalErrorListeners(),
    // Registra las rutas definidas en `app.routes.ts`.
    provideRouter(routes),
    // Registra el cliente HTTP global de Angular.
    // `withInterceptors` nos permite anadir el Bearer token automaticamente.
    provideHttpClient(withInterceptors([authInterceptor])),
  ]
};