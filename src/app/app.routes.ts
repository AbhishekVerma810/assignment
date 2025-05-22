// import { Routes } from '@angular/router';

// export const routes: Routes = [];

// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './features/product/product-list/product-list.component';
import { DashboardComponent } from './features/dashboard/dashboard/dashboard.component';

 export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductListComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', redirectTo: '/products' }
];


