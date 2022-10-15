import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

import { ValidarActaContainerComponent } from './validar-acta-container.component';

describe('ValidarActaContainerComponent', () => {
  let component: ValidarActaContainerComponent;
  let fixture: ComponentFixture<ValidarActaContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), RouterTestingModule],
      declarations: [ValidarActaContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ValidarActaContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
