import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformeAvanceRoutingModule } from './informe-avance-routing.module';
import { InformeAvanceComponent } from './components/informe-avance/informe-avance.component';
import { SharedModule } from '@sharedOT/shared.module';

@NgModule({
  declarations: [InformeAvanceComponent],
  imports: [CommonModule, InformeAvanceRoutingModule, SharedModule],
})
export class InformeAvanceModule {}
