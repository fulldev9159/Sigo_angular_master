import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// AUTH STORE
import { AuthEffects } from './auth/auth.effects';
import * as formAuthReduce from './auth/auth.reducers';
// AUTH STORE

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
  ],
})
export class StoreSIGOModule {}
