import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarActaOperacionesContainerComponent } from './validar-acta-operaciones-container.component';

describe('ValidarActaOperacionesContainerComponent', () => {
  let component: ValidarActaOperacionesContainerComponent;
  let fixture: ComponentFixture<ValidarActaOperacionesContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidarActaOperacionesContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidarActaOperacionesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
