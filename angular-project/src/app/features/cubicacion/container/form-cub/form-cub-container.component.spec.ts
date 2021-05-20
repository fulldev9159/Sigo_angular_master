import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { FormCubContainerComponent } from './form-cub-container.component';

describe('FormCubContainer', () => {
  let component: FormCubContainerComponent;
  let fixture: ComponentFixture<FormCubContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [FormCubContainerComponent],
      providers: [
        FormBuilder,
        FormGroup,
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCubContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
