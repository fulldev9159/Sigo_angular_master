import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

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

// BASE
import { BaseEffects } from './features/base/base.effects';
import * as baseReduce from './features/base/base.reducer';
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
    // CONTRATOS STORE// AUTH STORE
    EffectsModule.forFeature([BaseEffects]),
    StoreModule.forFeature(baseReduce.FeatureKey, baseReduce.reducerBase),
    // AUTH STORE
  ],
})
export class StoreAllModule {}
