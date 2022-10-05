import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAreasContainerComponent } from './form-areas-container.component';

describe('FormAreasContainerComponent', () => {
  let component: FormAreasContainerComponent;
  let fixture: ComponentFixture<FormAreasContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAreasContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAreasContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
