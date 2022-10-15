import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { FormUsuarioContainerComponent } from './containers/form-usuario-container/form-usuario-container.component';
import { ListUsuarioContainerComponent } from './containers/list-usuario-container/list-usuario-container.component';
import { UsuarioComponent } from './usuario.component';
import { SharedModule } from '@sharedOT/shared.module';

@NgModule({
  declarations: [
    FormUsuarioContainerComponent,
    ListUsuarioContainerComponent,
    UsuarioComponent,
  ],
  imports: [CommonModule, UsuarioRoutingModule, SharedModule],
})
export class UsuarioModule {}
