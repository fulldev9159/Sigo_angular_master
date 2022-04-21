import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthTokenGuard } from '@utilsSIGO/auth-token.guard';
import { GuardTokenGuard } from '@utilsSIGO/guard-token.guard';
import { NotFoundComponent } from '@pages/not-found/not-found.component';

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
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
