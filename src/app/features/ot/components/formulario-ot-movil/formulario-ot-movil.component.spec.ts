import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PlanProyectoMOCK200ok, SitoMOCK200ok } from '@mocksOT';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  sendingGetPlanDeProyecto,
  sendingGetSitioPlan,
} from '@storeOT/loadings/loadings.selectors';
import { OTFacade } from '@storeOT/ot/ot.facades';
import {
  getPlanDeProyecto,
  getSitioPlanProyecto,
} from '@storeOT/ot/ot.selectors';

import { FormularioOtMovilComponent } from './formulario-ot-movil.component';

describe('FormularioOtMovilComponent', () => {
  let componentTest: TestComponent;
  let fixtureTest: ComponentFixture<TestComponent>;
  let initialState: any = { example: [] };
  let store: MockStore<any>;
  let otFacade: OTFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [StoreModule.forRoot({}), FormsModule, ReactiveFormsModule],
      declarations: [FormularioOtMovilComponent, TestComponent],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: getPlanDeProyecto,
              value: PlanProyectoMOCK200ok.data.items,
            },
            {
              selector: sendingGetPlanDeProyecto,
              value: false,
            },
            {
              selector: getSitioPlanProyecto,
              value: SitoMOCK200ok.data.items,
            },
            {
              selector: sendingGetSitioPlan,
              value: false,
            },
          ],
        }),
      ],
    }).compileComponents();
    fixtureTest = TestBed.createComponent(TestComponent);
    componentTest = fixtureTest.componentInstance;
    fixtureTest.detectChanges();
    otFacade = TestBed.inject(OTFacade);

    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(componentTest).toBeTruthy();
  });

  @Component({
    selector: `zwc-host-component2`,
    template: `<zwc-formulario-ot-movil
      [form]="form.get('movil')"
    ></zwc-formulario-ot-movil>`,
  })
  class TestComponent {
    form: FormGroup = new FormGroup({
      movil: new FormGroup({
        plan_proyecto_id: new FormControl(null, [Validators.required]),
        sitio_id: new FormControl(null, [Validators.required]),
      }),
    });

    constructor() {}
  }
});
