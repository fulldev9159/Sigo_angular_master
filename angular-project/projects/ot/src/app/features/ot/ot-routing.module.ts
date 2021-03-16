import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtComponent } from './ot.component';
import { CrearOtComponent } from './crear-ot/crear-ot.component';

const routes: Routes = [
  { path: '', component: OtComponent },
  { path: 'crear-ot', component: CrearOtComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtRoutingModule {}
