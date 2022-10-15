import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListActasContainerComponent } from './list-actas-container.component';

describe('ListActasContainerComponent', () => {
  let component: ListActasContainerComponent;
  let fixture: ComponentFixture<ListActasContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListActasContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListActasContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
