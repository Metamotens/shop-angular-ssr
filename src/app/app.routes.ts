import { Routes } from '@angular/router';
import { DetailComponent } from './detail/detail.component';

export const routes: Routes = [
    {
        path: 'products',
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
    },
    {
        path: 'products/:id',
        component: DetailComponent,
    },
    {
        path: '**',
        redirectTo: 'products'
    }
];
