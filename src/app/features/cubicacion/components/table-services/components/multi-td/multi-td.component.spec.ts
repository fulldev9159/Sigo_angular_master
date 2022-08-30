import { Component, LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import localeEsCl from '@angular/common/locales/es-CL';

import { MultiTdComponent } from './multi-td.component';
import { registerLocaleData } from '@angular/common';

describe('MultiTdComponent', () => {
  let fixtureTest: ComponentFixture<TestComponent>;
  let componentTest: TestComponent;
  // let fixture: ComponentFixture<MultiTdComponent>;
  // let component: MultiTdComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultiTdComponent, TestComponent],
      providers: [{ provide: LOCALE_ID, useValue: 'es-CL' }],
    }).compileComponents();

    fixtureTest = TestBed.createComponent(TestComponent);
    componentTest = fixtureTest.componentInstance;
    fixtureTest.detectChanges();
    // fixture = TestBed.createComponent(MultiTdComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
    registerLocaleData(localeEsCl, 'es-CL');
  });

  it('should create', () => {
    expect(componentTest).toBeTruthy();
  });

  it('should callDeleteUOFromServicioFromCarrito should call emmit', () => {
    spyOn(componentTest, 'call');
    const compiled = fixtureTest.nativeElement as HTMLElement;
    compiled.querySelector('button').click();
    expect(componentTest.call).toHaveBeenCalled();
  });
  @Component({
    selector: `zwc-test-component`,
    template: ` <tr
      zwc-multi-td
      [uo]="item"
      [controlUOCantidad]="formLoginControls.uo_cantidad"
      (deleteUO)="call()"
    ></tr>`,
  })
  class TestComponent {
    item = {
      uo_codigo: 'C048',
      uo_nombre: 'CABLE 900-26 SUB',
      uo_precio_total_clp: 0,
      actividad_descripcion: 'dasd',
    };

    formLoginControls = {
      uo_cantidad: new FormControl(1),
    };

    call(): void {}
  }
});
