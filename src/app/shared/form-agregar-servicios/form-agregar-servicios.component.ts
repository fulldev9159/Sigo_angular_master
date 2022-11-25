import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AgenciaContrato,
  CarritoService,
  ContratosUser,
  ProveedorAgenciaContrato,
  RequestGetDetallesServicioTipoAgenciaContratoProveedor,
  RequestGetServicioTipoAgenciaContratoProveedor,
  ServicioAgenciaContratoProveedor,
  RequestGetUnidadObraServicio,
} from '@model';
import { ContratoFacade } from '@storeOT/contrato/contrato.facades';
import { CubicacionFacade } from '@storeOT/cubicacion/cubicacion.facades';
import { LoadingsFacade } from '@storeOT/loadings/loadings.facade';
import { ServiciosFacade } from '@storeOT/servicios/servicios.facades';
import { combineLatest, map, Observable, Subscription, take, tap } from 'rxjs';
import { FormularioService } from 'src/app/core/service/formulario.service';

interface Dropdown {
  name: string;
  code: number | string;
  precio?: number;
}

// 94 TODO: MEJORAR LÓGICA
// 119 TODO: VER COMO MANEJAR EL RESETEO DE LOS DROPDOWN DESDE ESTE COMPONENTE

/**
 * @example
 *  Antes de usar este componente se debe precargar lo siguiente
 *       - Actividades -> contratoFacade.getActividadesContratoProveedor(cmarcoproveedor_id)
 *       - contratoSelected -> this.cubicacionFacade.contratoSelected(contrato)
 *       - agenciaSelected -> this.cubicacionFacade.agenciaSelected(agencia);
 *       - proveedorSelected -> this.cubicacionFacade.proveedorSelected(proveedor);
 *
 * Datos que puede recibir como INPUT:
 *    - reglasDeAgregacion: Hasta ahora solo existen 2 modos para agregar servicios al carrito. Si es para crear una cubicacion se llama
 *      "reglasDeAgregacion: Cubicacion" donde existe una unica regla.
 *       También existe el agregar servicios adicionales que tiene más reglas y mensajes asociados llamada
 *      "reglasDeAgregacion: ServiciosAdicionales"
 *
 *    - informeAvance Servicios del informe de avance original: necesario para identificar si el servicio/uo que se va a agregar como adicional existe en el informe de avance
 */
@Component({
  selector: 'zwc-form-agregar-servicios',
  templateUrl: './form-agregar-servicios.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./form-agregar-servicios.component.scss'],
})
export class FormAgregarServiciosComponent implements OnDestroy, OnInit {
  subscription: Subscription = new Subscription();
  @Input() reglasDeAgregacion: string; // Cubicacion - ServiciosAdicionales
  @Input() informeAvance: CarritoService[] = [];
  // DATOS A USAR
  actividadesContratoProveedor$: Observable<Dropdown[]> = this.contratoFacade
    .getActividadesContratoProveedor$()
    .pipe(
      tap(values =>
        this.formularioService.checkAndEnable(
          this.formFilter,
          'actividad_id',
          values
        )
      ),
      map(values => {
        let tmp = [...values];
        return tmp.sort((a, b) => (a.descripcion > b.descripcion ? 1 : -1));
      }),
      map(values =>
        values.map(value => ({
          name: value.descripcion,
          code: value.actividad_id,
        }))
      )
    );

  contratoSelected$: Observable<ContratosUser> =
    this.cubicacionFacade.contratoSelected$();

  tipoServicioContrato$: Observable<Dropdown[]> = this.contratoFacade
    .getTipoServiciosContrato$()
    .pipe(
      tap(values =>
        this.formularioService.checkAndEnable(
          this.formFilter,
          'tipo_servicio_id',
          values
        )
      ),
      map(values => {
        let tmp = [...values];
        return tmp.sort((a, b) => (a.descripcion > b.descripcion ? 1 : -1));
      }),
      map(values =>
        values.map(value => ({
          name: value.descripcion,
          code: value.id,
        }))
      )
    );

  agenciaSelected$: Observable<AgenciaContrato> =
    this.cubicacionFacade.agenciaSelected$();
  proveedorSelected$: Observable<ProveedorAgenciaContrato> =
    this.cubicacionFacade.proveedorSelected$();

  serviciosAgenciaContratoProveedor: ServicioAgenciaContratoProveedor[];
  serviciosAgenciaContratoProveedor$: Observable<Dropdown[]> =
    this.serviciosFacade.getServiciosAgenciaContratoProveedor$().pipe(
      tap(values => (this.serviciosAgenciaContratoProveedor = values)),
      tap(values =>
        this.formularioService.checkAndEnable(
          this.formFilter,
          'servicio_id',
          values
        )
      ),
      map(values => {
        let tmp = [...values];
        return tmp.sort((a, b) => (a.descripcion > b.descripcion ? 1 : -1));
      }),
      map(values =>
        values.map(value => ({
          name: `${value.numero_producto} - ${value.descripcion}`,
          precio: value.precio,
          code: value.id,
        }))
      )
    );
  unidadesObraServicio$: Observable<Dropdown[]> = this.serviciosFacade
    .getUnidadesObraServicio$()
    .pipe(
      tap(values =>
        this.formularioService.checkAndEnable(
          this.formFilter,
          'unidad_obra_cod',
          values
        )
      ),
      map(values => {
        let tmp = [...values];
        return tmp.sort((a, b) =>
          a.model_unidad_obra_cod.descripcion >
          b.model_unidad_obra_cod.descripcion
            ? 1
            : -1
        );
      }),
      map(values =>
        values.map(value => ({
          name: `${value.unidad_obra_cod} - ${value.model_unidad_obra_cod.descripcion}`,
          code: value.unidad_obra_cod,
        }))
      )
    );

  carrito$: Observable<CarritoService[]> = this.serviciosFacade.carrito$();

  // FORMULARIO
  formFilterControls: any = {
    actividad_id: new FormControl(null, [Validators.required]),
    tipo_servicio_id: new FormControl(null, [Validators.required]),
    servicio_id: new FormControl(null, [Validators.required]),
    unidad_obra_cod: new FormControl(null, [Validators.required]),
  };
  formFilter: FormGroup = new FormGroup(this.formFilterControls);

  // LOADINGS
  loadingGetActividadesContratoProveedor$: Observable<boolean> =
    this.loadingsFacade.sendingGetActividadesContratoProveedor$();
  loadingGetTipoServiciosContrato$: Observable<boolean> =
    this.loadingsFacade.sendingGetTipoServiciosContrato$();
  loadingGetServiciosAgenciaContratoProveedor$: Observable<boolean> =
    this.loadingsFacade.sendingGetServiciosAgenciaContratoProveedor$();
  loadingGetUnidadesObraServicio$: Observable<boolean> =
    this.loadingsFacade.sendingGetUnidadesObraServicios$();
  loadingAgregarServicioCarrito$: Observable<boolean> =
    this.loadingsFacade.sendingAgregarServicioCarrito$();

  // EXTRAS
  alertServicioExistenteCarrito$: Observable<boolean> =
    this.serviciosFacade.alertServicioExistenteCarrito$();
  alertMessageServicio$: Observable<string> =
    this.serviciosFacade.alertMessageServicio$();

  constructor(
    private contratoFacade: ContratoFacade,
    private cubicacionFacade: CubicacionFacade,
    private serviciosFacade: ServiciosFacade,
    private loadingsFacade: LoadingsFacade,
    private formularioService: FormularioService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      combineLatest([
        this.contratoSelected$,
        this.formFilter.get('actividad_id').valueChanges,
      ]).subscribe(([contratoSelected, actividad_id]) => {
        // 95 TODO: WA para determinar si es efectivamente un cambio de actividad escogido en el formulario o es un cambio de contrato
        let preValues = this.formFilter.value;
        let actualValue = this.formFilter.get('actividad_id').value;

        let actividad_id_change = false;
        if (
          (preValues.actividad_id === null && actualValue !== null) ||
          (preValues.actividad_id !== null &&
            preValues.actividad_id !== actividad_id)
        ) {
          actividad_id_change = true;
        }

        // CALL GET TIPOS DE SERVICIOS
        if (
          actividad_id &&
          actividad_id !== null &&
          contratoSelected &&
          contratoSelected !== null &&
          actividad_id_change
        ) {
          this.serviciosFacade.alertServicioExistenteCarrito(false, null);
          this.contratoFacade.getTipoServiciosContrato(
            actividad_id,
            contratoSelected.contrato_id
          );
        }
      })
    );

    this.subscription.add(
      combineLatest([
        this.proveedorSelected$,
        this.agenciaSelected$,
        this.formFilter.get('tipo_servicio_id').valueChanges,
      ]).subscribe(([proveedorSelected, agenciaSelected, tipo_servicio_id]) => {
        // 95 TODO: WA
        let preValues = this.formFilter.value;
        let actualValue = this.formFilter.get('tipo_servicio_id').value;

        let tipo_servicio_id_change = false;
        if (
          (preValues.tipo_servicio_id === null && actualValue !== null) ||
          (preValues.tipo_servicio_id !== null &&
            preValues.tipo_servicio_id !== tipo_servicio_id)
        ) {
          tipo_servicio_id_change = true;
        }

        // CALL GET SERVICIOS
        if (
          agenciaSelected &&
          agenciaSelected !== null &&
          proveedorSelected &&
          proveedorSelected !== null &&
          tipo_servicio_id &&
          tipo_servicio_id !== null &&
          tipo_servicio_id_change &&
          +this.formFilter.get('actividad_id').value !== 0
        ) {
          let request: RequestGetServicioTipoAgenciaContratoProveedor = {
            actividad_id: +this.formFilter.get('actividad_id').value,
            agencia_id: agenciaSelected.id,
            cmarco_has_prov_id: proveedorSelected.cmarco_has_proveedor_id,
            tipo_servicio_id,
          };
          this.serviciosFacade.alertServicioExistenteCarrito(false, null);
          this.serviciosFacade.getServiciosAgenciaContratoProveedor(request);
        }
      })
    );

    // 96 TODO: CAMBIAR SERVICIO_COD POR NUMERO PRODUCTO

    this.subscription.add(
      this.formFilter.get('servicio_id').valueChanges.subscribe(servicio_id => {
        // CALL UNIDADES DE OBRAS
        if (servicio_id && servicio_id !== null) {
          this.serviciosFacade.alertServicioExistenteCarrito(false, null);
          let request: RequestGetUnidadObraServicio = {
            servicio_cod: this.serviciosAgenciaContratoProveedor.find(
              v => v.id === servicio_id
            ).codigo,
            actividad_id: +this.formFilter.get('actividad_id').value,
          };
          this.serviciosFacade.getUnidadesObraServicio(request);
        }
      })
    );

    this.subscription.add(
      this.formFilter
        .get('unidad_obra_cod')
        .valueChanges.subscribe(unidad_obra_cod => {
          // CALL UNIDADES DE OBRAS
          if (unidad_obra_cod && unidad_obra_cod !== null) {
            this.serviciosFacade.alertServicioExistenteCarrito(false, null);
          }
        })
    );
  }

  agregarServicio(): void {
    this.subscription.add(
      combineLatest([
        this.proveedorSelected$,
        this.agenciaSelected$,
        this.carrito$,
      ])
        .pipe(take(1))
        .subscribe(([proveedorSelected, agenciaSelected, carrito]) => {
          // DATOS
          const unidad_obra_cod = this.formFilter.get('unidad_obra_cod').value;
          const servicio_id = +this.formFilter.get('servicio_id').value;

          if (this.reglasDeAgregacion === 'Cubicacion')
            this.ReglasAgregarServicios(
              carrito,
              servicio_id,
              unidad_obra_cod,
              proveedorSelected.cmarco_has_proveedor_id,
              agenciaSelected.id
            );

          if (this.reglasDeAgregacion === 'ServiciosAdicionales')
            this.ReglasAgregarServiciosAdicionales(
              servicio_id,
              unidad_obra_cod,
              proveedorSelected.cmarco_has_proveedor_id,
              agenciaSelected.id
            );
        })
    );
  }

  ReglasAgregarServicios(
    carrito: CarritoService[],
    servicio_id: number,
    unidad_obra_cod: string,
    cmarco_has_proveedor_id: number,
    agencia_id: number
  ): void {
    const servicioExiste = carrito.find(
      servicio =>
        servicio.servicio_id === servicio_id &&
        servicio.unidad_obras[0].uo_codigo === unidad_obra_cod
    );

    if (servicioExiste !== undefined) {
      this.serviciosFacade.alertServicioExistenteCarrito(
        true,
        'Servicio ya está en la cubicación'
      );
    } else {
      this.serviciosFacade.alertServicioExistenteCarrito(false, null);
      const request_service: RequestGetDetallesServicioTipoAgenciaContratoProveedor =
        {
          agencia_id,
          cmarco_has_proveedor_id,
          servicio_id: +servicio_id,
          tipo_servicio_id: this.formFilter.get('tipo_servicio_id').value,
          actividad_id: this.formFilter.get('actividad_id').value,
        };

      this.serviciosFacade.addServicioCarrito(request_service, unidad_obra_cod);
    }
  }

  // 120 TODO: REVISAR BIEN TODOS LOS CASOS
  // 120 TODO: CASO SERVICIO/UO EXISTENTES EN EL INFORME ORIGINAL
  // 120 TODO: CASO SERVICIO/UO NUEVOS NO EXISTENTES EN INFORME ORIGINAL
  // 120 TODO: CASO SERVICIO EXISTENTE EN INFORME ORIGINAL PERO UO ES NUEVA
  // 120 TODO: CASO SERVICIO/UO ADICIONAL YA AGREGADO ANTERIORMENTE
  // 120 TODO: CASO SERVICIO ADICIONAL YA AGREGADO ANTERIORMENTE PERO UO NUEVA
  // 120 TODO: CASO SERVICIO/UO ADICIONAL EXISTENTE EN EL CARRITO TEMPORAL ANTES DE GUARDAR BORRADOR

  ReglasAgregarServiciosAdicionales(
    servicio_id: number,
    unidad_obra_cod: string,
    cmarco_has_proveedor_id: number,
    agencia_id: number
  ): void {
    this.subscription.add(
      this.carrito$.pipe(take(1)).subscribe(carrito => {
        console.log('carrito', carrito);
        const carritoReducerEstricto = this.preFormatearCarrito(carrito);
        const request_service: RequestGetDetallesServicioTipoAgenciaContratoProveedor =
          {
            agencia_id,
            cmarco_has_proveedor_id,
            servicio_id: +servicio_id,
            tipo_servicio_id: this.formFilter.get('tipo_servicio_id').value,
            actividad_id: this.formFilter.get('actividad_id').value,
          };

        // DETERMINAR EXISTENCIA EN INFORME DE AVANCE
        let servicioInInforme = this.informeAvance.find(
          servicio =>
            servicio.servicio_id === servicio_id &&
            servicio.adicional === 'ORIGINAL'
        );

        let uoInInforme;

        if (servicioInInforme)
          uoInInforme = servicioInInforme.unidad_obras.find(
            v => v.uo_codigo === unidad_obra_cod
          );

        // DETERINAR EXISTENCIA EN LOS AGREGADOS

        let servicioINCarrito = carritoReducerEstricto.find(
          servicio => servicio.servicio_id === servicio_id
        );

        let uoInCarrito;

        if (servicioINCarrito)
          uoInCarrito = servicioINCarrito.unidad_obras.find(
            v => v.uo_codigo === unidad_obra_cod
          );

        console.log('uo in informe avance', uoInInforme);

        // CASOS
        // CASO 1: SERVICIO Y UNIDAD DE OBRA A AGREGAR YA EXISTE EN EL INFORME DE AVANCE
        if (servicioInInforme !== undefined && uoInInforme !== undefined) {
          this.serviciosFacade.alertServicioExistenteCarrito(
            true,
            'Servicio y unidad de obra ya existen en el informe de avance. Debe cambiar la cantidad en el informe de avance'
          );
          return false;
        }

        // CASO 2:  SERVICIO A AGREGAR YA EXISTE EN EL INFORME DE AVANCE PERO LA UO ES NUEVA
        if (servicioInInforme !== undefined && uoInInforme === undefined) {
          console.log(
            'Es un servicio original existente en el informe de avance pero la uo es nueva'
          );

          // CASO 2.1: SERVICIO A AGREGAR YA EXISTE EN EL INFORME DE AVANCE PERO LA UO ES NUEVA
          // Y EL SERVICIO Y LA UO YA HAN SIDO AGREGADOS COMO ADICIONALES
          if (servicioINCarrito !== undefined && uoInCarrito !== undefined) {
            console.log('El servicio/UO ya existe como adicional');

            this.serviciosFacade.alertServicioExistenteCarrito(
              true,
              'El servicio/UO ya fue agregado como adicional'
            );
            return false;
          }

          // CASO 2.2: SERVICIO A AGREGAR YA EXISTE EN EL INFORME DE AVANCE PERO LA UO ES NUEVA -
          //        EL SERVICIO YA EXISTE COMO ADICIONAL Y LA UNIDAD DE OBRA NO HAN SIDO AGREGADA

          // CASO 2.3: SERVICIO A AGREGAR YA EXISTE EN EL INFORME DE AVANCE PERO LA UO ES NUEVA -
          //        EL SERVICIO Y LA UO AUN NO SE HAN AGREGADO COMO ADICIONAL
          if (
            (servicioINCarrito !== undefined && uoInCarrito === undefined) ||
            (servicioINCarrito === undefined && uoInCarrito === undefined)
          ) {
            this.serviciosFacade.alertServicioExistenteCarrito(false, null);
            this.serviciosFacade.addServicioCarrito(
              request_service,
              unidad_obra_cod
            );
            return true;
          }
        }

        // CASO 3: EL SERVICIO Y LA UO NO EXISTEN EN EL INFORME DE AVANCE

        if (servicioInInforme === undefined && uoInInforme === undefined) {
          console.log('Servicio y UO no existentes en el informe de avance');

          // CASO 3.1: EL SERVICIO Y LA UO NO EXISTEN EN EL INFORME DE AVANCE Y
          // SERVICIO/UO NO SE HA AGREGADO COMO ADICIONAL
          // CASO 3.3: EL SERVICIO Y LA UO NO EXISTEN EN EL INFORME DE AVANCE Y
          // SERVICIO YA SE HA AGREGADO COMO ADICIONAL PERO LA UO AÚN NO
          if (
            (servicioINCarrito === undefined && uoInCarrito === undefined) ||
            (servicioINCarrito !== undefined && uoInCarrito === undefined)
          ) {
            this.serviciosFacade.alertServicioExistenteCarrito(false, null);
            this.serviciosFacade.addServicioCarrito(
              request_service,
              unidad_obra_cod
            );

            return true;
          }

          // CASO 3.3
          if (servicioINCarrito !== undefined && uoInCarrito !== undefined) {
            console.log('El servicio/UO ya existe como adicional');

            this.serviciosFacade.alertServicioExistenteCarrito(
              true,
              'El servicio/UO ya existe como adicional'
            );
            return false;
          }
        }

        // if (
        //   service_and_UO_in_informeAvance === undefined &&
        //   service_in_informeAvance_UO_nueva === undefined &&
        //   service_nuevo_UO_nueva === undefined
        // ) {
        //   this.serviciosFacade.alertServicioExistenteCarrito(false, null);
        //   const request_service: RequestGetDetallesServicioTipoAgenciaContratoProveedor =
        //     {
        //       agencia_id,
        //       cmarco_has_proveedor_id,
        //       servicio_id: +servicio_id,
        //       tipo_servicio_id: this.formFilter.get('tipo_servicio_id').value,
        //       actividad_id: this.formFilter.get('actividad_id').value,
        //     };

        //   this.serviciosFacade.addServicioCarrito(request_service, unidad_obra_cod);
        // }

        return false;
      })
    );
  }

  preFormatearCarrito(carrito: CarritoService[]): CarritoService[] {
    let valueInitial: CarritoService[] = [];

    const carritoReducerEstricto = carrito.reduce((acc, curr) => {
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
    }, valueInitial);

    return carritoReducerEstricto;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  findServicio(servicios: Dropdown[], code: number): Dropdown {
    return servicios.find(servicio => servicio.code === code);
  }
}
