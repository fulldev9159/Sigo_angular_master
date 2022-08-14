import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// AUTH STORE
import { AuthEffects } from './auth/auth.effects';
import * as formAuthReduce from './auth/auth.reducers';
// AUTH STORE

// PERFIL STORE
import { PerfilEffects } from './perfil/perfil.effects';
import * as formPerfilReduce from './perfil/perfil.reducers';
// PERFIL STORE

// USUARIO STORE
import { UsuarioEffects } from './usuario/usuario.effects';
import * as formUsuarioReduce from './usuario/usuario.reducers';
// USUARIO STORE

// CUBICACION STORE
import { CubicacionEffects } from './cubicacion/cubicacion.effects';
import * as formCubicacionReduce from './cubicacion/cubicacion.reducers';
// CUBICACION STORE

// LOADINGS STORE
import * as loadingReducer from './loadings/loadings.reducers';
import { SharedModule } from '@sharedOT/shared.module';
// LOADINGS STORE

// CONTRATO STORE
import { ContratoEffects } from './contrato/contrato.effects';
import * as formContratoReduce from './contrato/contrato.reducers';
// CONTRATO STORE

// PROVEEDOR STORE
import { ProveedorEffects } from './proveedor/proveedor.effects';
import * as formProveedorReduce from './proveedor/proveedor.reducers';
// PROVEEDOR STORE

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

    // PERFIL STORE
    EffectsModule.forFeature([PerfilEffects]),
    StoreModule.forFeature(
      formPerfilReduce.Featurekey,
      formPerfilReduce.reducerPerfil
    ),

    // USUARIO STORE
    EffectsModule.forFeature([UsuarioEffects]),
    StoreModule.forFeature(
      formUsuarioReduce.Featurekey,
      formUsuarioReduce.reducerUsuario
    ),

    // CUBICACION STORE
    EffectsModule.forFeature([CubicacionEffects]),
    StoreModule.forFeature(
      formCubicacionReduce.Featurekey,
      formCubicacionReduce.reducerCubicacion
    ),

    // LOADINGS STORE
    StoreModule.forFeature(
      loadingReducer.FeatureKey,
      loadingReducer.reducerLoadings
    ),

    // CONTRATO STORE
    EffectsModule.forFeature([ContratoEffects]),
    StoreModule.forFeature(
      formContratoReduce.Featurekey,
      formContratoReduce.reducerContrato
    ),

    // PROVEEDOR STORE
    EffectsModule.forFeature([ProveedorEffects]),
    StoreModule.forFeature(
      formProveedorReduce.Featurekey,
      formProveedorReduce.reducerProveedor
    ),
    SharedModule,
  ],
})
export class StoreSIGOModule {}
