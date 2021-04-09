import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCubComponent } from './form-cub.component';

describe('FormCubComponent', () => {
  let component: FormCubComponent;
  let fixture: ComponentFixture<FormCubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
