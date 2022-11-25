import { registerLocaleData } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import * as CustomValidators from '@sharedOT/validators';
//// import { ContratoFacade } from '@storeOT/contrato/contrato.facades';
//// import { CubicacionFacade } from '@storeOT/cubicacion/cubicacion.facades';
//// import { ProveedorFacade } from '@storeOT/proveedor/proveedor.facades';
//// import { ServiciosFacade } from '@storeOT/servicios/servicios.facades';
//// import { MenuItem } from 'primeng/api';
//// import { FormAgregarServiciosComponent } from '@sharedOT/form-agregar-servicios/form-agregar-servicios.component';
//// import { FormularioComponent } from '../../components/formulario/formulario.component';
import localeEsCl from '@angular/common/locales/es-CL';
//// import { LoadingsFacade } from '@storeOT/loadings/loadings.facade';
import { combineLatest, Observable, Subscription, take } from 'rxjs';
//// import {
////   CarritoService,
////   CarritoUO,
////   DetalleCubicacion,
////   NuevoServicio,
////   NuevoUO,
////   ProveedorAgenciaContrato,
////   RequestCreateCubicacion,
////   RequestEditCubicacion,
////   ServicioUOActualizar,
////   SessionData,
////   UOAgregar,
////   MaterialesManoObra,
//// } from '@model';
//// import { ActivatedRoute, Router } from '@angular/router';
//// import { TableServiciosComponent } from '@sharedOT/table-servicios/table-servicios.component';

@Component({
  selector: 'zwc-ots-asignadas',
  templateUrl: './ots-asignadas.component.html',
  styleUrls: ['./ots-asignadas.component.scss'],
})
export class OtsAsignadasComponent implements OnInit, AfterViewInit, OnDestroy {
  subscription: Subscription = new Subscription();

  form: FormGroup = new FormGroup(
    {
      fecha_inicio: new FormControl(null, [Validators.required]),
      fecha_fin: new FormControl(null, [Validators.required]),
    },
    [CustomValidators.DateGreaterOrEqualThan('fecha_fin', 'fecha_inicio')]
  );

  ///// navbarHeader: MenuItem[];
  ///// @ViewChild('formulario', {
  /////   read: FormularioComponent,
  /////   static: false,
  ///// })
  ///// formulario: FormularioComponent;

  ///// @ViewChild('agregarServiciosForm', {
  /////   read: FormAgregarServiciosComponent,
  /////   static: false,
  ///// })
  ///// agregarServiciosForm: FormAgregarServiciosComponent;

  ///// @ViewChild('tableServicios', {
  /////   read: TableServiciosComponent,
  /////   static: false,
  ///// })
  ///// tableServicios: TableServiciosComponent;

  ///// sessionData: SessionData = JSON.parse(localStorage.getItem('auth'))
  /////   .sessionData;
  ///// proveedorSelected$: Observable<ProveedorAgenciaContrato> =
  /////   this.cubicacionFacade.proveedorSelected$();
  ///// carrito$ = this.serviciosFacade.carrito$();
  ///// editMode = false;
  ///// cubicacion_id: number;
  ///// title: string;

  ///// materialesSelected: MaterialesManoObra[] | null;
  ///// displayModalMateriales = false;

  ///// // LOADINGS
  ///// sendingSaveCubicacion$ = this.loadingFacade.sendingSaveCubicacion$();

  constructor() {
    //// private router: Router //// private route: ActivatedRoute, //// private loadingFacade: LoadingsFacade, //// private serviciosFacade: ServiciosFacade, //// private cubicacionFacade: CubicacionFacade, //// private contratoFacade: ContratoFacade, //// private proveedorFacade: ProveedorFacade,
    registerLocaleData(localeEsCl, 'es-CL');
  }

  ngOnInit(): void {
    ////// this.serviciosFacade.alertServicioExistenteCarrito(false, null);
    ////// this.navbarHeader = [
    //////   { label: 'Home', icon: 'pi pi-home', routerLink: ['/home'] },
    //////   {
    //////     label: 'Listar Cubicaciones',
    //////     icon: 'pi pi-shopping-bag',
    //////     routerLink: ['/cubicacion'],
    //////   },
    //////   { label: 'Formulario Cubicación', styleClass: 'last-route' },
    ////// ];
    ////// this.serviciosFacade.resetCarritoServices();
  }

  ngAfterViewInit(): void {
    ////// //SETTING INIT FORMULARIOS
    ////// this.formulario.formCub.get('agencia_id').disable({ emitEvent: false });
    ////// this.formulario.formCub
    //////   .get('cmarcoproveedor_id')
    //////   .disable({ emitEvent: false });
    ////// this.agregarServiciosForm.formFilter
    //////   .get('actividad_id')
    //////   .disable({ emitEvent: false });
    ////// this.agregarServiciosForm.formFilter
    //////   .get('tipo_servicio_id')
    //////   .disable({ emitEvent: false });
    ////// this.agregarServiciosForm.formFilter
    //////   .get('servicio_id')
    //////   .disable({ emitEvent: false });
    ////// this.agregarServiciosForm.formFilter
    //////   .get('unidad_obra_cod')
    //////   .disable({ emitEvent: false });
    ////// // RESETS
    ////// this.formulario.formCub.get('contrato').valueChanges.subscribe(() => {
    //////   this.cubicacionFacade.resetAgenciaSelected();
    //////   this.proveedorFacade.resetProveedoresAgenciaContrato();
    //////   this.cubicacionFacade.resetProveedorSelected();
    //////   this.contratoFacade.resetActividadesContratoProveedor();
    //////   this.contratoFacade.resetTipoServiciosContrato();
    //////   this.serviciosFacade.resetServiciosAgenciaContratoProveedor();
    //////   this.serviciosFacade.resetServicioSelected();
    //////   this.serviciosFacade.resetUnidadesObraServicio();
    //////   this.formulario.formCub
    //////     .get('agencia_id')
    //////     .setValue(null, { emitEvent: false });
    //////   this.formulario.formCub
    //////     .get('cmarcoproveedor_id')
    //////     .setValue(null, { emitEvent: false });
    //////   this.agregarServiciosForm.formFilter
    //////     .get('actividad_id')
    //////     .setValue(null, { emitEvent: false });
    //////   this.agregarServiciosForm.formFilter
    //////     .get('tipo_servicio_id')
    //////     .setValue(null, { emitEvent: false });
    //////   this.agregarServiciosForm.formFilter
    //////     .get('servicio_id')
    //////     .setValue(null, { emitEvent: false });
    //////   this.agregarServiciosForm.formFilter
    //////     .get('unidad_obra_cod')
    //////     .setValue(null, { emitEvent: false });
    ////// });
    ////// this.formulario.formCub.get('agencia_id').valueChanges.subscribe(() => {
    //////   this.cubicacionFacade.resetProveedorSelected();
    //////   this.contratoFacade.resetActividadesContratoProveedor();
    //////   this.contratoFacade.resetTipoServiciosContrato();
    //////   this.serviciosFacade.resetServiciosAgenciaContratoProveedor();
    //////   this.serviciosFacade.resetServicioSelected();
    //////   this.serviciosFacade.resetUnidadesObraServicio();
    //////   this.formulario.formCub
    //////     .get('cmarcoproveedor_id')
    //////     .setValue(null, { emitEvent: false });
    //////   this.agregarServiciosForm.formFilter
    //////     .get('actividad_id')
    //////     .setValue(null, { emitEvent: false });
    //////   this.agregarServiciosForm.formFilter
    //////     .get('tipo_servicio_id')
    //////     .setValue(null, { emitEvent: false });
    //////   this.agregarServiciosForm.formFilter
    //////     .get('servicio_id')
    //////     .setValue(null, { emitEvent: false });
    //////   this.agregarServiciosForm.formFilter
    //////     .get('unidad_obra_cod')
    //////     .setValue(null, { emitEvent: false });
    ////// });
    ////// this.formulario.formCub
    //////   .get('cmarcoproveedor_id')
    //////   .valueChanges.subscribe(() => {
    //////     this.contratoFacade.resetActividadesContratoProveedor();
    //////     this.contratoFacade.resetTipoServiciosContrato();
    //////     this.serviciosFacade.resetServiciosAgenciaContratoProveedor();
    //////     this.serviciosFacade.resetServicioSelected();
    //////     this.serviciosFacade.resetUnidadesObraServicio();
    //////     this.agregarServiciosForm.formFilter
    //////       .get('actividad_id')
    //////       .setValue(null, { emitEvent: false });
    //////     this.agregarServiciosForm.formFilter
    //////       .get('tipo_servicio_id')
    //////       .setValue(null, { emitEvent: false });
    //////     this.agregarServiciosForm.formFilter
    //////       .get('servicio_id')
    //////       .setValue(null, { emitEvent: false });
    //////     this.agregarServiciosForm.formFilter
    //////       .get('unidad_obra_cod')
    //////       .setValue(null, { emitEvent: false });
    //////   });
    ////// this.agregarServiciosForm.formFilter
    //////   .get('actividad_id')
    //////   .valueChanges.subscribe(() => {
    //////     this.contratoFacade.resetTipoServiciosContrato();
    //////     this.serviciosFacade.resetServiciosAgenciaContratoProveedor();
    //////     this.serviciosFacade.resetServicioSelected();
    //////     this.serviciosFacade.resetUnidadesObraServicio();
    //////     this.agregarServiciosForm.formFilter
    //////       .get('tipo_servicio_id')
    //////       .setValue(null, { emitEvent: false });
    //////     this.agregarServiciosForm.formFilter
    //////       .get('servicio_id')
    //////       .setValue(null, { emitEvent: false });
    //////     this.agregarServiciosForm.formFilter
    //////       .get('unidad_obra_cod')
    //////       .setValue(null, { emitEvent: false });
    //////   });
    ////// this.agregarServiciosForm.formFilter
    //////   .get('tipo_servicio_id')
    //////   .valueChanges.subscribe(() => {
    //////     this.serviciosFacade.resetServiciosAgenciaContratoProveedor();
    //////     this.serviciosFacade.resetServicioSelected();
    //////     this.serviciosFacade.resetUnidadesObraServicio();
    //////     this.agregarServiciosForm.formFilter
    //////       .get('servicio_id')
    //////       .setValue(null, { emitEvent: false });
    //////     this.agregarServiciosForm.formFilter
    //////       .get('unidad_obra_cod')
    //////       .setValue(null, { emitEvent: false });
    //////   });
    ////// this.subscription.add(
    //////   this.route.data.subscribe(({ detalleCubicacion }) => {
    //////     this.serviciosFacade.alertServicioExistenteCarrito(false, null);
    //////     if (detalleCubicacion) {
    //////       const detalle = detalleCubicacion.data;
    //////       if (this.formulario.formCub && detalle) {
    //////         const cubicacion = detalle as DetalleCubicacion;
    //////         this.editMode = true;
    //////         this.cubicacion_id = cubicacion.id;
    //////         this.title = `Editar Cubicacion ID:${this.cubicacion_id}`;
    //////         const formData = {
    //////           id: `${cubicacion.id}`,
    //////           nombre: cubicacion.nombre,
    //////           tipocubicacion: cubicacion.tipo_cubicacion_id,
    //////           direcciondesde: cubicacion.direccion_desde,
    //////           direcciondesdealtura: cubicacion.altura_desde,
    //////           direccionhasta: cubicacion.direccion_hasta,
    //////           direccionhastaaltura: cubicacion.altura_hasta,
    //////           descripcion: cubicacion.descripcion,
    //////           contrato: cubicacion.contrato_id,
    //////         };
    //////         this.formulario.formCub.patchValue(formData);
    //////         setTimeout(() => {
    //////           this.formulario.formCub
    //////             .get('agencia_id')
    //////             .setValue(cubicacion.agencia_id);
    //////         }, 1000);
    //////         setTimeout(() => {
    //////           this.formulario.formCub
    //////             .get('cmarcoproveedor_id')
    //////             .setValue(cubicacion.cmarco_has_proveedor_id);
    //////           if (this.tableServicios.hasElements) {
    //////             this.formulario.formCub
    //////               .get('contrato')
    //////               .disable({ emitEvent: false });
    //////             this.formulario.formCub
    //////               .get('agencia_id')
    //////               .disable({ emitEvent: false });
    //////             this.formulario.formCub
    //////               .get('cmarcoproveedor_id')
    //////               .disable({ emitEvent: false });
    //////           }
    //////         }, 1500);
    //////         cubicacion.many_cubicacion_has_servicio.forEach(service => {
    //////           service.many_cubicacion_has_uob.forEach(uo => {
    //////             let new_service: CarritoService = {
    //////               precargado: true,
    //////               servicio_rowid: service.id,
    //////               servicio_cantidad: service.cantidad,
    //////               servicio_id: service.servicio_id,
    //////               servicio_codigo: service.model_servicio_id.codigo,
    //////               numero_producto: service.numero_producto,
    //////               servicio_precio_final_clp: service.valor_unitario_clp,
    //////               servicio_nombre: service.model_servicio_id.descripcion,
    //////               tipo_servicio_descripcion:
    //////                 service.model_tipo_servicio_id.descripcion,
    //////               tipo_servicio_id: service.tipo_servicio_id,
    //////               servicio_unidad_cod: service.model_unidad_id.codigo,
    //////               servicio_unidad_descripcion:
    //////                 service.model_unidad_id.descripcion,
    //////               prov_has_serv_precio: service.prov_has_serv_precio,
    //////               puntos_baremos: service.puntos_baremos,
    //////               unidad_obras: [
    //////                 {
    //////                   precargado: true,
    //////                   uo_rowid: uo.id,
    //////                   uo_cantidad: uo.cantidad,
    //////                   uo_codigo: uo.unidad_obra_cod,
    //////                   uo_nombre: uo.model_unidad_obra_cod.descripcion,
    //////                   uo_precio_total_clp: uo.valor_unitario_clp,
    //////                   actividad_descripcion:
    //////                     service.model_actividad_id.descripcion,
    //////                   actividad_id: service.actividad_id,
    //////                   uob_unidad_medida_cod: uo.model_unidad_id.codigo,
    //////                   uob_unidad_medida_descripcion:
    //////                     uo.model_unidad_id.descripcion,
    //////                   // TODO Revisar
    //////                   material_arr: uo.many_cubicacion_has_material.map(m => {
    //////                     return {
    //////                       material_codigo: m.material_cod,
    //////                       material_nombre: m.model_material_cod.descripcion,
    //////                       material_origen: m.origen,
    //////                       material_precio_clp: m.valor_unitario_clp, // ?
    //////                       material_cantidad: m.cantidad,
    //////                       material_precio: m.valor, // ?
    //////                       material_tipo_moneda_id: m.model_tipo_moneda_id.id,
    //////                       material_unidad_id: m.model_unidad_id.id,
    //////                       material_unidad_medida_cod: '--', // ?
    //////                       material_valor: m.valor,
    //////                       material_unidad_codigo: m.model_unidad_id.codigo,
    //////                       material_unidad_descripcion:
    //////                         m.model_unidad_id.descripcion,
    //////                     };
    //////                   }),
    //////                 },
    //////               ],
    //////             };
    //////             this.serviciosFacade.addDirectServiceCarrito(new_service);
    //////           });
    //////         });
    //////       }
    //////     }
    //////   })
    ////// );
  }

  ////// createCubicacion(): void {
  //////   this.serviciosFacade.alertServicioExistenteCarrito(false, null);

  //////   this.subscription.add(
  //////     combineLatest([this.proveedorSelected$, this.carrito$])
  //////       .pipe(take(1))
  //////       .subscribe(([proveedorSelected, carrito]) => {
  //////         const {
  //////           nombre,
  //////           tipocubicacion,
  //////           direcciondesde,
  //////           direcciondesdealtura,
  //////           direccionhasta,
  //////           direccionhastaaltura,
  //////           descripcion,
  //////           contrato,
  //////           agencia_id,
  //////           cmarcoproveedor_id,
  //////         } = this.formulario.formCub.getRawValue();

  //////         // 155 TODO: UNIFICAR TIPO FORMULARIO
  //////         const formTableArray = this.tableServicios?.formTable
  //////           ? (this.tableServicios.formTable.get('table').value as Array<{
  //////               servicio_id: number;
  //////               servicio_cantidad: number;
  //////               unidad_obras: Array<{
  //////                 uo_cantidad: number;
  //////                 uo_codigo: string;
  //////               }>;
  //////             }>)
  //////           : [];

  //////         const request: RequestCreateCubicacion = {
  //////           cubicacion_datos: {
  //////             nombre, // FORMULARIO
  //////             tipo_cubicacion_id: tipocubicacion, // FORMULARIO
  //////             contrato_id: +contrato, // FORMULARIO
  //////             agencia_id: +agencia_id, // FORMULARIO
  //////             proveedor_id: proveedorSelected.id, // NGRX proveedorselected
  //////             codigo_acuerdo: proveedorSelected.codigo_acuerdo, // NGRX proveedorselected
  //////             cmarco_has_proveedor_id: +cmarcoproveedor_id, // FORMULARIO
  //////             usuario_creador_id: +this.sessionData.usuario_id, // LOCALSTORE
  //////             direccion_desde: direcciondesde, // FORMULARIO
  //////             altura_desde: direcciondesdealtura, // FORMULARIO
  //////             direccion_hasta: direccionhasta, // FORMULARIO
  //////             altura_hasta: direccionhastaaltura, // FORMULARIO
  //////             descripcion: descripcion, // FORMULARIO
  //////           },
  //////           cubicacion_detalle: {
  //////             nuevo: formTableArray.map(servicio => ({
  //////               servicio_id: servicio.servicio_id,
  //////               actividad_id: carrito.find(
  //////                 value =>
  //////                   value.servicio_id === servicio.servicio_id &&
  //////                   value.unidad_obras[0].uo_codigo ===
  //////                     servicio.unidad_obras[0].uo_codigo
  //////               ).unidad_obras[0].actividad_id,
  //////               tipo_servicio_id: carrito.find(
  //////                 value =>
  //////                   value.servicio_id === servicio.servicio_id &&
  //////                   value.unidad_obras[0].uo_codigo ===
  //////                     servicio.unidad_obras[0].uo_codigo
  //////               ).tipo_servicio_id,
  //////               cantidad: servicio.servicio_cantidad,
  //////               unidad_obra: servicio.unidad_obras.map(uo => ({
  //////                 uob_codigo: uo.uo_codigo,
  //////                 cantidad: uo.uo_cantidad,
  //////               })),
  //////             })),
  //////           },
  //////         };
  //////         this.cubicacionFacade.createCubicacion(request);
  //////       })
  //////   );
  ////// }

  ////// editarCubicacion(): void {
  //////   this.serviciosFacade.alertServicioExistenteCarrito(false, null);

  //////   // ELIMINAR SERVICIOS/UO QUE EXISTIAN EN LA CUBICACION SI EL USUARIO DECIDIÖ ELIMINAR UNO
  //////   if (
  //////     this.tableServicios.servicios_eliminar.length > 0 ||
  //////     this.tableServicios.uos_eliminar.length > 0
  //////   ) {
  //////     this.cubicacionFacade.eliminarServicioCarrito(
  //////       this.tableServicios.servicios_eliminar,
  //////       this.tableServicios.uos_eliminar
  //////     );
  //////   }

  //////   this.subscription.add(
  //////     combineLatest([this.proveedorSelected$, this.carrito$])
  //////       .pipe(take(1))
  //////       .subscribe(([proveedorSelected, carrito]) => {
  //////         const {
  //////           nombre,
  //////           tipocubicacion,
  //////           direcciondesde,
  //////           direcciondesdealtura,
  //////           direccionhasta,
  //////           direccionhastaaltura,
  //////           descripcion,
  //////           contrato,
  //////           agencia_id,
  //////           cmarcoproveedor_id,
  //////         } = this.formulario.formCub.getRawValue();

  //////         const isLocal = (item: { precargado?: boolean }) =>
  //////           item.precargado === undefined || item.precargado === false;

  //////         const notLocal = (item: { precargado?: boolean }) => !isLocal(item);

  //////         const servicios: {
  //////           precargado: boolean;
  //////           servicio_rowid: number;
  //////           servicio_id: number;
  //////           servicio_cantidad: number;
  //////           unidad_obras: Array<{
  //////             precargado: boolean;
  //////             uo_rowid: number;
  //////             uo_cantidad: number;
  //////             uo_codigo: string;
  //////           }>;
  //////         }[] = this.tableServicios.formTable.get('table').value as Array<{
  //////           precargado: boolean;
  //////           servicio_id: number;
  //////           servicio_rowid: number;
  //////           servicio_cantidad: number;
  //////           unidad_obras: Array<{
  //////             precargado: boolean;
  //////             uo_rowid: number;
  //////             uo_cantidad: number;
  //////             uo_codigo: string;
  //////           }>;
  //////         }>;

  //////         const nuevos_servicios: NuevoServicio[] = servicios
  //////           .filter(isLocal)
  //////           .map(servicio => {
  //////             let unidad_obra: NuevoUO[] = [];
  //////             unidad_obra = servicio.unidad_obras.map(uo => ({
  //////               uob_codigo: uo.uo_codigo,
  //////               cantidad: +uo.uo_cantidad,
  //////             }));
  //////             return {
  //////               servicio_id: +servicio.servicio_id,
  //////               actividad_id: carrito.find(
  //////                 value =>
  //////                   value.servicio_id === servicio.servicio_id &&
  //////                   value.unidad_obras[0].uo_codigo ===
  //////                     servicio.unidad_obras[0].uo_codigo
  //////               ).unidad_obras[0].actividad_id,
  //////               tipo_servicio_id: +carrito.find(
  //////                 value =>
  //////                   value.servicio_id === servicio.servicio_id &&
  //////                   value.unidad_obras[0].uo_codigo ===
  //////                     servicio.unidad_obras[0].uo_codigo
  //////               ).tipo_servicio_id,
  //////               cantidad: +servicio.servicio_cantidad,
  //////               unidad_obra,
  //////             };
  //////           });

  //////         const servicios_actualizar: ServicioUOActualizar[] = servicios
  //////           .filter(notLocal)
  //////           .map(servicio => ({
  //////             rowid: servicio.servicio_rowid,
  //////             cantidad: +servicio.servicio_cantidad,
  //////           }));

  //////         const unidades_obra_actualizar: ServicioUOActualizar[] = servicios
  //////           .filter(notLocal)
  //////           .reduce((ac, servicio) => {
  //////             const unidades_obra = servicio.unidad_obras
  //////               .filter(notLocal)
  //////               .map(uo => ({
  //////                 rowid: uo.uo_rowid,
  //////                 cantidad: +uo.uo_cantidad,
  //////               }));
  //////             return ac.concat(unidades_obra);
  //////           }, []);

  //////         const nuevas_unidades_obra: UOAgregar[] = servicios
  //////           .filter(notLocal)
  //////           .reduce((ac, servicio) => {
  //////             const unidades_obra = servicio.unidad_obras
  //////               .filter(isLocal)
  //////               .map(uo => ({
  //////                 servicio_rowid: servicio.servicio_rowid,
  //////                 uob_codigo: uo.uo_codigo,
  //////                 uob_cantidad: +uo.uo_cantidad,
  //////               }));
  //////             return ac.concat(unidades_obra);
  //////           }, []);

  //////         const request: RequestEditCubicacion = {
  //////           cubicacion_datos: {
  //////             id: +this.cubicacion_id,
  //////             nombre,
  //////             tipo_cubicacion_id: +tipocubicacion,
  //////             contrato_id: contrato,
  //////             agencia_id,
  //////             proveedor_id: proveedorSelected.id,
  //////             codigo_acuerdo: proveedorSelected.codigo_acuerdo,
  //////             cmarco_has_proveedor_id: cmarcoproveedor_id,
  //////             usuario_creador_id: +this.sessionData.usuario_id, // 72 TODO: CONFIRMAR SI DEBERÏA SER EL USUARIO QUE LO CREO O EL USUARIO QUE ESTÄ EDITANDO
  //////             direccion_desde: direcciondesde,
  //////             altura_desde: direcciondesdealtura,
  //////             direccion_hasta: direccionhasta,
  //////             altura_hasta: direccionhastaaltura,
  //////             descripcion,
  //////           },
  //////           cubicacion_detalle: {
  //////             nuevo: nuevos_servicios,
  //////             actualizar: {
  //////               servicio: servicios_actualizar,
  //////               unidad_obra: unidades_obra_actualizar,
  //////               agregar_uob_a_servicio: nuevas_unidades_obra,
  //////             },
  //////           },
  //////         };

  //////         this.cubicacionFacade.editCubicacion(request);
  //////       })
  //////   );
  ////// }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ////// showMateriales({
  //////   servicio,
  //////   uo,
  ////// }: {
  //////   servicio: CarritoService;
  //////   uo: CarritoUO;
  ////// }): void {
  //////   this.materialesSelected = [...(uo?.material_arr ?? [])];
  //////   this.displayModalMateriales = true;
  ////// }

  ////// closeModalMateriales(): void {
  //////   this.materialesSelected = null;
  //////   this.displayModalMateriales = false;
  ////// }

  ////// goBack(): void {
  //////   this.router.navigate(['/cubicacion/list-cub'], {});
  ////// }

  get valid(): boolean {
    return this.form.valid;
  }

  generarReporte(): void {}
}
