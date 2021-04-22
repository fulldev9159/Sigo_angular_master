import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

import { FormOtComponent } from './form-ot.component';

describe('FormOtComponent', () => {
  let component: FormOtComponent;
  let fixture: ComponentFixture<FormOtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormOtComponent ],
      providers: [
        FormBuilder,
        FormGroup,
      ],

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormOtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
