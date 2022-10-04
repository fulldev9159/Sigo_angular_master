import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActaComponent } from './acta.component';
import { GenerarActaContainerComponent } from './containers/generar-acta-container/generar-acta-container.component';
import { ValidarActaContainerComponent } from './containers/validar-acta-container/validar-acta-container.component';
import { ListActasComponent } from './containers/list-actas/list-actas.component';
import { ActaRoutingModule } from './acta-routing.module';
import { SharedModule } from '@sharedOT/shared.module';

@NgModule({
  declarations: [
    ActaComponent,
    GenerarActaContainerComponent,
    ValidarActaContainerComponent,
    ListActasComponent,
  ],
  imports: [CommonModule, ActaRoutingModule, SharedModule],
})
export class ActaModule {}
