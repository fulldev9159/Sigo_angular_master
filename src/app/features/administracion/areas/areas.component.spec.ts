import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { getAreaSelected } from '@storeOT/area/area.selectors';

import { AreasComponent } from './areas.component';

let initialState: any = { example: [] };

describe('AreasComponent', () => {
  let component: AreasComponent;
  let fixture: ComponentFixture<AreasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [StoreModule.forRoot({}), RouterTestingModule],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: getAreaSelected,
              value: null,
            },
          ],
        }),
      ],
      declarations: [AreasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
