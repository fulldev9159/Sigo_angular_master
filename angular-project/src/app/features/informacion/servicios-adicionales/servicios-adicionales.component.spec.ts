import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosAdicionalesComponent } from './servicios-adicionales.component';

describe('ServiciosAdicionalesComponent', () => {
  let component: ServiciosAdicionalesComponent;
  let fixture: ComponentFixture<ServiciosAdicionalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiciosAdicionalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosAdicionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
