import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailComponent } from './detail.component';

describe('OTDetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   component.cubage = 1;
  //   expect(component).toBeTruthy();
  // });
});
