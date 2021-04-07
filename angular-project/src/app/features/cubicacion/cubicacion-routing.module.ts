import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CubicacionComponent } from './cubicacion.component';

const routes: Routes = [
  {
    path: '',
    component: CubicacionComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CubicacionRoutingModule { }
