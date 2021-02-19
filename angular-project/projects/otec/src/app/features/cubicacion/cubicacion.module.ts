import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { CubicacionRoutingModule } from './cubicacion-routing.module';
import { CubicacionComponent } from './cubicacion.component';
import { CrearCubicacionComponent } from './crear-cubicacion/crear-cubicacion.component';
import { DropdownModule } from 'primeng/dropdown';
import { ListboxModule } from 'primeng/listbox';
import { TableModule } from 'primeng/table';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { TooltipModule } from 'primeng/tooltip';
@NgModule({
  declarations: [CubicacionComponent, CrearCubicacionComponent],
  imports: [
    CommonModule,
    CubicacionRoutingModule,
    SharedModule,
    DropdownModule,
    ListboxModule,
    TableModule,
    ConfirmPopupModule,
    TooltipModule,
  ],
})
export class CubicacionModule {}
