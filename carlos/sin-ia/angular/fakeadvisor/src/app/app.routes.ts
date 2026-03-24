import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { RestauranteComponent } from './components/restaurante/restaurante.component';
import { CrearRestauranteComponent } from './components/pages/home/components/crear-restaurante/crear-restaurante.component';
import { ActualizarRestauranteComponent } from './components/pages/home/components/actualizar-restaurante/actualizar-restaurante.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegistroComponent } from './components/pages/registro/registro.component';
import { PerfilComponent } from './components/pages/perfil/perfil.component';
import { MapaComponent } from './components/pages/mapa/mapa.component';

export const routes: Routes = [
  { path: '', redirectTo: '/restaurantes', pathMatch: 'full' },

  // LISTA DE RESTAURANTES
  { path: 'restaurantes', title: 'Restaurantes 🍽️', component: HomeComponent },

  // DETALLE DE RESTAURANTE (RUTA DINÁMICA)
  { path: 'restaurante/:id', title: 'Restaurante 🍽️', component: RestauranteComponent },

  // CRUD
  { path: 'restaurantes/crear-restaurante', title: 'Crear restaurante', component: CrearRestauranteComponent },
  { path: 'restaurantes/actualizar-restaurante', title: 'Actualizar restaurante', component: ActualizarRestauranteComponent },

  // PÁGINAS EXTRA
  { path: 'login', title: 'Login 🔐', component: LoginComponent },
  { path: 'registro', title: 'Registro 📝', component: RegistroComponent },
  { path: 'perfil', title: 'Perfil 🧑', component: PerfilComponent },
  { path: 'mapa', title: 'Mapa 🗺️', component: MapaComponent },

  // 404
  { path: '**', redirectTo: '/restaurantes' }
];
