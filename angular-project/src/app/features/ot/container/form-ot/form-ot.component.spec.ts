import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormOtComponent } from './form-ot.component';

describe('FormOtComponent', () => {
  let component: FormOtComponent;
  let fixture: ComponentFixture<FormOtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormOtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormOtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
