import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarIngenieriaContainerComponent } from './validar-ingenieria-container.component';

describe('ValidarIngenieriaContainerComponent', () => {
  let component: ValidarIngenieriaContainerComponent;
  let fixture: ComponentFixture<ValidarIngenieriaContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidarIngenieriaContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidarIngenieriaContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
