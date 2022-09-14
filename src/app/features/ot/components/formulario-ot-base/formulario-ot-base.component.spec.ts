import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ContratosUsuarioMOCK200OK,
  cubicacionContratoMOCK200ok,
} from '@mocksOT';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CubicacionFacade } from '@storeOT/cubicacion/cubicacion.facades';
import { getCubicacionesContrato } from '@storeOT/cubicacion/cubicacion.selectors';
import { sendingGetCubicacionesContrato } from '@storeOT/loadings/loadings.selectors';
import { OTFacade } from '@storeOT/ot/ot.facades';
import { cubicacionSelected } from '@storeOT/ot/ot.selectors';
import { getContratosUsuario } from '@storeOT/usuario/ususario.selectors';

import { FormularioOtBaseComponent } from './formulario-ot-base.component';

describe('FormularioOtBaseComponent', () => {
  let componentTest: TestComponent;
  let fixtureTest: ComponentFixture<TestComponent>;
  let component: FormularioOtBaseComponent;
  let fixture: ComponentFixture<FormularioOtBaseComponent>;
  let initialState: any = { example: [] };
  let store: MockStore<any>;
  let cubicacionFacade: CubicacionFacade;
  let otFacade: OTFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [StoreModule.forRoot({}), FormsModule, ReactiveFormsModule],
      declarations: [FormularioOtBaseComponent, TestComponent],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: getContratosUsuario,
              value: ContratosUsuarioMOCK200OK.data.items,
            },
            {
              selector: getCubicacionesContrato,
              value: cubicacionContratoMOCK200ok.data.items,
            },
            {
              selector: sendingGetCubicacionesContrato,
              value: false,
            },
            {
              selector: cubicacionSelected,
              value: cubicacionContratoMOCK200ok.data.items[0],
            },
          ],
        }),
      ],
    }).compileComponents();

    fixtureTest = TestBed.createComponent(TestComponent);
    componentTest = fixtureTest.componentInstance;
    fixtureTest.detectChanges();

    cubicacionFacade = TestBed.inject(CubicacionFacade);
    otFacade = TestBed.inject(OTFacade);

    // fixture = TestBed.createComponent(FormularioOtBaseComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();

    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(componentTest).toBeTruthy();
    // expect(component).toBeTruthy();
  });

  it('Debe llamar al facade getCubicacionesContrato con id 1 al escoger el contrato 1', () => {
    spyOn(cubicacionFacade, 'getCubicacionesContrato');
    componentTest.form.get('base').get('contrato').setValue(1);
    fixtureTest.detectChanges();
    expect(cubicacionFacade.getCubicacionesContrato).toHaveBeenCalledWith(1);
  });

  it('Debe almacenar la cubicacion escogida en el store usando el facade cubicacionSelected', () => {
    spyOn(otFacade, 'cubicacionSelected');
    componentTest.form.get('base').get('cubicacion_id').setValue(1);
    fixtureTest.detectChanges();
    expect(otFacade.cubicacionSelected).toHaveBeenCalledWith({
      cubicacion_id: 1,
      cubicacion_nombre: 'Testing Cubicacion Precargada NO USAR',
      cubicacion_descripcion: 'Descripcion Precargada',
      creador_usuario_nombre: 'JESSICA MOVISTAR CASTILLO 1',
      tipo_contrato_marco_nombre: 'Bucle',
      agencia_id: 20,
    });
  });

  @Component({
    selector: `zwc-host-component2`,
    template: `<zwc-formulario-ot-base
      [form]="form.get('base')"
    ></zwc-formulario-ot-base>`,
  })
  class TestComponent {
    form: FormGroup = new FormGroup({
      base: new FormGroup({
        nombre: new FormControl('', [
          Validators.required,
          // this.noWhitespace,
          Validators.maxLength(255),
        ]),
        contrato: new FormControl(null, [Validators.required]),
        cubicacion_id: new FormControl(null, [Validators.required]),
      }),
    });

    constructor() {}
  }
});
