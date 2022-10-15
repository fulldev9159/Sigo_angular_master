import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { carrito } from '@storeOT/servicios/servicios.selectors';

import { ViewTableServicesComponent } from './view-table-services.component';
let initialState: any = { example: [] };

describe('ViewTableServicesComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewTableServicesComponent, TestComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [StoreModule.forRoot({})],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: carrito,
              value: [
                {
                  servicio_id: 7,
                  servicio_codigo: 'J451',
                  servicio_precio_final_clp: 180.32,
                  servicio_nombre:
                    'EMPALME DE UN PAR (CON CONECTOR INDIVIDUAL O DERIVADO)',
                  tipo_servicio_descripcion: 'CABLES',
                  tipo_servicio_id: 5,
                  unidad_obras: [
                    {
                      uo_codigo: 'D013',
                      uo_nombre: 'CONECTOR ROJO        CAL.24-19',
                      uo_precio_total_clp: 56.8,
                      actividad_descripcion: 'TODO',
                      actividad_id: -1,
                    },
                  ],
                },
                {
                  servicio_id: 7,
                  servicio_codigo: 'J451',
                  servicio_precio_final_clp: 180.32,
                  servicio_nombre:
                    'EMPALME DE UN PAR (CON CONECTOR INDIVIDUAL O DERIVADO)',
                  tipo_servicio_descripcion: 'CABLES',
                  tipo_servicio_id: 5,
                  unidad_obras: [
                    {
                      uo_codigo: 'D012',
                      uo_nombre: 'CONECTOR AMARILLO    CAL.24-19',
                      uo_precio_total_clp: 0,
                      actividad_descripcion: 'TODO',
                      actividad_id: -1,
                    },
                  ],
                },
                {
                  servicio_id: 8,
                  servicio_codigo: 'J456',
                  servicio_precio_final_clp: 4913.72,
                  servicio_nombre:
                    'PREPARAR EXTREMOS DE CABLES GRUPO A (HASTA 300 PRS)',
                  tipo_servicio_descripcion: 'CABLES',
                  tipo_servicio_id: 5,
                  unidad_obras: [
                    {
                      uo_codigo: 'D241',
                      uo_nombre: 'BLOCK PROT.100/P QDF MONDRAGON',
                      uo_precio_total_clp: 57200.64,
                      actividad_descripcion: 'TODO',
                      actividad_id: -1,
                    },
                  ],
                },
                {
                  servicio_id: 8,
                  servicio_codigo: 'J456',
                  servicio_precio_final_clp: 4913.72,
                  servicio_nombre:
                    'PREPARAR EXTREMOS DE CABLES GRUPO A (HASTA 300 PRS)',
                  tipo_servicio_descripcion: 'CABLES',
                  tipo_servicio_id: 5,
                  unidad_obras: [
                    {
                      uo_codigo: 'D240',
                      uo_nombre: 'MODULO PROT.GAS. QDF MONDRAGON',
                      uo_precio_total_clp: 3200,
                      actividad_descripcion: 'TODO',
                      actividad_id: -1,
                    },
                  ],
                },
                {
                  servicio_id: 8,
                  servicio_codigo: 'J456',
                  servicio_precio_final_clp: 4913.72,
                  servicio_nombre:
                    'PREPARAR EXTREMOS DE CABLES GRUPO A (HASTA 300 PRS)',
                  tipo_servicio_descripcion: 'CABLES',
                  tipo_servicio_id: 5,
                  unidad_obras: [
                    {
                      uo_codigo: 'D239',
                      uo_nombre: 'REGLETA CORTE.10/2 QDF-E1 MOND',
                      uo_precio_total_clp: 0,
                      actividad_descripcion: 'TODO',
                      actividad_id: -1,
                    },
                  ],
                },
                {
                  servicio_id: 8,
                  servicio_codigo: 'J456',
                  servicio_precio_final_clp: 4913.72,
                  servicio_nombre:
                    'PREPARAR EXTREMOS DE CABLES GRUPO A (HASTA 300 PRS)',
                  tipo_servicio_descripcion: 'CABLES',
                  tipo_servicio_id: 5,
                  unidad_obras: [
                    {
                      uo_codigo: 'D238',
                      uo_nombre: 'REGLETA CONEX.10/2 QDF-1 MONDR',
                      uo_precio_total_clp: 0,
                      actividad_descripcion: 'TODO',
                      actividad_id: -1,
                    },
                  ],
                },
                {
                  servicio_id: 8,
                  servicio_codigo: 'J456',
                  servicio_precio_final_clp: 4913.72,
                  servicio_nombre:
                    'PREPARAR EXTREMOS DE CABLES GRUPO A (HASTA 300 PRS)',
                  tipo_servicio_descripcion: 'CABLES',
                  tipo_servicio_id: 5,
                  unidad_obras: [
                    {
                      uo_codigo: 'D006',
                      uo_nombre: 'CABLE MTA-E    600-24 (FORMAS)',
                      uo_precio_total_clp: 0,
                      actividad_descripcion: 'TODO',
                      actividad_id: -1,
                    },
                  ],
                },
                {
                  servicio_id: 9,
                  servicio_codigo: 'J101',
                  servicio_precio_final_clp: 471.59999999999997,
                  servicio_nombre:
                    'INSTALAR CABLE EN CANALIZACION GRUPOS A Y B',
                  tipo_servicio_descripcion: 'LINEAS',
                  tipo_servicio_id: 4,
                  unidad_obras: [
                    {
                      uo_codigo: 'C926',
                      uo_nombre: 'CABLE 1800-26 PS',
                      uo_precio_total_clp: 0,
                      actividad_descripcion: 'TODO',
                      actividad_id: -1,
                    },
                  ],
                },
                {
                  servicio_id: 9,
                  servicio_codigo: 'J101',
                  servicio_precio_final_clp: 471.59999999999997,
                  servicio_nombre:
                    'INSTALAR CABLE EN CANALIZACION GRUPOS A Y B',
                  tipo_servicio_descripcion: 'LINEAS',
                  tipo_servicio_id: 4,
                  unidad_obras: [
                    {
                      uo_codigo: 'C881',
                      uo_nombre: 'CABLE FS          1212-24 SUB.',
                      uo_precio_total_clp: 0,
                      actividad_descripcion: 'TODO',
                      actividad_id: -1,
                    },
                  ],
                },
                {
                  servicio_id: 9,
                  servicio_codigo: 'J101',
                  servicio_precio_final_clp: 471.59999999999997,
                  servicio_nombre:
                    'INSTALAR CABLE EN CANALIZACION GRUPOS A Y B',
                  tipo_servicio_descripcion: 'LINEAS',
                  tipo_servicio_id: 4,
                  unidad_obras: [
                    {
                      uo_codigo: 'C105',
                      uo_nombre: 'CABLE PS           600-26 SUB.',
                      uo_precio_total_clp: 0,
                      actividad_descripcion: 'TODO',
                      actividad_id: -1,
                    },
                  ],
                },
                {
                  servicio_id: 10,
                  servicio_codigo: 'D080',
                  servicio_precio_final_clp: 1485,
                  servicio_nombre:
                    'DISEÑO DE RED PARA PROYECTOS DEL TIPO BROWNFIELD (CADA UIP)',
                  tipo_servicio_descripcion: 'PROYECTOS',
                  tipo_servicio_id: 6,
                  unidad_obras: [
                    {
                      uo_codigo: '0',
                      uo_nombre: 'SIN UO',
                      uo_precio_total_clp: 0,
                      actividad_descripcion: 'TODO',
                      actividad_id: -1,
                    },
                  ],
                },
                {
                  servicio_id: 11,
                  servicio_codigo: 'D081',
                  servicio_precio_final_clp: 1485,
                  servicio_nombre:
                    'DISEÑO DE RED PARA PROYECTOS DEL TIPO GREENFIELD (CADA UIP)',
                  tipo_servicio_descripcion: 'PROYECTOS',
                  tipo_servicio_id: 6,
                  unidad_obras: [
                    {
                      uo_codigo: '0',
                      uo_nombre: 'SIN UO',
                      uo_precio_total_clp: 0,
                      actividad_descripcion: 'TODO',
                      actividad_id: -1,
                    },
                  ],
                },
                {
                  servicio_id: 12,
                  servicio_codigo: 'D083',
                  servicio_precio_final_clp: 297,
                  servicio_nombre:
                    'DISEÑO EN RED DE FO GPON (FTTX) BROWNFIELD (POR UIP). LEVANTAMIENTO DE INFORMACION',
                  tipo_servicio_descripcion: 'PROYECTOS',
                  tipo_servicio_id: 6,
                  unidad_obras: [
                    {
                      uo_codigo: '0',
                      uo_nombre: 'SIN UO',
                      uo_precio_total_clp: 0,
                      actividad_descripcion: 'TODO',
                      actividad_id: -1,
                    },
                  ],
                },
                {
                  servicio_id: 13,
                  servicio_codigo: 'J201',
                  servicio_precio_final_clp: 982.5,
                  servicio_nombre:
                    'INSTALAR CABLES EN EDIFICIOS Y CENTRALES TELEFONICAS',
                  tipo_servicio_descripcion: 'LINEAS',
                  tipo_servicio_id: 4,
                  unidad_obras: [
                    {
                      uo_codigo: 'H006',
                      uo_nombre: 'ANGULO PLANO    LEGRAND 40*16',
                      uo_precio_total_clp: 458,
                      actividad_descripcion: 'TODO',
                      actividad_id: -1,
                    },
                  ],
                },
                {
                  servicio_id: 13,
                  servicio_codigo: 'J201',
                  servicio_precio_final_clp: 982.5,
                  servicio_nombre:
                    'INSTALAR CABLES EN EDIFICIOS Y CENTRALES TELEFONICAS',
                  tipo_servicio_descripcion: 'LINEAS',
                  tipo_servicio_id: 4,
                  unidad_obras: [
                    {
                      uo_codigo: 'H005',
                      uo_nombre: 'ANGULO INT./EXT.LEGRAND 40*16',
                      uo_precio_total_clp: 369,
                      actividad_descripcion: 'TODO',
                      actividad_id: -1,
                    },
                  ],
                },
                {
                  servicio_id: 13,
                  servicio_codigo: 'J201',
                  servicio_precio_final_clp: 982.5,
                  servicio_nombre:
                    'INSTALAR CABLES EN EDIFICIOS Y CENTRALES TELEFONICAS',
                  tipo_servicio_descripcion: 'LINEAS',
                  tipo_servicio_id: 4,
                  unidad_obras: [
                    {
                      uo_codigo: 'H004',
                      uo_nombre: 'CANALETA LEGRAND 40*16*2 BLCA.',
                      uo_precio_total_clp: 1250,
                      actividad_descripcion: 'TODO',
                      actividad_id: -1,
                    },
                  ],
                },
                {
                  servicio_id: 13,
                  servicio_codigo: 'J201',
                  servicio_precio_final_clp: 982.5,
                  servicio_nombre:
                    'INSTALAR CABLES EN EDIFICIOS Y CENTRALES TELEFONICAS',
                  tipo_servicio_descripcion: 'LINEAS',
                  tipo_servicio_id: 4,
                  unidad_obras: [
                    {
                      uo_codigo: 'H003',
                      uo_nombre: 'ANGULO PLANO    LEGRAND 32*10',
                      uo_precio_total_clp: 418,
                      actividad_descripcion: 'TODO',
                      actividad_id: -1,
                    },
                  ],
                },
                {
                  servicio_id: 13,
                  servicio_codigo: 'J201',
                  servicio_precio_final_clp: 982.5,
                  servicio_nombre:
                    'INSTALAR CABLES EN EDIFICIOS Y CENTRALES TELEFONICAS',
                  tipo_servicio_descripcion: 'LINEAS',
                  tipo_servicio_id: 4,
                  unidad_obras: [
                    {
                      uo_codigo: 'H002',
                      uo_nombre: 'ANGULO INT./EXT.LEGRAND 32*10',
                      uo_precio_total_clp: 295,
                      actividad_descripcion: 'TODO',
                      actividad_id: -1,
                    },
                  ],
                },
                {
                  servicio_id: 13,
                  servicio_codigo: 'J201',
                  servicio_precio_final_clp: 982.5,
                  servicio_nombre:
                    'INSTALAR CABLES EN EDIFICIOS Y CENTRALES TELEFONICAS',
                  tipo_servicio_descripcion: 'LINEAS',
                  tipo_servicio_id: 4,
                  unidad_obras: [
                    {
                      uo_codigo: 'H001',
                      uo_nombre: 'CANALETA LEGRAND 32*10*2 BLCA.',
                      uo_precio_total_clp: 3706,
                      actividad_descripcion: 'TODO',
                      actividad_id: -1,
                    },
                  ],
                },
                {
                  servicio_id: 14,
                  servicio_codigo: 'J726',
                  servicio_precio_final_clp: 22008,
                  servicio_nombre:
                    'INST. REPARTIDOR MURAL, 1 VERTICAL, TIPO 2/3 VERTICALES',
                  tipo_servicio_descripcion: 'LINEAS',
                  tipo_servicio_id: 4,
                  unidad_obras: [
                    {
                      uo_codigo: '0',
                      uo_nombre: 'SIN UO',
                      uo_precio_total_clp: 0,
                      actividad_descripcion: 'TODO',
                      actividad_id: -1,
                    },
                  ],
                },
                {
                  servicio_id: 15,
                  servicio_codigo: 'J730',
                  servicio_precio_final_clp: 12851.1,
                  servicio_nombre: 'INST. ESCALERILLA SOPORTE',
                  tipo_servicio_descripcion: 'LINEAS',
                  tipo_servicio_id: 4,
                  unidad_obras: [
                    {
                      uo_codigo: 'H134',
                      uo_nombre: 'ESCALERILLA PC TIPO NEC 200*32',
                      uo_precio_total_clp: 0,
                      actividad_descripcion: 'TODO',
                      actividad_id: -1,
                    },
                  ],
                },
                {
                  servicio_id: 16,
                  servicio_codigo: 'J728',
                  servicio_precio_final_clp: 1257.6000000000001,
                  servicio_nombre:
                    'INST. PERFIL DE HIERRO PINTADO O GALVANIZADO',
                  tipo_servicio_descripcion: 'LINEAS',
                  tipo_servicio_id: 4,
                  unidad_obras: [
                    {
                      uo_codigo: '0',
                      uo_nombre: 'SIN UO',
                      uo_precio_total_clp: 0,
                      actividad_descripcion: 'TODO',
                      actividad_id: -1,
                    },
                  ],
                },
              ],
            },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  @Component({
    selector: `zwc-host-component2`,
    template: `<zwc-view-table-services></zwc-view-table-services>`,
  })
  class TestComponent {
    constructor() {}
  }
});
