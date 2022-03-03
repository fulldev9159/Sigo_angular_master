import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListContratosComponent } from './list-contratos.component';

describe('ListContratosComponent', () => {
  let component: ListContratosComponent;
  let fixture: ComponentFixture<ListContratosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListContratosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListContratosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
