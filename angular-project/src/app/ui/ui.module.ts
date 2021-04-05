import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from './primeng/primeng.module';

// Components
import { CardComponent } from './card/card.component';



@NgModule({
  declarations: [CardComponent],
  exports: [CardComponent, PrimeNgModule],
  imports: [
    CommonModule,
    PrimeNgModule
  ]
})
export class UiModule { }
