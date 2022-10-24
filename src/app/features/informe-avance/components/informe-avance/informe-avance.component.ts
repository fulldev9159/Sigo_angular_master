import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Accion,
  AgenciaContrato,
  AgregarUOAdicionalAServicio,
  CarritoService,
  ContratosUser,
  DetalleInformeAvance,
  DetalleOT,
  ItemSerivioUO,
  NuevoServicioAdicional,
  ProveedorAgenciaContrato,
  RequestAdicionales,
  RequestAutorizarInformeAvance,
  RequestUpdateInformeAvance,
  ServicioAdicionalActualizar,
  UOAdicionalActualizar,
} from '@model';
import { FormAgregarServiciosComponent } from '@sharedOT/form-agregar-servicios/form-agregar-servicios.component';
import { TableServiciosComponent } from '@sharedOT/table-servicios/table-servicios.component';
import { ContratoFacade } from '@storeOT/contrato/contrato.facades';
import { CubicacionFacade } from '@storeOT/cubicacion/cubicacion.facades';
import { InformeAvanceFacade } from '@storeOT/informe-avance/informe-avance.facades';
import { LoadingsFacade } from '@storeOT/loadings/loadings.facade';
import { ServiciosFacade } from '@storeOT/servicios/servicios.facades';
import { Observable, Subscription, take } from 'rxjs';

interface TableService {
  precargado: boolean;
  servicio_cantidad: number;
  servicio_id: number;
  servicio_precio_final_clp: number;
  servicio_rowid: number;
  unidad_obras: {
    precargado: boolean;
    uo_rowid: number;
    uo_codigo: string;
    uo_cantidad: number;

    uo_precio_total_clp: number;
  }[];
}

// 92 TODO: CREAR LAS RESTRICCIONES DE ACCESO POR USUARIO Y ADEMÁS POR ETAPA
// 92 TODO: SOLO DBE PERMITIR ENTRAR EN LA ETAPA DE EJECUCIÓN DE TRABAJOS
// 105 TODO: VER SI ES MEJOR UX REFRESCAR EL NGRX QUE LA PÁGINA AL GUARDAR BORRADOR
// 106 TODO: CONFIRMAR: SI EL ADMIN EECC REALIZA MODIFICACIONES AL INFORME DE AVANCE Y LO RECHAZA ESOS CAMBIOS TAMBIÉN SE DEBERAN GUARDAR
// 107 TODO: MOSTRAR EL TOTAL EN LA VISTA DEL ADMIN EECC
// 108 TODO: IMPLEMENTAR BOTON RECHAZAR INFORME DE AVANCE
// 109 TODO: PROBAR QUE OTROS USUARIOS DE OTRAS EMPRESAS NO PUEDAN ACCEDER AL ID DE UNA OT QUE NO ES DE SU EMPRESA
// 110 TODO: PROBAR SI AL CAMBIAR INFORMACION DEL INFORME Y APROBAR/RECHAZAR GUARDA EL CAMBIO
// 111 TODO: AGREGAR UN MODAL DE VALIDACIÓN DE ACCIÓN AL AUTORIZAR INFORME DE AVANCE
// 156 TODO: EL MENSAJE DE SERVICIO YA EXISTENTE PARECE PERO DESAPARECE SI VUELVO A ESCOGER OTRO SERVICIO YA EXISTENTE
@Component({
  selector: 'zwc-informe-avance',
  templateUrl: './informe-avance.component.html',
  styleUrls: ['./informe-avance.component.scss'],
})
export class InformeAvanceComponent
  implements OnDestroy, OnInit, AfterViewInit
{
  @ViewChild('agregarServiciosForm', {
    read: FormAgregarServiciosComponent,
    static: false,
  })
  agregarServiciosForm: FormAgregarServiciosComponent;

  @ViewChild('tableServiciosAdicionales', {
    read: TableServiciosComponent,
    static: false,
  })
  tableServiciosAdicionales: TableServiciosComponent;

  @ViewChild('tableServiciosInformeAvance', {
    read: TableServiciosComponent,
    static: false,
  })
  tableServiciosInformeAvance: TableServiciosComponent;

  subscription: Subscription = new Subscription();
  serviciosInformeAvance: CarritoService[] = [];
  // 112 TODO: MEJORAR MANERA DE ARMAR LOS DATOS DEL SERVICIO A AGREGAR, ACTUALMENTE SE BUSCA DESDE EL CARRITO HACIA EL CARRITO, TIENE UNA VUELTA MEDIA RARA
  carrito$ = this.serviciosFacade.carrito$();
  detalleInformeAvance$: Observable<DetalleInformeAvance> =
    this.informeAvanceFacade.getDetalleInformeAvance$();
  accionesOT: Accion[] = [];
  ot_id: number;

  // LOADINGS
  sendingSendInformeAvance$: Observable<boolean> =
    this.loadingsFacade.sendingCreateOT$();

  sendingSendBorradorInformeAvance$: Observable<boolean> =
    this.loadingsFacade.sendingSendBorradorInformeAvance$();

  // MODAL
  showModalRechazarInformeAvance = false;
  displayModalEnvioInformeAvance = false;

  constructor(
    private serviciosFacade: ServiciosFacade,
    private contratoFacade: ContratoFacade,
    private cubicacionFacade: CubicacionFacade,
    private loadingsFacade: LoadingsFacade,
    private informeAvanceFacade: InformeAvanceFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.serviciosFacade.resetCarritoServices();
    this.subscription.add(
      this.route.data.subscribe(
        ({ detalleOT, detalleInformeAvance, accionesOT }) => {
          console.log(accionesOT);
          if (accionesOT) this.accionesOT = accionesOT;
          if (detalleOT) {
            const ot = detalleOT.data as DetalleOT;

            this.ot_id = ot.ot.id;

            // PRECARGAR DATOS FILTROS PARA AGREGAR SERVICIOS
            this.contratoFacade.getActividadesContratoProveedor(
              +ot.ot.model_cubicacion_id.cmarco_has_proveedor_id
            );

            let contrato: ContratosUser = {
              contrato_id: +ot.ot.model_cubicacion_id.contrato_id,
            };
            this.cubicacionFacade.contratoSelected(contrato);

            let agencia: AgenciaContrato = {
              id: ot.ot.model_cubicacion_id.agencia_id,
              nombre: '',
            };
            this.cubicacionFacade.agenciaSelected(agencia);

            let proveedor: ProveedorAgenciaContrato = {
              cmarco_has_proveedor_id:
                ot.ot.model_cubicacion_id.cmarco_has_proveedor_id,
              id: ot.ot.model_cubicacion_id.proveedor_id,
            };
            this.cubicacionFacade.proveedorSelected(proveedor);
          }
        }
      )
    );
    this.subscription.add(
      this.detalleInformeAvance$.subscribe(detalleInforme => {
        if (detalleInforme) {
          if (this.tableServiciosAdicionales) {
            this.tableServiciosAdicionales.uos_eliminar = [];
            this.tableServiciosAdicionales.servicios_eliminar = [];
          }
          // CARGAR CARRITO
          detalleInforme.many_informe_has_servicio.forEach(service => {
            service.many_informe_has_uob.forEach(uo => {
              let new_service: CarritoService = {
                precargado: true,
                servicio_rowid: service.id,
                servicio_cantidad: service.cantidad,
                adicional: service.adicional_aceptacion_estado,

                servicio_id: service.servicio_id,
                servicio_codigo: service.model_servicio_id.codigo,
                numero_producto: service.numero_producto,
                servicio_precio_final_clp: service.valor_unitario_clp,
                servicio_nombre: service.model_servicio_id.descripcion,
                tipo_servicio_descripcion: 'TODO',
                tipo_servicio_id: service.tipo_servicio_id,
                servicio_unidad_cod: service.model_unidad_id.codigo,
                servicio_unidad_descripcion:
                  service.model_unidad_id.descripcion,
                unidad_obras: [
                  {
                    precargado: true,
                    uo_rowid: uo.id,
                    uo_cantidad: uo.cantidad,

                    uo_codigo: uo.unidad_obra_cod,
                    uo_nombre: uo.model_unidad_obra_cod.descripcion,
                    uo_precio_total_clp: uo.valor_unitario_clp,
                    actividad_descripcion: 'TODO',
                    actividad_id: -1,
                    uob_unidad_medida_cod: uo.model_unidad_id.codigo,
                    uob_unidad_medida_descripcion:
                      uo.model_unidad_id.descripcion,
                  },
                ],
              };

              // PARA CARGAR INFORME DE AVANCE
              if (new_service.adicional === 'ORIGINAL')
                this.serviciosInformeAvance.push(new_service);
              // PARA PRE CARGAR SERVICIOS ADICIONALES
              if (new_service.adicional !== 'ORIGINAL')
                this.serviciosFacade.addDirectServiceCarrito(new_service);
            });
          });
          let valueInitial: CarritoService[] = [];
          this.serviciosInformeAvance = this.serviciosInformeAvance.reduce(
            (acc, curr) => {
              let indexService = acc.findIndex(
                value => value.servicio_id === curr.servicio_id
              );
              if (indexService === -1) {
                acc.push(curr);
              } else {
                let temp = [
                  ...acc.map(item => ({
                    ...item,
                    unidad_obras: [...item.unidad_obras],
                  })),
                ];
                temp[indexService].unidad_obras.push(...curr.unidad_obras);
                acc[indexService] = temp[indexService];
              }

              return acc;
            },
            valueInitial
          );
        }
      })
    );
  }

  ngAfterViewInit(): void {
    //SETTING INIT FORMULARIOS
    this.agregarServiciosForm?.formFilter
      .get('tipo_servicio_id')
      .disable({ emitEvent: false });
    this.agregarServiciosForm?.formFilter
      .get('servicio_id')
      .disable({ emitEvent: false });
    this.agregarServiciosForm?.formFilter
      .get('unidad_obra_cod')
      .disable({ emitEvent: false });

    // RESET
    this.agregarServiciosForm?.formFilter
      .get('actividad_id')
      .valueChanges.subscribe(() => {
        this.contratoFacade.resetTipoServiciosContrato();
        this.serviciosFacade.resetServiciosAgenciaContratoProveedor();
        this.serviciosFacade.resetServicioSelected();
        this.serviciosFacade.resetUnidadesObraServicio();

        this.agregarServiciosForm?.formFilter
          .get('tipo_servicio_id')
          .setValue(null, { emitEvent: false });
        this.agregarServiciosForm?.formFilter
          .get('servicio_id')
          .setValue(null, { emitEvent: false });
        this.agregarServiciosForm?.formFilter
          .get('unidad_obra_cod')
          .setValue(null, { emitEvent: false });
      });

    this.agregarServiciosForm?.formFilter
      .get('tipo_servicio_id')
      .valueChanges.subscribe(() => {
        this.serviciosFacade.resetServiciosAgenciaContratoProveedor();
        this.serviciosFacade.resetServicioSelected();
        this.serviciosFacade.resetUnidadesObraServicio();

        this.agregarServiciosForm?.formFilter
          .get('servicio_id')
          .setValue(null, { emitEvent: false });
        this.agregarServiciosForm?.formFilter
          .get('unidad_obra_cod')
          .setValue(null, { emitEvent: false });
      });
  }

  // 157 TODO: MOVER A UN PLANO GLOBAL
  accionExist(accion: string): boolean {
    return this.accionesOT.find(v => v.slug === accion) !== undefined;
  }

  getRequestServiciosAdicionales(
    formularioServiciosAdicionales: TableService[],
    carrito: CarritoService[]
  ): RequestAdicionales {
    // SERVICIOS/UO COMPLETAMENTE NUEVOS
    let nuevosAdicionales: NuevoServicioAdicional[] =
      formularioServiciosAdicionales
        .filter(value => !value.precargado)
        .map(value => ({
          servicio_id: +value.servicio_id,
          actividad_id: +carrito.find(
            servicio => servicio.servicio_id === +value.servicio_id
          ).unidad_obras[0].actividad_id, // 116 TODO: CONSULTAR SI EXISTE LA POSIBILIDAD DE QUE EXISTA UNA UO CON DISTINTOS TIPOS DE SERVICIO/ACTIVIDAD
          tipo_servicio_id: +carrito.find(
            servicio => servicio.servicio_id === +value.servicio_id
          ).tipo_servicio_id,
          // cantidad: value.dummy ? 0 : value.servicio_cantidad,
          cantidad: value.servicio_cantidad,
          unidad_obra: value.unidad_obras.map(uo => ({
            uob_codigo: uo.uo_codigo,
            cantidad: uo.uo_cantidad,
          })),
        }));

    // ACTUALIZAR
    // TODO: SE PODRIA COMPARAR LA CANTIDAD CON $CARRITO PARA DETERMINAR SI REALMENTE SE HIZO UN CAMBIO
    // SERVICIOS
    let servicios_actualizar: ServicioAdicionalActualizar[] =
      formularioServiciosAdicionales
        .filter(value => value.precargado)
        .map(value => ({
          rowid: value.servicio_rowid,
          cantidad: value.servicio_cantidad,
        }));

    // UOS
    let valueIntial: {
      precargado: boolean;
      uo_cantidad: number;
      uo_codigo: string;
      uo_precio_total_clp: number;
      uo_rowid: number;
    }[] = [];

    let uosAdicionalesPrecargadas: {
      precargado: boolean;
      uo_cantidad: number;
      uo_codigo: string;
      uo_precio_total_clp: number;
      uo_rowid: number;
    }[] = formularioServiciosAdicionales.reduce((acc, curr) => {
      acc.push(...curr.unidad_obras.filter(v => v.precargado));
      return acc;
    }, valueIntial);

    let uos_actualizar: UOAdicionalActualizar[] = uosAdicionalesPrecargadas.map(
      v => ({
        rowid: v.uo_rowid,
        cantidad: v.uo_cantidad,
      })
    );

    // 196 TODO: UO A AGREGAR A ADICIONAL EXISTENTE EN EL CARRITO
    // UO NUEVO EN SERVICIO EXISTE
    let s = formularioServiciosAdicionales.filter(value => value.precargado);
    let initialVal: {
      servicio_rowid: number;
      uob_codigo: string;
      uob_cantidad: number;
    }[] = [];
    let agregar_uob_a_servicio: AgregarUOAdicionalAServicio[] = s.reduce(
      (acc, curr) => {
        let uosNuevos = curr.unidad_obras.filter(v => !v.precargado);
        if (uosNuevos.length > 0) {
          acc.push(
            ...uosNuevos.map(v => ({
              servicio_rowid: curr.servicio_rowid,
              uob_codigo: v.uo_codigo,
              uob_cantidad: v.uo_cantidad,
            }))
          );
        }
        return acc;
      },
      initialVal
    );

    console.log('servicios a actualizar', agregar_uob_a_servicio);

    // REQUEST SERVICIOS ADICONALES
    let request_adicionales: RequestAdicionales = {
      ot_id: this.ot_id,
      adicionales_solicitados: {
        nuevo: nuevosAdicionales,
        actualizar: {
          servicio: servicios_actualizar,
          unidad_obra: uos_actualizar,
          agregar_uob_a_servicio,
        },
      },
    };

    return request_adicionales;
  }

  getRequestUpdateInformeAvance(
    formularioInformeAvance: TableService[]
  ): RequestUpdateInformeAvance {
    let servicio: ItemSerivioUO[] = formularioInformeAvance.map(v => ({
      row_id: v.servicio_rowid,
      cantidad: v.servicio_cantidad,
    }));

    let valueIntial: {
      precargado: boolean;
      uo_cantidad: number;
      uo_codigo: string;
      uo_precio_total_clp: number;
      uo_rowid: number;
    }[] = [];

    let uos: {
      precargado: boolean;
      uo_cantidad: number;
      uo_codigo: string;
      uo_precio_total_clp: number;
      uo_rowid: number;
    }[] = formularioInformeAvance.reduce((acc, curr) => {
      acc.push(...curr.unidad_obras);
      return acc;
    }, valueIntial);

    let unidad_obra: ItemSerivioUO[] = uos.map(v => ({
      row_id: v.uo_rowid,
      cantidad: v.uo_cantidad,
    }));

    return {
      servicio,
      unidad_obra,
    };
  }

  guardarBorrador(): void {
    this.subscription.add(
      this.carrito$.pipe(take(1)).subscribe(carrito => {
        // TODO: PROBAR QUE OCURRE SI ELIMINA UN SERVICIO Y LUEGO LO VUELVE A AGREGAR

        // ELIMINAR ADICIONALES ESCOGIDOS PARA ELIMINAR
        this.eliminarAdicionalesEscogidos();

        // GUARDAR BORRADOR
        let formularioServiciosAdicionales =
          this.tableServiciosAdicionales.formTable.get('table')
            .value as Array<TableService>;

        let formularioInformeAvance =
          this.tableServiciosInformeAvance.formTable.get('table')
            .value as Array<TableService>;

        let request_informe_avance: any = this.getRequestUpdateInformeAvance(
          formularioInformeAvance
        );

        if (formularioServiciosAdicionales.length > 0) {
          //  ACTUALIZAR INFORME DE AVANCE Y ADICIONALES SI ES QUE EXISTEN ADICIONALES
          let request_adicionales: RequestAdicionales =
            this.getRequestServiciosAdicionales(
              formularioServiciosAdicionales,
              carrito
            );

          this.informeAvanceFacade.actualizarInformeAvanceYAdicionales(
            request_informe_avance,
            request_adicionales
          );
        } else {
          // ACTUALIZAR SOLO EL INFORME DE AVANCE
          this.informeAvanceFacade.actualizarInformeAvance(
            request_informe_avance,
            this.ot_id
          );
        }
      })
    );
  }

  enviarInformeAvance(): void {
    // 117 TODO: IMPLEMENTAR EL CONFIRMAR ENVÍO DE INFORME DE AVANCE
    // 118 TODO: IMPLEMENTAR EL GUARDAR ADICIONALES
    this.subscription.add(
      this.carrito$.pipe(take(1)).subscribe(carrito => {
        // GUARDAR CAMBIOS Y ENVIAR INFORME AVANCE

        // ELIMINAR ADICIONALES ESCOGIDOS PARA ELIMINAR
        this.eliminarAdicionalesEscogidos();

        // GUARDAR BORRADOR
        let formularioServiciosAdicionales =
          this.tableServiciosAdicionales.formTable.get('table')
            .value as Array<TableService>;

        let formularioInformeAvance =
          this.tableServiciosInformeAvance.formTable.get('table')
            .value as Array<TableService>;

        let request_informe_avance: any = this.getRequestUpdateInformeAvance(
          formularioInformeAvance
        );

        if (formularioServiciosAdicionales.length > 0) {
          //  ACTUALIZAR INFORME DE AVANCE ADICIONALES SI ES QUE EXISTEN ADICIONALES Y ENVIAR IA
          let request_adicionales: RequestAdicionales =
            this.getRequestServiciosAdicionales(
              formularioServiciosAdicionales,
              carrito
            );

          this.informeAvanceFacade.actualizarInformeAvanceAdicionalesYenviar(
            request_informe_avance,
            request_adicionales,
            this.ot_id
          );
        } else {
          // ACTUALIZAR SOLO EL INFORME DE AVANCE
          this.informeAvanceFacade.actualizarInformeAvanceYenviar(
            request_informe_avance,
            this.ot_id
          );
        }

        this.displayModalEnvioInformeAvance = false;
      })
    );
  }

  eliminarAdicionalesEscogidos(): void {
    if (
      this.tableServiciosAdicionales.servicios_eliminar.length > 0 ||
      this.tableServiciosAdicionales.uos_eliminar.length > 0
    ) {
      this.serviciosFacade.eliminarAdicional(
        this.tableServiciosAdicionales.servicios_eliminar,
        this.tableServiciosAdicionales.uos_eliminar
      );
    }
  }

  displayModalRechazarInformeAvance(): void {
    this.showModalRechazarInformeAvance = true;
  }

  autorizarInformeAvance(): void {
    const request: RequestAutorizarInformeAvance = {
      ot_id: this.ot_id,
      estado: 'APROBADO',
    };

    this.informeAvanceFacade.AceptarRechazarInformeAvanceOT(request);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
