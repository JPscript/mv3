import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';
import { Restaurant } from './components/pages/home/restaurant/restaurant';
import { CreateRestaurant } from './components/pages/home/create-restaurant/create-restaurant';
import { UpdateRestaurant } from './components/pages/home/update-restaurant/update-restaurant';
import { Login } from './components/pages/login/login';
import { Registration } from './components/pages/registration/registration';
import { Profile } from './components/pages/profile/profile';
import { Map } from './components/pages/map/map';

export const routes: Routes = [ 
    {path:'', redirectTo: '/restaurants', pathMatch: 'full'},
    {path: 'restaurants', title: 'Restaurants 🍽️', component: Home},
    {path: 'restaurants/restaurant', title: 'Restaurants 🍽️', component: Restaurant},
    {path: 'restaurants/create-restaurant', title: 'Create Restaurant 🆕', component: CreateRestaurant},
    {path: 'restaurants/update-restaurant', title: 'Update Restaurant ✏️', component: UpdateRestaurant},
    {path: 'login', title: 'Login 🔑', component: Login},
    {path: 'registration', title: 'Registration 📝', component: Registration},
    {path: 'profile', title: 'Profile 👤', component: Profile},
    {path: 'map', title: 'Map 🗺️', component: Map},
    {path: '**', redirectTo: '/restaurants'}
];
