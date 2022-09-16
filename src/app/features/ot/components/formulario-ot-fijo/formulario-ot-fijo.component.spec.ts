import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TipoDeNumeroInternoMOCK200ok } from '@mocksOT';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CubicacionFacade } from '@storeOT/cubicacion/cubicacion.facades';
import { sendingGetTipoNumeroInterno } from '@storeOT/loadings/loadings.selectors';
import { OTFacade } from '@storeOT/ot/ot.facades';
import { getTipoDeNumeroInterno } from '@storeOT/ot/ot.selectors';

import { FormularioOtFijoComponent } from './formulario-ot-fijo.component';

describe('FormularioOtFijoComponent', () => {
  let componentTest: TestComponent;
  let fixtureTest: ComponentFixture<TestComponent>;
  let initialState: any = { example: [] };
  let store: MockStore<any>;
  let cubicacionFacade: CubicacionFacade;
  let otFacade: OTFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [StoreModule.forRoot({}), FormsModule, ReactiveFormsModule],
      declarations: [FormularioOtFijoComponent, TestComponent],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: getTipoDeNumeroInterno,
              value: TipoDeNumeroInternoMOCK200ok.data.items,
            },
            {
              selector: sendingGetTipoNumeroInterno,
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
    otFacade = TestBed.inject(OTFacade);

    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(componentTest).toBeTruthy();
  });

  @Component({
    selector: `zwc-host-component2`,
    template: `<zwc-formulario-ot-fijo
      [form]="form.get('fijo')"
    ></zwc-formulario-ot-fijo>`,
  })
  class TestComponent {
    form: FormGroup = new FormGroup({
      fijo: new FormGroup({
        tipo_numero_interno_id: new FormControl(null, [Validators.required]),
        // numeros_internos: new FormArray([]),
        numero_interno: new FormControl([]),
      }),
    });

    constructor() {}
  }
});
