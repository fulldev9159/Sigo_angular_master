import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

import { ValidarPagoActaContainerComponent } from './validar-pago-acta-container.component';

describe('ValidarPagoActaContainerComponent', () => {
  let component: ValidarPagoActaContainerComponent;
  let fixture: ComponentFixture<ValidarPagoActaContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), RouterTestingModule],
      declarations: [ValidarPagoActaContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ValidarPagoActaContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
