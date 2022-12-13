import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigoGuard } from '@coreOT';
import { NgxPermissionsGuard } from 'ngx-permissions';

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
  {
    path: 'informe-avance',
    loadChildren: () =>
      import('./features/informe-avance/informe-avance.module').then(
        m => m.InformeAvanceModule
      ),
    // canLoad: [SigoGuard],
    canActivate: [SigoGuard],
  },
  {
    path: 'ingenieria',
    loadChildren: () =>
      import('./features/ingenieria/ingenieria.module').then(
        m => m.IngenieriaModule
      ),
    // canLoad: [SigoGuard],
    canActivate: [SigoGuard],
  },
  {
    path: 'acta',
    loadChildren: () =>
      import('./features/acta/acta.module').then(m => m.ActaModule),
    // canLoad: [SigoGuard],
    canActivate: [SigoGuard],
  },
  {
    path: 'administracion',
    loadChildren: () =>
      import('./features/administracion/administracion.module').then(
        m => m.AdministracionModule
      ),
    // canLoad: [SigoGuard],
    canActivate: [SigoGuard],
  },
  {
    path: 'reportes',
    loadChildren: () =>
      import('./features/reportes/reportes.module').then(m => m.ReportesModule),
    // canLoad: [SigoGuard],
    canActivate: [SigoGuard],
  },
  {
    path: 'imputacion',
    loadChildren: () =>
      import('./features/imputacion/imputacion.module').then(
        m => m.ImputacionModule
      ),
    // canLoad: [SigoGuard],
    data: {
      permissions: {
        only: 'IMPUTACION2',
      },
    },
    canActivate: [SigoGuard, NgxPermissionsGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
