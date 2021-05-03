import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KituiComponent } from './kitui.component';

describe('KituiComponent', () => {
  let component: KituiComponent;
  let fixture: ComponentFixture<KituiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KituiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KituiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
