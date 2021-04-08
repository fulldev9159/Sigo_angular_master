import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ListboxModule } from 'primeng/listbox';


@NgModule({
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    ListboxModule
  ],
  exports: [
    TableModule,
    ButtonModule,
    ListboxModule
  ]
})
export class PrimeNgModule { }
