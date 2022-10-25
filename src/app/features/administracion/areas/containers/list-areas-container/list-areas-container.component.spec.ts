import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { getAreas } from '@storeOT/area/area.selectors';

import { ListAreasContainerComponent } from './list-areas-container.component';

let initialState: any = { example: [] };

describe('ListAreasContainerComponent', () => {
  let component: ListAreasContainerComponent;
  let fixture: ComponentFixture<ListAreasContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [StoreModule.forRoot({}), RouterTestingModule],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: getAreas,
              value: [],
            },
          ],
        }),
      ],
      declarations: [ListAreasContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListAreasContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
