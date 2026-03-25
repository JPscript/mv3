import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';
import { RestaurantePage } from './components/pages/home/restaurante/restaurante';
import { CrearRestaurante } from './components/pages/home/crear-restaurante/crear-restaurante';
import { ActualizarRestaurante } from './components/pages/home/actualizar-restaurante/actualizar-restaurante';
import { Login } from './components/pages/login/login';
import { Registro } from './components/pages/registro/registro';
import { Perfil } from './components/pages/perfil/perfil';
import { Mapa } from './components/pages/mapa/mapa';
import { RecetasPorRestauranteComponent } from './components/pages/recetas-por-restaurante/recetas-por-restaurante';

export const routes: Routes = [
    {path: '', redirectTo: '/restaurantes', pathMatch: 'full'},
    {path: "restaurantes", title: "Restaurantes", component: Home},
    {path: 'restaurantes/:id', title: "Restaurantes", component: RestaurantePage},
    {path: 'restaurantes/:id/recetas', title: "Recetas por restaurante", component: RecetasPorRestauranteComponent},
    {path: 'restaurantes/crear-restaurante', title: "Restaurantes", component: CrearRestaurante},
    {path: 'restaurantes/actualizar-restaurante', title: "Restaurantes", component: ActualizarRestaurante},
    {path: 'login', title: "Login", component: Login},
    {path: 'registro', title: "Registro", component: Registro},
    {path: 'perfil', title: "Perfil", component: Perfil},
    {path: 'mapa', title:"Mapa", component: Mapa},
    {path: '**', redirectTo: '/restaurantes'}
    
];
