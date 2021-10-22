import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformacionComponent } from './informacion.component';

const routes: Routes = [
  {
    path: '',
    component: InformacionComponent,
    children: [
      {
        path: 'info-ot',
        loadChildren: () =>
          import('./info-ot/info-ot.module').then(m => m.InfoOtModule),
      },
      {
        path: 'costeo',
        loadChildren: () =>
          import('./info-costeo/info-costeo.module').then(
            m => m.InfoCosteoModule
          ),
      },
      {
        path: 'informe-avance',
        loadChildren: () =>
          import('./informe-avance/informe-avance.module').then(
            m => m.InformeAvanceModule
          ),
      },
      {
        path: 'libro-obras',
        loadChildren: () =>
          import('./libro-obras/libro-obras.module').then(
            m => m.LibroObrasModule
          ),
      },
      {
        path: 'anexos',
        loadChildren: () =>
          import('./anexos/anexos.module').then(m => m.AnexosModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformacionRoutingModule {}
