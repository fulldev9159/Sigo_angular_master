import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioOtSustentoFinancieroComponent } from './formulario-ot-sustento-financiero.component';

describe('FormularioOtSustentoFinancieroComponent', () => {
  let component: FormularioOtSustentoFinancieroComponent;
  let fixture: ComponentFixture<FormularioOtSustentoFinancieroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioOtSustentoFinancieroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioOtSustentoFinancieroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
