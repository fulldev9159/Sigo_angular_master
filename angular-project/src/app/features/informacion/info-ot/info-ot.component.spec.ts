import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoOtComponent } from './info-ot.component';

describe('InfoOtComponent', () => {
  let component: InfoOtComponent;
  let fixture: ComponentFixture<InfoOtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoOtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoOtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
