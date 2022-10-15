import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  CECOMOCK200ok,
  LineaPresupuestariaMOCK200ok,
  OPEXMOCK200ok,
  PEP2MOCK200ok,
  PMOMOCK200ok,
  SAPMOCK200ok,
} from '@mocksOT';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { sendingGetPMO } from '@storeOT/loadings/loadings.selectors';
import { SustentoFinancieroFacade } from '@storeOT/sustento-financiero/sustento-financiero.facades';
import {
  getCECOs,
  getCuentasSAP,
  getIDsOpex,
  getLps,
  getPeps2,
  getPMO,
} from '@storeOT/sustento-financiero/sustento-financiero.selectors';

import { FormularioOtSustentoFinancieroComponent } from './formulario-ot-sustento-financiero.component';

describe('FormularioOtSustentoFinancieroComponent', () => {
  let componentTest: TestComponent;
  let fixtureTest: ComponentFixture<TestComponent>;
  let initialState: any = { example: [] };
  let store: MockStore<any>;
  let sustentoFinancieroFacade: SustentoFinancieroFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [StoreModule.forRoot({}), FormsModule, ReactiveFormsModule],
      declarations: [FormularioOtSustentoFinancieroComponent, TestComponent],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: getPMO,
              value: PMOMOCK200ok.data.items,
            },
            {
              selector: getLps,
              value: LineaPresupuestariaMOCK200ok.data.items,
            },
            { selector: getPeps2, value: PEP2MOCK200ok.data.items },
            {
              selector: getIDsOpex,
              value: OPEXMOCK200ok.data.items,
            },
            {
              selector: getCuentasSAP,
              value: SAPMOCK200ok.data.items,
            },
            {
              selector: getCECOs,
              value: CECOMOCK200ok.data.items,
            },
            {
              selector: sendingGetPMO,
              value: false,
            },
          ],
        }),
      ],
    }).compileComponents();

    fixtureTest = TestBed.createComponent(TestComponent);
    componentTest = fixtureTest.componentInstance;
    fixtureTest.detectChanges();
    sustentoFinancieroFacade = TestBed.inject(SustentoFinancieroFacade);

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
      sustentoFinanciero: new FormGroup({
        costos: new FormControl('capex', []),

        pmo_codigo: new FormControl(null, []),
        lp_codigo: new FormControl(null, []),
        pep2_capex_id: new FormControl(null, []),
        pep2_provisorio: new FormControl(null, []),

        id_opex_codigo: new FormControl(null, []),
        cuenta_sap_codigo: new FormControl(null, []),
        ceco_codigo: new FormControl(null, []),
        ceco_provisorio: new FormControl(null, []),
      }),
    });

    constructor() {}
  }
});
