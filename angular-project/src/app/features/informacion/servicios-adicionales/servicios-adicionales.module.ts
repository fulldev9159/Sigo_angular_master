import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiciosAdicionalesComponent } from './servicios-adicionales.component';
import { ServiciosAdicionalesRoutingModule } from './servicios-adicionales-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '@uiOT/ui.module';

@NgModule({
  declarations: [ServiciosAdicionalesComponent],
  imports: [
    CommonModule,
    ServiciosAdicionalesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule,
  ],
})
export class ServiciosAdicionalesModule {}
