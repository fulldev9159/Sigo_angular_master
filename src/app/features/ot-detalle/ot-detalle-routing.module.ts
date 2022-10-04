import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtDetalleComponent } from './ot-detalle.component';
const routes: Routes = [
  {
    path: '',
    component: OtDetalleComponent,
    children: [
      { path: '', redirectTo: 'info', pathMatch: 'full' },
      // {
      //   path: 'info',
      //   component: ListOtContainerComponent,
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtDetalleRoutingModule {}
