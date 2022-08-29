import { registerLocaleData } from '@angular/common';
import { Component, LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormControl } from '@angular/forms';
import localeEsCl from '@angular/common/locales/es-CL';

import { BaseTdComponent } from './base-td.component';

describe('BaseTdComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaseTdComponent, TestComponent],
      providers: [{ provide: LOCALE_ID, useValue: 'es-CL' }],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    registerLocaleData(localeEsCl, 'es-CL');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  @Component({
    selector: `zwc-test-component`,
    template: ` <tr
      zwc-base-td
      [item]="item"
      [controlServicioCantidad]="formLoginControls.servicio_cantidad"
      [controlUOCantidad]="formLoginControls.servicio_cantidad"
    ></tr>`,
  })
  class TestComponent {
    item = {
      servicio_id: 141,
      servicio_codigo: 'J101',
      servicio_precio_final_clp: 471.59999999999997,
      servicio_nombre: 'INSTALAR CABLE EN CANALIZACION GRUPOS A Y B',
      actividad_descripcion: 'MATRIZ',
      tipo_servicio_descripcion: 'LINEAS',
      unidad_obras: [
        {
          uo_codigo: 'C048',
          uo_nombre: 'CABLE 900-26 SUB',
          uo_precio_total_clp: 0,
        },
        {
          uo_codigo: 'C926',
          uo_nombre: 'CABLE 1800-26 PS',
          uo_precio_total_clp: 0,
        },
        {
          uo_codigo: 'C881',
          uo_nombre: 'CABLE FS 1212-24 SUB.',
          uo_precio_total_clp: 0,
        },
      ],
    };

    formLoginControls = {
      servicio_cantidad: new FormControl(1),
    };
  }
});
