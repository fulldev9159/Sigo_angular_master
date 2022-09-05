import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CubicacionRoutingModule } from './cubicacion-routing.module';
import { CubicacionComponent } from './cubicacion.component';
import { SharedModule } from '@sharedOT/shared.module';
import { ListCubComponent } from './containers/list-cub/list-cub.component';
import { FormCubContainerComponent } from './containers/form-cub/form-cub-container.component';
import { FormularioComponent } from './components/formulario/formulario.component';

@NgModule({
  declarations: [
    CubicacionComponent,
    ListCubComponent,
    FormCubContainerComponent,
    FormularioComponent,
  ],
  imports: [
    CommonModule,
    CubicacionRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CubicacionModule {}
