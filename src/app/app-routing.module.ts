import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigoGuard } from '@coreOT';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/home.module').then(m => m.HomeModule),
    // canLoad: [SigoGuard],
    canActivate: [SigoGuard],
  },
  {
    path: 'cubicacion',
    loadChildren: () =>
      import('./features/cubicacion/cubicacion.module').then(
        m => m.CubicacionModule
      ),
    // canLoad: [SigoGuard],
    canActivate: [SigoGuard],
  },
  {
    path: 'ot',
    loadChildren: () => import('./features/ot/ot.module').then(m => m.OtModule),
    // canLoad: [SigoGuard],
    canActivate: [SigoGuard],
  },
  {
    path: 'ot-detalle',
    loadChildren: () =>
      import('./features/ot-detalle/ot-detalle.module').then(
        m => m.OtDetalleModule
      ),
    // canLoad: [SigoGuard],
    canActivate: [SigoGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
