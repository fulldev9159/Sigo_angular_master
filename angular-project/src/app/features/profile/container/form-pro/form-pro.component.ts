import { Component, ModuleWithComponentFactories, OnInit } from '@angular/core';
import { Observable, of, Subject, zip } from 'rxjs';
import * as Model from '@storeOT/features/profile/profile.model';
import { ProfileFacade } from '@storeOT/features/profile/profile.facade';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { groupBy, map, mergeMap, takeUntil, toArray } from 'rxjs/operators';

interface City {
  name: string,
  code: string,
  inactive: boolean,
  checkbox: boolean
}

@Component({
  selector: 'app-form-pro',
  templateUrl: './form-pro.component.html',
  styleUrls: ['./form-pro.component.scss']
})
export class FormProComponent implements OnInit {

  // declarations
  public groups = null
  cities: City[];
  selectedCities: City[];
  public authLogin = null;
  public permissions$: Observable<any>;
  private destroyInstance$: Subject<boolean> = new Subject();

  constructor(
    private authFacade: AuthFacade,
    private profileFacade: ProfileFacade
  ) { }

  ngOnInit(): void {

    // traemos contratos des api mediante efectos
    this.authFacade.getLogin$()
      .pipe(takeUntil(this.destroyInstance$))
      .subscribe(authLogin => {
        if (authLogin) {

          // asignamos datos de usuario autenticado a variable local
          this.authLogin = authLogin;

          // generamos llamada a api para rescatar permisos
          this.profileFacade.getPermissions({ token: authLogin.token });
        }
      });

    // escuchamos cambios en store para traer permisos a la vista permisos
    this.permissions$ = this.profileFacade.getPermissions$()
      .pipe(
        map(async (permissions: Model.Permit[]) => {
          const data = permissions.map((permit: Model.Permit) => {
            let permitCustom; if (permit && permit.slug) {
              permitCustom = { ...permit, module: permit.slug.split('_')[0] }
            }; return permitCustom;
          });

          return of(data) // <- this gets Observable<Object[]>
            .pipe(
              mergeMap(res => res), // <- use concatMap() if you care about the order
              groupBy(person => person.module),
              mergeMap(group => zip(of(group.key), group.pipe(toArray()))),
            );
        })
      );


    this.cities = [
      { name: 'Listar Ot', code: 'NY', inactive: false, checkbox: true },
      { name: 'Crear Ot', code: 'RM', inactive: true, checkbox: true },
      { name: 'Editar Ot', code: 'LDN', inactive: false, checkbox: true },
      { name: 'Eliminar Ot', code: 'IST', inactive: true, checkbox: true },
      { name: 'Aceptar Ot', code: 'PRS', inactive: false, checkbox: true },
      { name: 'Rechazar Ot', code: 'PRS', inactive: false, checkbox: true }
    ];
  }

}
