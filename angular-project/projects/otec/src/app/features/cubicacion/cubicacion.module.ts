import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { CubicacionRoutingModule } from './cubicacion-routing.module';
import { CubicacionComponent } from './cubicacion.component';
import { CrearCubicacionComponent } from './crear-cubicacion/crear-cubicacion.component';
import { DropdownModule } from 'primeng/dropdown';
import { ListboxModule } from 'primeng/listbox';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
@NgModule({
  declarations: [CubicacionComponent, CrearCubicacionComponent],
  imports: [
    CommonModule,
    CubicacionRoutingModule,
    SharedModule,
    DropdownModule,
    ListboxModule,
    ConfirmPopupModule
  ],
})
export class CubicacionModule {}
