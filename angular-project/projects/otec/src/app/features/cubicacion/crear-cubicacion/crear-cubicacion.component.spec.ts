import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { CrearCubicacionComponent } from './crear-cubicacion.component';
import { CubicacionService } from '../../../core/services/cubicacion.service';
import { SharedService } from '../../../core/services/shared.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import * as CubicacionModel from '../cubicacion.model';
import { of } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { RouterTestingModule } from '@angular/router/testing';

describe('CrearCubicacionComponent', () => {
  let component: CrearCubicacionComponent;
  let fixture: ComponentFixture<CrearCubicacionComponent>;
  let service: CubicacionService;
  let confirmationService: ConfirmationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [CrearCubicacionComponent],
      providers: [
        { provide: 'environment', useValue: {} },
        CubicacionService,
        ConfirmationService,
        SharedService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearCubicacionComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(CubicacionService);
    confirmationService = TestBed.inject(ConfirmationService);
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

    expect(contratoSelect).toBeTruthy();
    expect(proveedorSelect).toBeTruthy();
    expect(regionSelect).toBeTruthy();
    expect(tipodeservicioSelect).toBeTruthy();
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

  it('should storage servicios', fakeAsync(() => {
    component.regionArr = [{ codigo: 'XIII', id: 13, nombre: '1Region' }];
    component.regionId = '13';
    component.tipoServicioId = '1';
    component.tipoServicioArr = [{ id: 1, nombre: 'CD1' }];
    const arrExpect: CubicacionModel.Product[] = [
      {
        id_lpu: 1,
        nombre: 'SERVICIO1',
        tipo_moneda: 'PESOS',
        precio: 1000,
        numero_producto: '213213',
        cantidad: 1,
        unidad: 'UNIDAD',
        region: '1Region',
        tiposervicio: 'CD1',
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
            id_lpu: 1,
            nombre: 'SERVICIO1',
            precio: 1000,
            tipo_moneda: 'PESOS',
            numero_producto: '213213',
          },
        ],
      },
    };

    spyOn(service, 'getServicioSubcontrato').and.returnValue(of(response));
    component.selectedTipoServicio();
    tick();
    fixture.detectChanges();
    expect(component.sourcePtemp).toEqual(arrExpect);
  }));

  it('counter should return array of number', () => {
    expect(component.counter(4).length).toBe(4);
  });

  it('Should return total cash of services', () => {
    component.selectedServicios = [
      {
        id_lpu: 1,
        nombre: 'SERVICIO1',
        tipo_moneda: 'PESOS',
        precio: 1000,
        numero_producto: '213213',
        cantidad: 1,
        unidad: 'UNIDAD',
        region: '1Region',
        tiposervicio: 'CD1',
      },
      {
        id_lpu: 2,
        nombre: 'SERVICIO2',
        tipo_moneda: 'PESOS',
        precio: 1000,
        numero_producto: '113213',
        cantidad: 1,
        unidad: 'UNIDAD',
        region: '1Region',
        tiposervicio: 'CD1',
      },
    ];
    component.getTotal();
    expect(component.total).toBe(2000);
  });

  xit('should display message for confirm clear', () => {
    const event: Event = new Event('MouseEvent', {
      bubbles: true,
      cancelable: false,
    });
    spyOn(confirmationService, 'confirm');
    component.limpiarCarro(event);
    expect(confirmationService.confirm).toHaveBeenCalled();
  });

  it('should let show message of confirm', () => {
    component.selectedServicios = [];
    const event: Event = new Event('MouseEvent', {
      bubbles: true,
      cancelable: false,
    });
    const input = 'contrato';
    component.contratoDisabled = false;
    component.confirm(event, input);
    expect(component.contratoDisabled).toBe(false);
  });

  it('should invoke service save cubicacion', () => {
    const dummyResponse: CubicacionModel.ResponseSaveCubicacion = {
      status: {
        responseCode: 0,
        description: 'Ok',
      },
      data: '',
    };
    spyOn(service, 'saveCubicacion').and.returnValue(of(dummyResponse));
    // spyOn(service, 'saveCubicacion');
    component.save();
    expect(service.saveCubicacion).toHaveBeenCalled();
  });
});
