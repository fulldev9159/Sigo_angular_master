import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormContratosContainerComponent } from './form-contratos-container.component';

describe('FormContratosContainerComponent', () => {
  let component: FormContratosContainerComponent;
  let fixture: ComponentFixture<FormContratosContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormContratosContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormContratosContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
