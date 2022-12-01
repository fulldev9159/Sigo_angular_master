import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultadoIngenieriaContainerComponent } from './containers/resultado-ingenieria-container/resultado-ingenieria-container.component';
import { IngenieriaRoutingModule } from './ingenieria-routing.module';
import { SharedModule } from '@sharedOT/shared.module';
import { ValidarIngenieriaContainerComponent } from './containers/validar-ingenieria-container/validar-ingenieria-container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ResultadoIngenieriaContainerComponent,
    ValidarIngenieriaContainerComponent,
  ],
  imports: [
    CommonModule,
    IngenieriaRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class IngenieriaModule {}
