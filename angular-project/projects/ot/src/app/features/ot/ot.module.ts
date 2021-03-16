import { NgModule } from '@angular/core';
import { SharedModule } from '@sharedOT/shared.module';
import { OtRoutingModule } from './ot-routing.module';
import { OtComponent } from './ot.component';
import { CrearOtComponent } from './crear-ot/crear-ot.component';


@NgModule({
  declarations: [OtComponent, CrearOtComponent],
  imports: [
    OtRoutingModule,
    SharedModule
  ]
})
export class OtModule { }
