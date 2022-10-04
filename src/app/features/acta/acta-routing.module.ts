import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActaComponent } from './acta.component';
import { GenerarActaContainerComponent } from './containers/generar-acta-container/generar-acta-container.component';
import { ListActasComponent } from './containers/list-actas/list-actas.component';
import { ValidarActaContainerComponent } from './containers/validar-acta-container/validar-acta-container.component';

const routes: Routes = [
  {
    path: '',
    component: ActaComponent,
    children: [
      { path: '', redirectTo: 'list-acta', pathMatch: 'full' },
      {
        path: 'list-actas',
        component: ListActasComponent,
      },
      {
        path: 'generar-acta/:id',
        component: GenerarActaContainerComponent,
      },
      {
        path: 'validar-acta/:id',
        component: ValidarActaContainerComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActaRoutingModule {}
