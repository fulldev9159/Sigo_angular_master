import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { cubicacionSelected } from '@storeOT/ot/ot.selectors';
import { carrito } from '@storeOT/servicios/servicios.selectors';

import { InformeAvanceComponent } from './informe-avance.component';

describe('InformeAvanceComponent', () => {
  let component: InformeAvanceComponent;
  let fixture: ComponentFixture<InformeAvanceComponent>;
  let initialState: any = { example: [] };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [StoreModule.forRoot({}), RouterTestingModule],
      declarations: [InformeAvanceComponent],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: carrito,
              value: [],
            },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InformeAvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
