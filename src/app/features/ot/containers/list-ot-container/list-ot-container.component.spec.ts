import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOtContainerComponent } from './list-ot-container.component';

describe('ListOtContainerComponent', () => {
  let component: ListOtContainerComponent;
  let fixture: ComponentFixture<ListOtContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOtContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOtContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
