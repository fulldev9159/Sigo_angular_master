import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { FormControl, FormGroup } from '@angular/forms';
import { CarritoService, Cubicacion } from '@model';
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
      }),
      take(1)
    );

  // AGREGAR DATOS A CARRITO PARA DESPLIEGUE DE SERVICIOS
  detalleCubicacion$ = this.cubicacionFacade.detalleCubicacion$().pipe(
    tap(cubicacion => {
      if (cubicacion) {
        cubicacion.many_cubicacion_has_servicio.forEach(service => {
          service.many_cubicacion_has_uob.forEach(uo => {
            let new_service: CarritoService = {
              servicio_id: service.id,
              servicio_codigo: service.model_servicio_id.codigo,
              servicio_precio_final_clp: service.valor_unitario_clp,
              servicio_nombre: service.model_servicio_id.descripcion,
              tipo_servicio_descripcion:
                service.model_tipo_servicio_id.descripcion,
              tipo_servicio_id: service.tipo_servicio_id,
              unidad_obras: [
                {
                  uo_codigo: uo.unidad_obra_cod,
                  uo_nombre: uo.model_unidad_obra_cod.descripcion,
                  uo_precio_total_clp: uo.valor_unitario_clp,
                  actividad_descripcion: 'TODO',
                  actividad_id: -1,
                },
              ],
            };
            this.serviciosFacade.addDirectServiceCarrito(new_service);
          });
        });
      }
    })
  );

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

  constructor(
    private cubicacionFacade: CubicacionFacade,
    private serviciosFacade: ServiciosFacade,
    private loadingFacade: LoadingsFacade
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

    this.observerFilters();

    this.subscription.add(this.detalleCubicacion$.subscribe());
  }

  observerFilters(): void {
    // TODO: SE PUEDE UTILIZAR UNA SELECCION MULTIPLE EN LOS SELECTORES
    // TODO: PODER FILTRAR POR MÁS DE UN ELEMENTO
    // TODO: AGREGAR FILTROS DE FECHA Y PRECIO
    // TODO: MOVER TODO LO DE FILTROS A OTRO COMPONENTE. AVERIGUAR COMO HACER LA INTERACCION
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

  showDetalleCubicacion(): void {
    this.displayModalDetalleCubicacion = true;
    this.serviciosFacade.resetCarritoServices();
    // NEW
    this.cubicacionFacade.detalleCubicacion(4);
  }

  closeModalDetalleCubicacion(): void {
    this.serviciosFacade.resetCarritoServices();
    this.cubicacionFacade.resetDetalleCubicacion();
  }

  confirmarElminacion(): void {
    console.log('confirmar');
  }

  closeDialogConfirmacion(): void {
    console.log('cancelar');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
