import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';
import { Restaurante } from './components/pages/home/restaurante/restaurante';
import { CrearRestaurante } from './components/pages/home/crear-restaurante/crear-restaurante';
import { ActualizarRestaurante } from './components/pages/home/actualizar-restaurante/actualizar-restaurante';
import { Login } from './components/pages/login/login';
import { Registro } from './components/pages/registro/registro';
import { Perfil } from './components/pages/perfil/perfil';
import { Mapa } from './components/pages/mapa/mapa';
import { authGuard } from './guards/auth.guard';
import { BorrarRestaurante } from './components/pages/home/borrar-restaurante/borrar-restaurante';

export const routes: Routes = [
    { path: '', redirectTo: '/restaurantes', pathMatch: 'full' },
    { path: 'restaurantes', title: "Restaurantes 🍽️",component: Home},
    { path: 'restaurantes/restaurante/:id', title: "Restaurantes 🍽️",component: Restaurante},
    { path: 'restaurantes/crear-restaurante', title: "Restaurantes 🍽️",component: CrearRestaurante, canActivate: [authGuard]},
    { path: 'restaurantes/actualizar-restaurante/:id', title: "Restaurantes 🍽️",component: ActualizarRestaurante, canActivate: [authGuard]},
    { path: 'restaurantes/borrar-restaurante/:id', title: "Restaurantes 🍽️",component: BorrarRestaurante, canActivate: [authGuard]},
    { path: 'login', title: "Login 🔐", component: Login },
    { path: 'registro', title: "Registro 📝", component: Registro },
    { path: 'perfil', title: "Perfil 👤", component: Perfil, canActivate: [authGuard] },
    { path: 'mapa', title: "Mapa 🗺️", component: Mapa },
    { path: '**', redirectTo: '/restaurantes' }
];
