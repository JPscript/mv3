// Angular: src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app'; // O donde tengas tu componente raíz

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
