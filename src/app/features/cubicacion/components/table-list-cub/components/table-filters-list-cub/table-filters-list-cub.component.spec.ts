import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFiltersListCubComponent } from './table-filters-list-cub.component';

describe('TableFiltersListCubComponent', () => {
  let component: TableFiltersListCubComponent;
  let fixture: ComponentFixture<TableFiltersListCubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableFiltersListCubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableFiltersListCubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
