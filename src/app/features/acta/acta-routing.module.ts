import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccionesOTResolver } from 'src/app/core/resolvers/accionesOT.resolver';
import { ActaComponent } from './acta.component';
import { GenerarActaContainerComponent } from './containers/generar-acta-container/generar-acta-container.component';
import { ListActasComponent } from './containers/list-actas/list-actas.component';
import { ValidarActaContainerComponent } from './containers/validar-acta-container/validar-acta-container.component';
import { Servicios4ActaResolver } from './resolvers/servicios4acta.resolver';
import { UOs4ActaResolver } from './resolvers/uos4acta.resolver';

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
        resolve: {
          servicios4acta: Servicios4ActaResolver,
          uos4acta: UOs4ActaResolver,
          accionesOT: AccionesOTResolver,
        },
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
