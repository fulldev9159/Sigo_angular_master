import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRechazoComponent } from './view-rechazo.component';

describe('ViewRechazoComponent', () => {
  let component: ViewRechazoComponent;
  let fixture: ComponentFixture<ViewRechazoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRechazoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRechazoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
