import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';

import { ActaComponent } from './acta.component';

const routes: Routes = [
  {
    path: '',
    component: ActaComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: 'OT_VALIDAR_ACTA',
        redirectTo: '/app/ot/list-ot',
      },
      state: 'form-cub',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActaRoutingModule {}
