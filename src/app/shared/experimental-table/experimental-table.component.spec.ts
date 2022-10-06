import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentalTableComponent } from './experimental-table.component';

describe('ExperimentalTableComponent', () => {
  let component: ExperimentalTableComponent;
  let fixture: ComponentFixture<ExperimentalTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperimentalTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperimentalTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
