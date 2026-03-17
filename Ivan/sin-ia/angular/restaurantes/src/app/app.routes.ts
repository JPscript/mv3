import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';
import { Restaurante } from './components/pages/home/restaurante/restaurante';
import { CrearRestaurante } from './components/pages/home/crear-restaurante/crear-restaurante';
import { ActualizarRestaurante } from './components/pages/home/actualizar-restaurante/actualizar-restaurante';
import { BorrarRestaurante } from './components/pages/home/borrar-restaurante/borrar-restaurante';
import { Login } from './components/pages/login/login';
import { Registro } from './components/pages/registro/registro';
import { Perfil } from './components/pages/perfil/perfil';
import { Mapa } from './components/pages/mapa/mapa';

export const routes: Routes = [
  { path: '', redirectTo: '/restaurantes', pathMatch: 'full' },

  { path: 'restaurantes', title: 'Restaurantes', component: Home },
  { path: 'restaurantes/restaurante', title: 'Restaurante', component: Restaurante },

  { path: 'restaurantes/crear-restaurante', title: 'Crear Restaurante', component: CrearRestaurante },

  // AÑADIMOS :id (IMPORTANTE)
  { path: 'restaurantes/actualizar-restaurante/:id', title: 'Actualizar Restaurante', component: ActualizarRestaurante },

  // AÑADIMOS BORRAR
  { path: 'restaurantes/borrar-restaurante/:id', title: 'Borrar Restaurante', component: BorrarRestaurante },

  { path: 'login', title: 'Login', component: Login },
  { path: 'registro', title: 'Registro', component: Registro },
  { path: 'perfil', title: 'Perfil', component: Perfil },
  { path: 'mapa', title: 'Mapa', component: Mapa },

  { path: '**', redirectTo: '/restaurantes' }
];