import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirEvidenciasFormComponent } from './subir-evidencias-form.component';

describe('SubirEvidenciasFormComponent', () => {
  let component: SubirEvidenciasFormComponent;
  let fixture: ComponentFixture<SubirEvidenciasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubirEvidenciasFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubirEvidenciasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
