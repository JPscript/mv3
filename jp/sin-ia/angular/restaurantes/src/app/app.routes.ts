import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { map } from 'rxjs';
import { Home } from './components/pages/home/home';
import { Restaurante } from './components/pages/home/restaurante/restaurante';
import { CrearRestaurante } from './components/pages/home/crear-restaurante/crear-restaurante';
import { ActualizarRestaurante } from './components/pages/home/actualizar-restaurante/actualizar-restaurante';
import { Login } from './components/pages/login/login';
import { Registro } from './components/pages/registro/registro';
import { Perfil } from './components/pages/perfil/perfil';
import { Mapa } from './components/pages/mapa/mapa';
import { Restaurantes } from './components/pages/home/services/restaurantes';

export const routes: Routes = [
    { path: '', redirectTo: '/restaurantes', pathMatch: 'full' },
    { path: 'restaurantes', title: "Restaurantes 🍽️",component: Home},
    {
        path: 'restaurantes/restaurante/:id',
        title: (route) => {
            const restaurantesService = inject(Restaurantes);
            const id = Number(route.paramMap.get('id'));

            if (Number.isNaN(id)) {
                return 'Restaurante no disponible | Restaurantes';
            }

            return restaurantesService.getById(id).pipe(
                map((restaurante) => `${restaurante.nombre} | Restaurantes`),
            );
        },
        component: Restaurante,
    },
    { path: 'restaurantes/crear-restaurante', title: "Restaurantes 🍽️",component: CrearRestaurante},
    { path: 'restaurantes/actualizar-restaurante', title: "Restaurantes 🍽️",component: ActualizarRestaurante},
    { path: 'login', title: "Login 🔐", component: Login },
    { path: 'registro', title: "Registro 📝", component: Registro },
    { path: 'perfil', title: "Perfil 👤", component: Perfil },
    { path: 'mapa', title: "Mapa 🗺️", component: Mapa },
    { path: '**', redirectTo: '/restaurantes' }
];
