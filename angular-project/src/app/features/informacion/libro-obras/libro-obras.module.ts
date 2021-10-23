import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibroObrasRoutingModule } from './libro-obras-routing.module';
import { LibroObrasComponent } from './libro-obras.component';
import { UiModule } from '@uiOT/ui.module';

@NgModule({
  declarations: [LibroObrasComponent],
  imports: [CommonModule, LibroObrasRoutingModule, UiModule],
})
export class LibroObrasModule {}
