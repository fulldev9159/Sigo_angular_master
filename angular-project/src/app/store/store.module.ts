import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// AUTH STORE
import { AuthEffects } from './features/auth/auth.effects';
import * as formAuthReduce from './features/auth/auth.reducer';
// AUTH STORE

// TIPO MONEDA STORE
import { TipoMonedaEffects } from './features/tipo-moneda/tipo-moneda.effects';
import * as formTipoMonedaReduce from './features/tipo-moneda/tipo-moneda.reducer';
// TIPO MONEDA STORE

// UNIDAD STORE
import { UnidadEffects } from './features/unidad/unidad.effects';
import * as formUnidadReduce from './features/unidad/unidad.reducer';
// UNIDAD STORE

// OT STORE
import { OtEffects } from './features/ot/ot.effects';
import * as formOtReduce from './features/ot/ot.reducer';
// OT STORE

// CUBICACION STORE
import { CubicacionEffects } from './features/cubicacion/cubicacion.effects';
import * as formCubicacionReduce from './features/cubicacion/cubicacion.reducer';
// CUBICACION STORE

// PROFILES STORE
import { ProfileEffects } from './features/profile/profile.effects';
import * as formProfileReduce from './features/profile/profile.reducer';
// PROFILES STORE

// USER STORE
import { UserEffects } from './features/user/user.effects';
import * as formUserReduce from './features/user/user.reducer';
// USER STORE

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    // AUTH STORE
    EffectsModule.forFeature([AuthEffects]),
    StoreModule.forFeature(
      formAuthReduce.authFeatureKey,
      formAuthReduce.reducerAuth
    ),
    // AUTH STORE

    // TIPO MONEDA STORE
    EffectsModule.forFeature([TipoMonedaEffects]),
    StoreModule.forFeature(
      formTipoMonedaReduce.featureKey,
      formTipoMonedaReduce.reducerTipoMoneda
    ),
    // TIPO MONEDA STORE

    // UNIDAD STORE
    EffectsModule.forFeature([UnidadEffects]),
    StoreModule.forFeature(
      formUnidadReduce.featureKey,
      formUnidadReduce.reducerUnidad
    ),
    // UNIDAD STORE

    // OT STORE
    EffectsModule.forFeature([OtEffects]),
    StoreModule.forFeature(formOtReduce.otFeatureKey, formOtReduce.reducerOt),
    // OT STORE

    // CUBICACION STORE
    EffectsModule.forFeature([CubicacionEffects]),
    StoreModule.forFeature(
      formCubicacionReduce.CubicacionFeatureKey,
      formCubicacionReduce.reducerCubicacion
    ),
    // CUBICACION STORE

    // PROFILE STORE
    EffectsModule.forFeature([ProfileEffects]),
    StoreModule.forFeature(
      formProfileReduce.ProfileFeatureKey,
      formProfileReduce.reducerProfile
    ),
    // PROFILE STORE

    // USER STORE
    EffectsModule.forFeature([UserEffects]),
    StoreModule.forFeature(
      formUserReduce.UserFeatureKey,
      formUserReduce.reducerUser
    ),
    // USER STORE
  ],
})
export class StoreAllModule {}
