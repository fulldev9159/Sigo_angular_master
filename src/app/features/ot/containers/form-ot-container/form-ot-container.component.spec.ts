import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormOtContainerComponent } from './form-ot-container.component';

describe('FormOtContainerComponent', () => {
  let component: FormOtContainerComponent;
  let fixture: ComponentFixture<FormOtContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormOtContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormOtContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
