import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalleOTResolver } from './resolvers/detalle-ot.resolver';
import { InformeAvanceResolver2 } from './resolvers/informe-avance.resolver';

import { ServiciosAdicionalesComponent } from './servicios-adicionales.component';

const routes: Routes = [
  {
    path: '',
    component: ServiciosAdicionalesComponent,
    resolve: {
      detalleOT: DetalleOTResolver,
      detalleInformeAvance: InformeAvanceResolver2,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiciosAdicionalesRoutingModule {}
