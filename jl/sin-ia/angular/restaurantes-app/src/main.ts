import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app'; // <--- CAMBIA 'App' POR 'AppComponent'

bootstrapApplication(AppComponent, appConfig) // <--- ASEGÚRATE QUE AQUÍ TAMBIÉN DIGA 'AppComponent'
  .catch((err) => console.error(err));
