import { Component, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  detalleCubicacionMOCK200Ok,
  listaCubicacionesMOCK200ok,
} from '@mocksOT';
import { provideMockStore } from '@ngrx/store/testing';
import { CubicacionFacade } from '@storeOT/cubicacion/cubicacion.facades';
import {
  detalleCubicacion,
  listarCubicaciones,
} from '@storeOT/cubicacion/cubicacion.selectors';
import {
  sendingDetalleCubicacion,
  sendingGetCubicaciones,
} from '@storeOT/loadings/loadings.selectors';
import { ServiciosFacade } from '@storeOT/servicios/servicios.facades';

import { ListCubComponent } from './list-cub.component';
let initialState: any = { example: [] };
let serviciosFacade: ServiciosFacade;
let cubicacionFacade: CubicacionFacade;

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
            {
              selector: sendingDetalleCubicacion,
              value: false,
            },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListCubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    serviciosFacade = TestBed.inject(ServiciosFacade);
    cubicacionFacade = TestBed.inject(CubicacionFacade);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('closeModalDetalleCubicacion should call reset CarritoServices and resetDetalleCubicacion', () => {
    spyOn(serviciosFacade, 'resetCarritoServices');
    spyOn(cubicacionFacade, 'resetDetalleCubicacion');
    component.closeModalDetalleCubicacion();
    expect(serviciosFacade.resetCarritoServices).toHaveBeenCalled();
    expect(cubicacionFacade.resetDetalleCubicacion).toHaveBeenCalled();
  });
});
