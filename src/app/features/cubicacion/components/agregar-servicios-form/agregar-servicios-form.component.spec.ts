import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarServiciosFormComponent } from './agregar-servicios-form.component';

describe('AgregarServiciosFormComponent', () => {
  let component: AgregarServiciosFormComponent;
  let fixture: ComponentFixture<AgregarServiciosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarServiciosFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarServiciosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
