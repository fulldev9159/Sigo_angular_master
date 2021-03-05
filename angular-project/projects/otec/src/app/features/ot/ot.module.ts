import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { OtRoutingModule } from './ot-routing.module';
import { OtComponent } from './ot.component';
import { CrearOtComponent } from './crear-ot/crear-ot.component';
import { CubicacionProyectoComponent } from './crear-ot/cubicacion-proyecto/cubicacion-proyecto.component';
import { Pep2Component } from './crear-ot/pep2/pep2.component';
import { OrganigramaComponent } from './crear-ot/organigrama/organigrama.component';
import { ConfirmacionComponent } from './crear-ot/confirmacion/confirmacion.component';
import { ProyectoComponent } from './crear-ot/proyecto/proyecto.component';
import { StepsModule } from 'primeng/steps';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [OtComponent, CrearOtComponent, CubicacionProyectoComponent,Pep2Component,OrganigramaComponent,ConfirmacionComponent,ProyectoComponent],
  imports: [CommonModule, OtRoutingModule, SharedModule, StepsModule,ToastModule,CardModule],
})
export class OtModule {}
