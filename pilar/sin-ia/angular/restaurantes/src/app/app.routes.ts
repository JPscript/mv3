import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { map } from 'rxjs';
import { Home } from './components/pages/home/home';
import { RestauranteComponent } from './components/pages/home/restaurante/restaurante';
import { CrearRestaurante } from './components/pages/home/crear-restaurante/crear-restaurante';
import { ActualizarRestaurante } from './components/pages/home/actualizar-restaurante/actualizar-restaurante';
import { BorrarRestaurante } from './components/pages/home/borrar-restaurante/borrar-restaurante';
import { CrearReceta } from './components/pages/home/crear-receta/crear-receta';
import { ActualizarReceta } from './components/pages/home/actualizar-receta/actualizar-receta';
import { BorrarReceta } from './components/pages/home/borrar-receta/borrar-receta';
import { Login } from './components/pages/login/login';
import { Registro } from './components/pages/registro/registro';
import { Perfil } from './components/pages/perfil/perfil';
import { Mapa } from './components/pages/mapa/mapa';
import { Restaurantes } from './components/pages/home/services/restaurantes';
import { authGuard } from './guards/auth.guard/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/restaurantes', pathMatch: 'full' },
    { path: 'restaurantes', title: "Restaurantes 🍽️", component: Home },
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
        component: RestauranteComponent,
    },
    { path: 'restaurantes/crear-restaurante', title: "Crear Restaurante 🍽️", component: CrearRestaurante, canActivate: [authGuard]},
    { path: 'restaurantes/actualizar-restaurante/:id', title: "Actualizar Restaurante 🍽️", component: ActualizarRestaurante, canActivate: [authGuard]},
    { path: 'restaurantes/actualizar-restaurante', title: "Actualizar Restaurante 🍽️", component: ActualizarRestaurante, canActivate: [authGuard]},
    { path: 'restaurantes/borrar-restaurante/:id', title: "Borrar Restaurante 🍽️", component: BorrarRestaurante, canActivate: [authGuard]},
    { path: 'restaurantes/borrar-restaurante', title: "Borrar Restaurante 🍽️", component: BorrarRestaurante, canActivate: [authGuard]},
    { path: 'recetas/crear-receta/:restaurantId', title: "Crear Receta 📖", component: CrearReceta, canActivate: [authGuard]},
    { path: 'recetas/actualizar-receta/:id', title: "Actualizar Receta 📖", component: ActualizarReceta, canActivate: [authGuard]},
    { path: 'recetas/borrar-receta/:id', title: "Borrar Receta 📖", component: BorrarReceta, canActivate: [authGuard]},
    { path: 'login', title: "Login 🔐", component: Login },
    { path: 'registro', title: "Registro 📝", component: Registro },
    { path: 'perfil', title: "Perfil 👤", component: Perfil, canActivate: [authGuard] },
    { path: 'mapa', title: "Mapa 🗺️", component: Mapa },
    { path: 'privacidad', title: "Privacidad", redirectTo: '/restaurantes' },
    { path: 'terminos', title: "Términos", redirectTo: '/restaurantes' },
    { path: '**', redirectTo: '/restaurantes' }
];