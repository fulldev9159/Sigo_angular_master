import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformeAvanceComponent } from './components/informe-avance/informe-avance.component';
import { OtDetalleComponent } from './ot-detalle.component';
import { DetalleOTResolver } from './resolvers/detalleOT.resolver';
import { DetalleInformeAvanceResolver } from './resolvers/detalle-informe-avance.resolver';
import { AccionesOTResolver } from './resolvers/accionesOT.resolver';
const routes: Routes = [
  {
    path: '',
    component: OtDetalleComponent,
    children: [
      { path: '', redirectTo: 'info', pathMatch: 'full' },
      // {
      //   path: 'info',
      //   component: ListOtContainerComponent,
      // },
      {
        path: 'informe-avance/:id',
        component: InformeAvanceComponent,
        resolve: {
          detalleOT: DetalleOTResolver,
          detalleInformeAvance: DetalleInformeAvanceResolver,
          accionesOT: AccionesOTResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtDetalleRoutingModule {}
