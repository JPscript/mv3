import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';
import { Restaurante } from './components/pages/home/restaurante/restaurante';
import { ActualizarRestaurante } from './components/pages/home/actualizar-restaurante/actualizar-restaurante';
import { Login } from './components/pages/login/login';
import { Mapa } from './components/pages/mapa/mapa';
import { Perfil } from './components/pages/perfil/perfil';
import { CrearRestaurante } from './components/pages/home/crear-restaurante/crear-restaurante';
import { Registro } from './components/pages/registro/registro';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', title: "La mama opina 🍴", component: Home},
    {path: 'restaurantes/restaurante', title: "La mama opina 🍴", component: Restaurante},
    {path: 'restaurantes', title: "La cocina de la mama 🍴", component: Home},
    {path: 'restaurantes/crear-restaurante', title: "La mama opina 🍴", component: CrearRestaurante},
    {path: 'restaurantes/actualizar-restaurante', title: "La mama opina 🍴", component: ActualizarRestaurante},
    {path: 'login', title: "Login 🔐", component: Login},
    {path: 'registro', title: "Registro 📝", component: Registro},
    {path: 'perfil', title: "Perfil 🤓", component: Perfil},
    {path: 'mapa', title: "Mapa 🌎", component: Mapa},
    {path: '**', redirectTo: '/home'},
];
