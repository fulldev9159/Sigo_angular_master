import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '@environment';

import { DataModule } from '@data';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
  StoreModule,
} from '@ngrx/store';
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
import { localStorageSync } from 'ngrx-store-localstorage';
import { ZweiconPermissionDirective } from './utils/zweicon-permission.directive';
import { NgxPermissionsModule } from 'ngx-permissions';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// const reducers: ActionReducerMap<any> = { routerReducer };
// // , rehydrate: true
// export function localStorageSyncReducer(rootReducer: any) {
//   return localStorageSync({ keys: ['auth', 'login'] })(rootReducer);
// }

// const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

const reducers: ActionReducerMap<any> = { routerReducer };

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: ['auth'], rehydrate: true })(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    DataModule.forRoot(environment),
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
    NgxPermissionsModule.forRoot(),
    FontAwesomeModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtAppInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: JwtInterceptor,
    //   multi: true
    // },
    { provide: LOCALE_ID, useValue: 'es-CL' },
    LoadingService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
