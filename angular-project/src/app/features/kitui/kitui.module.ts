import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KituiComponent } from './kitui.component';
import { KituiRoutingModule } from './kitui-routing.module';
import { UiModule } from '@uiOT/ui.module';

@NgModule({
  declarations: [KituiComponent],
  imports: [
    CommonModule,
    KituiRoutingModule,
    UiModule
  ]
})
export class KituiModule { }
