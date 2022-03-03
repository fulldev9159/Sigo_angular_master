import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '@uiOT/ui.module';

import { ContratosRoutingModule } from './contratos-routing.module';
import { ContratosComponent } from './contratos.component';
import { ListContratosComponent } from './container/list-contratos/list-contratos.component';
import { FormContratosComponent } from './container/form-contratos/form-contratos.component';

@NgModule({
  declarations: [
    ContratosComponent,
    ListContratosComponent,
    FormContratosComponent,
  ],
  imports: [CommonModule, ContratosRoutingModule, UiModule],
})
export class ContratosModule {}
