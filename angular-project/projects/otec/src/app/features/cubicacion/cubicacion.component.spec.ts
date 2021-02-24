import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  flush,
} from '@angular/core/testing';
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
        region: '1Región',
        contrato_marco: 'SBE',
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
            region: '1Región',
            contrato_marco: 'SBE',
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
    const regionC = '1Región';
    const contratoC = 'SBE';

    const arrExpect: CubicacionModel.Cubicacion[] = [
      {
        cubicacion_id: 1,
        nombre: 'CubTest',
        total: 100,
        fecha: '2020-01-02 00:00:00',
        usuario_id: 1,
        region: '1Región',
        contrato_marco: 'SBE',
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
            region: '1Región',
            contrato_marco: 'SBE',
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

    component.clonar(id, total, nombreC, regionC, contratoC);
    tick();
    fixture.detectChanges();
    flush();
    expect(component.cubicaciones).toEqual(arrExpect);
  }));
});
