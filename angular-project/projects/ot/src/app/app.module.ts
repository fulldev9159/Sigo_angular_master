import { NgModule, LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from '@coreOT';
import { environment } from '@environment';
import { registerLocaleData } from '@angular/common';
import localeCl from '@angular/common/locales/es-CL';
import localeClExtra from '@angular/common/locales/extra/es-CL';
registerLocaleData(localeCl, 'es-CL', localeClExtra);

@NgModule({
  declarations: [AppComponent],
  imports: [CoreModule.forRoot(environment), AppRoutingModule],
  providers: [
    { provide: 'environment', useValue: environment },
    { provide: LOCALE_ID, useValue: 'es-CL' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
