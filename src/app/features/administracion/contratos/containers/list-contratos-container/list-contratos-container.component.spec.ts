import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListContratosContainerComponent } from './list-contratos-container.component';

describe('ListContratosContainerComponent', () => {
  let component: ListContratosContainerComponent;
  let fixture: ComponentFixture<ListContratosContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListContratosContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListContratosContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
