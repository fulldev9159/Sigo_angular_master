import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCubComponent } from './list-cub.component';

describe('ListCubComponent', () => {
  let component: ListCubComponent;
  let fixture: ComponentFixture<ListCubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListCubComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ListCubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
