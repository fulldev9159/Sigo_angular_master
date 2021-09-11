import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormProComponent } from './container/form-pro/form-pro.component';
import { ListProComponent } from './container/list-pro/list-pro.component';

import { ProfileComponent } from './profile.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import * as Data from '@data';

export const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      { path: '', redirectTo: 'list-pro', pathMatch: 'full' },
      {
        path: 'list-pro',
        component: ListProComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'PERFIL_LISTAR',
            redirectTo: '/app/ot/list-ot',
          },
          state: 'list-pro',
        },
      },
      {
        path: 'form-pro',
        component: FormProComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'PERFIL_CREAR',
            redirectTo: '/app/ot/list-ot',
          },
          state: 'form-pro',
        },
      },
      {
        path: 'form-pro/:id',
        component: FormProComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'PERFIL_EDITAR',
            redirectTo: '/app/ot/list-ot',
          },
          state: 'form-pro',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
