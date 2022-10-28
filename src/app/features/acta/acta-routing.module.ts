import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccionesOTResolver } from 'src/app/core/resolvers/accionesOT.resolver';
import { ActaComponent } from './acta.component';
import { GenerarActaContainerComponent } from './containers/generar-acta-container/generar-acta-container.component';
import { ListActasContainerComponent } from './containers/list-actas-container/list-actas-container.component';
import { ValidarActaContainerComponent } from './containers/validar-acta-container/validar-acta-container.component';
import { ValidarPagoActaContainerComponent } from './containers/validar-pago-acta-container/validar-pago-acta-container.component';
import { ActaTiposPagosResolver } from './resolvers/actaTipoPago.resolver';
import { LastActaResolver } from './resolvers/lastActa.resolver';
import { Servicios4ActaResolver } from './resolvers/servicios4acta.resolver';
import { TotalActasResolver } from './resolvers/totalActas.resolver';
import { UOs4ActaResolver } from './resolvers/uos4acta.resolver';

const routes: Routes = [
  {
    path: '',
    component: ActaComponent,
    children: [
      { path: '', redirectTo: 'list-acta', pathMatch: 'full' },
      {
        path: 'list-actas',
        component: ListActasContainerComponent,
      },
      {
        path: 'generar-acta/:id',
        component: GenerarActaContainerComponent,
        resolve: {
          servicios4acta: Servicios4ActaResolver,
          uos4acta: UOs4ActaResolver,
          accionesOT: AccionesOTResolver,
          totalActas: TotalActasResolver,
        },
      },
      {
        path: 'validar-acta/:id',
        component: ValidarActaContainerComponent,
        resolve: {
          servicios4acta: Servicios4ActaResolver,
          uos4acta: UOs4ActaResolver,
          accionesOT: AccionesOTResolver,
          actaTiposPagos: ActaTiposPagosResolver,
        },
      },
      {
        path: 'validar-pago-acta/:id',
        component: ValidarPagoActaContainerComponent,
        resolve: {
          accionesOT: AccionesOTResolver,
          lastActa: LastActaResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActaRoutingModule {}
