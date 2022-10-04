import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListActasComponent } from './list-actas.component';

describe('ListActasComponent', () => {
  let component: ListActasComponent;
  let fixture: ComponentFixture<ListActasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListActasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListActasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
