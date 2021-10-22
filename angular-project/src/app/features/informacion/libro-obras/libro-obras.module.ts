import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibroObrasRoutingModule } from './libro-obras-routing.module';
import { LibroObrasComponent } from './libro-obras.component';


@NgModule({
  declarations: [LibroObrasComponent],
  imports: [
    CommonModule,
    LibroObrasRoutingModule
  ]
})
export class LibroObrasModule { }
