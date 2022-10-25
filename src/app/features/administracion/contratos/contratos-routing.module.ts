import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormContratosContainerComponent } from './containers/form-contratos-container/form-contratos-container.component';
import { ListContratosContainerComponent } from './containers/list-contratos-container/list-contratos-container.component';
import { ContratosComponent } from './contratos.component';
const routes: Routes = [
  {
    path: '',
    component: ContratosComponent,
    children: [
      { path: '', redirectTo: 'list-contratos', pathMatch: 'full' },
      {
        path: 'list-contratos',
        component: ListContratosContainerComponent,
      },
      //// {
      ////   path: 'form-contratos',
      ////   component: FormContratosContainerComponent,
      //// },
      {
        path: 'form-contratos/:id',
        component: FormContratosContainerComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContratosRoutingModule {}
