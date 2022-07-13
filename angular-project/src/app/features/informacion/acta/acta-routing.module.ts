import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';

import { ActaComponent } from './acta.component';
import { UltimoTipoPagoResolver } from './resolvers/ultimo-tipo-pago.resolver';
import { TiposPagoResolver } from './resolvers/tipos-pago.resolver';
import { DetalleServicioResolver } from './resolvers/detalle-servicio.resolver';
import { DetalleUobResolver } from './resolvers/detalle-uob.resolver';
import { LastActaResolver } from './resolvers/last-acta.resolver';

const routes: Routes = [
  {
    path: '',
    component: ActaComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['OT_GENERAR_ACTA', 'OT_VALIDAR_ACTA', 'OT_AUTORIZAR_PAGOS'],
        redirectTo: '/app/dashboard',
      },
      state: 'form-cub',
    },
    resolve: {
      ultimoTipoPago: UltimoTipoPagoResolver,
      tiposPago: TiposPagoResolver,
      detalleServicio: DetalleServicioResolver,
      detalleUob: DetalleUobResolver,
      lastActa: LastActaResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActaRoutingModule {}
