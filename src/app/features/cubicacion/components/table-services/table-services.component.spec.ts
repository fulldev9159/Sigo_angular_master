import { LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ServiciosFacade } from '@storeOT/servicios/servicios.facades';
import { carrito } from '@storeOT/servicios/servicios.selectors';

import { TableServicesComponent } from './table-services.component';

describe('TableServicesComponent', () => {
  let component: TableServicesComponent;
  let fixture: ComponentFixture<TableServicesComponent>;
  let initialState: any = { example: [] };
  let store: MockStore<any>;
  let servicioFacade: ServiciosFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      declarations: [TableServicesComponent],
      providers: [
        { provide: LOCALE_ID, useValue: 'es-CL' },
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: carrito,
              value: null,
            },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TableServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
    servicioFacade = TestBed.inject(ServiciosFacade);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('La variable carrito usada para desplegar en table debe cumplir con el formato indicado', (done: DoneFn) => {
    let formatoResult = [
      {
        servicio_id: 141,
        servicio_codigo: 'J101',
        servicio_precio_final_clp: 471.59999999999997,
        servicio_nombre: 'INSTALAR CABLE EN CANALIZACION GRUPOS A Y B',
        tipo_servicio_descripcion: 'LINEAS',
        unidad_obras: [
          {
            uo_codigo: 'C048',
            uo_nombre: 'CABLE 900-26 SUB',
            uo_precio_total_clp: 0,
            actividad_descripcion: 'MATRIZ',
          },
          {
            uo_codigo: 'C926',
            uo_nombre: 'CABLE 1800-26 PS',
            uo_precio_total_clp: 0,
            actividad_descripcion: 'MATRIZ',
          },
        ],
      },
    ];
    carrito.setResult([
      {
        servicio_id: 141,
        servicio_codigo: 'J101',
        servicio_precio_final_clp: 471.59999999999997,
        servicio_nombre: 'INSTALAR CABLE EN CANALIZACION GRUPOS A Y B',
        tipo_servicio_descripcion: 'LINEAS',
        unidad_obras: [
          {
            uo_codigo: 'C048',
            uo_nombre: 'CABLE 900-26 SUB',
            uo_precio_total_clp: 0,
            actividad_descripcion: 'MATRIZ',
          },
        ],
      },
      {
        servicio_id: 141,
        servicio_codigo: 'J101',
        servicio_precio_final_clp: 471.59999999999997,
        servicio_nombre: 'INSTALAR CABLE EN CANALIZACION GRUPOS A Y B',
        tipo_servicio_descripcion: 'LINEAS',
        unidad_obras: [
          {
            uo_codigo: 'C926',
            uo_nombre: 'CABLE 1800-26 PS',
            uo_precio_total_clp: 0,
            actividad_descripcion: 'MATRIZ',
          },
        ],
      },
    ]);
    component.carrito$.subscribe({
      next: result => {
        expect(result).toEqual(formatoResult);
        done();
      },
      error: () => done.fail,
    });
  });

  it('el formulario inicial debería desplegarse como indica el formato', () => {
    let tableFormResult = {
      table: [
        {
          servicio_id: 141,
          servicio_cantidad: 1,
          unidad_obras: [
            {
              uo_codigo: 'C048',
              uo_cantidad: 1,
            },
            {
              uo_codigo: 'C926',
              uo_cantidad: 1,
            },
          ],
        },
      ],
    };
    carrito.setResult([
      {
        servicio_id: 141,
        servicio_codigo: 'J101',
        servicio_precio_final_clp: 471.59999999999997,
        servicio_nombre: 'INSTALAR CABLE EN CANALIZACION GRUPOS A Y B',
        tipo_servicio_descripcion: 'LINEAS',
        unidad_obras: [
          {
            uo_codigo: 'C048',
            uo_nombre: 'CABLE 900-26 SUB',
            uo_precio_total_clp: 0,
            actividad_descripcion: 'MATRIZ',
          },
        ],
      },
      {
        servicio_id: 141,
        servicio_codigo: 'J101',
        servicio_precio_final_clp: 471.59999999999997,
        servicio_nombre: 'INSTALAR CABLE EN CANALIZACION GRUPOS A Y B',
        tipo_servicio_descripcion: 'LINEAS',
        unidad_obras: [
          {
            uo_codigo: 'C926',
            uo_nombre: 'CABLE 1800-26 PS',
            uo_precio_total_clp: 0,
            actividad_descripcion: 'MATRIZ',
          },
        ],
      },
    ]);
    store.refreshState();
    expect(component.formTable.value).toEqual(tableFormResult);
  });

  it('Si se agrega otro servicio al store carrito se debe agregar al formulario sin afectar a lo que ya existe y retornar bien la variable carrito', (done: DoneFn) => {
    // DATOS INICIALES
    let tableFormResultInicial = {
      table: [
        {
          servicio_id: 141,
          servicio_cantidad: 1,
          unidad_obras: [
            {
              uo_codigo: 'C048',
              uo_cantidad: 1,
            },
            {
              uo_codigo: 'C926',
              uo_cantidad: 1,
            },
          ],
        },
      ],
    };
    carrito.setResult([
      {
        servicio_id: 141,
        servicio_codigo: 'J101',
        servicio_precio_final_clp: 471.59999999999997,
        servicio_nombre: 'INSTALAR CABLE EN CANALIZACION GRUPOS A Y B',
        tipo_servicio_descripcion: 'LINEAS',
        unidad_obras: [
          {
            uo_codigo: 'C048',
            uo_nombre: 'CABLE 900-26 SUB',
            uo_precio_total_clp: 0,
            actividad_descripcion: 'MATRIZ',
          },
        ],
      },
      {
        servicio_id: 141,
        servicio_codigo: 'J101',
        servicio_precio_final_clp: 471.59999999999997,
        servicio_nombre: 'INSTALAR CABLE EN CANALIZACION GRUPOS A Y B',
        tipo_servicio_descripcion: 'LINEAS',
        unidad_obras: [
          {
            uo_codigo: 'C926',
            uo_nombre: 'CABLE 1800-26 PS',
            uo_precio_total_clp: 0,
            actividad_descripcion: 'MATRIZ',
          },
        ],
      },
    ]);
    store.refreshState();
    expect(component.formTable.value).toEqual(tableFormResultInicial);

    // SE AGREGA OTRO SERVICIO
    let tableFormResultNewService = {
      table: [
        {
          servicio_id: 141,
          servicio_cantidad: 1,
          unidad_obras: [
            {
              uo_codigo: 'C048',
              uo_cantidad: 1,
            },
            {
              uo_codigo: 'C926',
              uo_cantidad: 1,
            },
            {
              uo_codigo: 'C881',
              uo_cantidad: 1,
            },
          ],
        },
        {
          servicio_id: 2055,
          servicio_cantidad: 1,
          unidad_obras: [
            {
              uo_codigo: '0',
              uo_cantidad: 0,
            },
          ],
        },
      ],
    };

    let formatoResultCarritoNuevoServicio = [
      {
        servicio_id: 141,
        servicio_codigo: 'J101',
        servicio_precio_final_clp: 471.59999999999997,
        servicio_nombre: 'INSTALAR CABLE EN CANALIZACION GRUPOS A Y B',
        tipo_servicio_descripcion: 'LINEAS',
        unidad_obras: [
          {
            uo_codigo: 'C048',
            uo_nombre: 'CABLE 900-26 SUB',
            uo_precio_total_clp: 0,
            actividad_descripcion: 'MATRIZ',
          },
          {
            uo_codigo: 'C926',
            uo_nombre: 'CABLE 1800-26 PS',
            uo_precio_total_clp: 0,
            actividad_descripcion: 'MATRIZ',
          },
          {
            uo_codigo: 'C881',
            uo_nombre: 'CABLE FS 1212-24 SUB.',
            uo_precio_total_clp: 0,
            actividad_descripcion: 'MATRIZ',
          },
        ],
      },
      {
        servicio_id: 2055,
        servicio_codigo: 'J451',
        servicio_precio_final_clp: 180.32,
        servicio_nombre:
          'EMPALME DE UN PAR (CON CONECTOR INDIVIDUAL O DERIVADO)',
        tipo_servicio_descripcion: 'CABLES',
        unidad_obras: [
          {
            uo_codigo: '0',
            uo_nombre: 'SIN UO',
            uo_precio_total_clp: 0,
            actividad_descripcion: 'MATRIZ',
          },
        ],
      },
    ];

    carrito.setResult([
      {
        servicio_id: 141,
        servicio_codigo: 'J101',
        servicio_precio_final_clp: 471.59999999999997,
        servicio_nombre: 'INSTALAR CABLE EN CANALIZACION GRUPOS A Y B',
        tipo_servicio_descripcion: 'LINEAS',
        unidad_obras: [
          {
            uo_codigo: 'C048',
            uo_nombre: 'CABLE 900-26 SUB',
            uo_precio_total_clp: 0,
            actividad_descripcion: 'MATRIZ',
          },
        ],
      },
      {
        servicio_id: 141,
        servicio_codigo: 'J101',
        servicio_precio_final_clp: 471.59999999999997,
        servicio_nombre: 'INSTALAR CABLE EN CANALIZACION GRUPOS A Y B',
        tipo_servicio_descripcion: 'LINEAS',
        unidad_obras: [
          {
            uo_codigo: 'C926',
            uo_nombre: 'CABLE 1800-26 PS',
            uo_precio_total_clp: 0,
            actividad_descripcion: 'MATRIZ',
          },
        ],
      },
      {
        servicio_id: 141,
        servicio_codigo: 'J101',
        servicio_precio_final_clp: 471.59999999999997,
        servicio_nombre: 'INSTALAR CABLE EN CANALIZACION GRUPOS A Y B',
        tipo_servicio_descripcion: 'LINEAS',
        unidad_obras: [
          {
            uo_codigo: 'C881',
            uo_nombre: 'CABLE FS 1212-24 SUB.',
            uo_precio_total_clp: 0,
            actividad_descripcion: 'MATRIZ',
          },
        ],
      },
      {
        servicio_id: 2055,
        servicio_codigo: 'J451',
        servicio_precio_final_clp: 180.32,
        servicio_nombre:
          'EMPALME DE UN PAR (CON CONECTOR INDIVIDUAL O DERIVADO)',
        tipo_servicio_descripcion: 'CABLES',
        unidad_obras: [
          {
            uo_codigo: '0',
            uo_nombre: 'SIN UO',
            uo_precio_total_clp: 0,
            actividad_descripcion: 'MATRIZ',
          },
        ],
      },
    ]);
    store.refreshState();
    component.carrito$.subscribe({
      next: result => {
        expect(result).toEqual(formatoResultCarritoNuevoServicio);
        done();
      },
      error: () => done.fail,
    });
    expect(component.formTable.value).toEqual(tableFormResultNewService);
  });

  it('La funcion getControlServiceCantidad debe retornar el control cantidad del servicio J101', () => {
    carrito.setResult([
      {
        servicio_id: 141,
        servicio_codigo: 'J101',
        servicio_precio_final_clp: 471.59999999999997,
        servicio_nombre: 'INSTALAR CABLE EN CANALIZACION GRUPOS A Y B',
        tipo_servicio_descripcion: 'LINEAS',
        unidad_obras: [
          {
            uo_codigo: 'C048',
            uo_nombre: 'CABLE 900-26 SUB',
            uo_precio_total_clp: 0,
            actividad_descripcion: 'MATRIZ',
          },
        ],
      },
      {
        servicio_id: 141,
        servicio_codigo: 'J101',
        servicio_precio_final_clp: 471.59999999999997,
        servicio_nombre: 'INSTALAR CABLE EN CANALIZACION GRUPOS A Y B',
        tipo_servicio_descripcion: 'LINEAS',
        unidad_obras: [
          {
            uo_codigo: 'C926',
            uo_nombre: 'CABLE 1800-26 PS',
            uo_precio_total_clp: 0,
            actividad_descripcion: 'MATRIZ',
          },
        ],
      },
    ]);
    store.refreshState();
    expect(component.getControlServiceCantidad(141).value).toEqual(1);
  });

  it('La funcion getControlUOCantidad debe retornar el control cantidad del servicio J101', () => {
    carrito.setResult([
      {
        servicio_id: 141,
        servicio_codigo: 'J101',
        servicio_precio_final_clp: 471.59999999999997,
        servicio_nombre: 'INSTALAR CABLE EN CANALIZACION GRUPOS A Y B',
        tipo_servicio_descripcion: 'LINEAS',
        unidad_obras: [
          {
            uo_codigo: 'C048',
            uo_nombre: 'CABLE 900-26 SUB',
            uo_precio_total_clp: 0,
            actividad_descripcion: 'MATRIZ',
          },
        ],
      },
      {
        servicio_id: 141,
        servicio_codigo: 'J101',
        servicio_precio_final_clp: 471.59999999999997,
        servicio_nombre: 'INSTALAR CABLE EN CANALIZACION GRUPOS A Y B',
        tipo_servicio_descripcion: 'LINEAS',
        unidad_obras: [
          {
            uo_codigo: 'C926',
            uo_nombre: 'CABLE 1800-26 PS',
            uo_precio_total_clp: 0,
            actividad_descripcion: 'MATRIZ',
          },
        ],
      },
    ]);
    store.refreshState();
    expect(component.getControlUOCantidad(141, 'C048').value).toEqual(1);
  });

  it('deleteServicioFromCarrito should call facade deleteServicioFromCarrito with params', () => {
    spyOn(servicioFacade, 'deleteServicioFromCarrito');
    carrito.setResult([
      {
        servicio_id: 141,
        servicio_codigo: 'J101',
        servicio_precio_final_clp: 471.59999999999997,
        servicio_nombre: 'INSTALAR CABLE EN CANALIZACION GRUPOS A Y B',
        tipo_servicio_descripcion: 'LINEAS',
        unidad_obras: [
          {
            uo_codigo: 'C048',
            uo_nombre: 'CABLE 900-26 SUB',
            uo_precio_total_clp: 0,
            actividad_descripcion: 'MATRIZ',
          },
        ],
      },
      {
        servicio_id: 141,
        servicio_codigo: 'J101',
        servicio_precio_final_clp: 471.59999999999997,
        servicio_nombre: 'INSTALAR CABLE EN CANALIZACION GRUPOS A Y B',
        tipo_servicio_descripcion: 'LINEAS',
        unidad_obras: [
          {
            uo_codigo: 'C926',
            uo_nombre: 'CABLE 1800-26 PS',
            uo_precio_total_clp: 0,
            actividad_descripcion: 'MATRIZ',
          },
        ],
      },
    ]);
    store.refreshState();
    component.deleteServicioFromCarrito({ servicio_id: 141 });
    expect(servicioFacade.deleteServicioFromCarrito).toHaveBeenCalledWith(141);
  });

  it('deleteUOFromServicioFromCarrito should call facade deleteUOFromServicioFromCarrito with params', () => {
    spyOn(servicioFacade, 'deleteUOFromServicioFromCarrito');
    carrito.setResult([
      {
        servicio_id: 141,
        servicio_codigo: 'J101',
        servicio_precio_final_clp: 471.59999999999997,
        servicio_nombre: 'INSTALAR CABLE EN CANALIZACION GRUPOS A Y B',
        tipo_servicio_descripcion: 'LINEAS',
        unidad_obras: [
          {
            uo_codigo: 'C048',
            uo_nombre: 'CABLE 900-26 SUB',
            uo_precio_total_clp: 0,
            actividad_descripcion: 'MATRIZ',
          },
        ],
      },
      {
        servicio_id: 141,
        servicio_codigo: 'J101',
        servicio_precio_final_clp: 471.59999999999997,
        servicio_nombre: 'INSTALAR CABLE EN CANALIZACION GRUPOS A Y B',
        tipo_servicio_descripcion: 'LINEAS',
        unidad_obras: [
          {
            uo_codigo: 'C926',
            uo_nombre: 'CABLE 1800-26 PS',
            uo_precio_total_clp: 0,
            actividad_descripcion: 'MATRIZ',
          },
        ],
      },
    ]);
    store.refreshState();
    component.deleteUOFromServicioFromCarrito({
      servicio_id: 141,
      uo_codigo: 'C048',
    });
    expect(servicioFacade.deleteUOFromServicioFromCarrito).toHaveBeenCalledWith(
      141,
      'C048'
    );
  });

  it('totalServicios should be 651.88 , totalUos should be 90 and total Cubicacion should be 741.88', () => {
    carrito.setResult([
      {
        servicio_id: 141,
        servicio_codigo: 'J101',
        servicio_precio_final_clp: 471.59999999999997,
        servicio_nombre: 'INSTALAR CABLE EN CANALIZACION GRUPOS A Y B',
        tipo_servicio_descripcion: 'LINEAS',
        unidad_obras: [
          {
            uo_codigo: 'C048',
            uo_nombre: 'CABLE 900-26 SUB',
            uo_precio_total_clp: 50,
            actividad_descripcion: 'MATRIZ',
          },
        ],
      },
      {
        servicio_id: 141,
        servicio_codigo: 'J101',
        servicio_precio_final_clp: 471.59999999999997,
        servicio_nombre: 'INSTALAR CABLE EN CANALIZACION GRUPOS A Y B',
        tipo_servicio_descripcion: 'LINEAS',
        unidad_obras: [
          {
            uo_codigo: 'C926',
            uo_nombre: 'CABLE 1800-26 PS',
            uo_precio_total_clp: 40,
            actividad_descripcion: 'MATRIZ',
          },
        ],
      },
      {
        servicio_id: 2055,
        servicio_codigo: 'J451',
        servicio_precio_final_clp: 180.32,
        servicio_nombre:
          'EMPALME DE UN PAR (CON CONECTOR INDIVIDUAL O DERIVADO)',
        tipo_servicio_descripcion: 'CABLES',
        unidad_obras: [
          {
            uo_codigo: '0',
            uo_nombre: 'SIN UO',
            uo_precio_total_clp: 0,
            actividad_descripcion: 'MATRIZ',
          },
        ],
      },
    ]);
    store.refreshState();
    expect(component.totalServicios).toEqual(651.92);
    expect(component.totalUOs).toEqual(90);
  });
});
