import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '@environment';
import { PerfilUserMock200OK } from '@mocksOT';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@sharedOT/shared.module';
import { PerfilFacade } from '@storeOT/perfil/perfil.facades';
import { of } from 'rxjs';

import { PerfilSelectComponent } from './perfil-select.component';

describe('PerfilSelectComponent', () => {
  let component: PerfilSelectComponent;
  let fixture: ComponentFixture<PerfilSelectComponent>;
  let facade: PerfilFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        SharedModule.forRoot(environment),
        StoreModule.forRoot({}),
      ],
      declarations: [PerfilSelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    facade = TestBed.inject(PerfilFacade);
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

  // it('should display gestor/JP', (done: DoneFn) => {
  //   spyOn(facade, 'getPerfilesUsuario$').and.returnValue(
  //     of(PerfilUserMock200OK.data.perfiles)
  //   );

  //   component.perfilesUsuarioDropdown$.subscribe({
  //     next: drops => {
  //       expect(drops.length).toEqual(1);
  //       done();
  //     },
  //     error: done.fail,
  //   });
  // });
});
