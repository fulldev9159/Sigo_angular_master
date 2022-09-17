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
import {
  sendingGetOTsFromNumeroInterno,
  sendingGetTipoNumeroInterno,
} from '@storeOT/loadings/loadings.selectors';
import { OTFacade } from '@storeOT/ot/ot.facades';
import {
  getOTFromNumeroInterno,
  getTipoDeNumeroInterno,
} from '@storeOT/numero-interno/numero-interno.selectors';

import { FormularioOtFijoComponent } from './formulario-ot-fijo.component';
import { NumeroInternoFacade } from '@storeOT/numero-interno/numero-interno.facades';

describe('FormularioOtFijoComponent', () => {
  let componentTest: TestComponent;
  let fixtureTest: ComponentFixture<TestComponent>;
  let initialState: any = { example: [] };
  let store: MockStore<any>;
  let cubicacionFacade: CubicacionFacade;
  let otFacade: OTFacade;
  let numeroInternoFacade: NumeroInternoFacade;

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
            {
              selector: getOTFromNumeroInterno,
              value: [],
            },
            {
              selector: sendingGetOTsFromNumeroInterno,
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
    numeroInternoFacade = TestBed.inject(NumeroInternoFacade);
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(componentTest).toBeTruthy();
  });

  // TODO
  // it('Debe llamar al facade otsFromNumeroInterno con parametro 1234', () => {
  //   spyOn(numeroInternoFacade, 'getOTFromNumeroInterno');
  //   componentTest.form.get('fijo').get('tipo_numero_interno_id').setValue(1);
  //   componentTest.form.get('fijo').get('numero_interno').setValue('1234');
  //   fixtureTest.detectChanges();

  //   const compiled = fixtureTest.nativeElement;
  //   console.log(compiled);
  //   compiled.querySelector('#agregar-numero-interno').click();

  //   expect(numeroInternoFacade.getOTFromNumeroInterno).toHaveBeenCalledWith(
  //     '1234'
  //   );
  // });

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
        numero_interno: new FormControl('', [
          Validators.required,
          // this.noWhitespace,
          Validators.maxLength(255),
        ]),
        numeros_internos: new FormControl([]),
      }),
    });

    constructor() {}
  }
});
