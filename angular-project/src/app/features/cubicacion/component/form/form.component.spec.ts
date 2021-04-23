import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form.component';

describe('CubFormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let fb: FormBuilder;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [FormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fb = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   component.formCubicacion = fb.group({
  //     cubicacion_id: null,
  //     cubicacion_nombre: null,
  //     total: 0,
  //     nombre: [null, Validators.required],
  //     fecha_creacion: null,
  //     usuario_id: null,
  //     usuario_nombre: null,
  //     region_id: [null, Validators.required],
  //     region_nombre: null,
  //     contrato_marco_id: [null, Validators.required],
  //     contrato_marco_nombre: null,
  //     proveedor_id: [null, Validators.required],
  //     proveedor_nombre: null,
  //     subcontrato_id: null,
  //     asignado: null,
  //     adm_contrato_nombre: null,
  //     lpus: [],
  //     tipo_servicio_id: null,
  //   });
  //   expect(component).toBeTruthy();
  // });
});
