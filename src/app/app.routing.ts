
import { HomeComponent } from './components/home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AboutusComponent } from './components/aboutus/aboutus.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'home', component: HomeComponent },
    { path: 'aboutUs', component: AboutusComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);