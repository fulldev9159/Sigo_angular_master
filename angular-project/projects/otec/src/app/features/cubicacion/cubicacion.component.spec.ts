import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  flush,
} from '@angular/core/testing';
import {
  LOCALE_ID
} from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeCl from '@angular/common/locales/es-CL';
import localeClExtra from '@angular/common/locales/extra/es-CL';
registerLocaleData(localeCl, 'es-CL', localeClExtra);
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CubicacionComponent } from './cubicacion.component';
import * as CubicacionModel from './cubicacion.model';
import { CubicacionService } from '../../core/services/cubicacion.service';
import { of } from 'rxjs';
import { SharedService } from '../../core/services/shared.service';
import { ConfirmationService } from 'primeng/api';
import { RouterTestingModule } from '@angular/router/testing';

describe('CubicacionComponent', () => {
  let component: CubicacionComponent;
  let fixture: ComponentFixture<CubicacionComponent>;
  let service: CubicacionService;
  let confirmationService: ConfirmationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: 'environment',
          useValue: {},
        },
        { provide: LOCALE_ID, useValue: 'es-CL'},
        SharedService,
        ConfirmationService,
      ],
      declarations: [CubicacionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CubicacionComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(CubicacionService);
    confirmationService = TestBed.inject(ConfirmationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should render buttons elements', () => {
  //   const responseContratos: CubicacionModel.Cubicacion[] = [
  //         {
  //           cubicacion_id: 1,
  //           nombre: 'CubTest',
  //           total: 100,
  //           fecha: '2020-01-02 00:00:00',
  //           usuario_id: 1,
  //           region: '1Región',
  //           contrato_marco: 'SBE',
  //         }
  //       ]

  //   component.cubicaciones=responseContratos

  //   const compiled = fixture.debugElement.nativeElement;
  //   const buttonDetalles = compiled.querySelector('button[id="buttonDetalles-1"]');
  //   const buttonCopiar = compiled.querySelector('button[id="buttonCopiar-1"]');
  //   // const tipodeservicioSelect = compiled.querySelector(
  //   //   'select[id="tipodeservicio"]'
  //   // );

  //   expect(buttonDetalles).toBeTruthy();
  //   expect(buttonCopiar).toBeTruthy();
  // });

  xit('should be store cubicaciones', fakeAsync(() => {
    const arrExpect: CubicacionModel.Cubicacion[] = [
      {
        cubicacion_id: 1,
        nombre: 'CubTest',
        total: 100,
        fecha: '2020-01-02 00:00:00',
        usuario_id: 1,
        region_id: 1,
        region: '1Región',
        contrato_marco: 'SBE',
        proveedor: 'ERICSON',
        subcontrato_id: 2,
        asignado: false,
        proveedor_id: 1,
      },
    ];
    const responseContratos: CubicacionModel.ResponseCubicaciones = {
      status: {
        responseCode: 0,
        description: 'Ok',
      },
      data: {
        cubicaciones: [
          {
            cubicacion_id: 1,
            nombre: 'CubTest',
            total: 100,
            fecha: '2020-01-02 00:00:00',
            usuario_id: 1,
            region_id: 1,
            region: '1Región',
            contrato_marco: 'SBE',
            proveedor: 'ERICSON',
            subcontrato_id: 2,
            asignado: false,
            proveedor_id: 1,
          },
        ],
      },
    };

    spyOn(service, 'getCubicaciones').and.returnValue(of(responseContratos));
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    expect(component.cubicaciones).toEqual(arrExpect);
  }));

  it('should be store DetallesCubicacion', fakeAsync(() => {
    component.username = 'asdas';
    component.token = 'asdsadas';
    const id = 1;
    const total = 100;
    const nombreC = 'hola';

    const arrExpect: CubicacionModel.DetalleCubicacion[] = [
      {
        id_lpu: 1,
        nombre: 'CubTest',
        subtotal: 100,
        id_servicio: 1,
        tipo_moneda: 'PESOS',
        precio: 100,
        cantidad: 1,
        tipo_servicio: 'CD1',
      },
    ];
    const responseContratos: CubicacionModel.ResponseDetalleCubicaciones = {
      status: {
        responseCode: 0,
        description: 'Ok',
      },
      data: {
        detalle_cubicacion: [
          {
            id_lpu: 1,
            nombre: 'CubTest',
            subtotal: 100,
            id_servicio: 1,
            tipo_moneda: 'PESOS',
            precio: 100,
            cantidad: 1,
            tipo_servicio: 'CD1',
          },
        ],
      },
    };

    spyOn(service, 'getDetalleCubicacion').and.returnValue(
      of(responseContratos)
    );
    component.displayDetaill(id, total, nombreC);
    tick();
    fixture.detectChanges();
    expect(component.detallesCubicacion).toEqual(arrExpect);
    expect(component.displayModal).toBe(true);
    expect(component.total).toBe(100);
    expect(component.nombreCubicacion).toBe('hola');
  }));

  it('should clon cubicacion', fakeAsync(() => {
    component.username = 'asdas';
    component.token = 'asdsadas';
    const id = 1;
    const total = 100;
    const nombreC = 'hola';
    const regionID = 1;
    const regionC = '1Región';
    const contratoC = 'SBE';
    const proveedor = 'ERICSON';
    const subcontratoId = 2;
    const asignado = false;

    const arrExpect: CubicacionModel.Cubicacion[] = [
      {
        cubicacion_id: 1,
        nombre: 'CubTest',
        total: 100,
        fecha: '2020-01-02 00:00:00',
        usuario_id: 1,
        region_id: 1,
        region: '1Región',
        contrato_marco: 'SBE',
        proveedor: 'ERICSON',
        subcontrato_id: 2,
        asignado: false,
        proveedor_id: 1,
      },
    ];
    const responseContratos: CubicacionModel.ResponseCubicaciones = {
      status: {
        responseCode: 0,
        description: 'Ok',
      },
      data: {
        cubicaciones: [
          {
            cubicacion_id: 1,
            nombre: 'CubTest',
            total: 100,
            fecha: '2020-01-02 00:00:00',
            usuario_id: 1,
            region_id: 1,
            region: '1Región',
            contrato_marco: 'SBE',
            proveedor: 'ERICSON',
            subcontrato_id: 2,
            asignado: false,
            proveedor_id: 1,
          },
        ],
      },
    };

    spyOn(service, 'getCubicaciones').and.returnValue(of(responseContratos));

    const responseDetalles: CubicacionModel.ResponseDetalleCubicaciones = {
      status: {
        responseCode: 0,
        description: 'Ok',
      },
      data: {
        detalle_cubicacion: [
          {
            id_lpu: 1,
            nombre: 'CubTest',
            subtotal: 100,
            id_servicio: 1,
            tipo_moneda: 'PESOS',
            precio: 100,
            cantidad: 1,
            tipo_servicio: 'CD1',
          },
        ],
      },
    };

    spyOn(service, 'getDetalleCubicacion').and.returnValue(
      of(responseDetalles)
    );

    const dummyResponse: CubicacionModel.ResponseSaveCubicacion = {
      status: {
        responseCode: 0,
        description: 'Ok',
      },
      data: '',
    };
    spyOn(service, 'saveCubicacion').and.returnValue(of(dummyResponse));

    component.clonar(
      id,
      nombreC,
      total,
      regionID,
      regionC,
      contratoC,
      proveedor,
      subcontratoId
    );
    tick();
    fixture.detectChanges();
    flush();
    expect(component.cubicaciones).toEqual(arrExpect);
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
        // numero_producto: '213213',
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
        // numero_producto: '113213',
        cantidad: 1,
        unidad: 'UNIDAD',
        region: '1Region',
        tiposervicio: 'CD1',
      },
    ];
    component.getTotal();
    expect(component.total).toBe(2000);
  });

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
        // numero_producto: '213213',
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
});
