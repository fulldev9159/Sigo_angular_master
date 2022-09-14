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
          ],
        }),
      ],
    }).compileComponents();

    fixtureTest = TestBed.createComponent(TestComponent);
    componentTest = fixtureTest.componentInstance;
    fixtureTest.detectChanges();

    cubicacionFacade = TestBed.inject(CubicacionFacade);

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
    componentTest.form.get('general').get('contrato').setValue(1);
    fixtureTest.detectChanges();
    expect(cubicacionFacade.getCubicacionesContrato).toHaveBeenCalledWith(1);
  });

  @Component({
    selector: `zwc-host-component2`,
    template: `<zwc-formulario-ot-base
      [form]="form.get('general')"
    ></zwc-formulario-ot-base>`,
  })
  class TestComponent {
    form: FormGroup = new FormGroup({
      general: new FormGroup({
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
