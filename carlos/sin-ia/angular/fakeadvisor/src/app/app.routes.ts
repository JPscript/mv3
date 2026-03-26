import { Routes } from '@angular/router';

import { HomeComponent } from './components/pages/home/home.component';
import { RestauranteComponent } from './components/restaurante/restaurante.component';
import { CrearRestauranteComponent } from './components/pages/home/components/crear-restaurante/crear-restaurante.component';
import { ActualizarRestauranteComponent } from './components/pages/home/components/actualizar-restaurante/actualizar-restaurante.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegistroComponent } from './components/pages/registro/registro.component';
import { PerfilComponent } from './components/pages/perfil/perfil.component';
import { MapaComponent } from './components/pages/mapa/mapa.component';
import { RestaurantesListaComponent } from './components/pages/restaurantes-lista/restaurantes-lista.component';

import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  // PÁGINA PRINCIPAL
  { path: '', title: 'Inicio', component: HomeComponent },

  // LISTA ORDENADA DE RESTAURANTES
  { path: 'restaurantes', title: 'Restaurantes 🍽️', component: RestaurantesListaComponent },

  // DETALLE DE RESTAURANTE
  { path: 'restaurante/:id', title: 'Restaurante 🍽️', component: RestauranteComponent },

  // CRUD
  { path: 'restaurantes/crear-restaurante', title: 'Crear restaurante', component: CrearRestauranteComponent },
  { path: 'restaurantes/actualizar-restaurante', title: 'Actualizar restaurante', component: ActualizarRestauranteComponent },

  // LOGIN / REGISTRO
  { path: 'login', title: 'Login 🔐', component: LoginComponent },
  { path: 'registro', title: 'Registro 📝', component: RegistroComponent },

  // PERFIL (PROTEGIDO)
  { path: 'perfil', title: 'Perfil 🧑', canActivate: [AuthGuard], component: PerfilComponent },

  // MAPA
  { path: 'mapa', title: 'Mapa 🗺️', component: MapaComponent },

  // 404
  { path: '**', redirectTo: '' }
];
