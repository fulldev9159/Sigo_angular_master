import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCubComponent } from './list-cub.component';

describe('ListCubComponent', () => {
  let component: ListCubComponent;
  let fixture: ComponentFixture<ListCubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
