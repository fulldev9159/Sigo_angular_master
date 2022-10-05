import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPerfilesContainerComponent } from './form-perfiles-container.component';

describe('FormPerfilesContainerComponent', () => {
  let component: FormPerfilesContainerComponent;
  let fixture: ComponentFixture<FormPerfilesContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPerfilesContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPerfilesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
