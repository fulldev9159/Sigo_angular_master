import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from '@environment';
import { LogService } from '@log';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

import { ListContratosContainerComponent } from './list-contratos-container.component';

let initialState: any = { example: [] };

describe('ListContratosContainerComponent', () => {
  let component: ListContratosContainerComponent;
  let fixture: ComponentFixture<ListContratosContainerComponent>;

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
      declarations: [ListContratosContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListContratosContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
