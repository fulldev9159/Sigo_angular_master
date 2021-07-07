import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormOtComponent } from './container/form-ot/form-ot.component';
import { CDetalleOtComponent } from './container/c-detalle-ot/c-detalle-ot.component';
import { ListOtComponent } from './container/list-ot/list-ot.component';
import { OtComponent } from './ot.component';

export const routes: Routes = [
  {
    path: '',
    component: OtComponent,
    children: [
      { path: '', redirectTo: 'list-ot', pathMatch: 'full' },
      {
        path: 'list-ot',
        component: ListOtComponent,
        data: { state: 'list-ot' },
      },
      {
        path: 'form-ot',
        component: FormOtComponent,
        data: { state: 'form-ot' },
      },
      {
        path: 'form-ot/:id',
        component: FormOtComponent,
        data: { state: 'form-ot' },
      },
      {
        path: 'detalle-ot/:id',
        component: CDetalleOtComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtRoutingModule {}
