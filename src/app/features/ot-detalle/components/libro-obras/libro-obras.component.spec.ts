import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

import { LibroObrasComponent } from './libro-obras.component';

describe('LibroObrasComponent', () => {
  let component: LibroObrasComponent;
  let fixture: ComponentFixture<LibroObrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), RouterTestingModule],
      declarations: [LibroObrasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LibroObrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
