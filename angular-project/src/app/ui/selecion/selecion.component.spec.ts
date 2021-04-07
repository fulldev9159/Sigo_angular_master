import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecionComponent } from './selecion.component';

describe('SelecionComponent', () => {
  let component: SelecionComponent;
  let fixture: ComponentFixture<SelecionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelecionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
