import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { OtRoutingModule } from './ot-routing.module';
import { OtComponent } from './ot.component';
import { CrearOtComponent } from './crear-ot/crear-ot.component';

@NgModule({
  declarations: [OtComponent, CrearOtComponent],
  imports: [CommonModule, OtRoutingModule, SharedModule],
})
export class OtModule {}
