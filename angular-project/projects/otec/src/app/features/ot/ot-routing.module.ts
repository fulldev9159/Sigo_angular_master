import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtComponent } from './ot.component';
import { CrearOtComponent } from './crear-ot/crear-ot.component';
import { CubicacionProyectoComponent} from './crear-ot/cubicacion-proyecto/cubicacion-proyecto.component'
import { Pep2Component} from './crear-ot/pep2/pep2.component'
import { OrganigramaComponent} from './crear-ot/organigrama/organigrama.component'
import { ConfirmacionComponent} from './crear-ot/confirmacion/confirmacion.component'
import { ProyectoComponent} from './crear-ot/proyecto/proyecto.component'
const routes: Routes = [
  { path: '', component: OtComponent },
  {
    path: 'crear-ot',
    component: CrearOtComponent,
    children:[
      {path:'',redirectTo: 'cubicacion-proyecto', pathMatch:'full'},
      {
      path:'cubicacion-proyecto', component: CubicacionProyectoComponent
    },
    {
      path:'pep2', component: Pep2Component
    },
    {
      path:'organigrama', component: OrganigramaComponent
    },
    {
      path:'confirmacion', component: ConfirmacionComponent
    },
    {
      path:'proyecto', component: ProyectoComponent
    }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtRoutingModule {}
