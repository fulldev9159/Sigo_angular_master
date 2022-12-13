import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProyectosComponent } from './proyectos.component';
import { ProyectosRoutingModule } from './proyectos-routing.module';
import { SharedModule } from '@sharedOT/shared.module';
import { ListProyectosContainerComponent } from './containers/list-proyectos-container/list-proyectos-container.component';
//// import { FormProyectosContainerComponent } from './containers/form-proyectos-container/form-proyectos-container.component';

@NgModule({
  declarations: [
    ProyectosComponent,
    ListProyectosContainerComponent,
    //// FormProyectosContainerComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ProyectosRoutingModule,
    SharedModule,
  ],
})
export class ProyectosModule {}
