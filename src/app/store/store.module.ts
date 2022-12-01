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

// SERVICIOS STORE
import { ServiciosEffects } from './servicios/servicios.effects';
import * as formServiciosReduce from './servicios/servicios.reducers';
// SERVICIOS STORE

// OT STORE
import { OTEffects } from './ot/ot.effects';
import * as formOTReduce from './ot/ot.reducers';
// OT STORE

// NUMERO INTERNO STORE
import { NumeroInternoEffects } from './numero-interno/numero-interno.effects';
import * as formNumeroInternoReduce from './numero-interno/numero-interno.reducers';
// NUMERO INTERNO STORE

// SUSTENTO FINANCIERO STORE
import { SustentoFinancieroEffects } from './sustento-financiero/sustento-financiero.effects';
import * as formSustentoFinancieroReduce from './sustento-financiero/sustento-financiero.reducers';
// SUSTENTO FINANCIERO STORE

// PROYECTOS STORE
import { ProyectosEffects } from './proyectos/proyectos.effects';
import * as formProyectosReduce from './proyectos/proyectos.reducers';
// PROYECTOS STORE

// FLUJO OT STORE
import { FlujoOTEffects } from './flujo-ot/flujo-ot.effects';
import * as formFlujoOTReduce from './flujo-ot/flujo-ot.reducers';
// FLUJO OT STORE

// OT DETALLE STORE
import { OTDetalleEffects } from './ot-detalle/ot-detalle.effects';
import * as formOTDetalleReduce from './ot-detalle/ot-detalle.reducers';
// OT DETALLE STORE

// INFORME AVANCE STORE
import { InformeAvanceEffects } from './informe-avance/informe-avance.effects';
import * as formInformeAvanceReduce from './informe-avance/informe-avance.reducers';
// INFORME AVANCE STORE

// ACTA
import { ActaEffects } from './acta/acta.effects';
import * as formActaReduce from './acta/acta.reducers';
// ACTA

// AREA
import { AreaEffects } from './area/area.effects';
import * as formAreaReduce from './area/area.reducers';
// AREA

// INGENIERIA
import { IngenieriaEffects } from './ingenieria/ingenieria.effects';
import * as formIngenieriaReduce from './ingenieria/ingenieria.reducers';
// INGENIERIA

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

    // SERVICIOS STORE
    EffectsModule.forFeature([ServiciosEffects]),
    StoreModule.forFeature(
      formServiciosReduce.Featurekey,
      formServiciosReduce.reducerServicios
    ),

    // OT STORE
    EffectsModule.forFeature([OTEffects]),
    StoreModule.forFeature(formOTReduce.Featurekey, formOTReduce.reducerOT),

    // NUMERO INTERNO STORE
    EffectsModule.forFeature([NumeroInternoEffects]),
    StoreModule.forFeature(
      formNumeroInternoReduce.Featurekey,
      formNumeroInternoReduce.reducerNumeroInterno
    ),

    // SUSTENTO FINANCIERO STORE
    EffectsModule.forFeature([SustentoFinancieroEffects]),
    StoreModule.forFeature(
      formSustentoFinancieroReduce.Featurekey,
      formSustentoFinancieroReduce.reducerSustentoFinanciero
    ),

    // PROYECTOS STORE
    EffectsModule.forFeature([ProyectosEffects]),
    StoreModule.forFeature(
      formProyectosReduce.Featurekey,
      formProyectosReduce.reducerProyectos
    ),

    // FLUJO OT STORE
    EffectsModule.forFeature([FlujoOTEffects]),
    StoreModule.forFeature(
      formFlujoOTReduce.Featurekey,
      formFlujoOTReduce.reducerFlujoOT
    ),

    // OT DETALLE STORE
    EffectsModule.forFeature([OTDetalleEffects]),
    StoreModule.forFeature(
      formOTDetalleReduce.Featurekey,
      formOTDetalleReduce.reducerOTDetalle
    ),

    // OT INFORME AVANCE
    EffectsModule.forFeature([InformeAvanceEffects]),
    StoreModule.forFeature(
      formInformeAvanceReduce.Featurekey,
      formInformeAvanceReduce.reducerInformeAvance
    ),

    // ACTA
    EffectsModule.forFeature([ActaEffects]),
    StoreModule.forFeature(
      formActaReduce.Featurekey,
      formActaReduce.reducerActa
    ),

    // AREA
    EffectsModule.forFeature([AreaEffects]),
    StoreModule.forFeature(
      formAreaReduce.Featurekey,
      formAreaReduce.reducerArea
    ),

    // INGENIERIA
    EffectsModule.forFeature([IngenieriaEffects]),
    StoreModule.forFeature(
      formIngenieriaReduce.Featurekey,
      formIngenieriaReduce.reducerIngenieria
    ),

    SharedModule,
  ],
})
export class StoreSIGOModule {}
