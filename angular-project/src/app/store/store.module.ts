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

// TIPO NUMERO INTERNO STORE
import { TipoNumeroInternoEffects } from './features/tipo-numero-interno/tipo-numero-interno.effects';
import * as formTipoNumeroInternoReduce from './features/tipo-numero-interno/tipo-numero-interno.reducer';
// TIPO NUMERO INTERNO STORE

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

// NOTIFICACIONES
import { NotificacionesEffects } from './features/notificaciones/notificaciones.effects';
import * as formNotificacionesReduce from './features/notificaciones/notificaciones.reducer';
// NOTIFICACIONES

// AREA
import { AreaEffects } from './features/area/area.effects';
import * as areaReduce from './features/area/area.reducer';
// AREA

// CONTRATOS
import { ContratosEffects } from './features/contratos/contratos.effects';
import * as contratosReduce from './features/contratos/contratos.reducer';
// CONTRATOS

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

    // TIPO NUMERO INTERNO STORE
    EffectsModule.forFeature([TipoNumeroInternoEffects]),
    StoreModule.forFeature(
      formTipoNumeroInternoReduce.featureKey,
      formTipoNumeroInternoReduce.reducerTipoNumeroInterno
    ),
    // TIPO NUMERO INTERNO STORE

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

    // NOTIFICACIONES STORE
    EffectsModule.forFeature([NotificacionesEffects]),
    StoreModule.forFeature(
      formNotificacionesReduce.NotificacionesFeatureKey,
      formNotificacionesReduce.reducerNotificaciones
    ),
    // NOTIFICACIONES STORE

    // AREA STORE
    EffectsModule.forFeature([AreaEffects]),
    StoreModule.forFeature(areaReduce.FeatureKey, areaReduce.reducerArea),
    // AREA STORE

    // CONTRATOS STORE
    EffectsModule.forFeature([ContratosEffects]),
    StoreModule.forFeature(
      contratosReduce.FeatureKey,
      contratosReduce.reducerContrato
    ),
    // CONTRATOS STORE
  ],
})
export class StoreAllModule {}
