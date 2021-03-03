import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CubicacionService } from '../../../core/services/cubicacion.service';
import { CrearOtComponent } from './crear-ot.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import * as CubicacionModel from '../../cubicacion/cubicacion.model';
import { of } from 'rxjs';

describe('CrearOtComponent', () => {
  let component: CrearOtComponent;
  let fixture: ComponentFixture<CrearOtComponent>;
  let service: CubicacionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [CrearOtComponent],
      providers: [{ provide: 'environment', useValue: {} }, CubicacionService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearOtComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(CubicacionService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

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
    expect(component.cubicacionesArr).toEqual(arrExpect);
  }));
});
