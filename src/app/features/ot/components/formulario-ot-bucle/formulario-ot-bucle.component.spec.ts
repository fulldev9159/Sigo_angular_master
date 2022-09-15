import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { cubicacionContratoMOCK200ok } from '@mocksOT';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CubicacionFacade } from '@storeOT/cubicacion/cubicacion.facades';
import { OTFacade } from '@storeOT/ot/ot.facades';
import { cubicacionSelected } from '@storeOT/ot/ot.selectors';

import { FormularioOtBucleComponent } from './formulario-ot-bucle.component';

describe('FormularioOtBucleComponent', () => {
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
      declarations: [FormularioOtBucleComponent],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
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

    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(componentTest).toBeTruthy();
  });

  @Component({
    selector: `zwc-host-component2`,
    template: `<zwc-formulario-ot-bucle
      [form]="form.get('bucle')"
    ></zwc-formulario-ot-bucle>`,
  })
  class TestComponent {
    form: FormGroup = new FormGroup({
      bucle: new FormGroup({
        oficina_central_id: new FormControl(null, [Validators.required]),
        solicitante_id: new FormControl(null, [Validators.required]),
        direccion: new FormControl(null, [
          Validators.required,
          // this.noWhitespace,
          Validators.maxLength(255),
        ]),
        altura: new FormControl(null, [
          Validators.required,
          // this.noWhitespace,
          Validators.maxLength(255),
        ]),
        piso: new FormControl(null, [
          Validators.required,
          // this.noWhitespace,
          Validators.maxLength(255),
        ]),
        departamento: new FormControl(null, [
          Validators.required,
          // this.noWhitespace,
          Validators.maxLength(255),
        ]),
        comuna_id: new FormControl(null, [Validators.required]),
        tipo_red_id: new FormControl(null, [Validators.required]),
        tipo_trabajo_id: new FormControl(null, [Validators.required]),
        tiene_boleta_garantia: new FormControl(false, [Validators.required]),
        tiene_permisos: new FormControl(false, [Validators.required]),
        area_negocio: new FormControl(null, [
          Validators.required,
          // this.noWhitespace,
          Validators.maxLength(255),
        ]),
        nombre_proyectista: new FormControl(null, [
          Validators.required,
          // this.noWhitespace,
          Validators.maxLength(255),
        ]),
      }),
    });

    constructor() {}
  }
});
