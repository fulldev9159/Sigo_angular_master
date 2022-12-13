import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtsAsignadasComponent } from './containers/ots-asignadas/ots-asignadas.component';
import { ActivosFijosComponent } from './containers/activos-fijos/activos-fijos.component';
import { ReportesComponent } from './reportes.component';
import { NgxPermissionsGuard } from 'ngx-permissions';

const routes: Routes = [
  {
    path: '',
    component: ReportesComponent,
    children: [
      { path: '', redirectTo: 'ot', pathMatch: 'full' },
      {
        path: 'ot',
        component: OtsAsignadasComponent,
        data: {
          permissions: {
            only: 'REPORTE_BASE',
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path: 'activos',
        component: ActivosFijosComponent,
        data: {
          permissions: {
            only: 'REPORTE_ACTIVOS',
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportesRoutingModule {}
