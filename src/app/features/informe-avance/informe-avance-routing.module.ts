import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformeAvanceComponent } from './components/informe-avance/informe-avance.component';
import { DetalleOTResolver } from './resolvers/detalleOT.resolver';
import { DetalleInformeAvanceResolver } from './resolvers/detalle-informe-avance.resolver';
import { AccionesOTResolver } from '../../core/resolvers/accionesOT.resolver';
const routes: Routes = [
  { path: '', redirectTo: 'informe-avance', pathMatch: 'full' },
  {
    path: 'informe-avance/:id',
    component: InformeAvanceComponent,
    resolve: {
      detalleOT: DetalleOTResolver,
      detalleInformeAvance: DetalleInformeAvanceResolver,
      accionesOT: AccionesOTResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformeAvanceRoutingModule {}
