import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUsuarioContainerComponent } from './form-usuario-container.component';

describe('FormUsuarioContainerComponent', () => {
  let component: FormUsuarioContainerComponent;
  let fixture: ComponentFixture<FormUsuarioContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormUsuarioContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormUsuarioContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
