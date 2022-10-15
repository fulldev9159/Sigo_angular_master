import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TestBed, inject } from '@angular/core/testing';
import { PerfilesUsuarioResolver } from './perfiles-usuario.resolver';
import { PerfilesHttpService } from '@services';
import { PerfilFacade } from '@storeOT/perfil/perfil.facades';
import { LoadingsFacade } from '@storeOT/loadings/loadings.facade';
import { PerfilUserMock200OK } from '@mocksOT';
import { map, of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

function fakeRouterState(url: string): RouterStateSnapshot {
  return {
    url,
  } as RouterStateSnapshot;
}

describe('Perfiles Usuario resolver', () => {
  let service: PerfilesHttpService;
  let perfilFacade: PerfilFacade;
  let loadingFacade: LoadingsFacade;
  let resolver: PerfilesUsuarioResolver;
  const dummyRoute = {} as ActivatedRouteSnapshot;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StoreModule.forRoot({})],
      declarations: [],
    }).compileComponents();

    service = TestBed.inject(PerfilesHttpService);
    perfilFacade = TestBed.inject(PerfilFacade);
    loadingFacade = TestBed.inject(LoadingsFacade);

    resolver = new PerfilesUsuarioResolver(
      service,
      perfilFacade,
      loadingFacade
    );

    localStorage.setItem(
      'auth',
      JSON.stringify({
        sessionData: {
          nombre_perfil_select: 'Gestor/JP',
          perfil_proxy_id: 2,
          permisos: [
            {
              id: 1,
              slug: 'OT_LISTAR',
              nombre_corto: 'Listar',
              descripcion: 'Poder visualizar OT',
            },
          ],
          rol: 'Gestor/JP (Telefónica)',
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjAxODU3NjYsImlzcyI6InNpZ28iLCJuYmYiOjE2NjAxODIxNjY',
          usuario_id: 2,
          usuario_nombre: 'JESSICA MOVISTAR CASTILLO 1',
        },
      })
    );
  });

  it('should create', () => {
    expect(resolver).toBeTruthy();
  });

  it('should call getPerfilesUsuarioSucess', (done: DoneFn) => {
    spyOn(perfilFacade, 'getPerfilesUsuarioSuccess');
    spyOn(service, 'getPerfilesUsuario').and.returnValue(
      of(PerfilUserMock200OK)
    );
    resolver.resolve(dummyRoute, fakeRouterState('home')).subscribe({
      next: response => {
        expect(perfilFacade.getPerfilesUsuarioSuccess).toHaveBeenCalled();
        done();
      },
      error: done.fail,
    });
  });

  it('should call getPerfilesUsuarioErr', (done: DoneFn) => {
    spyOn(perfilFacade, 'getPerfilesUsuarioError');
    spyOn(service, 'getPerfilesUsuario').and.returnValue(throwError(() => {}));

    resolver
      .resolve(dummyRoute, fakeRouterState('home'))
      .subscribe({ next: Response => done(), error: err => done() });

    done();
  });
});
