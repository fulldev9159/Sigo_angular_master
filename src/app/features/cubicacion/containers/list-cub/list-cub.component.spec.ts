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

  it('showDetalleCubicacion display modal, reset carritoService antes de llenarlo con nuevos datos y llamar al facade con id 1 ', () => {
    spyOn(cubicacionFacade, 'detalleCubicacion');
    component.showDetalleCubicacion(1);
    expect(component.displayModalDetalleCubicacion).toBe(true);
    expect(cubicacionFacade.detalleCubicacion).toHaveBeenCalledWith(1);
  });

  it('showClonarCubicacion display modal llamar al facade con id 1 ', () => {
    spyOn(cubicacionFacade, 'detalleCubicacion');
    component.showClonarCubicacion(1);
    expect(component.displayModalClonarCubicacion).toBe(true);
    expect(cubicacionFacade.detalleCubicacion).toHaveBeenCalledWith(1);
  });

  it('closeModalClonarCubicacion should call resetDetalleCubicacion', () => {
    spyOn(cubicacionFacade, 'resetDetalleCubicacion');
    component.closeModalDetalleCubicacion();
    expect(component.displayModalClonarCubicacion).toBe(false);
    expect(cubicacionFacade.resetDetalleCubicacion).toHaveBeenCalled();
  });

  it('showEliminarCubicacion display modal  and store cubicacion_id', () => {
    spyOn(cubicacionFacade, 'eliminarCubicacion');
    component.showEliminarCubicacion(1);
    expect(component.cubicacion_id).toEqual(1);
    expect(component.displayModalEliminarCubicacion).toBe(true);
  });

  it('confirmarEliminarCubicacion should call eliminarCubicacion', () => {
    spyOn(cubicacionFacade, 'eliminarCubicacion');
    component.showEliminarCubicacion(1);
    component.confirmarEliminarCubicacion();
    expect(component.displayModalEliminarCubicacion).toBe(false);
    expect(cubicacionFacade.eliminarCubicacion).toHaveBeenCalledWith(1);
  });

  it('closeModalEliminarCubicacion hide modal', () => {
    component.closeModalEliminarCubicacion();
    expect(component.displayModalEliminarCubicacion).toBe(false);
  });
});
