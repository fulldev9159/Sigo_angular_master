import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  getActividadesContratoProveedorMOCK200ok,
  getTipoServiciosContratoMOCK200ok,
  ServiciosAgenciaContratoProveedorMOCK200OK,
  UnidadObraServicioMOCK200OK,
} from '@mocksOT';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { ContratoFacade } from '@storeOT/contrato/contrato.facades';

import {
  getActividadesContratoProveedor,
  getTipoServiciosContrato,
} from '@storeOT/contrato/contrato.selectors';
import { CubicacionFacade } from '@storeOT/cubicacion/cubicacion.facades';
import {
  agenciaSelected,
  contratoSelected,
  proveedorSelected,
} from '@storeOT/cubicacion/cubicacion.selectors';
import { LoadingsFacade } from '@storeOT/loadings/loadings.facade';
import {
  sendingGetActividadesContratoProveedor,
  sendingGetServiciosAgenciaContratoProveedor,
  sendingGetTipoServiciosContrato,
  sendingGetUnidadesObraServicios,
} from '@storeOT/loadings/loadings.selectors';
import { ServiciosFacade } from '@storeOT/servicios/servicios.facades';
import {
  getServiciosAgenciaContratoProveedor,
  getUnidadesObraServicio,
} from '@storeOT/servicios/servicios.selectors';
import { FormularioService } from 'src/app/core/service/formulario.service';

import { AgregarServiciosFormComponent } from './agregar-servicios-form.component';

describe('AgregarServiciosFormComponent', () => {
  let component: AgregarServiciosFormComponent;
  let fixture: ComponentFixture<AgregarServiciosFormComponent>;
  let initialState: any = { example: [] };
  let contratoFacade: ContratoFacade;
  let cubicacionFacade: CubicacionFacade;
  let serviciosFacade: ServiciosFacade;
  let loadingFacade: LoadingsFacade;
  let formularioService: FormularioService;

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
              value: {
                usuario_id: 2,
                contrato_id: 9,
                model_contrato_id: {
                  id: 9,
                  nombre: 'BUCLE',
                  fecha_inicio: null,
                  fecha_fin: null,
                  estado: true,
                  tipo_contrato_id: 4,
                  costo_max: 5000000000,
                  tipo_moneda_id: 2,
                  tipo_pago: 'TOTAL',
                  aprob_jerarq_inic: true,
                  validacion_operaciones: true,
                  tiene_encuesta: false,
                },
                model_usuario_id: {
                  id: 2,
                  username: 'mgestor1',
                  rut: '1173606344',
                  nombres: 'JESSICA MOVISTAR',
                  apellidos: 'CASTILLO 1',
                  celular: '5696263509644',
                  estado: true,
                  proveedor_id: 1,
                  area_id: 1,
                  email: 'jessica.castillo@telefonica.com',
                  firma_archivo_id: null,
                  eliminable: true,
                  created_at: null,
                  updated_at: null,
                },
              },
            },
            {
              selector: getTipoServiciosContrato,
              value: getTipoServiciosContratoMOCK200ok.data.items,
            },
            {
              selector: agenciaSelected,
              value: { id: 20, nombre: 'APOQUINDO' },
            },
            {
              selector: proveedorSelected,
              value: {
                id: 15,
                nombre: 'COBRA CHILE SERVICIOS S.A.',
                codigo_acuerdo: '330000659',
                cmarco_has_proveedor_id: 7,
              },
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

    contratoFacade = TestBed.inject(ContratoFacade);
    cubicacionFacade = TestBed.inject(CubicacionFacade);
    serviciosFacade = TestBed.inject(ServiciosFacade);
    loadingFacade = TestBed.inject(LoadingsFacade);
    formularioService = TestBed.inject(FormularioService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getTipoServiciosContrato if change agencia', () => {
    spyOn(contratoFacade, 'getTipoServiciosContrato');
    component.formFilter.get('actividad_id').setValue(1); //ABANDONOS
    fixture.detectChanges();

    expect(contratoFacade.getTipoServiciosContrato).toHaveBeenCalledWith(1, 9);
  });

  it('should call servicios de una agencia al escoger el tipo de servicio', () => {
    spyOn(serviciosFacade, 'getServiciosAgenciaContratoProveedor');
    component.formFilter.get('actividad_id').setValue(1); //ABANDONOS
    component.formFilter.get('tipo_servicio_id').setValue(2);
    fixture.detectChanges();

    expect(
      serviciosFacade.getServiciosAgenciaContratoProveedor
    ).toHaveBeenCalledWith({
      actividad_id: 1,
      agencia_id: 20,
      cmarco_has_prov_id: 7,
      tipo_servicio_id: 2,
    });
  });
});
