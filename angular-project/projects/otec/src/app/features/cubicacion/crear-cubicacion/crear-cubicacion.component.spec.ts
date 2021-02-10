import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { CrearCubicacionComponent } from './crear-cubicacion.component';
// import { AuthService } from '../../../core/services/auth.service';
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
});
