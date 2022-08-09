import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormCubComponent } from './containers/form-cub/form-cub.component';
import { ListCubComponent } from './containers/list-cub/list-cub.component';
import { CubicacionComponent } from './cubicacion.component';

const routes: Routes = [
  {
    path: '',
    component: CubicacionComponent,
    children: [
      { path: '', redirectTo: 'list-cub', pathMatch: 'full' },
      {
        path: 'list-cub',
        component: ListCubComponent,
      },
      {
        path: 'form-cub',
        component: FormCubComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CubicacionRoutingModule {}
