import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthToLoginUrlGuard} from './core/guard/auth-to-login-url.guard'

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { 
    path: 'login', 
    loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule),
    canActivate:[AuthToLoginUrlGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
