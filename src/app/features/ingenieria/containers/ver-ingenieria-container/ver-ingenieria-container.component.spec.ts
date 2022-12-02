import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerIngenieriaContainerComponent } from './ver-ingenieria-container.component';

describe('VerIngenieriaContainerComponent', () => {
  let component: VerIngenieriaContainerComponent;
  let fixture: ComponentFixture<VerIngenieriaContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerIngenieriaContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerIngenieriaContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
