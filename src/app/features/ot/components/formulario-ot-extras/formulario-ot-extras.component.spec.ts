import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { FormularioOtExtrasComponent } from './formulario-ot-extras.component';

describe('FormularioOtExtrasComponent', () => {
  let componentTest: TestComponent;
  let fixtureTest: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), FormsModule, ReactiveFormsModule],
      declarations: [FormularioOtExtrasComponent],
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
    template: `<zwc-formulario-ot-extras
      [form]="form.get('extras')"
    ></zwc-formulario-ot-extras>`,
  })
  class TestComponent {
    form: FormGroup = new FormGroup({
      extras: new FormGroup({
        fecha_inicio: new FormControl(null, [Validators.required]),
        fecha_fin: new FormControl(null, [Validators.required]),
        proyecto_id: new FormControl(null, []),
        observaciones: new FormControl(null, []),
        admin_contrato_id: new FormControl(null, [Validators.required]),
      }),
    });

    constructor() {}
  }
});
