import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { RouterModule } from '@angular/router';
import { StoreSIGOModule } from '@storeOT/store.module';

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [BrowserModule, RouterModule, StoreSIGOModule],
  exports: [BrowserModule, MainLayoutComponent],
})
export class CoreModule {}
