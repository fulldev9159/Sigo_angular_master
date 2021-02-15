import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { CrearCubicacionComponent } from './crear-cubicacion.component';
import { CubicacionService } from '../../../core/services/cubicacion.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import * as CubicacionModel from '../cubicacion.model';
import { of } from 'rxjs';

describe('CrearCubicacionComponent', () => {
  let component: CrearCubicacionComponent;
  let fixture: ComponentFixture<CrearCubicacionComponent>;
  let service: CubicacionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CrearCubicacionComponent],
      providers: [{ provide: 'environment', useValue: {} }, CubicacionService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearCubicacionComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(CubicacionService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render input elements', () => {
    const compiled = fixture.debugElement.nativeElement;
    const contratoSelect = compiled.querySelector('select[id="contrato"]');
    const proveedorSelect = compiled.querySelector('select[id="proveedor"]');
    const regionSelect = compiled.querySelector('select[id="region"]');
    const tipodeservicioSelect = compiled.querySelector(
      'select[id="tipodeservicio"]'
    );
    const servicioSelect = compiled.querySelector('select[id="servicio"]');

    expect(contratoSelect).toBeTruthy();
    // expect(proveedorSelect).toBeTruthy();
  });

  it('should be store contratos', fakeAsync(() => {
    const arrExpect: CubicacionModel.ContratoMarco[] = [
      { id: 1, nombre: 'SBE', tipo_contrato: 'Movil' },
    ];
    const responseContratos: CubicacionModel.ResponseContrato = {
      status: {
        responseCode: 0,
        description: 'Ok',
      },
      data: {
        contratos_marco: [
          {
            id: 1,
            nombre: 'SBE',
            tipo_contrato: 'Movil',
          },
        ],
      },
    };

    spyOn(service, 'getContratos').and.returnValue(of(responseContratos));
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    expect(component.contratosArr).toEqual(arrExpect);
  }));

  it('should storage prooveedores de un contrato', fakeAsync(() => {
    const arrExpect: CubicacionModel.Proveedores[] = [
      { id: 2, nombre: 'ERICSSON CHILE S.A.', subcontrato_id: [1] },
    ];
    const response: CubicacionModel.ResponseProveedor = {
      status: {
        responseCode: 0,
        description: 'Ok',
      },
      data: {
        proveedores: [
          {
            id: 2,
            nombre: 'ERICSSON CHILE S.A.',
            subcontrato_id: [1],
          },
        ],
      },
    };

    spyOn(service, 'getProveedoresSubcontrato').and.returnValue(of(response));
    component.selectedContrato();
    tick();
    fixture.detectChanges();
    expect(component.proveedorArr).toEqual(arrExpect);
  }));

  it('should storage regiones de un contrato', fakeAsync(() => {
    component.proveedorId = '2';
    component.proveedorArr = [
      { id: 2, nombre: 'ERICSSON CHILE S.A.', subcontrato_id: [1] },
    ];
    const arrExpect: CubicacionModel.Region[] = [
      { codigo: 'XIII', id: 13, nombre: 'Reginnn Metropolitana de Santiago' },
    ];
    const response: CubicacionModel.ResponseRegion = {
      status: {
        responseCode: 0,
        description: 'Ok',
      },
      data: {
        regiones: [
          {
            codigo: 'XIII',
            id: 13,
            nombre: 'Reginnn Metropolitana de Santiago',
          },
        ],
      },
    };

    spyOn(service, 'getRegionesSubcontrato').and.returnValue(of(response));
    component.selectedProveedor();
    tick();
    fixture.detectChanges();
    expect(component.regionArr).toEqual(arrExpect);
  }));

  it('should storage tiposervicios de un contrato', fakeAsync(() => {
    const arrExpect: CubicacionModel.TipoServicio[] = [
      { id: 1, nombre: 'CD1' },
    ];
    const response: CubicacionModel.ResponseTipoServicioSubContrato = {
      status: {
        responseCode: 0,
        description: 'Ok',
      },
      data: {
        tipo_servicios: [
          {
            id: 1,
            nombre: 'CD1',
          },
        ],
      },
    };

    spyOn(service, 'getTipoServicioSubcontrato').and.returnValue(of(response));
    component.selectedRegion();
    tick();
    fixture.detectChanges();
    expect(component.tipoServicioArr).toEqual(arrExpect);
  }));

  it('should storage servicios de un contrato', fakeAsync(() => {
    const arrExpect: CubicacionModel.Servicio[] = [
      {
        id_lpu: 3,
        nombre: 'CD1-Acometida para Media Tensinnn de hasta 100 m',
        numero_producto: 'CD 1 - Bsico ER 67',
        precio: 2171824,
        tipo_moneda: 'Pesos',
      },
    ];
    const response: CubicacionModel.ResponseServicioContrato = {
      status: {
        responseCode: 0,
        description: 'Ok',
      },
      data: {
        servicios: [
          {
            id_lpu: 3,
            nombre: 'CD1-Acometida para Media Tensinnn de hasta 100 m',
            numero_producto: 'CD 1 - Bsico ER 67',
            precio: 2171824,
            tipo_moneda: 'Pesos',
          },
        ],
      },
    };

    spyOn(service, 'getServicioSubcontrato').and.returnValue(of(response));
    component.selectedTipoServicio();
    tick();
    fixture.detectChanges();
    expect(component.servicioArr).toEqual(arrExpect);
  }));
});
