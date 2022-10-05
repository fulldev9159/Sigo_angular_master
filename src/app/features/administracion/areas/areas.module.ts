import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreasComponent } from './areas.component';
import { AreasRoutingModule } from './areas-routing.module';
import { SharedModule } from '@sharedOT/shared.module';
import { ListAreasContainerComponent } from './containers/list-areas-container/list-areas-container.component';
import { FormAreasContainerComponent } from './containers/form-areas-container/form-areas-container.component';

@NgModule({
  declarations: [AreasComponent, ListAreasContainerComponent, FormAreasContainerComponent],
  imports: [CommonModule, AreasRoutingModule, SharedModule],
})
export class AreasModule {}
