import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultadoIngenieriaContainerComponent } from './containers/resultado-ingenieria-container/resultado-ingenieria-container.component';
import { IngenieriaRoutingModule } from './ingenieria-routing.module';
import { SharedModule } from 'primeng/api';

@NgModule({
  declarations: [ResultadoIngenieriaContainerComponent],
  imports: [CommonModule, IngenieriaRoutingModule, SharedModule],
})
export class IngenieriaModule {}
