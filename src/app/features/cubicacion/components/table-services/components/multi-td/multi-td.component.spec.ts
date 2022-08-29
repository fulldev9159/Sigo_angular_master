import { Component, LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import localeEsCl from '@angular/common/locales/es-CL';

import { MultiTdComponent } from './multi-td.component';
import { registerLocaleData } from '@angular/common';

describe('MultiTdComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultiTdComponent, TestComponent],
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
      zwc-multi-td
      [uo]="item"
      [controlUOCantidad]="formLoginControls.uo_cantidad"
    ></tr>`,
  })
  class TestComponent {
    item = {
      uo_codigo: 'C048',
      uo_nombre: 'CABLE 900-26 SUB',
      uo_precio_total_clp: 0,
    };

    formLoginControls = {
      uo_cantidad: new FormControl(1),
    };
  }
});
