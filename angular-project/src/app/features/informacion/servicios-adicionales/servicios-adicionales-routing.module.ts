import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InformeAvanceResolver } from './resolvers/informe-avance.resolver';

import { ServiciosAdicionalesComponent } from './servicios-adicionales.component';

const routes: Routes = [
  {
    path: '',
    component: ServiciosAdicionalesComponent,
    resolve: {
      detalleInformeAvance: InformeAvanceResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiciosAdicionalesRoutingModule {}
