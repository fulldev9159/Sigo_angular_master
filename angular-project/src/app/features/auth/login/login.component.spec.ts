import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as formAuthReduce from '@storeOT/features/auth/auth.reducer';
import { AuthEffects } from '@storeOT/features/auth/auth.effects';
import { getLogin } from '@storeOT/features/auth/auth.selectors';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: MockStore;
  const initialState = { login: null, currentProfile: null };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        // EffectsModule.forRoot([]),
        // EffectsModule.forFeature([AuthEffects]),
        // StoreModule.forRoot({}),
        // StoreModule.forFeature(
        //   formAuthReduce.authFeatureKey,
        //   formAuthReduce.reducerAuth
        // ),
      ],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: getLogin,
              value: [
                {
                  login: null,
                },
              ],
            },
          ],
        }),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
