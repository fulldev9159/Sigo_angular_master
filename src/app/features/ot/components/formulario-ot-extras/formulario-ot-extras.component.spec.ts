import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioOtExtrasComponent } from './formulario-ot-extras.component';

describe('FormularioOtExtrasComponent', () => {
  let component: FormularioOtExtrasComponent;
  let fixture: ComponentFixture<FormularioOtExtrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioOtExtrasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioOtExtrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
