import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  getActividadesContratoProveedorMOCK200ok,
  getTipoServiciosContratoMOCK200ok,
  ServiciosAgenciaContratoProveedorMOCK200OK,
  UnidadObraServicioMOCK200OK,
} from '@mocksOT';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

import {
  getActividadesContratoProveedor,
  getTipoServiciosContrato,
} from '@storeOT/contrato/contrato.selectors';
import {
  agenciaSelected,
  contratoSelected,
  proveedorSelected,
} from '@storeOT/cubicacion/cubicacion.selectors';
import {
  sendingGetActividadesContratoProveedor,
  sendingGetServiciosAgenciaContratoProveedor,
  sendingGetTipoServiciosContrato,
  sendingGetUnidadesObraServicios,
} from '@storeOT/loadings/loadings.selectors';
import {
  getServiciosAgenciaContratoProveedor,
  getUnidadesObraServicio,
} from '@storeOT/servicios/servicios.selectors';

import { AgregarServiciosFormComponent } from './agregar-servicios-form.component';

describe('AgregarServiciosFormComponent', () => {
  let component: AgregarServiciosFormComponent;
  let fixture: ComponentFixture<AgregarServiciosFormComponent>;
  let initialState: any = { example: [] };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      declarations: [AgregarServiciosFormComponent],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
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
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarServiciosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
