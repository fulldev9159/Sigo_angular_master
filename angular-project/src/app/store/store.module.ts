import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// MUSIC STORE EXAMPLE
import { MusicEffects } from './features/test/test.effects';
import * as formMusicReduce from './features/test/test.reducer';
// MUSIC STORE EXAMPLE

// AUTH STORE
import { AuthEffects } from './features/auth/auth.effects';
import * as formAuthReduce from './features/auth/auth.reducer';
// AUTH STORE

// OT STORE
import { OtEffects } from './features/ot/ot.effects';
import * as formOtReduce from './features/ot/ot.reducer';
// OT STORE

// CUBICACION STORE
import { CubicacionEffects } from './features/cubicacion/cubicacion.effects';
import * as formCubicacionReduce from './features/cubicacion/cubicacion.reducer';
// AUCUBICACIONTH STORE

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    // MUSIC STORE EXAMPLE
    EffectsModule.forFeature([MusicEffects]),
    StoreModule.forFeature(formMusicReduce.musicFeatureKey, formMusicReduce.reducerMusic),
    // MUSIC STORE EXAMPLE

    // AUTH STORE
    EffectsModule.forFeature([AuthEffects]),
    StoreModule.forFeature(formAuthReduce.authFeatureKey, formAuthReduce.reducerAuth),
    // AUTH STORE

    // OT STORE
    EffectsModule.forFeature([OtEffects]),
    StoreModule.forFeature(formOtReduce.otFeatureKey, formOtReduce.reducerOt),
    // OT STORE

    // CUBICACION STORE
    EffectsModule.forFeature([CubicacionEffects]),
    StoreModule.forFeature(formCubicacionReduce.CubicacionFeatureKey, formCubicacionReduce.reducerCubicacion)
    // CUBICACION STORE
  ]
})
export class StoreAllModule { }
