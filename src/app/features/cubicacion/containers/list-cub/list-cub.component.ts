import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { FormControl, FormGroup } from '@angular/forms';
import { CarritoService, Cubicacion, DetalleCubicacion } from '@model';
import { CubicacionFacade } from '@storeOT/cubicacion/cubicacion.facades';
import { LoadingsFacade } from '@storeOT/loadings/loadings.facade';
import { map, Observable, Subscription, take, tap } from 'rxjs';
import { ServiciosFacade } from '@storeOT/servicios/servicios.facades';
import {
  faCircleInfo,
  faClone,
  faFilter,
  faPencil,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

//  TODO: DESHABILITAR BOTONES EDITAR Y ELIMINAR A CUBICACIONES UTILIZADAS
@Component({
  selector: 'zwc-list-cub',
  templateUrl: './list-cub.component.html',
  styleUrls: ['./list-cub.component.scss'],
})
export class ListCubComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  navbarHeader: MenuItem[];
  filterIcon = faFilter;
  infoIcon = faCircleInfo;
  cloneIcon = faClone;
  editIcon = faPencil;
  trashICon = faTrash;

  // FILTROS
  tipo_cubicacion_filter: string[] = [];
  contratos_marcos_filter: string[] = [];
  agencias_filter: string[] = [];

  // DATOS
  cubicaciones$: Observable<Cubicacion[]> = this.cubicacionFacade
    .listarCubicaciones$()
    .pipe(
      map(values => {
        // HAY QUE REALIZAR ESTA ACCION PORQUE EL ORDEN DE PRIMENG POR COLUMNA NO FUNCIONA CON UN OBJETO INMUTABLE.
        let tmp = [...values];
        return tmp.sort((a, b) => (a.cubicacion_id > b.cubicacion_id ? 1 : -1));
      }),
      tap(value => {
        // DROPDOWN FILTROS
        this.tipo_cubicacion_filter = [
          ...new Set(value.map(item => item.tipo_cubicacion_descripcion)),
        ];
        this.contratos_marcos_filter = [
          ...new Set(value.map(item => item.contrato_marco_nombre)),
        ];
        this.agencias_filter = [
          ...new Set(value.map(item => item.agencia_nombre)),
        ];
      })
    );

  detalleCubicacion: DetalleCubicacion = null;
  // AGREGAR DATOS A CARRITO PARA DESPLIEGUE DE SERVICIOS
  detalleCubicacion$ = this.cubicacionFacade.detalleCubicacion$().pipe(
    tap(detalleCubicacion => (this.detalleCubicacion = detalleCubicacion)),
    tap(cubicacion => {
      if (cubicacion) {
        cubicacion.many_cubicacion_has_servicio.forEach(service => {
          service.many_cubicacion_has_uob.forEach(uo => {
            let new_service: CarritoService = {
              servicio_id: service.id,
              servicio_codigo: service.model_servicio_id.codigo,
              numero_producto: 'TODO',
              servicio_precio_final_clp: service.valor_unitario_clp,
              servicio_nombre: service.model_servicio_id.descripcion,
              tipo_servicio_descripcion:
                service.model_tipo_servicio_id.descripcion,
              tipo_servicio_id: service.tipo_servicio_id,
              servicio_cantidad: service.cantidad,
              servicio_unidad_cod: service.model_unidad_id.codigo,
              servicio_unidad_descripcion: service.model_unidad_id.descripcion,
              unidad_obras: [
                {
                  uo_codigo: uo.unidad_obra_cod,
                  uo_nombre: uo.model_unidad_obra_cod.descripcion,
                  uo_precio_total_clp: uo.valor_unitario_clp,
                  actividad_descripcion: service.model_actividad_id.descripcion,
                  actividad_id: -1,
                  uo_cantidad: uo.cantidad,
                  uob_unidad_medida_cod: uo.model_unidad_id.codigo,
                  uob_unidad_medida_descripcion: uo.model_unidad_id.descripcion,
                },
              ],
            };
            this.serviciosFacade.addDirectServiceCarrito(new_service);
          });
        });
      }
    })
  );
  cubicacion_id: number;

  // LOADINGS
  getCubicacioneSending$ = this.loadingFacade.sendingGetCubicaciones$();
  loagingGetDetalleCubicacion$ = this.loadingFacade.sendingDetalleCubicacion$();

  // FORMULARIO
  formFilterControl = {
    cubicacion_id: new FormControl('', []),
    nombre: new FormControl('', []),
    tipo_cubicacion: new FormControl(''),
    contrato_marco: new FormControl(''),
    agencia: new FormControl(''),
    creado_por: new FormControl(''),
    fecha_creacion: new FormControl(''),
    total: new FormControl(''),
  };

  formFilter: FormGroup = new FormGroup(this.formFilterControl);

  // MODALS
  displayModalDetalleCubicacion = false;
  displayModalClonarCubicacion = false;
  displayModalEliminarCubicacion = false;

  mensajeConfirmacion = '';

  constructor(
    private cubicacionFacade: CubicacionFacade,
    private serviciosFacade: ServiciosFacade,
    private loadingFacade: LoadingsFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.navbarHeader = [
      { label: 'Home', icon: 'pi pi-home', routerLink: ['/home'] },
      {
        label: 'Cubicación',
        icon: 'pi pi-shopping-bag',
        routerLink: ['/cubicacion'],
      },
      { label: 'Listar Cubicaciones', styleClass: 'last-route' },
      {
        label: 'Nueva Cubicación',
        icon: 'pi pi-plus',
        separator: true,
        id: 'new-cub',
        styleClass: 'new-button',
        routerLink: ['/cubicacion/form-cub'],
      },
    ];
    this.subscription.add(this.detalleCubicacion$.subscribe());

    this.observerFilters();
  }

  observerFilters(): void {
    // 73 TODO: SE PUEDE UTILIZAR UNA SELECCION MULTIPLE EN LOS SELECTORES
    // 73 TODO: PODER FILTRAR POR MÁS DE UN ELEMENTO
    // 74 TODO: AGREGAR FILTROS DE FECHA Y PRECIO
    // 75 TODO: MOVER TODO LO DE FILTROS A OTRO COMPONENTE. AVERIGUAR COMO HACER LA INTERACCION
    this.subscription.add(
      this.formFilter
        .get('cubicacion_id')
        .valueChanges.subscribe(cubicacion_id => {
          this.cubicaciones$ = this.cubicacionFacade.listarCubicaciones$().pipe(
            map(values => {
              let tmp = [...values];
              return tmp.sort((a, b) =>
                a.cubicacion_id > b.cubicacion_id ? 1 : -1
              );
            }),
            take(1)
          );
          if (
            cubicacion_id !== undefined &&
            cubicacion_id !== null &&
            cubicacion_id !== ''
          ) {
            this.formFilter.get('nombre').reset();
            this.formFilter.get('tipo_cubicacion').reset();
            this.formFilter.get('contrato_marco').reset();
            this.formFilter.get('agencia').reset();
            this.cubicaciones$ = this.cubicacionFacade
              .listarCubicaciones$()
              .pipe(
                map(values =>
                  values.filter(value => {
                    return +value.cubicacion_id === +cubicacion_id;
                  })
                ),
                take(1)
              );
          }
        })
    );

    this.subscription.add(
      this.formFilter.get('nombre').valueChanges.subscribe(nombre => {
        this.cubicaciones$ = this.cubicacionFacade.listarCubicaciones$().pipe(
          map(values => {
            let tmp = [...values];
            return tmp.sort((a, b) =>
              a.cubicacion_id > b.cubicacion_id ? 1 : -1
            );
          }),
          take(1)
        );
        if (nombre !== undefined && nombre && nombre !== '') {
          this.formFilter.get('cubicacion_id').reset();
          this.formFilter.get('tipo_cubicacion').reset();
          this.formFilter.get('contrato_marco').reset();
          this.formFilter.get('agencia').reset();
          this.cubicaciones$ = this.cubicacionFacade.listarCubicaciones$().pipe(
            map(values =>
              values.filter(value => {
                const pattern = new RegExp(
                  `^${(nombre as string).toLowerCase()}`,
                  'g'
                );
                return pattern.test(value.cubicacion_nombre.toLowerCase())
                  ? true
                  : false;
              })
            ),
            take(1)
          );
        }
      })
    );

    this.subscription.add(
      this.formFilter
        .get('tipo_cubicacion')
        .valueChanges.subscribe(tipo_cubicacion => {
          this.cubicaciones$ = this.cubicacionFacade.listarCubicaciones$().pipe(
            map(values => {
              let tmp = [...values];
              return tmp.sort((a, b) =>
                a.cubicacion_id > b.cubicacion_id ? 1 : -1
              );
            }),
            take(1)
          );
          if (
            tipo_cubicacion !== undefined &&
            tipo_cubicacion &&
            tipo_cubicacion !== ''
          ) {
            this.formFilter.get('nombre').reset();
            this.formFilter.get('cubicacion_id').reset();
            this.formFilter.get('contrato_marco').reset();
            this.formFilter.get('agencia').reset();
            this.cubicaciones$ = this.cubicacionFacade
              .listarCubicaciones$()
              .pipe(
                map(values =>
                  values.filter(value => {
                    const pattern = new RegExp(`^${tipo_cubicacion}`, 'g');
                    return pattern.test(value.tipo_cubicacion_descripcion)
                      ? true
                      : false;
                  })
                ),
                take(1)
              );
          }
        })
    );

    this.subscription.add(
      this.formFilter
        .get('contrato_marco')
        .valueChanges.subscribe(contrato_marco => {
          this.cubicaciones$ = this.cubicacionFacade.listarCubicaciones$().pipe(
            map(values => {
              let tmp = [...values];
              return tmp.sort((a, b) =>
                a.cubicacion_id > b.cubicacion_id ? 1 : -1
              );
            }),
            take(1)
          );
          if (
            contrato_marco !== undefined &&
            contrato_marco &&
            contrato_marco !== ''
          ) {
            this.formFilter.get('nombre').reset();
            this.formFilter.get('cubicacion_id').reset();
            this.formFilter.get('tipo_cubicacion').reset();
            this.formFilter.get('agencia').reset();
            this.cubicaciones$ = this.cubicacionFacade
              .listarCubicaciones$()
              .pipe(
                map(values =>
                  values.filter(value => {
                    const pattern = new RegExp(`^${contrato_marco}`, 'g');
                    return pattern.test(value.contrato_marco_nombre)
                      ? true
                      : false;
                  })
                ),
                take(1)
              );
          }
        })
    );

    this.subscription.add(
      this.formFilter.get('agencia').valueChanges.subscribe(agencia => {
        this.cubicaciones$ = this.cubicacionFacade.listarCubicaciones$().pipe(
          map(values => {
            let tmp = [...values];
            return tmp.sort((a, b) =>
              a.cubicacion_id > b.cubicacion_id ? 1 : -1
            );
          }),
          take(1)
        );
        if (agencia !== undefined && agencia && agencia !== '') {
          this.formFilter.get('nombre').reset();
          this.formFilter.get('cubicacion_id').reset();
          this.formFilter.get('tipo_cubicacion').reset();
          this.formFilter.get('contrato_marco').reset();
          this.cubicaciones$ = this.cubicacionFacade.listarCubicaciones$().pipe(
            map(values =>
              values.filter(value => {
                const pattern = new RegExp(`^${agencia}`, 'g');
                return pattern.test(value.agencia_nombre) ? true : false;
              })
            ),
            take(1)
          );
        }
      })
    );
  }

  // DETALLE CUBICACION
  showDetalleCubicacion(cubicacion_id: number): void {
    this.displayModalDetalleCubicacion = true;
    this.serviciosFacade.resetCarritoServices();
    this.cubicacionFacade.detalleCubicacion(cubicacion_id);
  }

  closeModalDetalleCubicacion(): void {
    this.serviciosFacade.resetCarritoServices();
    this.cubicacionFacade.resetDetalleCubicacion();
  }

  // CLONAR CUBICACION
  showClonarCubicacion(cubicacion_id: number): void {
    this.displayModalClonarCubicacion = true;
    this.cubicacionFacade.detalleCubicacion(cubicacion_id);
  }

  closeModalClonarCubicacion(): void {
    this.displayModalClonarCubicacion = false;
    this.cubicacionFacade.resetDetalleCubicacion();
  }

  // ELIMINAR CUBICACION
  showEliminarCubicacion(cubicacion_id: number): void {
    this.cubicacion_id = cubicacion_id;
    this.mensajeConfirmacion = `¿Está seguro que desea eliminar esta cubicación ID:${cubicacion_id}?`;
    this.displayModalEliminarCubicacion = true;
  }

  confirmarEliminarCubicacion(): void {
    this.cubicacionFacade.eliminarCubicacion(this.cubicacion_id);
    this.displayModalEliminarCubicacion = false;
  }

  closeModalEliminarCubicacion(): void {
    this.displayModalEliminarCubicacion = false;
  }

  // EDITAR CUBICACION
  editarCubicacion(cubicacion_id: number): void {
    this.subscription.unsubscribe();
    this.router.navigate(['/cubicacion/form-cub', cubicacion_id]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
