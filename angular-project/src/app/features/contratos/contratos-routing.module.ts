import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { FormContratosComponent } from './container/form-contratos/form-contratos.component';
import { ListContratosComponent } from './container/list-contratos/list-contratos.component';

import { ContratosComponent } from './contratos.component';

const routes: Routes = [
  {
    path: '',
    component: ContratosComponent,
    children: [
      { path: '', redirectTo: 'list-contratos', pathMatch: 'full' },
      {
        path: 'list-contratos',
        component: ListContratosComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'PERFIL_LISTAR',
            redirectTo: '/app/dashboard',
          },
          state: 'list-contratos',
        },
      },
      {
        path: 'form-contratos/:id',
        component: FormContratosComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'PERFIL_LISTAR',
            redirectTo: '/app/dashboard',
          },
          state: 'form-contratos',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContratosRoutingModule {}
