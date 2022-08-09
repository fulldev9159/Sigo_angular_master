import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformacionComponent } from './informacion.component';

const routes: Routes = [
  {
    path: '',
    component: InformacionComponent,
    children: [
      {
        path: 'info-ot/:id',
        loadChildren: () =>
          import('./info-ot/info-ot.module').then(m => m.InfoOtModule),
      },
      {
        path: 'informe-avance/:id',
        loadChildren: () =>
          import('./informe-avance/informe-avance.module').then(
            m => m.InformeAvanceModule
          ),
      },
      {
        path: 'libro-obras/:id',
        loadChildren: () =>
          import('./libro-obras/libro-obras.module').then(
            m => m.LibroObrasModule
          ),
      },
      {
        path: 'anexos/:id',
        loadChildren: () =>
          import('./anexos/anexos.module').then(m => m.AnexosModule),
      },
      {
        path: 'generar-acta/:id',
        loadChildren: () =>
          import('./acta/acta.module').then(m => m.ActaModule),
      },
      {
        path: 'validar-acta/:id',
        loadChildren: () =>
          import('./acta/acta.module').then(m => m.ActaModule),
      },
      {
        path: 'validar-pago/:id',
        loadChildren: () =>
          import('./acta/acta.module').then(m => m.ActaModule),
      },
      {
        path: 'agregar-servicios-adicionales/:id',
        loadChildren: () =>
          import('./servicios-adicionales/servicios-adicionales.module').then(
            m => m.ServiciosAdicionalesModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformacionRoutingModule {}
