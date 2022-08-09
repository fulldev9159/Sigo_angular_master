import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiciosAdicionalesComponent } from './servicios-adicionales.component';
import { ServiciosAdicionalesRoutingModule } from './servicios-adicionales-routing.module';

@NgModule({
  declarations: [ServiciosAdicionalesComponent],
  imports: [CommonModule, ServiciosAdicionalesRoutingModule],
})
export class ServiciosAdicionalesModule {}
