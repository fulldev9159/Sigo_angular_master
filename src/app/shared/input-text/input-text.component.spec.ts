import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { InputTextComponent } from './input-text.component';

describe('InputTextComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [InputTextComponent, TestComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
    template: `<zwc-input-text
      Label="*Nombre de la Cubicación"
      [control]="formCubControl.nombre"
      name_input="input-nombre-cubicacion"
    ></zwc-input-text>`,
  })
  class TestComponent {
    formCubControl = { nombre: new FormControl('', []) };
    constructor() {}
  }
});
