import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ContratosUsuarioMOCK200OK,
  getActividadesContratoProveedorMOCK200ok,
  getAgenciasContratoMOCK200OK2,
  getProveedoresAgenciaContratoMOCK200OK,
  getTipoServiciosContratoMOCK200ok,
  ServiciosAgenciaContratoProveedorMOCK200OK,
  tipoCubicacionMOCK200OK,
  UnidadObraServicioMOCK200OK,
} from '@mocksOT';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import {
  getActividadesContratoProveedor,
  getAgenciasContrato,
  getTipoServiciosContrato,
} from '@storeOT/contrato/contrato.selectors';
import {
  agenciaSelected,
  contratoSelected,
  getTipoCubicacion,
  proveedorSelected,
} from '@storeOT/cubicacion/cubicacion.selectors';
import {
  sendingGetActividadesContratoProveedor,
  sendingGetAgenciasContrato,
  sendingGetProveedorAgenciasContrato,
  sendingGetServiciosAgenciaContratoProveedor,
  sendingGetTipoServiciosContrato,
  sendingGetUnidadesObraServicios,
} from '@storeOT/loadings/loadings.selectors';
import { getProveedoresAgenciasContrato } from '@storeOT/proveedor/proveedor.selectors';
import {
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
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
              value: getProveedoresAgenciaContratoMOCK200OK.data.items,
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
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormCubContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
