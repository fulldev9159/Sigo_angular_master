import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormCubContainerComponent } from './container/form-cub/form-cub-container.component';
import { ListCubComponent } from './container/list-cub/list-cub.component';
import { CubicacionComponent } from './cubicacion.component';

export const routes: Routes = [
  {
    path: '',
    component: CubicacionComponent,
    children: [
      { path: '', redirectTo: 'list-cub', pathMatch: 'full' },
      {
        path: 'list-cub',
        component: ListCubComponent,
        data: { state: 'list-cub' }
      },
      {
        path: 'form-cub',
        component: FormCubContainerComponent,
        data: { state: 'form-cub' }
      },
      {
        path: 'form-cub/:id',
        component: FormCubContainerComponent,
        data: { state: 'form-cub' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CubicacionRoutingModule { }
