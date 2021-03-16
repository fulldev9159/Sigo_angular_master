import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CrearOtComponent } from './crear-ot.component';

describe('CreaOtComponent', () => {
  let component: CrearOtComponent;
  let fixture: ComponentFixture<CrearOtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearOtComponent],
      providers: [
        { provide: 'environment', useValue: {} },
        FormBuilder,
        FormGroup,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearOtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
