import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';
import { SingleRestaurant } from './components/pages/home/single-restaurant/single-restaurant';
import { CreateRestaurant } from './components/pages/home/create-restaurant/create-restaurant';
import { DeleteRestaurant } from './components/pages/home/delete-restaurant/delete-restaurant';
import { UpdateRestaurant } from './components/pages/home/update-restaurant/update-restaurant';
import { Profile } from './components/pages/profile/profile';
import { Login } from './components/pages/login/login';
import { Signup } from './components/pages/signup/signup';
import { Map } from './components/pages/map/map';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    { path: '', redirectTo: '/restaurants', pathMatch: 'full' },
    { path: 'restaurants', title: '🍽️ Restaurants', component: Home },
    { path: 'restaurants/:id', title: '🍴 Restaurant', component: SingleRestaurant },
    { path: 'create-restaurant', title: '➕🍽️ Create Restaurant', component: CreateRestaurant, canActivate: [authGuard] },
    { path: 'delete-restaurant', title: '🗑️ Delete Restaurant', component: DeleteRestaurant, canActivate: [authGuard] },
    { path: 'update-restaurant', title: '✏️ Update Restaurant', component: UpdateRestaurant, canActivate: [authGuard] },
    { path: 'profile', title: '👤 Profile', component: Profile, canActivate: [authGuard] },
    { path: 'login', title: '🔑 Login', component: Login },
    { path: 'signup', title: '📝 Signup', component: Signup },
    { path: 'map', title: '🗺️ Map', component: Map },
    { path: '**', redirectTo: '/restaurants' }
];
