import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CubicacionRoutingModule } from './cubicacion-routing.module';
import { CubicacionComponent } from './cubicacion.component';
import { SharedModule } from '@sharedOT/shared.module';
import { ListCubComponent } from './containers/list-cub/list-cub.component';
import { FormCubComponent } from './containers/form-cub/form-cub.component';

@NgModule({
  declarations: [CubicacionComponent, ListCubComponent, FormCubComponent],
  imports: [CommonModule, CubicacionRoutingModule, SharedModule],
})
export class CubicacionModule {}
