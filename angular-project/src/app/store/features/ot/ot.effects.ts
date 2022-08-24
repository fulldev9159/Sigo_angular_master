import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import {
  ProyectoService,
  UserService,
  OTService,
  SustentoFinancieroService,
  AlertMessageActions,
  InformeAvanceService,
  ActaService,
  LibroObraService,
} from '@data';
import * as otActions from './ot.actions';

@Injectable()
export class OtEffects {
  constructor(
    private actions$: Actions,
    private alertMessageAction: AlertMessageActions,
    private otService: OTService,
    private sustentofinancieroService: SustentoFinancieroService,
    private userService: UserService,
    private proyectoService: ProyectoService,
    private informeAvanceService: InformeAvanceService,
    private actaService: ActaService,
    private libroObraService: LibroObraService
  ) {}

  getOTs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getOTs),
      concatMap(({ request }) =>
        this.otService.getOTs(request).pipe(
          map(response => {
            if (request.filtro_pestania === 'EN_EJECUCION') {
              return otActions.getOtEjecucionSuccess({ response });
            } else if (request.filtro_pestania === 'ABIERTAS') {
              return otActions.getOtAbiertasSuccess({ response });
            } else if (request.filtro_pestania === 'CERRADAS') {
              return otActions.getOtSuccessCerradas({ response });
            } else if (request.filtro_pestania === 'ANULADAS') {
              return otActions.getOtSuccessAnuladas({ response });
            }
          }),
          catchError(error => of(otActions.getOtsError({ error })))
        )
      )
    )
  );

  getDetalleOT$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getDetalleOT),
      concatMap(({ id }) =>
        this.otService.getDetalleOT(id).pipe(
          map(response => otActions.getDetalleOTSuccess({ response })),
          catchError(err => of(otActions.getDetalleOTError({ error: err })))
        )
      )
    )
  );

  getContratos4OT$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getContratosUser4OT),
      concatMap(({ usuario_id }) =>
        this.userService.getContratosUser(usuario_id).pipe(
          map(response => otActions.getContratosUser4OTSuccess({ response })),
          catchError(err =>
            of(otActions.getContratosUser4OTError({ error: err }))
          )
        )
      )
    )
  );

  getCubicaciones4OT$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getCubicaciones4OT),
      concatMap(({ contrato_id }) =>
        this.otService.getCubicaciones(contrato_id).pipe(
          map(response => otActions.getCubicaciones4OTSuccess({ response })),
          catchError(error => of(otActions.getCubicaciones4OTError({ error })))
        )
      )
    )
  );

  getPMO$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getPMO),
      concatMap(({ sitio_codigo }) =>
        this.sustentofinancieroService.getPMO4OT(sitio_codigo).pipe(
          map(response => otActions.getPMOSuccess({ response })),
          catchError(error => of(otActions.getPmoError({ error })))
        )
      )
    )
  );

  getLineaPresupuestaria$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getLineaPresupuestaria),
      concatMap(({ pmo_id }) =>
        this.sustentofinancieroService.getLineaPresupuestaria(pmo_id).pipe(
          map(response =>
            otActions.getLineaPresupuestariaSuccess({ response })
          ),
          catchError(error =>
            of(otActions.getLineaPresupuestariaError({ error }))
          )
        )
      )
    )
  );

  getPep2$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getPEP2),
      concatMap(({ pmo_codigo, linea_presupuestaria_codigo }) =>
        this.sustentofinancieroService
          .getPEP2(pmo_codigo, linea_presupuestaria_codigo)
          .pipe(
            map(response => otActions.getPEP2Success({ response })),
            catchError(error => of(otActions.getPEP2Error({ error })))
          )
      )
    )
  );

  getIDOpex$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getIDOpex),
      concatMap(() =>
        this.sustentofinancieroService.getOPEX().pipe(
          map(response => otActions.getIDOpexSuccess({ response })),
          catchError(error => of(otActions.getIDOpexError({ error })))
        )
      )
    )
  );

  getCuentasSAP$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getCuentaSAP),
      concatMap(({ id_opex }) =>
        this.sustentofinancieroService.getSAP(id_opex).pipe(
          map(response => otActions.getCuentaSAPSuccess({ response })),
          catchError(error => of(otActions.getCuentaSAPError({ error })))
        )
      )
    )
  );

  getCECO$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getCECO),
      concatMap(({ id_opex, cuenta_sap }) =>
        this.sustentofinancieroService.getCECO(id_opex, cuenta_sap).pipe(
          map(response => otActions.getCECOSuccess({ response })),
          catchError(error => of(otActions.getCECOError({ error })))
        )
      )
    )
  );

  getProyecto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getProyecto),
      concatMap(() =>
        this.proyectoService.getProyectos().pipe(
          map(response => otActions.getProyectoSuccess({ response })),
          catchError(error => of(otActions.getProyectoError({ error })))
        )
      )
    )
  );

  getAdminContrato$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getAdminContrato),
      concatMap(({ cubicacion_id }) =>
        this.otService.getAdminContrato(cubicacion_id).pipe(
          map(response => otActions.getAdminContratoSuccess({ response })),
          catchError(error => of(otActions.getAdminContratoError({ error })))
        )
      )
    )
  );

  getOficinaCentral$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getOficinaCentral),
      concatMap(({ agencia_id }) =>
        this.otService.getOficinaCentral(agencia_id).pipe(
          map(response => otActions.getOficinaCentralSuccess({ response })),
          catchError(error => of(otActions.getOficinaCentralError({ error })))
        )
      )
    )
  );

  getSolicitadoPor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getSolicitadoPor),
      concatMap(() =>
        this.otService.getSolicitadoPor().pipe(
          map(response => otActions.getSolicitadoPorSuccess({ response })),
          catchError(error => of(otActions.getSolicitadoPorError({ error })))
        )
      )
    )
  );

  getComuna$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getComuna),
      concatMap(({ cubicacion_id }) =>
        this.otService.getComuna(cubicacion_id).pipe(
          map(response => otActions.getComunaSuccess({ response })),
          catchError(error => of(otActions.getComunaError({ error })))
        )
      )
    )
  );

  getTipoDeRed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getTipoDeRed),
      concatMap(() =>
        this.otService.getTipoRed().pipe(
          map(response => otActions.getTipoDeRedSuccess({ response })),
          catchError(error => of(otActions.getTipoDeRedError({ error })))
        )
      )
    )
  );

  getTipoDeTrabajo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getTipoDeTrabajo),
      concatMap(({ cubicacion_id }) =>
        this.otService.getTipoTrabajo(cubicacion_id).pipe(
          map(response => otActions.getTipoDeTrabajoSuccess({ response })),
          catchError(error => of(otActions.getTipoDeTrabajoError({ error })))
        )
      )
    )
  );

  getAreaDeNegocio$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getAreaDeNegocio),
      concatMap(() =>
        this.otService.getAreaNegocio().pipe(
          map(response => otActions.getAreaDeNegocioSuccess({ response })),
          catchError(error => of(otActions.getAreaDeNegocioError({ error })))
        )
      )
    )
  );

  getPlanDeProyecto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getPlanDeProyecto),
      concatMap(() =>
        this.otService.getPlanDeProyecto().pipe(
          map(response => otActions.getPlanDeProyectoSuccess({ response })),
          catchError(error => of(otActions.getPlanDeProyectoError({ error })))
        )
      )
    )
  );

  getSitio$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getSitio),
      concatMap(({ plan_id }) =>
        this.otService.getSitio(plan_id).pipe(
          map(response => otActions.getSitioSuccess({ response })),
          catchError(error => of(otActions.getSitioError({ error })))
        )
      )
    )
  );

  // FIJO
  // TIPO NUMERO INTERNO
  getTipoNumeroInterno$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getTipoNumeroInterno),
      concatMap(() =>
        this.otService.getTipoNumeroInterno().pipe(
          map(response => otActions.getTipoNumeroInternoSuccess({ response })),
          catchError(error =>
            of(otActions.getTipoNumeroInternoError({ error }))
          )
        )
      )
    )
  );

  // NUMERO INTERNO HAS OT
  getNumeroInternoHasOT$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getNumeroInternoHasOT),
      concatMap(({ numero_interno }) =>
        this.otService.getNumeroInternoHasOT(numero_interno).pipe(
          map(response => otActions.getNumeroInternoHasOTSuccess({ response })),
          catchError(error =>
            of(otActions.getNumeroInternoHasOTError({ error }))
          )
        )
      )
    )
  );

  // CREATE OT
  createOT$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.createOT),
      concatMap(({ request }) =>
        this.otService.createOT(request).pipe(
          map(response => otActions.createOTSuccess({ response })),
          catchError(error => of(otActions.createOTError({ error })))
        )
      )
    )
  );

  // GET ALL MOTIVO RECHAZO
  getAllMotivoRechazoOT$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getAllMotivoRechazoOT),
      concatMap(({ tipo }) =>
        this.otService.getAllMotivoRechazoOT(tipo).pipe(
          map(response => otActions.getAllMotivoRechazoOTSuccess({ response })),
          catchError(error =>
            of(otActions.getAllMotivoRechazoOTError({ error }))
          )
        )
      )
    )
  );

  // ACEPTAR O RECHAZAR INCIAL
  AceptarRechazarIncialOT$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.AceptarRechazarIncialOT),
      concatMap(({ request }) =>
        this.otService.AceptarRechazarIncialOT(request).pipe(
          map(response =>
            otActions.AceptarRechazarIncialOTSuccess({ response })
          ),
          catchError(error =>
            of(otActions.AceptarRechazarIncialOTError({ error }))
          )
        )
      )
    )
  );

  // GET POSIBLE TRABAJADOR
  getPosibleTrabajador$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getPosibleTrabajador),
      concatMap(({ ot_id }) =>
        this.otService.getPosibleTrabajador(ot_id).pipe(
          map(response => otActions.getPosibleTrabajadorSuccess({ response })),
          catchError(error =>
            of(otActions.getPosibleTrabajadorError({ error }))
          )
        )
      )
    )
  );

  // ACEPTAR PROVEEDOR
  AceptarProveedorOT$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.AceptarProveedorOT),
      concatMap(({ request, ot_id, proxy_id, concepto }) =>
        this.otService.AceptarRechazarProveedorOT(request).pipe(
          map(response =>
            otActions.AsignarSupervisorTrabajosOT({ ot_id, proxy_id, concepto })
          ),
          catchError(error => of(otActions.AceptarProveedorOTError({ error })))
        )
      )
    )
  );

  // GET POSIBLE TRABAJADOR
  AsignarSupervisorTrabajosOT$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.AsignarSupervisorTrabajosOT),
      concatMap(({ ot_id, proxy_id, concepto }) =>
        this.otService.updateUsuarioInvolucrado(ot_id, proxy_id, concepto).pipe(
          map(response =>
            otActions.AsignarSupervisorTrabajosOTSuccess({ response })
          ),
          catchError(error =>
            of(otActions.AsignarSupervisorTrabajosOTError({ error }))
          )
        )
      )
    )
  );

  // RECHAZAR PROVEEDOR
  RechazarProveedorOT$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.RechazarProveedorOT),
      concatMap(({ request }) =>
        this.otService.AceptarRechazarProveedorOT(request).pipe(
          map(response => otActions.RechazarProveedorOTSuccess({ response })),
          catchError(error => of(otActions.RechazarProveedorOTError({ error })))
        )
      )
    )
  );

  // GET DETALLE INFORME DE AVANCE
  GetDetalleInformeAvance$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getDetalleInformeAvance),
      concatMap(({ ot_id }) =>
        this.informeAvanceService.getDetalleInformeAvance(ot_id).pipe(
          map(response =>
            otActions.getDetalleInformeAvanceSuccess({ response })
          ),
          catchError(error =>
            of(otActions.getDetalleInformeAvanceError({ error }))
          )
        )
      )
    )
  );

  // UPDATE DETALLE INFORME DE AVANCE
  UpdateDetalleInformeAvance$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.updateDetalleInformeAvance),
      concatMap(({ ot_id, id, data }) =>
        this.informeAvanceService
          .updateDetalleInformeAvance(ot_id, id, data)
          .pipe(
            map(response =>
              otActions.updateDetalleInformeAvanceSuccess({ response })
            ),
            catchError(error =>
              of(otActions.updateDetalleInformeAvanceError({ error }))
            )
          )
      )
    )
  );

  // GET CATEGORIA ARCHIVOS
  getCategoriasArchivos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getCategoriasArchivos),
      concatMap(() =>
        this.otService.getCategoriasArchivos().pipe(
          map(response => otActions.getCategoriasArchivosSuccess({ response })),
          catchError(error =>
            of(otActions.getCategoriasArchivosError({ error }))
          )
        )
      )
    )
  );

  // SEND DETALLE INFORME DE AVANCE
  SendDetalleInformeAvance$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.sendDetalleInformeAvance),
      concatMap(({ ot_id }) =>
        this.informeAvanceService.sendDetalleInformeAvance(ot_id).pipe(
          map(response =>
            otActions.sendDetalleInformeAvanceSuccess({ response })
          ),
          catchError(error =>
            of(otActions.sendDetalleInformeAvanceError({ error }))
          )
        )
      )
    )
  );

  // SEND GENERACION ACTA
  SendGeneracionActa$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.sendGeneracionActa),
      concatMap(({ ot_id, tipo_pago, detalle }) =>
        this.actaService.sendGeneracionActa(ot_id, tipo_pago, detalle).pipe(
          map(response => otActions.sendGeneracionActaSuccess({ response })),
          catchError(error => of(otActions.sendGeneracionActaError({ error })))
        )
      )
    )
  );

  // SUBIR ARCHIVO/REGISTRO LIBRO DE OBRAS
  subirArchivoRegistroLibroObras$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.subirArchivoLibroObras),
      concatMap(({ categoria_id, files, request_libroobras }) =>
        this.otService.subirArchivo(categoria_id, 'LIBRO_OBRAS', files).pipe(
          map(response => {
            console.log('wweqw response', response);
            console.log(request_libroobras);
            return otActions.createRegistroLibroObras({
              request: {
                ...request_libroobras,
                archivos: response.data.repositorio_archivos_ids,
              },
            });
          }),
          catchError(error => of(otActions.subirArchivoError({ error })))
        )
      )
    )
  );

  // CREATE REGISTRO LIBRO DE OBRAS
  createRegistroLibroObras$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.createRegistroLibroObras),
      concatMap(({ request }) =>
        this.libroObraService.createRegistroLibroObras(request).pipe(
          map(response =>
            otActions.createRegistroLibroObrasSuccess({ response })
          ),
          catchError(error =>
            of(otActions.createRegistroLibroObrasError({ error }))
          )
        )
      )
    )
  );

  // GET LIBRO OBRAS
  getLibroObras$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getLibroObras),
      concatMap(({ ot_id }) =>
        this.libroObraService.getLibroObras(ot_id).pipe(
          map(response => otActions.getLibroObrasSuccess({ response })),
          catchError(error => of(otActions.getLibroObrasError({ error })))
        )
      )
    )
  );

  // ACEPTAR INFORME AVANCE
  aceptarRechazarInformeAvance$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.AceptarRechazarInformeAvanceOT),
      concatMap(({ request }) =>
        this.informeAvanceService.autorizarInformeAvance(request).pipe(
          map(response =>
            otActions.AceptarRechazarInformeAvanceOTSuccess({ response })
          ),
          catchError(error =>
            of(otActions.AceptarRechazarInformeAvanceOTError({ error }))
          )
        )
      )
    )
  );

  // APROBAR RECHAZAR ACTA
  aprobarRechazarActa$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.AprobarRechazarActaOT),
      concatMap(({ request }) =>
        this.actaService.AceptarRechazarActaOT(request).pipe(
          map(response => otActions.AprobarRechazarActaOTSuccess({ response })),
          catchError(error =>
            of(otActions.AprobarRechazarActaOTError({ error }))
          )
        )
      )
    )
  );

  // SOLICITAR PAGO
  solicitarPago$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.solicitarPago),
      concatMap(({ ot_id }) =>
        this.otService.solicitarPago(ot_id).pipe(
          map(response => otActions.solicitarPagoSuccess({ response })),
          catchError(error => of(otActions.solicitarPagoError({ error })))
        )
      )
    )
  );
  // QUIEN AUTORIZO PAGO
  quienAutorizoPagoOT$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.quienAutorizoPago),
      concatMap(({ ot_id }) =>
        this.otService.quienAutorizoPago(ot_id).pipe(
          map(response => otActions.quienAutorizoPagoSuccess({ response })),
          catchError(err =>
            of(otActions.quienAutorizoPagoError({ error: err }))
          )
        )
      )
    )
  );

  // APROBAR RECHAZAR SOLICITUD PAGO
  aprobarRechazarSolicitudPago$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.AprobarRechazarSolicitudPago),
      concatMap(({ request }) =>
        this.actaService.aprobarRechazarSolicitudPago(request).pipe(
          map(response =>
            otActions.AprobarRechazarSolicitudPagoSuccess({ response })
          ),
          catchError(error =>
            of(otActions.AprobarRechazarSolicitudPagoError({ error }))
          )
        )
      )
    )
  );

  // CERRAR OT
  cerrarOT$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.cerrarOT),
      concatMap(({ ot_id }) =>
        this.otService.cerrarOT(ot_id).pipe(
          map(response => otActions.cerrarOTSuccess({ response })),
          catchError(error => of(otActions.cerrarOTError({ error })))
        )
      )
    )
  );

  // CERRAR OT
  aceptarRechazarAdicionales$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.aceptarRechazarAdcionales),
      concatMap(({ request }) =>
        this.otService.aceptarRechazarAdicionales(request).pipe(
          map(response =>
            otActions.aceptarRechazarAdcionalesSuccess({ response })
          ),
          catchError(error =>
            of(otActions.aceptarRechazarAdcionalesError({ error }))
          )
        )
      )
    )
  );

  // ANULAR OT
  anularOT$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.anularOT),
      concatMap(({ ot_id }) =>
        this.otService.anularOT(ot_id).pipe(
          map(response => otActions.anularOTSuccess({ response })),
          catchError(error => of(otActions.anularOTError({ error })))
        )
      )
    )
  );

  // NOTIFICACIONES
  notifyOK$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          otActions.createOTSuccess,
          otActions.AceptarRechazarIncialOTSuccess,
          otActions.AsignarSupervisorTrabajosOTSuccess,
          otActions.updateDetalleInformeAvanceSuccess,
          otActions.sendDetalleInformeAvanceSuccess,
          otActions.AceptarRechazarInformeAvanceOTSuccess,
          otActions.createRegistroLibroObrasSuccess,
          otActions.sendGeneracionActaSuccess,
          otActions.AprobarRechazarActaOTSuccess,
          otActions.solicitarPagoSuccess,
          otActions.AprobarRechazarSolicitudPagoSuccess
        ),
        tap(action => {
          this.alertMessageAction.messageActions(
            action.response.status.code,
            action.response.status.desc,
            action.type,
            action
          );
        })
      ),
    { dispatch: false }
  );

  notifyAfterError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          otActions.createOTError,
          otActions.AceptarRechazarIncialOTError,
          otActions.AceptarProveedorOTError,
          otActions.AceptarRechazarInformeAvanceOTError,
          otActions.AprobarRechazarActaOTError,
          otActions.solicitarPagoError,
          otActions.AprobarRechazarSolicitudPagoError,
          otActions.anularOTError
        ),
        tap(action =>
          this.alertMessageAction.messageActions(
            action.error.error.status.code,
            action.error.error.status.desc,
            action.type,
            action
          )
        )
      ),
    { dispatch: false }
  );
}
