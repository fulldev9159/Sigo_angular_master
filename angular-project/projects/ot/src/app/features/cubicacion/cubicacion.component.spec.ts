import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CubicacionService } from '@coreOT/services/cubicacion.service';
import { CubicacionComponent } from './cubicacion.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

describe('CubicacionComponent', () => {
  let component: CubicacionComponent;
  let fixture: ComponentFixture<CubicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [CubicacionComponent],
      providers: [
        { provide: 'environment', useValue: {} },
        CubicacionService,
        FormBuilder,
        FormGroup,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CubicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
