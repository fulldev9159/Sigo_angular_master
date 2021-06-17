import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CubicacionRoutingModule } from './cubicacion-routing.module';
import { CubicacionComponent } from './cubicacion.component';
import { UiModule } from '@uiOT/ui.module';
import { ListCubComponent } from './container/list-cub/list-cub.component';
import { FormCubContainerComponent } from './container/form-cub/form-cub-container.component';
import { FormComponent } from './component/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
  declarations: [
    CubicacionComponent,
    ListCubComponent,
    FormCubContainerComponent,
    FormComponent,
  ],
  imports: [
    CommonModule,
    CubicacionRoutingModule,
    UiModule,
    FormsModule,
    ReactiveFormsModule,
    AutocompleteLibModule,
  ],
})
export class CubicacionModule {}
