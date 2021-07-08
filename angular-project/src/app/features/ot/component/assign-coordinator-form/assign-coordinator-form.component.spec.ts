import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignCoordinatorFormComponent } from './assign-coordinator-form.component';

describe('AssignCoordinatorFormComponent', () => {
  let component: AssignCoordinatorFormComponent;
  let fixture: ComponentFixture<AssignCoordinatorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignCoordinatorFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignCoordinatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
