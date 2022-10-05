import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilesComponent } from './perfiles.component';
import { PerfilesRoutingModule } from './perfiles-routing.module';
import { SharedModule } from '@sharedOT/shared.module';
import { ListPerfilesContainerComponent } from './containers/list-perfiles-container/list-perfiles-container.component';
import { FormPerfilesContainerComponent } from './containers/form-perfiles-container/form-perfiles-container.component';

@NgModule({
  declarations: [PerfilesComponent, ListPerfilesContainerComponent, FormPerfilesContainerComponent],
  imports: [CommonModule, PerfilesRoutingModule, SharedModule],
})
export class PerfilesModule {}
