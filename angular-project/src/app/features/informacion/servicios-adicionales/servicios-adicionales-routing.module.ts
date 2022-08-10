import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalleOTResolver } from './resolvers/detalle-ot.resolver';
import { InformeAvanceResolver } from './resolvers/informe-avance.resolver';

import { ServiciosAdicionalesComponent } from './servicios-adicionales.component';

const routes: Routes = [
  {
    path: '',
    component: ServiciosAdicionalesComponent,
    resolve: {
      detalleOT: DetalleOTResolver,
      detalleInformeAvance: InformeAvanceResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiciosAdicionalesRoutingModule {}
