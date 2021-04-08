import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ToolbarModule
  ],
  exports: [
    TableModule,
    ButtonModule,
    InputTextModule,
    ToolbarModule
  ]
})
export class PrimeNgModule { }
