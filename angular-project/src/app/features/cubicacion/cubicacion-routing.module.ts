import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormCubContainerComponent } from './container/form-cub/form-cub-container.component';
import { FormCub2Component } from './container/form-cub2/form-cub2.component';
import { ListCubComponent } from './container/list-cub/list-cub.component';
import { CubicacionComponent } from './cubicacion.component';
import { NgxPermissionsGuard } from 'ngx-permissions';

export const routes: Routes = [
  {
    path: '',
    component: CubicacionComponent,
    children: [
      { path: '', redirectTo: 'list-cub', pathMatch: 'full' },
      {
        path: 'list-cub',
        component: ListCubComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'CUBICACION_LISTAR',
            redirectTo: '/app/ot/list-ot',
          },
          state: 'list-cub',
        },
      },
      // {
      //   path: 'form-cub',
      //   component: FormCubContainerComponent,
      //   canActivate: [NgxPermissionsGuard],
      //   data: {
      //     permissions: {
      //       only: 'CUBICACION_CREAR',
      //       redirectTo: '/app/ot/list-ot',
      //     },
      //     state: 'form-cub',
      //   },
      // },
      // {
      //   path: 'form-cub/:id',
      //   component: FormCubContainerComponent,
      //   canActivate: [NgxPermissionsGuard],
      //   data: {
      //     permissions: {
      //       only: 'CUBICACION_EDITAR',
      //       redirectTo: '/app/ot/list-ot',
      //     },
      //     state: 'form-cub',
      //   },
      // },
      {
        path: 'form-cub',
        component: FormCub2Component,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'CUBICACION_CREAR',
            redirectTo: '/app/ot/list-ot',
          },
          state: 'form-cub',
        },
      },
      {
        path: 'form-cub/:id',
        component: FormCub2Component,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'CUBICACION_EDITAR',
            redirectTo: '/app/ot/list-ot',
          },
          state: 'form-cub',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CubicacionRoutingModule {}
