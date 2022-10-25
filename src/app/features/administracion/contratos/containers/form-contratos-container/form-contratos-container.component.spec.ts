import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import {
  getContratos,
  getContratoSelected,
} from '@storeOT/contrato/contrato.selectors';
import { contratoSelected } from '@storeOT/cubicacion/cubicacion.selectors';

import { FormContratosContainerComponent } from './form-contratos-container.component';

let initialState: any = { example: [] };

describe('FormContratosContainerComponent', () => {
  let component: FormContratosContainerComponent;
  let fixture: ComponentFixture<FormContratosContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [StoreModule.forRoot({}), RouterTestingModule],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: getContratoSelected,
              value: null,
            },
            {
              selector: getContratos,
              value: [],
            },
          ],
        }),
      ],
      declarations: [FormContratosContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormContratosContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
