import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { RouterModule } from '@angular/router';
import { StoreSIGOModule } from '@storeOT/store.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [BrowserModule, RouterModule, StoreSIGOModule, HttpClientModule],
  exports: [BrowserModule, MainLayoutComponent],
})
export class CoreModule {}
