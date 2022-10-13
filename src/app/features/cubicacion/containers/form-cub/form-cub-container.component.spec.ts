import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ContratosUsuarioMOCK200OK,
  detalleCubicacionMOCK200Ok,
  getActividadesContratoProveedorMOCK200ok,
  getAgenciasContratoMOCK200OK2,
  getProveedoresAgenciaContratoMOCK200OK2,
  getTipoServiciosContratoMOCK200ok,
  ServiciosAgenciaContratoProveedorMOCK200OK,
  tipoCubicacionMOCK200OK,
  UnidadObraServicioMOCK200OK,
} from '@mocksOT';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ContratoFacade } from '@storeOT/contrato/contrato.facades';
import {
  getActividadesContratoProveedor,
  getAgenciasContrato,
  getTipoServiciosContrato,
} from '@storeOT/contrato/contrato.selectors';
import { CubicacionFacade } from '@storeOT/cubicacion/cubicacion.facades';
import {
  agenciaSelected,
  contratoSelected,
  getTipoCubicacion,
  proveedorSelected,
} from '@storeOT/cubicacion/cubicacion.selectors';
import {
  sendingAgregarServicioCarrito,
  sendingGetActividadesContratoProveedor,
  sendingGetAgenciasContrato,
  sendingGetProveedorAgenciasContrato,
  sendingGetServiciosAgenciaContratoProveedor,
  sendingGetTipoServiciosContrato,
  sendingGetUnidadesObraServicios,
  sendingSaveCubicacion,
} from '@storeOT/loadings/loadings.selectors';
import { ProveedorFacade } from '@storeOT/proveedor/proveedor.facades';
import { getProveedoresAgenciasContrato } from '@storeOT/proveedor/proveedor.selectors';
import { ServiciosFacade } from '@storeOT/servicios/servicios.facades';
import {
  alertServicioExistenteCarrito,
  carrito,
  getServiciosAgenciaContratoProveedor,
  getUnidadesObraServicio,
} from '@storeOT/servicios/servicios.selectors';
import { getContratosUsuario } from '@storeOT/usuario/ususario.selectors';
import { FormAgregarServiciosComponent } from '@sharedOT/form-agregar-servicios/form-agregar-servicios.component';
import { FormularioComponent } from '../../components/formulario/formulario.component';
let initialState: any = { tipoCubicaciones: [] };

import { FormCubContainerComponent } from './form-cub-container.component';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TableServiciosComponent } from '@sharedOT/table-servicios/table-servicios.component';

describe('FormCubContainerComponent', () => {
  let component: FormCubContainerComponent;
  let fixture: ComponentFixture<FormCubContainerComponent>;
  let contratoFacade: ContratoFacade;
  let proveedorFacade: ProveedorFacade;
  let cubicacionFacade: CubicacionFacade;
  let servicioFacade: ServiciosFacade;
  let store: MockStore<any>;
  const route = { data: of({ detalleCubicacion: detalleCubicacionMOCK200Ok }) };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        StoreModule.forRoot({}),
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      declarations: [
        FormCubContainerComponent,
        FormularioComponent,
        TableServiciosComponent,
        FormAgregarServiciosComponent,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: route },
        { provide: LOCALE_ID, useValue: 'es-CL' },
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: getTipoCubicacion,
              value: tipoCubicacionMOCK200OK.data.items,
            },
            {
              selector: getContratosUsuario,
              value: ContratosUsuarioMOCK200OK.data.items,
            },
            {
              selector: sendingGetAgenciasContrato,
              value: false,
            },
            {
              selector: getAgenciasContrato,
              value: getAgenciasContratoMOCK200OK2.data.items,
            },
            {
              selector: getProveedoresAgenciasContrato,
              value: getProveedoresAgenciaContratoMOCK200OK2.data.items,
            },
            { selector: sendingGetProveedorAgenciasContrato, value: false },
            {
              selector: getActividadesContratoProveedor,
              value: getActividadesContratoProveedorMOCK200ok.data.items,
            },
            {
              selector: contratoSelected,
              value: null,
            },
            {
              selector: getTipoServiciosContrato,
              value: getTipoServiciosContratoMOCK200ok.data.items,
            },
            {
              selector: agenciaSelected,
              value: null,
            },
            {
              selector: proveedorSelected,
              value: null,
            },
            {
              selector: getServiciosAgenciaContratoProveedor,
              value: ServiciosAgenciaContratoProveedorMOCK200OK.data.items,
            },
            {
              selector: getUnidadesObraServicio,
              value: UnidadObraServicioMOCK200OK.data.items,
            },
            {
              selector: sendingGetActividadesContratoProveedor,
              value: false,
            },
            {
              selector: sendingGetTipoServiciosContrato,
              value: false,
            },
            {
              selector: sendingGetServiciosAgenciaContratoProveedor,
              value: false,
            },
            {
              selector: sendingGetUnidadesObraServicios,
              value: false,
            },
            {
              selector: carrito,
              value: null,
            },

            {
              selector: sendingAgregarServicioCarrito,
              value: false,
            },
            {
              selector: alertServicioExistenteCarrito,
              value: false,
            },
            {
              selector: sendingSaveCubicacion,
              value: false,
            },
          ],
        }),
      ],
    }).compileComponents();

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

    fixture = TestBed.createComponent(FormCubContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    contratoFacade = TestBed.inject(ContratoFacade);
    proveedorFacade = TestBed.inject(ProveedorFacade);
    cubicacionFacade = TestBed.inject(CubicacionFacade);
    servicioFacade = TestBed.inject(ServiciosFacade);
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Al cambiar de contrato se debe llamar al reset de agenciaSelected,proveedor, proveedorSelected,actividad,tipo servicio, servicio, servicioSelected y uo', () => {
    spyOn(cubicacionFacade, 'resetAgenciaSelected');
    spyOn(proveedorFacade, 'resetProveedoresAgenciaContrato');
    spyOn(cubicacionFacade, 'resetProveedorSelected');
    spyOn(contratoFacade, 'resetActividadesContratoProveedor');
    spyOn(contratoFacade, 'resetTipoServiciosContrato');
    spyOn(servicioFacade, 'resetServiciosAgenciaContratoProveedor');
    spyOn(servicioFacade, 'resetServicioSelected');
    spyOn(servicioFacade, 'resetUnidadesObraServicio');
    component.formulario.formCub.get('contrato').setValue(2);
    fixture.detectChanges();

    // expect(proveedorFacade.resetProveedoresAgenciaContrato).toHaveBeenCalled();
    // expect(cubicacionFacade.resetProveedorSelected).toHaveBeenCalled();
    // expect(contratoFacade.resetActividadesContratoProveedor).toHaveBeenCalled();
    // // expect(contratoFacade.resetTipoServiciosContrato).toHaveBeenCalled();
    // expect(
    //   servicioFacade.resetServiciosAgenciaContratoProveedor
    // ).toHaveBeenCalled();
    // expect(servicioFacade.resetServicioSelected).toHaveBeenCalled();
    // expect(servicioFacade.resetUnidadesObraServicio).toHaveBeenCalled();
  });

  it('Al cambiar de agencia se debe llamar al reset de proveedorSelected,actividad,tipo servicio, servicio, servicioSelected y uo', () => {
    spyOn(cubicacionFacade, 'resetProveedorSelected');
    spyOn(contratoFacade, 'resetActividadesContratoProveedor');
    spyOn(contratoFacade, 'resetTipoServiciosContrato');
    spyOn(servicioFacade, 'resetServiciosAgenciaContratoProveedor');
    spyOn(servicioFacade, 'resetServicioSelected');
    spyOn(servicioFacade, 'resetUnidadesObraServicio');
    component.formulario.formCub.get('contrato').setValue(2);
    component.formulario.formCub.get('agencia_id').setValue(1);
    fixture.detectChanges();

    // expect(cubicacionFacade.resetProveedorSelected).toHaveBeenCalled();
    // expect(contratoFacade.resetActividadesContratoProveedor).toHaveBeenCalled();
    // // expect(contratoFacade.resetTipoServiciosContrato).toHaveBeenCalled();
    // expect(
    //   servicioFacade.resetServiciosAgenciaContratoProveedor
    // ).toHaveBeenCalled();
    // expect(servicioFacade.resetServicioSelected).toHaveBeenCalled();
    // expect(servicioFacade.resetUnidadesObraServicio).toHaveBeenCalled();
  });

  it('Al cambiar de proveedor se debe llamar al reset de actividad,tipo servicio, servicio, servicioSelected y uo', () => {
    spyOn(contratoFacade, 'resetActividadesContratoProveedor');
    spyOn(contratoFacade, 'resetTipoServiciosContrato');
    spyOn(servicioFacade, 'resetServiciosAgenciaContratoProveedor');
    spyOn(servicioFacade, 'resetServicioSelected');
    spyOn(servicioFacade, 'resetUnidadesObraServicio');
    component.formulario.formCub.get('cmarcoproveedor_id').setValue(1);
    fixture.detectChanges();

    expect(contratoFacade.resetActividadesContratoProveedor).toHaveBeenCalled();
    // expect(contratoFacade.resetTipoServiciosContrato).toHaveBeenCalled();
    expect(
      servicioFacade.resetServiciosAgenciaContratoProveedor
    ).toHaveBeenCalled();
    expect(servicioFacade.resetServicioSelected).toHaveBeenCalled();
    expect(servicioFacade.resetUnidadesObraServicio).toHaveBeenCalled();
  });

  it('Al cambiar de actividad se debe llamar al reset de tipo servicio, servicio, servicioSelected y uo', () => {
    spyOn(contratoFacade, 'resetTipoServiciosContrato');
    spyOn(servicioFacade, 'resetServiciosAgenciaContratoProveedor');
    spyOn(servicioFacade, 'resetServicioSelected');
    spyOn(servicioFacade, 'resetUnidadesObraServicio');
    component.agregarServiciosForm.formFilter.get('actividad_id').setValue(1);
    fixture.detectChanges();

    // expect(contratoFacade.resetTipoServiciosContrato).toHaveBeenCalled();
    // expect(
    //   servicioFacade.resetServiciosAgenciaContratoProveedor
    // ).toHaveBeenCalled();
    // expect(servicioFacade.resetServicioSelected).toHaveBeenCalled();
    // expect(servicioFacade.resetUnidadesObraServicio).toHaveBeenCalled();
  });

  it('Al cambiar de tipo servicio se debe llamar al reset de servicio, servicioSelected y uo', () => {
    spyOn(servicioFacade, 'resetServiciosAgenciaContratoProveedor');
    spyOn(servicioFacade, 'resetServicioSelected');
    spyOn(servicioFacade, 'resetUnidadesObraServicio');
    component.agregarServiciosForm.formFilter
      .get('tipo_servicio_id')
      .setValue(1);
    fixture.detectChanges();

    //   expect(
    //     servicioFacade.resetServiciosAgenciaContratoProveedor
    //   ).toHaveBeenCalled();
    //   expect(servicioFacade.resetServicioSelected).toHaveBeenCalled();
    //   expect(servicioFacade.resetUnidadesObraServicio).toHaveBeenCalled();
  });

  // TODO: ACTUALIZAR
  it('createCubicacion debe llamar al facade createCubicación con los datos del formulario', () => {
    spyOn(cubicacionFacade, 'createCubicacion');

    component.formulario.formCub.reset();
    component.formulario.formCub.get('agencia_id').enable();
    component.formulario.formCub.get('cmarcoproveedor_id').enable();
    component.formulario.formCub.patchValue(
      {
        nombre: 'aaaa',
        tipocubicacion: 1,
        direcciondesde: 'cccc',
        direcciondesdealtura: 'ddd',
        direccionhasta: 'eee',
        direccionhastaaltura: 'fff',
        descripcion: '',
        contrato: 2,
        agencia_id: 3,
        cmarcoproveedor_id: 5,
      },
      { emitEvent: false }
    );

    fixture.detectChanges();

    proveedorSelected.setResult({
      cmarco_has_proveedor_id: 5,
      codigo_acuerdo: 'bbbb',
      id: 4,
      nombre: 'dasdasd',
    });

    carrito.setResult([
      {
        servicio_id: 1,
        servicio_codigo: 'J101',
        servicio_precio_final_clp: 471.59999999999997,
        servicio_nombre: 'INSTALAR CABLE EN CANALIZACION GRUPOS A Y B',
        tipo_servicio_descripcion: 'LINEAS',
        tipo_servicio_id: 3,
        numero_producto: 'asdas',
        unidad_obras: [
          {
            uo_codigo: 'aaa',
            uo_nombre: 'CABLE 900-26 SUB',
            uo_precio_total_clp: 0,
            actividad_descripcion: 'MATRIZ',
            actividad_id: 2,
          },
        ],
      },
    ]);
    store.refreshState();

    // TODO: REVISAR PORQUE FALLA
    // let langArr = <FormArray>(
    //   component.tableServicios.formTable.controls['table']
    // );
    // langArr.controls[0].patchValue({
    //   precargado: false,
    //   servicio_precio_final_clp: 1,
    //   servicio_rowid: 1,
    //   servicio_id: 1,
    //   servicio_cantidad: 4,
    //   validar_adicional: null,
    //   unidad_obras: [],
    // });

    // fixture.detectChanges();

    const request = {
      cubicacion_datos: {
        nombre: 'aaaa', // FORMULARIO
        tipo_cubicacion_id: 1, // FORMULARIO
        contrato_id: 2, // FORMULARIO
        agencia_id: 3, // FORMULARIO
        proveedor_id: 4, // FORMULARIO
        codigo_acuerdo: 'bbbb', // NGRX proveedorselected
        cmarco_has_proveedor_id: 5, // FORMULARIO
        usuario_creador_id: 6, // LOCALSTORE
        direccion_desde: 'cccc', // FORMULARIO
        altura_desde: 'ddd', // FORMULARIO
        direccion_hasta: 'eee', // FORMULARIO
        altura_hasta: 'fff', // FORMULARIO
        descripcion: '', // FORMULARIO
      },
      cubicacion_detalle: {
        nuevo: [
          {
            servicio_id: 1, // FORMULARIO
            actividad_id: 2, // NGRX
            tipo_servicio_id: 3, // NGRX
            cantidad: 1, // FORMULARIO
            unidad_obra: [
              {
                uob_codigo: 'aaa', // FORMULARIO
                cantidad: 1, // FORMULARIO
              },
            ],
          },
        ],
      },
    };

    component.createCubicacion();
    expect(cubicacionFacade.createCubicacion).toHaveBeenCalledWith(request);
  });
});
