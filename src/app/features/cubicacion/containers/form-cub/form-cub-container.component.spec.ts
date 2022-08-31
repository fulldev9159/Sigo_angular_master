import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ContratosUsuarioMOCK200OK,
  getActividadesContratoProveedorMOCK200ok,
  getAgenciasContratoMOCK200OK2,
  getProveedoresAgenciaContratoMOCK200OK2,
  getTipoServiciosContratoMOCK200ok,
  ServiciosAgenciaContratoProveedorMOCK200OK,
  tipoCubicacionMOCK200OK,
  UnidadObraServicioMOCK200OK,
} from '@mocksOT';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { SharedModule } from '@sharedOT/shared.module';
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
import { AgregarServiciosFormComponent } from '../../components/agregar-servicios-form/agregar-servicios-form.component';
import { FormularioComponent } from '../../components/formulario/formulario.component';
import { TableServicesComponent } from '../../components/table-services/table-services.component';
let initialState: any = { tipoCubicaciones: [] };

import { FormCubContainerComponent } from './form-cub-container.component';

describe('FormCubContainerComponent', () => {
  let component: FormCubContainerComponent;
  let fixture: ComponentFixture<FormCubContainerComponent>;
  let contratoFacade: ContratoFacade;
  let proveedorFacade: ProveedorFacade;
  let cubicacionFacade: CubicacionFacade;
  let servicioFacade: ServiciosFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [StoreModule.forRoot({}), FormsModule, ReactiveFormsModule],
      declarations: [
        FormCubContainerComponent,
        FormularioComponent,
        TableServicesComponent,
        AgregarServiciosFormComponent,
      ],
      providers: [
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
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormCubContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    contratoFacade = TestBed.inject(ContratoFacade);
    proveedorFacade = TestBed.inject(ProveedorFacade);
    cubicacionFacade = TestBed.inject(CubicacionFacade);
    servicioFacade = TestBed.inject(ServiciosFacade);
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

    expect(proveedorFacade.resetProveedoresAgenciaContrato).toHaveBeenCalled();
    expect(cubicacionFacade.resetProveedorSelected).toHaveBeenCalled();
    expect(contratoFacade.resetActividadesContratoProveedor).toHaveBeenCalled();
    expect(contratoFacade.resetTipoServiciosContrato).toHaveBeenCalled();
    expect(
      servicioFacade.resetServiciosAgenciaContratoProveedor
    ).toHaveBeenCalled();
    expect(servicioFacade.resetServicioSelected).toHaveBeenCalled();
    expect(servicioFacade.resetUnidadesObraServicio).toHaveBeenCalled();
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

    expect(cubicacionFacade.resetProveedorSelected).toHaveBeenCalled();
    expect(contratoFacade.resetActividadesContratoProveedor).toHaveBeenCalled();
    expect(contratoFacade.resetTipoServiciosContrato).toHaveBeenCalled();
    expect(
      servicioFacade.resetServiciosAgenciaContratoProveedor
    ).toHaveBeenCalled();
    expect(servicioFacade.resetServicioSelected).toHaveBeenCalled();
    expect(servicioFacade.resetUnidadesObraServicio).toHaveBeenCalled();
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
    expect(contratoFacade.resetTipoServiciosContrato).toHaveBeenCalled();
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

    expect(contratoFacade.resetTipoServiciosContrato).toHaveBeenCalled();
    expect(
      servicioFacade.resetServiciosAgenciaContratoProveedor
    ).toHaveBeenCalled();
    expect(servicioFacade.resetServicioSelected).toHaveBeenCalled();
    expect(servicioFacade.resetUnidadesObraServicio).toHaveBeenCalled();
  });

  it('Al cambiar de tipo servicio se debe llamar al reset de servicio, servicioSelected y uo', () => {
    spyOn(servicioFacade, 'resetServiciosAgenciaContratoProveedor');
    spyOn(servicioFacade, 'resetServicioSelected');
    spyOn(servicioFacade, 'resetUnidadesObraServicio');
    component.agregarServiciosForm.formFilter
      .get('tipo_servicio_id')
      .setValue(1);
    fixture.detectChanges();

    expect(
      servicioFacade.resetServiciosAgenciaContratoProveedor
    ).toHaveBeenCalled();
    expect(servicioFacade.resetServicioSelected).toHaveBeenCalled();
    expect(servicioFacade.resetUnidadesObraServicio).toHaveBeenCalled();
  });
});
