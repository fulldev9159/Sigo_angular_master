import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { carrito } from '@storeOT/servicios/servicios.selectors';

import { TableServiciosComponent } from './table-servicios.component';

let initialState: any = { example: [] };

describe('TableServiciosComponent', () => {
  let component: TableServiciosComponent;
  let fixture: ComponentFixture<TableServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [StoreModule.forRoot({}), FormsModule, ReactiveFormsModule],
      declarations: [TableServiciosComponent],
      providers: [
        { provide: LOCALE_ID, useValue: 'es-CL' },
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: carrito,
              value: null,
            },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TableServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
