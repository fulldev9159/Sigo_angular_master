import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from '@environment';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

import { ListUsuarioContainerComponent } from './list-usuario-container.component';

let initialState: any = { example: [] };

describe('ListUsuarioContainerComponent', () => {
  let component: ListUsuarioContainerComponent;
  let fixture: ComponentFixture<ListUsuarioContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [StoreModule.forRoot({}), RouterTestingModule],
      providers: [
        { provide: 'environment', useValue: environment },
        provideMockStore({
          initialState,
          selectors: [],
        }),
      ],
      declarations: [ListUsuarioContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListUsuarioContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
