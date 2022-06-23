import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

import {
  catchError,
  concatMap,
  map,
  mapTo,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { of } from 'rxjs';

import { SnackBarService } from '@utilsSIGO/snack-bar';

import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { OtFacade } from '@storeOT/features/ot/ot.facade';
import * as Data from '@data';
import * as otActions from './ot.actions';

import { environment } from '@environment';

import { Response } from '@storeOT/model';
import {
  DetalleActa,
  LpusPorcentajes,
  RequestSolicitudPagoActa,
} from '@data/model/acta';

@Injectable()
export class OtEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private snackService: SnackBarService,
    private otService: Data.OTService,
    private informeAvanceService: Data.InformAvenceService,
    private sustentofinancieroService: Data.SustentoFinancieroService,
    private actaService: Data.ActaService,
    private userService: Data.UserService,
    private authFacade: AuthFacade,
    private otFacade: OtFacade,
    private messageService: MessageService,
    private messageServiceInt: Data.NotifyAfter,
    private router: Router,
    private alertMessageAction: Data.AlertMessageActions
  ) {}

  getOTs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getOts),
      concatMap(({ request }) =>
        this.otService.getOTs(request).pipe(
          map(response => {
            if (request.filtro_pestania === 'EN_EJECUCION') {
              return otActions.getOtEjecucionSuccess({ response });
            } else if (request.filtro_pestania === 'ABIERTAS') {
              return otActions.getOtAbiertasSuccess({ response });
            } else if (request.filtro_pestania === 'CERRADAS') {
              return otActions.getOtSuccessCerradas({ response });
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
        this.otService.getProyectos().pipe(
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
        this.otService.getDetalleInformeAvance(ot_id).pipe(
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

  // NOTIFICACIONES
  notifyOK$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          otActions.createOTSuccess,
          otActions.AceptarRechazarIncialOTSuccess,
          otActions.AsignarSupervisorTrabajosOTSuccess
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
          otActions.AceptarProveedorOTError
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

  // ////

  // postOt$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(otActions.postOt),
  //     concatMap((data: any) =>
  //       this.http.post(`${environment.api}/ingreot/ot/create`, data.ot).pipe(
  //         tap(res => {
  //           this.messageService.add({
  //             severity: 'success',
  //             summary: 'Registro guardado',
  //             detail: 'Registro se ha generado con Éxito!',
  //           });
  //           this.router.navigate(['app/ot/list-ot']);
  //         }),
  //         map((res: any) => {
  //           if (+res.status.responseCode !== 0) {
  //             this.snackService.showMessage(res.status.description, 'error');
  //           }
  //           return otActions.postOtSuccess({ ot: res.data.items });
  //         }),
  //         catchError(err => of(otActions.postOtError({ error: err })))
  //       )
  //     )
  //   )
  // );

  approveOT$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.approveOT),
      withLatestFrom(this.authFacade.getCurrentProfile$()),
      concatMap(([{ otID, coordinador_id }, profile]) =>
        this.otService.approveOT(profile.id, otID).pipe(
          map(() => otActions.assignCoordinator({ otID, coordinador_id })),
          catchError(error => of(otActions.approveOTError({ error })))
        )
      )
    )
  );

  // notifyAfterApproveOTSuccess$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(otActions.approveOTSuccess),
  //       withLatestFrom(this.otFacade.getOtFilters$()),
  //       tap(([data, { filtro_propietario, filtro_tipo }]) => {
  //         this.snackService.showMessage('Orden de trabajo aceptada', 'ok');

  //         this.otFacade.getOts({
  //           filtro_propietario,
  //           filtro_tipo,
  //           filtro_pestania: '',
  //         });
  //       })
  //     ),
  //   { dispatch: false }
  // );

  notifyAfterApproveOTError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(otActions.approveOTError),
        tap(({ error }) => {
          this.snackService.showMessage(
            'No fue posible aceptar la orden de trabajo',
            'error'
          );
          console.error(`could not approve the ot [${error.message}]`);
        })
      ),
    { dispatch: false }
  );

  rejectOT$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.rejectOT),
      withLatestFrom(this.authFacade.getCurrentProfile$()),
      concatMap(([{ otID, motivo }, profile]) =>
        this.otService.rejectOT(profile.id, otID, motivo).pipe(
          mapTo(otActions.rejectOTSuccess()),
          catchError(error => of(otActions.rejectOTError({ error })))
        )
      )
    )
  );

  // notifyAfterRejectOTSuccess$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(otActions.rejectOTSuccess),
  //       withLatestFrom(this.otFacade.getOtFilters$()),
  //       tap(([data, { filtro_propietario, filtro_tipo }]) => {
  //         this.snackService.showMessage('Orden de trabajo rechazada', 'ok');

  //         this.otFacade.getOts({
  //           filtro_propietario,
  //           filtro_tipo,
  //           filtro_pestania: '',
  //         });
  //       })
  //     ),
  //   { dispatch: false }
  // );

  notifyAfterRejectOTError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(otActions.rejectOTError),
        tap(({ error }) => {
          this.snackService.showMessage(
            'No fue posible rechazar la orden de trabajo',
            'error'
          );
          console.error(`could not reject the ot [${error.message}]`);
        })
      ),
    { dispatch: false }
  );

  getCoordinators$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getCoordinators),
      withLatestFrom(this.authFacade.getCurrentProfile$()),
      concatMap(([{ otID }, profile]) =>
        this.otService.getCoordinators(profile.id, otID).pipe(
          map((coordinators: Data.User[]) =>
            otActions.getCoordinatorsSuccess({ coordinators })
          ),
          catchError(error => of(otActions.getCoordinatorsError({ error })))
        )
      )
    )
  );

  assignCoordinator$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.assignCoordinator),
      withLatestFrom(this.authFacade.getCurrentProfile$()),
      concatMap(([{ otID, coordinador_id }, profile]) =>
        this.otService.assignCoordinator(profile.id, otID, coordinador_id).pipe(
          mapTo(otActions.assignCoordinatorSuccess()),
          catchError(error => of(otActions.assignCoordinatorError({ error })))
        )
      )
    )
  );

  // notifyAfterAssignCoordinatorSuccess$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(otActions.assignCoordinatorSuccess),
  //       withLatestFrom(this.otFacade.getOtFilters$()),
  //       tap(([data, { filtro_propietario, filtro_tipo }]) => {
  //         this.snackService.showMessage('Coordinador asignado', 'ok');

  //         this.otFacade.getOts({
  //           filtro_propietario,
  //           filtro_tipo,
  //           filtro_pestania: '',
  //         });
  //       })
  //     ),
  //   { dispatch: false }
  // );

  notifyAfterAssignCoordinatorError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(otActions.assignCoordinatorError),
        tap(({ error }) => {
          this.snackService.showMessage(
            'No fue posible asignar el coordinador',
            'error'
          );
          console.error(`could not assign the coordinator [${error.message}]`);
        })
      ),
    { dispatch: false }
  );

  // Trabajadores
  getTrabajador$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getTrabajadores),
      withLatestFrom(this.authFacade.getCurrentProfile$()),
      concatMap(([{ otID }, profile]) =>
        this.otService.getTrabajadores(profile.id, otID).pipe(
          map((trabajadores: Data.User[]) =>
            otActions.getTrabajadoresSuccess({ trabajadores })
          ),
          catchError(error => of(otActions.getTrabajadoresError({ error })))
        )
      )
    )
  );

  assignTrabajador$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.assignTrabajador),
      withLatestFrom(this.authFacade.getCurrentProfile$()),
      concatMap(([{ otID, trabajadorID }, profile]) =>
        this.otService.assignTrabajador(profile.id, otID, trabajadorID).pipe(
          mapTo(otActions.assignTrabajadorSuccess()),
          catchError(error => of(otActions.assignTrabajadorError({ error })))
        )
      )
    )
  );

  // notifyAfterAssignTrabajadorSuccess$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(otActions.assignTrabajadorSuccess),
  //       withLatestFrom(this.otFacade.getOtFilters$()),
  //       tap(([data, { filtro_propietario, filtro_tipo }]) => {
  //         this.snackService.showMessage('Trabajador asignado', 'ok');

  //         this.otFacade.getOts({
  //           filtro_propietario,
  //           filtro_tipo,
  //           filtro_pestania: '',
  //         });
  //       })
  //     ),
  //   { dispatch: false }
  // );

  notifyAfterAssignTrabajadorError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(otActions.assignTrabajadorError),
        tap(({ error }) => {
          this.snackService.showMessage(
            'No fue posible asignar el trabajador',
            'error'
          );
          console.error(`could not assign the trabajador [${error.message}]`);
        })
      ),
    { dispatch: false }
  );

  // Cancelar
  cancelOT$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.cancelOT),
      withLatestFrom(this.authFacade.getCurrentProfile$()),
      concatMap(([{ otID }, profile]) =>
        this.otService.cancelOT(profile.id, otID).pipe(
          mapTo(otActions.cancelOTSuccess()),
          catchError(error => of(otActions.cancelOTError({ error })))
        )
      )
    )
  );

  // notifyAfterCancelOTSuccess$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(otActions.cancelOTSuccess),
  //       withLatestFrom(this.otFacade.getOtFilters$()),
  //       tap(([data, { filtro_propietario, filtro_tipo }]) => {
  //         this.snackService.showMessage('Orden de trabajo anulada', 'ok');

  //         this.otFacade.getOts({
  //           filtro_propietario,
  //           filtro_tipo,
  //           filtro_pestania: '',
  //         });
  //       })
  //     ),
  //   { dispatch: false }
  // );

  notifyAfterCancelOTError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(otActions.cancelOTError),
        tap(({ error }) => {
          this.snackService.showMessage(
            'No fue posible anular orden de trabajo',
            'error'
          );
          console.error(`could not cancel the ot [${error.message}]`);
        })
      ),
    { dispatch: false }
  );

  // Finalizar trabajados
  finalizeOTJobs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.finalizeOTJobs),
      withLatestFrom(this.authFacade.getCurrentProfile$()),
      concatMap(([{ otID }, profile]) =>
        this.otService.finalizeOTJobs(profile.id, otID).pipe(
          mapTo(otActions.finalizeOTJobsSuccess()),
          catchError(error => of(otActions.finalizeOTJobsError({ error })))
        )
      )
    )
  );

  // notifyAfterFinalizeOTJobsSuccess$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(otActions.finalizeOTJobsSuccess),
  //       withLatestFrom(this.otFacade.getOtFilters$()),
  //       tap(([data, { filtro_propietario, filtro_tipo }]) => {
  //         this.snackService.showMessage(
  //           'Trabajos de esta orden finalizados',
  //           'ok'
  //         );

  //         this.otFacade.getOts({
  //           filtro_propietario,
  //           filtro_tipo,
  //           filtro_pestania: '',
  //         });
  //       })
  //     ),
  //   { dispatch: false }
  // );

  notifyAfterFinalizeOTJobsError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(otActions.finalizeOTJobsError),
        tap(({ error }) => {
          this.snackService.showMessage(
            'No fue posible finalizar los trabajos para esta orden',
            'error'
          );
          console.error(`could not finalize the ot jobs [${error.message}]`);
        })
      ),
    { dispatch: false }
  );

  // Aprobar la generación del acta
  approveOTMinutesGeneration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.approveOTMinutesGeneration),
      withLatestFrom(this.authFacade.getCurrentProfile$()),
      concatMap(([{ otID }, profile]) =>
        this.otService.approveOTMinutesGeneration(profile.id, otID).pipe(
          mapTo(otActions.approveOTMinutesGenerationSuccess()),
          catchError(error =>
            of(otActions.approveOTMinutesGenerationError({ error }))
          )
        )
      )
    )
  );

  // notifyAfterApproveOTMinutesGenerationSuccess$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(otActions.approveOTMinutesGenerationSuccess),
  //       withLatestFrom(this.otFacade.getOtFilters$()),
  //       tap(([data, { filtro_propietario, filtro_tipo }]) => {
  //         this.snackService.showMessage(
  //           'Aceptada la generación del acta',
  //           'ok'
  //         );

  //         this.otFacade.getOts({
  //           filtro_propietario,
  //           filtro_tipo,
  //           filtro_pestania: '',
  //         });
  //       })
  //     ),
  //   { dispatch: false }
  // );

  notifyAfterApproveOTMinutesGenerationError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(otActions.approveOTMinutesGenerationError),
        tap(({ error }) => {
          this.snackService.showMessage(
            'No fue posible aceptar la generación del acta',
            'error'
          );
          console.error(
            `could not approve the ot minutes generation [${error.message}]`
          );
        })
      ),
    { dispatch: false }
  );

  // Rechazar la generación del acta
  rejectOTMinutesGeneration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.rejectOTMinutesGeneration),
      withLatestFrom(this.authFacade.getCurrentProfile$()),
      concatMap(([{ otID }, profile]) =>
        this.otService.rejectOTMinutesGeneration(profile.id, otID).pipe(
          mapTo(otActions.rejectOTMinutesGenerationSuccess()),
          catchError(error =>
            of(otActions.rejectOTMinutesGenerationError({ error }))
          )
        )
      )
    )
  );

  // notifyAfterRejectOTMinutesGenerationSuccess$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(otActions.rejectOTMinutesGenerationSuccess),
  //       withLatestFrom(this.otFacade.getOtFilters$()),
  //       tap(([data, { filtro_propietario, filtro_tipo }]) => {
  //         this.snackService.showMessage(
  //           'Rechazada la generación del acta',
  //           'ok'
  //         );

  //         this.otFacade.getOts({
  //           filtro_propietario,
  //           filtro_tipo,
  //           filtro_pestania: '',
  //         });
  //       })
  //     ),
  //   { dispatch: false }
  // );

  notifyAfterRejectOTMinutesGenerationError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(otActions.rejectOTMinutesGenerationError),
        tap(({ error }) => {
          this.snackService.showMessage(
            'No fue posible rechazar la generación del acta',
            'error'
          );
          console.error(
            `could not reject the ot minutes generation [${error.message}]`
          );
        })
      ),
    { dispatch: false }
  );

  // // Aprobar la validación del acta
  // approveOTMinutesValidation$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(otActions.approveOTMinutesValidation),
  //     withLatestFrom(this.authFacade.getCurrentProfile$()),
  //     concatMap(([{ otID }, profile]) =>
  //       this.otService.approveOTMinutesValidation(profile.id, otID).pipe(
  //         mapTo(otActions.approveOTMinutesValidationSuccess()),
  //         catchError(error =>
  //           of(otActions.approveOTMinutesValidationError({ error }))
  //         )
  //       )
  //     )
  //   )
  // );

  // notifyAfterApproveOTMinutesValidationSuccess$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(otActions.approveOTMinutesValidationSuccess),
  //       withLatestFrom(this.otFacade.getOtFilters$()),
  //       tap(([data, { filtro_propietario, filtro_tipo }]) => {
  //         this.snackService.showMessage(
  //           'Aceptada la validación del acta',
  //           'ok'
  //         );

  //         this.otFacade.getOts({
  //           filtro_propietario,
  //           filtro_tipo,
  //           filtro_pestania: '',
  //         });
  //       })
  //     ),
  //   { dispatch: false }
  // );

  notifyAfterApproveOTMinutesValidationError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(otActions.approveOTMinutesValidationError),
        tap(({ error }) => {
          this.snackService.showMessage(
            'No fue posible aceptar la validación del acta',
            'error'
          );
          console.error(
            `could not approve the ot minutes validation [${error.message}]`
          );
        })
      ),
    { dispatch: false }
  );

  // Rechazar la validación del acta
  // rejectOTMinutesValidation$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(otActions.rejectOTMinutesValidation),
  //     withLatestFrom(this.authFacade.getCurrentProfile$()),
  //     concatMap(([{ otID }, profile]) =>
  //       this.otService.rejectOTMinutesValidation(profile.id, otID).pipe(
  //         mapTo(otActions.rejectOTMinutesValidationSuccess()),
  //         catchError(error =>
  //           of(otActions.rejectOTMinutesValidationError({ error }))
  //         )
  //       )
  //     )
  //   )
  // );

  // notifyAfterRejectOTMinutesValidationSuccess$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(otActions.rejectOTMinutesValidationSuccess),
  //       withLatestFrom(this.otFacade.getOtFilters$()),
  //       tap(([data, { filtro_propietario, filtro_tipo }]) => {
  //         this.snackService.showMessage(
  //           'Rechazada la validación del acta',
  //           'ok'
  //         );

  //         this.otFacade.getOts({
  //           filtro_propietario,
  //           filtro_tipo,
  //           filtro_pestania: '',
  //         });
  //       })
  //     ),
  //   { dispatch: false }
  // );

  notifyAfterRejectOTMinutesValidationError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(otActions.rejectOTMinutesValidationError),
        tap(({ error }) => {
          this.snackService.showMessage(
            'No fue posible rechazar la validación del acta',
            'error'
          );
          console.error(
            `could not reject the ot minutes validation [${error.message}]`
          );
        })
      ),
    { dispatch: false }
  );

  // Autorizar pagos
  authorizePayments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.authorizePayments),
      withLatestFrom(this.authFacade.getCurrentProfile$()),
      concatMap(([{ otID, user_id }, profile]) =>
        this.otService.authorizePayments(user_id, otID).pipe(
          mapTo(otActions.authorizePaymentsSuccess()),
          catchError(error => of(otActions.authorizePaymentsError({ error })))
        )
      )
    )
  );

  // notifyAfterAuthorizePaymentsSuccess$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(otActions.authorizePaymentsSuccess),
  //       withLatestFrom(this.otFacade.getOtFilters$()),
  //       tap(([data, { filtro_propietario, filtro_tipo }]) => {
  //         this.snackService.showMessage('Pago autorizado', 'ok');

  //         this.otFacade.getOts({
  //           filtro_propietario,
  //           filtro_tipo,
  //           filtro_pestania: '',
  //         });
  //       })
  //     ),
  //   { dispatch: false }
  // );

  notifyAfterAuthorizePaymentsError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(otActions.authorizePaymentsError),
        tap(({ error }) => {
          this.snackService.showMessage(
            'No fue posible autorizar el pago',
            'error'
          );
          console.error(`could not authorize the payments [${error.message}]`);
        })
      ),
    { dispatch: false }
  );

  // Rechazar pagos
  rejectPayments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.rejectPayments),
      withLatestFrom(this.authFacade.getCurrentProfile$()),
      concatMap(([{ otID }, profile]) =>
        this.otService.rejectPayments(profile.id, otID).pipe(
          mapTo(otActions.rejectPaymentsSuccess()),
          catchError(error => of(otActions.rejectPaymentsError({ error })))
        )
      )
    )
  );

  // notifyAfterRejectPaymentsSuccess$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(otActions.rejectPaymentsSuccess),
  //       withLatestFrom(this.otFacade.getOtFilters$()),
  //       tap(([data, { filtro_propietario, filtro_tipo }]) => {
  //         this.snackService.showMessage('Pago rechazado', 'ok');

  //         this.otFacade.getOts({
  //           filtro_propietario,
  //           filtro_tipo,
  //           filtro_pestania: '',
  //         });
  //       })
  //     ),
  //   { dispatch: false }
  // );

  notifyAfterRejectPaymentsError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(otActions.rejectPaymentsError),
        tap(({ error }) => {
          this.snackService.showMessage(
            'No fue posible rechazar el pago',
            'error'
          );
          console.error(`could not reject the payments [${error.message}]`);
        })
      ),
    { dispatch: false }
  );

  // Cerrar OT
  finalizeOT$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.finalizeOT),
      withLatestFrom(this.authFacade.getCurrentProfile$()),
      concatMap(([{ otID }, profile]) =>
        this.otService.finalizeOT(profile.id, otID).pipe(
          mapTo(otActions.finalizeOTSuccess()),
          catchError(error => of(otActions.finalizeOTError({ error })))
        )
      )
    )
  );

  // notifyAfterFinalizeOTSuccess$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(otActions.finalizeOTSuccess),
  //       withLatestFrom(this.otFacade.getOtFilters$()),
  //       tap(([data, { filtro_propietario, filtro_tipo }]) => {
  //         this.snackService.showMessage('Orden de trabajo finalizada', 'ok');

  //         this.otFacade.getOts({
  //           filtro_propietario,
  //           filtro_tipo,
  //           filtro_pestania: '',
  //         });
  //       })
  //     ),
  //   { dispatch: false }
  // );

  notifyAfterFinalizeOTError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(otActions.finalizeOTError),
        tap(({ error }) => {
          this.snackService.showMessage(
            'No fue posible finalizar la Orden de Trabajo',
            'error'
          );
          console.error(`could not finalize ot [${error.message}]`);
        })
      ),
    { dispatch: false }
  );

  registrarLibroObras$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.registrarLibroObra),
      concatMap(({ registro }) =>
        this.otService.registrarLibroObra(registro).pipe(
          mapTo(otActions.registrarLibroObraSuccess()),
          catchError(error => of(otActions.registrarLibroObraError({ error })))
        )
      )
    )
  );

  registrarLibroObrasSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(otActions.registrarLibroObraSuccess),
        tap(() => {
          this.snackService.showMessage(
            'Registro agregado exitosamente al libro de obras',
            'ok'
          );
        })
      ),
    { dispatch: false }
  );

  registrarLibroObrasError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(otActions.registrarLibroObraError),
        tap(({ error }) => {
          this.snackService.showMessage(
            'No fue posible registrar en el libro de obras',
            'error'
          );
          console.error(`could not assign the coordinator [${error.message}]`);
        })
      ),
    { dispatch: false }
  );

  getRegistrarLibroObras$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getRegistrosLibroObra),
      concatMap(({ ot_id }) =>
        this.otService.getRegistrosLibroObra(ot_id).pipe(
          map((registroslibroobras: Data.GetLibroObrasResponse) =>
            otActions.getRegistrosLibroObraSuccess({
              registroslibroobras: registroslibroobras.data.items,
            })
          ),
          catchError(error =>
            of(otActions.getRegistrosLibroObraError({ error }))
          )
        )
      )
    )
  );

  getRegistrarLibroObrasError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(otActions.registrarLibroObraError),
        tap(({ error }) => {
          this.snackService.showMessage(
            'No se pudieron obtner los registros del libro de obras',
            'error'
          );
          console.error(`can't get registers [${error.message}]`);
        })
      ),
    { dispatch: false }
  );

  // inicializarInformeAvance$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(otActions.inicializarInformeAvance),
  //     concatMap(({ ot_id }) =>
  //       this.informeAvanceService.inicializaInforme(ot_id).pipe(
  //         map(({ status }) => {
  //           if (status.responseCode === 0) {
  //             this.otFacade.getDataInformeAvanceTrabajador(ot_id);
  //           }
  //           return otActions.inicializarInformeAvanceSuccess({
  //             status,
  //           });
  //         }),
  //         catchError(error =>
  //           of(otActions.inicializarInformeAvanceError({ error }))
  //         )
  //       )
  //     )
  //   )
  // );

  getDataInformeAvanceTrabajador$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getDataInformeAvanceTrabajador),
      concatMap(({ ot_id }) =>
        this.informeAvanceService.getInformeAvanceTrabajador(ot_id).pipe(
          map(({ dataInformeAvance: datoInformeAvance, status }) =>
            otActions.getDataInformeAvanceTrabajadorSuccess({
              dataInformeAvance: datoInformeAvance,
              status,
            })
          ),
          catchError(error =>
            of(otActions.getDataInformeAvanceError({ error }))
          )
        )
      )
    )
  );

  getDataInformeAvanceAdminEC$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getDataInformeAvanceAdminEC),
      concatMap(({ ot_id }) =>
        this.informeAvanceService.getInformeAvanceAdministradorEC(ot_id).pipe(
          map(({ dataInformeAvance: datoInformeAvance, status }) =>
            otActions.getDataInformeAvanceAdminECSuccess({
              dataInformeAvance: datoInformeAvance,
              status,
            })
          ),
          catchError(error =>
            of(otActions.getDataInformeAvanceError({ error }))
          )
        )
      )
    )
  );

  saveInformeAvanceTrabajador$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.saveInformeAvanceTrabajador),
      withLatestFrom(this.otFacade.getInfoOtId$()),
      concatMap(([{ request }, ot_id]) =>
        this.informeAvanceService.saveInformeAvanceTrabajador(request).pipe(
          map(({ status }) =>
            otActions.saveInformeAvanceTrabajadorSuccess({
              ot_id,
              status,
            })
          ),
          catchError(error => of(otActions.saveInformeAvanceError({ error })))
        )
      )
    )
  );

  saveInformeAvanceAdminEC$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.saveInformeAvanceAdminEC),
      concatMap(({ request }) =>
        this.informeAvanceService.saveInformeAvanceAdministrador(request).pipe(
          map(({ status }) =>
            otActions.saveInformeAvanceAdminECSuccess({
              status,
            })
          ),
          catchError(error => of(otActions.saveInformeAvanceError({ error })))
        )
      )
    )
  );

  saveBorradorInformeAvance$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.saveBorradorInformeAvance),
      withLatestFrom(this.otFacade.getInfoOtId$()),
      concatMap(([{ request }, ot_id]) =>
        this.informeAvanceService.saveBorradorInformeAvance(request).pipe(
          map(({ status }) =>
            otActions.saveBorradorInformeAvanceSuccess({
              ot_id,
              status,
            })
          ),
          catchError(error =>
            of(otActions.saveBorradorInformeAvanceError({ error }))
          )
        )
      )
    )
  );

  rechazarInformeAvance$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.rechazarInformeAvance),
      concatMap(({ informe_id }) =>
        this.informeAvanceService.rechazarInformeAvance(informe_id).pipe(
          map(({ status }) =>
            otActions.rechazarInformeAvanceSuccess({
              status,
            })
          ),
          catchError(error =>
            of(otActions.rechazarInformeAvanceError({ error }))
          )
        )
      )
    )
  );

  getDataInformeActa$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getDataInformeActa),
      concatMap(({ ot_id }) =>
        this.actaService.getInformeActa(ot_id).pipe(
          map(({ dataInformeActa, status }) =>
            otActions.getDataInformeActaSuccess({
              dataInformeActa,
              status,
            })
          ),
          catchError(error => of(otActions.getDataInformeActaError({ error })))
        )
      )
    )
  );

  saveInformeActa$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.saveInformeActa),
      withLatestFrom(this.otFacade.getInfoOtId$()),
      concatMap(([{ request }, ot_id]) =>
        this.actaService.saveInformeActa(request).pipe(
          map(({ status }) => {
            this.otFacade.getDetalleActaMezcla(ot_id);
            return otActions.saveInformeActaSuccess({
              status,
            });
          }),
          catchError(error => of(otActions.saveInformeActaError({ error })))
        )
      )
    )
  );

  rechazarInformeActa$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.rechazarInformeActa),
      concatMap(({ informe_id }) =>
        this.actaService.rechazarInformeActa(informe_id).pipe(
          map(({ status }) =>
            otActions.rechazarInformeActaSuccess({
              status,
            })
          ),
          catchError(error => of(otActions.rechazarInformeActaError({ error })))
        )
      )
    )
  );

  getDetalleActaMezcla$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getDetalleActaMezcla),
      concatMap(({ ot_id }) =>
        this.actaService.getActaDetalle(ot_id).pipe(
          map(({ dataInformeActa, status }) => {
            console.log(dataInformeActa);

            const lpus: LpusPorcentajes[] = dataInformeActa.map(f => {
              return { detalle_id: f.detalle_id, porcentaje_solicitado: 1.0 };
            });

            const request: RequestSolicitudPagoActa = {
              acta_id: dataInformeActa[0].id,
              porcentajes_detalles: lpus,
            };
            console.log(request);

            this.otFacade.sendSolicitudPagoActa(request);
            return otActions.getDetalleActaSuccess({
              dataInformeActa,
              status,
            });
          }),
          catchError(error => of(otActions.getDetalleActaError({ error })))
        )
      )
    )
  );

  sendSolicitudPagoActa$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.sendSolicitudPagoActa),
      concatMap(({ request }) =>
        this.actaService.solicitudPagoActa(request).pipe(
          map(({ status }) =>
            otActions.sendSolicitudPagoActaSuccess({
              status,
            })
          ),
          catchError(error =>
            of(otActions.sendSolicitudPagoActaError({ error }))
          )
        )
      )
    )
  );

  getDetalleActa$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getDetalleActa),
      concatMap(({ ot_id }) =>
        this.actaService.getActaDetalle(ot_id).pipe(
          map(({ dataInformeActa, status }) =>
            otActions.getDetalleActaSuccess({
              dataInformeActa,
              status,
            })
          ),
          catchError(error => of(otActions.getDetalleActaError({ error })))
        )
      )
    )
  );

  // notifyAfterSuccess$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(
  //         otActions.getOtEjecucionSuccess,
  //         otActions.getOtAbiertasSuccess,
  //         otActions.getOtSuccessCerradas,
  //         otActions.saveBorradorInformeAvanceSuccess,
  //         otActions.saveInformeAvanceTrabajadorSuccess,
  //         otActions.saveInformeAvanceAdminECSuccess,
  //         otActions.getDataInformeAvanceTrabajadorSuccess,
  //         otActions.getDataInformeAvanceAdminECSuccess,
  //         otActions.rechazarInformeAvanceSuccess,
  //         otActions.getDataInformeActaSuccess,
  //         otActions.saveInformeActaSuccess,
  //         otActions.rechazarInformeActaSuccess,
  //         // otActions.inicializarInformeAvanceSuccess,
  //         otActions.getPlansSuccess,
  //         otActions.getSiteSuccess,
  //         otActions.getPMOSuccess,
  //         otActions.getDetalleActaSuccess,
  //         otActions.sendSolicitudPagoActaSuccess
  //       ),
  //       tap(action =>
  //         this.messageServiceInt.actions200(action.status, action.type, action)
  //       )
  //     ),
  //   { dispatch: false }
  // );

  // notifyAfterError = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(
  //         otActions.getOtsError,
  //         otActions.saveBorradorInformeAvanceError,
  //         otActions.saveInformeAvanceError,
  //         otActions.getDataInformeAvanceError,
  //         otActions.rechazarInformeAvanceError,
  //         otActions.getDataInformeActaError,
  //         otActions.saveInformeActaError,
  //         otActions.rechazarInformeActaError,
  //         // otActions.inicializarInformeAvanceError,
  //         otActions.getPmoError,
  //         otActions.getDetalleActaError
  //       ),
  //       tap(action =>
  //         this.messageServiceInt.actionsErrors(
  //           action.error.message,
  //           action.type
  //         )
  //       )
  //     ),
  //   { dispatch: false }
  // );
}
