import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '@environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  routerReducer,
  RouterState,
  StoreRouterConnectingModule,
} from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LayoutModule } from './layout/layout.module';
import { RouterModule } from '@angular/router';
import { StoreAllModule } from './store/store.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './utils/interceptor-music';
import { UiModule } from './ui/ui.module';
import { JwtAppInterceptor } from '@utilsSIGO/interceptor';
import { HttpRequestInterceptor } from '@utilsSIGO/interceptor-progress';
import { LoadingService } from '@utilsSIGO/service-progress';

const metaReducers: Array<MetaReducer<any, any>> = [];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    StoreModule.forRoot(
      { router: routerReducer },
      {
        metaReducers,
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot({ routerState: RouterState.Minimal }),
    LayoutModule,
    StoreAllModule,
    UiModule,
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: JwtAppInterceptor,
    //   multi: true
    // },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: HttpRequestInterceptor,
    //   multi: true
    // },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: JwtInterceptor,
    //   multi: true
    // },
    { provide: LOCALE_ID, useValue: 'es-CL' },
    LoadingService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
