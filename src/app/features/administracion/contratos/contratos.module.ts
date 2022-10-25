import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ContratosComponent } from './contratos.component';
import { SharedModule } from '@sharedOT/shared.module';
import { ListContratosContainerComponent } from './containers/list-contratos-container/list-contratos-container.component';
import { FormContratosContainerComponent } from './containers/form-contratos-container/form-contratos-container.component';
import { ContratosRoutingModule } from './contratos-routing.module';

@NgModule({
  declarations: [
    ContratosComponent,
    ListContratosContainerComponent,
    FormContratosContainerComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ContratosRoutingModule,
    SharedModule,
  ],
})
export class ContratosModule {}
