import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Test2RoutingModule } from './test2-routing.module';
import { Test2Component } from './test2.component';
import { UiModule } from 'src/app/ui/ui.module';

@NgModule({
  declarations: [Test2Component],
  imports: [
    CommonModule,
    Test2RoutingModule,
    UiModule
  ]
})
export class Test2Module { }
