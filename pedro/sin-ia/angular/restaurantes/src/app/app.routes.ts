import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';
import { Restaurante } from './components/pages/home/restaurante/restaurante';
import { Mapa } from './components/pages/mapa/mapa';
import { Perfil } from './components/pages/perfil/perfil';
import { Registro } from './components/pages/registro/registro';
import { Login } from './components/pages/login/login';
import { ActualizarRestaurante } from './components/pages/home/actualizar-restaurante/actualizar-restaurante';
import { CrearRestaurante } from './components/pages/home/crear-restaurante/crear-restaurante';

export const routes: Routes = [
    {path: '', redirectTo: '/restaurantes', pathMatch: 'full'},
    {path: 'restaurantes', title: "🍽️ Restaurantes", component: Home},
    {path: 'restaurantes/restaurante', title: "🍽️ Restaurante", component: Restaurante},
    {path: 'restaurantes/crear-restaurante', title: "➕ Crear Restaurante", component: CrearRestaurante},
    {path: 'restaurantes/actualizar-restaurante', title: "✏️ Actualizar Restaurante", component: ActualizarRestaurante},

    {path: 'login', title: "🔐 Login", component: Login},
    {path: 'registro', title: "📝 Registro", component: Registro},
    {path: 'perfil', title: "👤 Perfil", component: Perfil},
    {path: 'mapa', title: "🗺️ Mapa", component: Mapa},
    {path: '**', redirectTo: '/restaurantes'},

];