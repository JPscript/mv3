// Configuración principal de la aplicación Angular standalone
// Importa tipos y funciones necesarias para la configuración global
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core'; // ApplicationConfig: tipo de configuración global; provideBrowserGlobalErrorListeners: captura errores globales del navegador
import { provideRouter } from '@angular/router'; // Habilita el sistema de rutas en la app
import { provideHttpClient } from '@angular/common/http'; // Permite usar HttpClient para peticiones HTTP

import { routes } from './app.routes'; // Importa la definición de rutas de la app

// Exporta la configuración global de la aplicación
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(), // Activa la gestión global de errores del navegador (buenas prácticas)
    provideRouter(routes),                // Habilita el enrutamiento usando las rutas definidas en app.routes.ts
    provideHttpClient()                   // Permite inyectar y usar HttpClient en cualquier componente o servicio
  ]
};
