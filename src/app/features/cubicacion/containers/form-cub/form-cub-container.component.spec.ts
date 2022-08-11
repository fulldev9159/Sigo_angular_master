import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCubContainerComponent } from './form-cub-container.component';

describe('FormCubComponent', () => {
  let component: FormCubContainerComponent;
  let fixture: ComponentFixture<FormCubContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormCubContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormCubContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
