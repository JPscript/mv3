import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes'; // Asegúrate de que la ruta al archivo de rutas sea correcta

import { provideHttpClient } from '@angular/common/http'; // Asegúrate de que el módulo HttpClientModule esté importado en tu AppModule o en el módulo correspondiente

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), // Asegúrate de que 'routes' esté definido correctamente en tu archivo de rutas
    provideHttpClient() // Proporciona el servicio HttpClient para realizar solicitudes HTTP
  ]
};
