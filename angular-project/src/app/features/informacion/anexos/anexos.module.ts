import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnexosRoutingModule } from './anexos-routing.module';
import { AnexosComponent } from './anexos.component';


@NgModule({
  declarations: [AnexosComponent],
  imports: [
    CommonModule,
    AnexosRoutingModule
  ]
})
export class AnexosModule { }
