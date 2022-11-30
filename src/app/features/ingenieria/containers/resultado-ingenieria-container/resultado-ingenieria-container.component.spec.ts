import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoIngenieriaContainerComponent } from './resultado-ingenieria-container.component';

describe('ResultadoIngenieriaContainerComponent', () => {
  let component: ResultadoIngenieriaContainerComponent;
  let fixture: ComponentFixture<ResultadoIngenieriaContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultadoIngenieriaContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultadoIngenieriaContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
