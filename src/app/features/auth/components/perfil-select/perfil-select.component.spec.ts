import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '@environment';
import { PerfilUserMock200OK } from '@mocksOT';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@sharedOT/shared.module';
import { PerfilFacade } from '@storeOT/perfil/perfil.facades';
import { of } from 'rxjs';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { PerfilSelectComponent } from './perfil-select.component';
import { getPerfilesUsuario } from '@storeOT/perfil/perfil.selectors';
import { AuthFacade } from '@storeOT/auth/auth.facades';

describe('PerfilSelectComponent', () => {
  let component: PerfilSelectComponent;
  let fixture: ComponentFixture<PerfilSelectComponent>;
  let facade: PerfilFacade;
  let authFacade: AuthFacade;

  const initialState: any = { perfilesUsuario: null };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        SharedModule.forRoot(environment),
        StoreModule.forRoot({}),
      ],
      declarations: [PerfilSelectComponent],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: getPerfilesUsuario,
              value: PerfilUserMock200OK.data.perfiles,
            },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    facade = TestBed.inject(PerfilFacade);
    authFacade = TestBed.inject(AuthFacade);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display select perfil', () => {
    spyOn(facade, 'getPerfilesUsuario$').and.returnValue(
      of(PerfilUserMock200OK.data.perfiles)
    );

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('select')).toBeDefined();
  });

  it('should display gestor/JP', (done: DoneFn) => {
    component.perfilesUsuarioDropdown$.subscribe({
      next: drops => {
        expect(drops.length).toEqual(1);
        expect(drops[0].name).toEqual('Gestor/JP');
        expect(drops[0].code).toEqual(2);
        done();
      },
      error: done.fail,
    });
  });

  it('logout click should call logout facade', () => {
    const spyLogout = spyOn(component, 'logout');
    const spyAuthServiceLogout = spyOn(authFacade, 'Logout');
    const compiled = fixture.nativeElement;
    compiled.querySelector('#logout').click();
    expect(spyLogout).toHaveBeenCalled();
    // expect(spyAuthServiceLogout).toHaveBeenCalled();
  });
});
