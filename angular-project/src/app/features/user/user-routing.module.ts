import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormUserComponent } from './container/form-user/form-user.component';
import { FormUser2Component } from './container/form-user2/form-user.component';

import { ListUserComponent } from './container/list-user/list-user.component';
import { UserComponent } from './user.component';
import { NgxPermissionsGuard } from 'ngx-permissions';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: '', redirectTo: 'list-user', pathMatch: 'full' },
      {
        path: 'list-user',
        component: ListUserComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'PERFIL_LISTAR',
            redirectTo: '/app/ot/list-ot',
          },
          state: 'list-user',
        },
      },
      {
        path: 'form-user',
        component: FormUserComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'PERFIL_CREAR',
            redirectTo: '/app/ot/list-ot',
          },
          state: 'form-user',
        },
      },
      {
        path: 'form-user/:id',
        component: FormUserComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'PERFIL_EDITAR',
            redirectTo: '/app/ot/list-ot',
          },
          state: 'form-user',
        },
      },
      {
        path: 'form-user2',
        component: FormUser2Component,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'PERFIL_CREAR',
            redirectTo: '/app/ot/list-ot',
          },
          state: 'form-user',
        },
      },
      {
        path: 'form-user2/:id',
        component: FormUser2Component,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'PERFIL_EDITAR',
            redirectTo: '/app/ot/list-ot',
          },
          state: 'form-user',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
