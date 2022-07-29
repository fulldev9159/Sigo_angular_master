import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// AUTH STORE
import { AuthEffects } from './auth/auth.effects';
import * as formAuthReduce from './auth/auth.reducers';
// AUTH STORE

// LOADINGS STORE
import * as loadingReducer from './loadings/loadings.reducers';
import { SharedModule } from '@sharedOT/shared.module';
// LOADINGS STORE

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // AUTH STORE
    EffectsModule.forFeature([AuthEffects]),
    StoreModule.forFeature(
      formAuthReduce.Featurekey,
      formAuthReduce.reducerAuth
    ),

    // LOADINGS STORE
    StoreModule.forFeature(
      loadingReducer.FeatureKey,
      loadingReducer.reducerLoadings
    ),
    SharedModule,
  ],
})
export class StoreSIGOModule {}
