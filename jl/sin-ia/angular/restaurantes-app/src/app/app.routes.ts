import { Routes } from '@angular/router';

import { RestaurantesComponent } from './pages/restaurantes/restaurantes';
import { RestauranteDetalle } from './pages/restaurante-detalle/restaurante-detalle';
import { Registro } from './pages/registro/registro';
import { Login } from './pages/login/login';
import { Perfil } from './pages/perfil/perfil';
import { Mapa } from './pages/mapa/mapa';

export const routes: Routes = [
  { path: '', redirectTo: 'restaurantes', pathMatch: 'full' },
  { path: 'restaurantes', component: RestaurantesComponent },
  { path: 'restaurantes/:id', component: RestauranteDetalle },
  { path: 'registro', component: Registro },
  { path: 'login', component: Login },
  { path: 'perfil', component: Perfil },
  { path: 'mapa', component: Mapa },
];
