import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

import { GenerarActaContainerComponent } from './generar-acta-container.component';

describe('GenerarActaContainerComponent', () => {
  let component: GenerarActaContainerComponent;
  let fixture: ComponentFixture<GenerarActaContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), RouterTestingModule],
      declarations: [GenerarActaContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GenerarActaContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
