import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { ContratoFacade } from './contrato.facades';

describe('Auth Store', () => {
  let facade: ContratoFacade;
  const initialState: any = { example: null };
  let store: Store<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      declarations: [],
      // providers: [
      //   provideMockStore({
      //     initialState,
      //     selectors: [
      //       {
      //         selector: getSessionData,
      //         value: {
      //           token: 'asdasdasd',
      //           usuario_id: 1,
      //           usuario_nombre: 'kljlk',
      //         },
      //       },
      //     ],
      //   }),
      // ],
    }).compileComponents();
    store = TestBed.inject(Store);
    facade = new ContratoFacade(store);
  });

  it('should create', () => {
    expect(facade).toBeTruthy();
  });

  // it('should call login action', () => {
  //   spyOn(store, 'dispatch');
  //   facade.Login('mgestor1', 'asd');
  //   expect(store.dispatch).toHaveBeenCalledWith(
  //     authActions.login({ username: 'mgestor1', password: 'asd' })
  //   );
  // });

  // it('should call logout and clearSession action', () => {
  //   spyOn(store, 'dispatch');
  //   facade.Logout();
  //   expect(store.dispatch).toHaveBeenCalledWith(authActions.ClearSession());
  //   expect(store.dispatch).toHaveBeenCalledWith(authActions.Logout());
  // });
});
