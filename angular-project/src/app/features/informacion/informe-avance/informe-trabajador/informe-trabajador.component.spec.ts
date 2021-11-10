import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeTrabajadorComponent } from './informe-trabajador.component';

describe('InformeTrabajadorComponent', () => {
  let component: InformeTrabajadorComponent;
  let fixture: ComponentFixture<InformeTrabajadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformeTrabajadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeTrabajadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
