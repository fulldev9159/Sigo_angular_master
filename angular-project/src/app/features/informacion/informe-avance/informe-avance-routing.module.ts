import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalleOTResolver } from '../servicios-adicionales/resolvers/detalle-ot.resolver';
import { InformeAvanceResolver2 } from '../servicios-adicionales/resolvers/informe-avance.resolver';

import { InformeAvanceComponent } from './informe-avance.component';
import { InformeAvanceResolver } from './resolvers/informe-avance.resolver';

const routes: Routes = [
  {
    path: '',
    component: InformeAvanceComponent,
    resolve: {
      detalle: InformeAvanceResolver,
      detalleOT: DetalleOTResolver,
      detalleInformeAvance: InformeAvanceResolver2,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformeAvanceRoutingModule {}
