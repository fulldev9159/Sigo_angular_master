import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { RouterModule } from '@angular/router';
import { NgxPermissionsModule } from 'ngx-permissions';



@NgModule({
  declarations: [AppLayoutComponent, AuthLayoutComponent],
  exports: [AppLayoutComponent, AuthLayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgxPermissionsModule.forChild()
  ]
})
export class LayoutModule { }
