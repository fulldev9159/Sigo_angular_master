import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [
    CommonModule,
    TableModule,
    ButtonModule
  ],
  exports: [
    TableModule,
    ButtonModule
  ]
})
export class PrimeNgModule { }
