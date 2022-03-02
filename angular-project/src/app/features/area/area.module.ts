import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreaRoutingModule } from './area-routing.module';
import { AreaComponent } from './area.component';
import { UiModule } from '@uiOT/ui.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListAreaComponent } from './container/list-area/list-area.component';
import { FormAreaComponent } from './container/form-area/form-area.component';

@NgModule({
  declarations: [AreaComponent, ListAreaComponent, FormAreaComponent],
  imports: [
    CommonModule,
    AreaRoutingModule,
    UiModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AreaModule {}
