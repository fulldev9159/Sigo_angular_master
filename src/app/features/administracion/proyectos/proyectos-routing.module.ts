import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//// import { FormProyectosContainerComponent } from './containers/form-proyectos-container/form-proyectos-container.component';
import { ListProyectosContainerComponent } from './containers/list-proyectos-container/list-proyectos-container.component';
import { ProyectosComponent } from './proyectos.component';

const routes: Routes = [
  {
    path: '',
    component: ProyectosComponent,
    children: [
      { path: '', redirectTo: 'list-proyectos', pathMatch: 'full' },
      {
        path: 'list-proyectos',
        component: ListProyectosContainerComponent,
      },
      //// {
      ////   path: 'form-proyectos',
      ////   component: FormProyectosContainerComponent,
      //// },
      //// {
      ////   path: 'form-proyectos/:id',
      ////   component: FormProyectosContainerComponent,
      //// },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProyectosRoutingModule {}
