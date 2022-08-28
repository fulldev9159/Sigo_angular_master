import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseTdComponent } from './base-td.component';

describe('BaseTdComponent', () => {
  let component: BaseTdComponent;
  let fixture: ComponentFixture<BaseTdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseTdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseTdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
