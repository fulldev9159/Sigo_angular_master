import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AreaComponent } from './area.component';
import { ListAreaComponent } from './container/list-area/list-area.component';
import { FormAreaComponent } from './container/form-area/form-area.component';
import { NgxPermissionsGuard } from 'ngx-permissions';

const routes: Routes = [
  {
    path: '',
    component: AreaComponent,
    children: [
      { path: '', redirectTo: 'list-area', pathMatch: 'full' },
      {
        path: 'list-area',
        component: ListAreaComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'PERFIL_LISTAR',
            redirectTo: '/app/dashboard',
          },
          state: 'list-area',
        },
      },
      {
        path: 'form-area/:id',
        component: FormAreaComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'PERFIL_EDITAR',
            redirectTo: '/app/dashboard',
          },
          state: 'form-area',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AreaRoutingModule {}
