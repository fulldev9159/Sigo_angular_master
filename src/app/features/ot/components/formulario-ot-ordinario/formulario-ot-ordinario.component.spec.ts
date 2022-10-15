import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { FormularioOtOrdinarioComponent } from './formulario-ot-ordinario.component';

describe('FormularioOtOrdinarioComponent', () => {
  let componentTest: TestComponent;
  let fixtureTest: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule, ReactiveFormsModule],

      declarations: [FormularioOtOrdinarioComponent],
    }).compileComponents();

    fixtureTest = TestBed.createComponent(TestComponent);
    componentTest = fixtureTest.componentInstance;
    fixtureTest.detectChanges();
  });

  it('should create', () => {
    expect(componentTest).toBeTruthy();
  });

  @Component({
    selector: `zwc-host-component2`,
    template: `<zwc-formulario-ot-ordinario
      [form]="form.get('ordinario')"
    ></zwc-formulario-ot-ordinario>`,
  })
  class TestComponent {
    form: FormGroup = new FormGroup({
      ordinario: new FormGroup({
        carta_adjudicacion: new FormControl(null, [
          Validators.required,
          // this.noWhitespace,
          Validators.maxLength(255),
        ]),
        fecha_adjudicacion: new FormControl(null, [Validators.required]),
        numero_pedido: new FormControl(null, [
          Validators.required,
          // this.noWhitespace,
          Validators.maxLength(255),
        ]),
        materia: new FormControl(null, [
          Validators.required,
          // this.noWhitespace,
          Validators.maxLength(255),
        ]),
      }),
    });

    constructor() {}
  }
});
