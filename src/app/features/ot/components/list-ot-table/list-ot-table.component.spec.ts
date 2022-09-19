import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOtTableComponent } from './list-ot-table.component';

describe('ListOtTableComponent', () => {
  let component: ListOtTableComponent;
  let fixture: ComponentFixture<ListOtTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOtTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOtTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
