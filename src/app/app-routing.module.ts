import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigoGuard } from '@coreOT';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/home.module').then(m => m.HomeModule),
    canLoad: [SigoGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/auth/auth.module').then(m => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
