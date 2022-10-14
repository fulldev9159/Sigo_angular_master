import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarLibroObrasComponent } from './registrar-libro-obras.component';

describe('RegistrarLibroObrasComponent', () => {
  let component: RegistrarLibroObrasComponent;
  let fixture: ComponentFixture<RegistrarLibroObrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarLibroObrasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarLibroObrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
