import { ComponentFixture, TestBed,fakeAsync,
  tick, } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CubicacionProyectoComponent } from './cubicacion-proyecto.component';
import { CubicacionService } from '../../../../core/services/cubicacion.service';
import { CrearOtComponent } from '../crear-ot.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import * as CubicacionModel from '../../../cubicacion/cubicacion.model';
import { of } from 'rxjs';

describe('CubicacionComponent', () => {
  let component: CubicacionProyectoComponent;
  let fixture: ComponentFixture<CubicacionProyectoComponent>;
  let service: CubicacionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule,HttpClientTestingModule],
      providers:[ {
        provide: 'environment',
        useValue: {},
      },CubicacionService],
      declarations: [ CubicacionProyectoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CubicacionProyectoComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(CubicacionService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be store cubicaciones', fakeAsync(() => {
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
    expect(component.cubicacionesArr).toEqual(arrExpect);
  }));

  // it('should selected cubicacion show details', () => {
  //   component.cubicacionId = '1';
  //   component.cubicacionesArr = [
  //     {
  //       cubicacion_id: 1,
  //       nombre: 'CubTest',
  //       total: 100,
  //       fecha: '2020-01-02 00:00:00',
  //       usuario_id: 1,
  //       region_id: 1,
  //       region: '1Región',
  //       contrato_marco: 'SBE',
  //       proveedor: 'ERICSON',
  //       subcontrato_id: 2,
  //       asignado: false,
  //       proveedor_id: 1,
  //     },
  //   ];

  //   component.selectedCubicacion();
  //   expect(component.contrato).toBe('SBE');
  //   expect(component.proveedor).toBe('ERICSON');
  //   expect(component.region).toBe('1Región');
  // });
});