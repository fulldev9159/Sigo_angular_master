import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiTdComponent } from './multi-td.component';

describe('MultiTdComponent', () => {
  let component: MultiTdComponent;
  let fixture: ComponentFixture<MultiTdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiTdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiTdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
