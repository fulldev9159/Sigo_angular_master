import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthToLoginUrlGuard } from './core/guard/auth-to-login-url.guard';
import { AuthGuard } from './core/guard/auth.guard';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/login/login.module').then((m) => m.LoginModule),
    canActivate: [AuthToLoginUrlGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard/cubicacion',
    loadChildren: () =>
      import('./features/cubicacion/cubicacion.module').then(
        (m) => m.CubicacionModule
      ),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
