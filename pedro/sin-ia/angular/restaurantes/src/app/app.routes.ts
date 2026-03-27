import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';
import { Restaurante } from './components/pages/home/restaurante/restaurante';
import { Mapa } from './components/pages/mapa/mapa';
import { Perfil } from './components/pages/perfil/perfil';
import { Registro } from './components/pages/registro/registro';
import { Login } from './components/pages/login/login';
import { Buscador } from './components/pages/buscador/buscador';
import { ActualizarRestaurante } from './components/pages/home/actualizar-restaurante/actualizar-restaurante';
import { CrearRestaurante } from './components/pages/home/crear-restaurante/crear-restaurante';
import { BorrarRestaurante } from './components/pages/home/borrar-restaurante/borrar-restaurante';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path: '', redirectTo: '/restaurantes', pathMatch: 'full'},
    {path: 'restaurantes', title: "🍽️ Restaurantes", component: Home},
    {path: 'restaurantes/restaurante/:id', title: "🍽️ Restaurante", component: Restaurante},
    {path: 'restaurantes/crear-restaurante', title: "➕ Crear Restaurante", component: CrearRestaurante, canActivate: [authGuard]},
    {path: 'restaurantes/actualizar-restaurante/:id', title: "✏️ Actualizar Restaurante", component: ActualizarRestaurante, canActivate: [authGuard]},
    {path: 'restaurantes/borrar-restaurante/:id', title: "🗑️ Borrar Restaurante", component: BorrarRestaurante, canActivate: [authGuard]},

    {path: 'login', title: "🔐 Login", component: Login},
    {path: 'registro', title: "📝 Registro", component: Registro},
    {path: 'buscador', title: "🔎 Buscador", component: Buscador},
    {path: 'perfil', title: "👤 Perfil", component: Perfil, canActivate: [authGuard]},
    {path: 'mapa', title: "🗺️ Mapa", component: Mapa},
    {path: '**', redirectTo: '/restaurantes'},

];