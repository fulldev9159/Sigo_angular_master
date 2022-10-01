import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { detalleCubicacionMOCK200Ok } from '@mocksOT';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CubicacionFacade } from '@storeOT/cubicacion/cubicacion.facades';
import { detalleCubicacion } from '@storeOT/cubicacion/cubicacion.selectors';
import {
  sendingClonarCubicacion,
  sendingDetalleCubicacion,
  sendingSaveCubicacion,
} from '@storeOT/loadings/loadings.selectors';

import { ClonadorCubicacionComponent } from './clonador-cubicacion.component';

let initialState: any = { example: [] };
let cubicacionFacade: CubicacionFacade;

let store: MockStore<any>;

describe('ClonadorCubicacionComponent', () => {
  let component: ClonadorCubicacionComponent;
  let fixture: ComponentFixture<ClonadorCubicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClonadorCubicacionComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [StoreModule.forRoot({}), FormsModule, ReactiveFormsModule],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: sendingClonarCubicacion,
              value: false,
            },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ClonadorCubicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    localStorage.setItem(
      'auth',
      JSON.stringify({
        sessionData: {
          nombre_perfil_select: 'Gestor/JP',
          perfil_proxy_id: 2,
          permisos: [
            {
              id: 1,
              slug: 'OT_LISTAR',
              nombre_corto: 'Listar',
              descripcion: 'Poder visualizar OT',
            },
          ],
          rol: 'Gestor/JP (Telefónica)',
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjAxODU3NjYsImlzcyI6InNpZ28iLCJuYmYiOjE2NjAxODIxNjY',
          usuario_id: 6,
          usuario_nombre: 'JESSICA MOVISTAR CASTILLO 1',
        },
      })
    );
    cubicacionFacade = TestBed.inject(CubicacionFacade);

    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('clonarCubicacion debe llamar al facade createCubicación con los datos del formulario y cerrar el modal', () => {
    spyOn(cubicacionFacade, 'clonarCubicacion');
    spyOn(component.closeModalDetalleCubicacionEmit, 'emit');

    component.detalleCubicacion = {
      id: 4,
      nombre: 'Cubicacion Bucle',
      descripcion: '',
      direccion_desde: 'a',
      altura_desde: 'a',
      direccion_hasta: 'a',
      altura_hasta: 'a',
      tipo_cubicacion_id: 3,
      contrato_id: 9,
      proveedor_id: 15,
      codigo_acuerdo: '330000659',
      cmarco_has_proveedor_id: 7,
      agencia_id: 20,
      usuario_creador_id: 2,
      costo: 5146474.407199999,
      created_at: null,
      updated_at: null,
      valor_total_clp: 5146474.407199999,
      many_cubicacion_has_servicio: [
        {
          id: 7,
          cubicacion_id: 4,
          servicio_id: 191,
          actividad_id: 9,
          tipo_servicio_id: 5,
          cantidad: 4.53,
          unidad_id: 4,
          puntos_baremos: 0.04,
          prov_has_serv_precio: 4508,
          precio_tipo_moneda_id: 2,
          factor_conversion_precio: 1,
          requiere_evidencia: false,
          valor_unitario_clp: 180.32,
          numero_producto: 'J451',
          model_servicio_id: {
            id: 191,
            tipo_servicio_id: 5,
            unidad_id: 4,
            descripcion:
              'EMPALME DE UN PAR (CON CONECTOR INDIVIDUAL O DERIVADO)',
            codigo: 'J451',
            estado: true,
            es_pack_basico: false,
            cantidad_default: 1,
            codigo_alcance: 'C-000',
            puntos_baremos: 0.04,
            fecha_inicio: '2021-01-01T00:00:00Z',
            fecha_fin: '2027-04-01T17:19:25.995Z',
            requiere_evidencia: false,
          },
          model_unidad_id: {
            id: 4,
            codigo: 'CU',
            descripcion: 'Cada Uno',
            estado: true,
          },
          model_precio_tipo_moneda_id: {
            id: 2,
            codigo: 'CLP',
            nombre: 'Pesos Chilenos',
          },
          model_actividad_id: { id: 9, codigo: 'M', descripcion: 'MATRIZ' },
          model_tipo_servicio_id: {
            id: 5,
            codigo: 'N',
            descripcion: 'CABLES',
            estado: true,
            contrato_marco_id: 9,
          },
          many_cubicacion_has_uob: [
            {
              id: 11,
              cubicacion_has_servicio_id: 7,
              unidad_obra_cod: 'D013',
              cantidad: 10,
              unidad_id: 4,
              clave: 'C 012',
              valor_unitario_clp: 56.8,
              model_unidad_obra_cod: {
                codigo: 'D013',
                descripcion: 'CONECTOR ROJO        CAL.24-19',
                unidad_id: 4,
              },
              model_unidad_id: {
                id: 4,
                codigo: 'CU',
                descripcion: 'Cada Uno',
                estado: true,
              },
              many_cubicacion_has_material: [
                {
                  id: 12,
                  material_cod: '044281',
                  cubicacion_has_uob_id: 11,
                  cantidad: 1,
                  unidad_id: 4,
                  tipo_moneda_id: 1,
                  valor: 0.071,
                  codigo_sap: '10302590004',
                  origen: 'PROVEEDOR',
                  factor_conversion: 800,
                  valor_unitario_clp: 56.8,
                  model_unidad_id: {
                    id: 4,
                    codigo: 'CU',
                    descripcion: 'Cada Uno',
                    estado: true,
                  },
                  model_tipo_moneda_id: {
                    id: 1,
                    codigo: 'USD',
                    nombre: 'Dolar Americano',
                  },
                  model_material_cod: {
                    codigo: '044281',
                    descripcion: 'CONECTOR ROJO CAL.24/19',
                    unidad_id: 4,
                    origen: 'PROVEEDOR',
                    tipo_moneda_id: 1,
                    valor: 0.071,
                    codigo_sap: '10302590004',
                  },
                },
              ],
            },
          ],
        },
      ],
    };

    // component.formulario.formCub.get('nombre').setValue('aaaa')
    component.form.patchValue({
      nombre: 'aaaa',
    });
    fixture.detectChanges();

    const request = {
      cubicacion_datos: {
        nombre: 'aaaa',
        tipo_cubicacion_id: 3,
        contrato_id: 9,
        agencia_id: 20,
        proveedor_id: 15,
        codigo_acuerdo: '330000659',
        cmarco_has_proveedor_id: 7,
        usuario_creador_id: 6,
        direccion_desde: 'a',
        altura_desde: 'a',
        direccion_hasta: 'a',
        altura_hasta: 'a',
        descripcion: '',
      },
      cubicacion_detalle: {
        nuevo: [
          {
            servicio_id: 191,
            actividad_id: 9,
            tipo_servicio_id: 5,
            cantidad: 4.53,
            unidad_obra: [
              {
                uob_codigo: 'D013',
                cantidad: 10,
              },
            ],
          },
        ],
      },
    };

    component.clonarCubicacion();
    expect(cubicacionFacade.clonarCubicacion).toHaveBeenCalledWith(request);
    expect(component.closeModalDetalleCubicacionEmit.emit).toHaveBeenCalled();
  });
});
