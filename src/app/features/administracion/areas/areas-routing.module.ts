import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreasComponent } from './areas.component';
import { FormAreasContainerComponent } from './containers/form-areas-container/form-areas-container.component';
import { ListAreasContainerComponent } from './containers/list-areas-container/list-areas-container.component';
const routes: Routes = [
  {
    path: '',
    component: AreasComponent,
    children: [
      { path: '', redirectTo: 'list-areas', pathMatch: 'full' },
      {
        path: 'list-areas',
        component: ListAreasContainerComponent,
      },
      {
        path: 'form-areas',
        component: FormAreasContainerComponent,
      },
      {
        path: 'form-areas/:id',
        component: FormAreasContainerComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AreasRoutingModule {}
