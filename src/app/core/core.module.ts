import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { RouterModule } from '@angular/router';
import { StoreSIGOModule } from '@storeOT/store.module';
import { HttpClientModule } from '@angular/common/http';
import { SideBarComponent } from './layout/main-layout/components/side-bar/side-bar.component';
import { SharedModule } from '@sharedOT/shared.module';
import { NavbarComponent } from './layout/main-layout/components/navbar/navbar.component';

@NgModule({
  declarations: [MainLayoutComponent, SideBarComponent, NavbarComponent],
  imports: [
    BrowserModule,
    RouterModule,
    StoreSIGOModule,
    HttpClientModule,
    SharedModule,
  ],
  exports: [BrowserModule, MainLayoutComponent],
})
export class CoreModule {}
