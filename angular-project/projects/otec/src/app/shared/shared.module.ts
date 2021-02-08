import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../features/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, FormsModule],
  exports: [CommonModule, NavbarComponent, FormsModule],
})
export class SharedModule {}
