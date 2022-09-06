import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { carrito } from '@storeOT/servicios/servicios.selectors';

import { ViewTableServicesComponent } from './view-table-services.component';
let initialState: any = { example: [] };

describe('ViewTableServicesComponent', () => {
  let component: ViewTableServicesComponent;
  let fixture: ComponentFixture<ViewTableServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewTableServicesComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [StoreModule.forRoot({})],
      providers: [
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

    fixture = TestBed.createComponent(ViewTableServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
