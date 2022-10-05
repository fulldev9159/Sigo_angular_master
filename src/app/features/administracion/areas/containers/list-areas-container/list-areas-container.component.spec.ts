import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAreasContainerComponent } from './list-areas-container.component';

describe('ListAreasContainerComponent', () => {
  let component: ListAreasContainerComponent;
  let fixture: ComponentFixture<ListAreasContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAreasContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAreasContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
