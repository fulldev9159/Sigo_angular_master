import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { cubicacionContratoMOCK200ok } from '@mocksOT';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CubicacionFacade } from '@storeOT/cubicacion/cubicacion.facades';
import { sendingCreateOT } from '@storeOT/loadings/loadings.selectors';
import { OTFacade } from '@storeOT/ot/ot.facades';
import { cubicacionSelected } from '@storeOT/ot/ot.selectors';

import { FormOtContainerComponent } from './form-ot-container.component';

describe('FormOtContainerComponent', () => {
  let component: FormOtContainerComponent;
  let fixture: ComponentFixture<FormOtContainerComponent>;
  let initialState: any = { example: [] };
  let store: MockStore<any>;
  let cubicacionFacade: CubicacionFacade;
  let otFacade: OTFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [StoreModule.forRoot({})],
      declarations: [FormOtContainerComponent],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: cubicacionSelected,
              value: cubicacionContratoMOCK200ok.data.items[0],
            },
            {
              selector: sendingCreateOT,
              value: false,
            },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormOtContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
