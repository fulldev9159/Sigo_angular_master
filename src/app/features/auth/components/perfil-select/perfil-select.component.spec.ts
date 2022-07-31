import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilSelectComponent } from './perfil-select.component';

describe('PerfilSelectComponent', () => {
  let component: PerfilSelectComponent;
  let fixture: ComponentFixture<PerfilSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerfilSelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display select perfil', () => {});
});
