import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CubicacionComponent } from './cubicacion.component';
import { CrearCubicacionComponent } from './crear-cubicacion/crear-cubicacion.component';

const routes: Routes = [
  { path: '', component: CubicacionComponent },
  {
    path: 'crear-cubicacion',
    component: CrearCubicacionComponent,
    // outlet:'crear-cubicacion'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CubicacionRoutingModule {}
