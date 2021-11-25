import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActaRoutingModule } from './acta-routing.module';
import { ActaComponent } from './acta.component';
import { UiModule } from '@uiOT/ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActaGestorComponent } from './acta-gestor/acta-gestor.component';

@NgModule({
  declarations: [ActaComponent, ActaGestorComponent],
  imports: [
    CommonModule,
    ActaRoutingModule,
    UiModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ActaModule {}
