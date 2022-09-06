import { Component, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  detalleCubicacionMOCK200Ok,
  listaCubicacionesMOCK200ok,
} from '@mocksOT';
import { provideMockStore } from '@ngrx/store/testing';
import {
  detalleCubicacion,
  listarCubicaciones,
} from '@storeOT/cubicacion/cubicacion.selectors';
import { sendingGetCubicaciones } from '@storeOT/loadings/loadings.selectors';

import { ListCubComponent } from './list-cub.component';
let initialState: any = { example: [] };

describe('ListCubComponent', () => {
  let component: ListCubComponent;
  let fixture: ComponentFixture<ListCubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListCubComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: LOCALE_ID, useValue: 'es-CL' },
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: listarCubicaciones,
              value: listaCubicacionesMOCK200ok.data.items,
            },
            {
              selector: sendingGetCubicaciones,
              value: false,
            },
            {
              selector: detalleCubicacion,
              value: detalleCubicacionMOCK200Ok.data,
            },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListCubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
