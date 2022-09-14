import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioOtBucleComponent } from './formulario-ot-bucle.component';

describe('FormularioOtBucleComponent', () => {
  let component: FormularioOtBucleComponent;
  let fixture: ComponentFixture<FormularioOtBucleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioOtBucleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioOtBucleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
