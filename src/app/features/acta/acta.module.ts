import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActaComponent } from './acta.component';
import { GenerarActaContainerComponent } from './containers/generar-acta-container/generar-acta-container.component';
import { ValidarActaContainerComponent } from './containers/validar-acta-container/validar-acta-container.component';
import { ActaRoutingModule } from './acta-routing.module';
import { SharedModule } from '@sharedOT/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidarPagoActaContainerComponent } from './containers/validar-pago-acta-container/validar-pago-acta-container.component';
import { ListActasContainerComponent } from './containers/list-actas-container/list-actas-container.component';
import { ActaPorServicioFormComponent } from './components/acta-por-servicio-form/acta-por-servicio-form.component';
import { ValidarActaOperacionesContainerComponent } from './containers/validar-acta-operaciones-container/validar-acta-operaciones-container.component';

@NgModule({
  declarations: [
    ActaComponent,
    GenerarActaContainerComponent,
    ValidarActaContainerComponent,
    ValidarPagoActaContainerComponent,
    ListActasContainerComponent,
    ActaPorServicioFormComponent,
    ValidarActaOperacionesContainerComponent,
  ],
  imports: [
    CommonModule,
    ActaRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ActaModule {}
