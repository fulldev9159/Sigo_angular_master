import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormCubContainerComponent } from './container/form-cub/form-cub.component';
import { ListCubComponent } from './container/list-cub/list-cub.component';
import { CubicacionComponent } from './cubicacion.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { GetCubicacionResolver } from './resolver/get-cubicacion.resolver';

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
            redirectTo: '/app/dashboard',
          },
          state: 'list-cub',
        },
      },
      {
        path: 'form-cub',
        component: FormCubContainerComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'CUBICACION_CREAR',
            redirectTo: '/app/dashboard',
          },
          state: 'form-cub',
        },
      },
      {
        path: 'form-cub/:id',
        component: FormCubContainerComponent,
        canActivate: [NgxPermissionsGuard],
        resolve: {
          edit: GetCubicacionResolver,
        },
        data: {
          permissions: {
            only: 'CUBICACION_EDITAR',
            redirectTo: '/app/dashboard',
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
