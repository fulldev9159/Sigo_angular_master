import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
<<<<<<< HEAD
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
=======
import { ListboxModule } from 'primeng/listbox';
>>>>>>> 198185f68c43068ec015a2bfeafd0e294e6c4e8d


@NgModule({
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
<<<<<<< HEAD
    InputTextModule,
    ToolbarModule
=======
    ListboxModule
>>>>>>> 198185f68c43068ec015a2bfeafd0e294e6c4e8d
  ],
  exports: [
    TableModule,
    ButtonModule,
<<<<<<< HEAD
    InputTextModule,
    ToolbarModule
=======
    ListboxModule
>>>>>>> 198185f68c43068ec015a2bfeafd0e294e6c4e8d
  ]
})
export class PrimeNgModule { }
