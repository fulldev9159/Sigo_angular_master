import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormUserComponent } from './container/form-user/form-user.component';

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
            redirectTo: '/app/dashboard',
          },
          state: 'list-user',
        },
      },
      {
        path: 'form-user/:id',
        component: FormUserComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'PERFIL_EDITAR',
            redirectTo: '/app/dashboard',
          },
          state: 'form-user',
        },
      },
      {
        path: 'form-user',
        component: FormUserComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'PERFIL_CREAR',
            redirectTo: '/app/dashboard',
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
