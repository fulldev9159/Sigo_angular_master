import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '@coreOT/layout/login/login.component';
import { AuthToLoginUrlGuard } from './core/guards/auth-to-login-url.guard';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthToLoginUrlGuard],
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'cubicacion',
        loadChildren: () =>
          import('./features/cubicacion/cubicacion.module').then(
            (m) => m.CubicacionModule
          ),
      },
      {
        path: 'ot',
        loadChildren: () =>
          import('./features/ot/ot.module').then((m) => m.OtModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
