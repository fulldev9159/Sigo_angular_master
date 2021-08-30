import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormOtComponent } from './container/form-ot/form-ot.component';
import { FormOt2Component } from './container/form-ot2/form-ot.component';

import { CDetalleOtComponent } from './container/c-detalle-ot/c-detalle-ot.component';
import { ListOtComponent } from './container/list-ot/list-ot.component';
import { OtComponent } from './ot.component';
import { NgxPermissionsGuard } from 'ngx-permissions';

export const routes: Routes = [
  {
    path: '',
    component: OtComponent,
    children: [
      { path: '', redirectTo: 'list-ot', pathMatch: 'full' },
      {
        path: 'list-ot',
        component: ListOtComponent,
        // canActivate: [NgxPermissionsGuard],
        data: {
          // permissions: {
          //   only: 'OT_LISTAR',
          //   redirectTo: '/app/ot/list-ot',
          // },
          state: 'list-ot',
        },
      },
      {
        path: 'form-ot',
        component: FormOtComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'OT_CREAR',
            redirectTo: '/app/ot/list-ot',
          },
          state: 'form-ot',
        },
      },
      {
        path: 'form-ot2',
        component: FormOt2Component,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'OT_CREAR',
            redirectTo: '/app/ot/list-ot',
          },
          state: 'form-ot',
        },
      },
      // {
      //   path: 'form-ot/:id',
      //   component: FormOtComponent,
      //   canActivate: [NgxPermissionsGuard],
      //   data: { state: 'form-ot' },
      // },
      {
        path: 'detalle-ot/:id',
        component: CDetalleOtComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'OT_LISTAR',
            redirectTo: '/app/ot/list-ot',
          },
          state: 'detalle-ot',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtRoutingModule {}
