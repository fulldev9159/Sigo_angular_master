import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { FormularioOtBaseComponent } from './formulario-ot-base.component';

describe('FormularioOtBaseComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [FormularioOtBaseComponent, TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  @Component({
    selector: `zwc-host-component2`,
    template: `<zwc-formulario-ot-base
      [form]="form.get('general')"
    ></zwc-formulario-ot-base>`,
  })
  class TestComponent {
    form: FormGroup = new FormGroup({
      general: new FormGroup({
        nombre: new FormControl('', [
          Validators.required,
          // this.noWhitespace,
          Validators.maxLength(255),
        ]),
        contrato: new FormControl(null, [Validators.required]),
        cubicacion_id: new FormControl(null, [Validators.required]),
      }),
    });

    constructor() {}
  }
});
