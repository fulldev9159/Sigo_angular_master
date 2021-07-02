import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthTokenGuard } from '@utilsSIGO/auth-token.guard';
import { GuardTokenGuard } from '@utilsSIGO/guard-token.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'app', pathMatch: 'full' },
  {
    path: 'app',
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(
        m => m.DashboardModule
      ),
    canActivate: [GuardTokenGuard],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then(m => m.AuthModule),
    canActivate: [AuthTokenGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
