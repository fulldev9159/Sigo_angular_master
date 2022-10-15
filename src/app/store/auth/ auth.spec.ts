import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { AuthFacade } from './auth.facades';
import { getSessionData } from './auth.selectors';
import { SessionData } from '@model';
import * as authActions from './auth.actions';

describe('Auth Store', () => {
  let facade: AuthFacade;
  const initialState: any = { example: null };
  let store: Store<SessionData>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      declarations: [],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: getSessionData,
              value: {
                token: 'asdasdasd',
                usuario_id: 1,
                usuario_nombre: 'kljlk',
              },
            },
          ],
        }),
      ],
    }).compileComponents();
    store = TestBed.inject(Store);
    facade = new AuthFacade(store);
  });

  it('should create', () => {
    expect(facade).toBeTruthy();
  });

  it('should return session data in store', (done: DoneFn) => {
    facade.getSessionData$().subscribe({
      next: response => {
        expect(response).toEqual({
          token: 'asdasdasd',
          usuario_id: 1,
          usuario_nombre: 'kljlk',
        });
        done();
      },
    });
  });

  it('should call login action', () => {
    spyOn(store, 'dispatch');
    facade.Login('mgestor1', 'asd');
    expect(store.dispatch).toHaveBeenCalledWith(
      authActions.login({ username: 'mgestor1', password: 'asd' })
    );
  });

  it('should call logout and clearSession action', () => {
    spyOn(store, 'dispatch');
    facade.Logout();
    expect(store.dispatch).toHaveBeenCalledWith(authActions.ClearSession());
    expect(store.dispatch).toHaveBeenCalledWith(authActions.Logout());
  });

  it('should call refreshLogin action', () => {
    spyOn(store, 'dispatch');
    let [proxy_id, nombre_perfil, rol] = [1, 'asd', 'ads'];
    facade.refreshLogin(proxy_id, nombre_perfil, rol);
    expect(store.dispatch).toHaveBeenCalledWith(
      authActions.refreshLogin({ proxy_id, nombre_perfil, rol })
    );
  });

  it('should call getPermisosPerfilUsuario4Login action', () => {
    spyOn(store, 'dispatch');
    facade.getPermisosPerfilUsuario4Login();
    expect(store.dispatch).toHaveBeenCalledWith(
      authActions.getPermisosPerfilUsuario4Login()
    );
  });

  it('should call resetPerfil action', () => {
    spyOn(store, 'dispatch');
    facade.resetPerfil();
    expect(store.dispatch).toHaveBeenCalledWith(authActions.resetPerfil());
  });
});
