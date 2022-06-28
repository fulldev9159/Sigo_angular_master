import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';

import { ActaComponent } from './acta.component';
import { TiposPagoResolver } from './resolvers/tipos-pago.resolver';

const routes: Routes = [
  {
    path: '',
    component: ActaComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['OT_VALIDAR_ACTA', 'OT_AUTORIZAR_PAGOS'],
        redirectTo: '/app/dashboard',
      },
      state: 'form-cub',
    },
    resolve: {
      tiposPago: TiposPagoResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActaRoutingModule {}
