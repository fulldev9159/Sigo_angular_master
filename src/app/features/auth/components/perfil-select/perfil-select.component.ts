import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PerfilesUsuario } from '@model';
import { AuthFacade } from '@storeOT/auth/auth.facades';
import { LoadingsFacade } from '@storeOT/loadings/loadings.facade';
import { PerfilFacade } from '@storeOT/perfil/perfil.facades';
import { map, Observable, take, tap } from 'rxjs';

interface Dropdown {
  name: string;
  code: number;
}
@Component({
  selector: 'zwc-perfil-select',
  templateUrl: './perfil-select.component.html',
  styleUrls: ['./perfil-select.component.scss'],
})
export class PerfilSelectComponent {
  perfilesUsuarioDropdown$: Observable<Dropdown[]> = this.perfilFacade
    .getPerfilesUsuario$()
    .pipe(
      tap(perfiles => (this.perfilesUsuario = perfiles)),
      map(perfiles =>
        perfiles.length > 0
          ? perfiles.map(perfil => ({
              name: perfil.model_perfil_id?.nombre,
              code: perfil.id,
            }))
          : []
      ),
      take(1)
    );
  perfilesUsuario: PerfilesUsuario[];

  sendingGetPerfilesUser$: Observable<boolean> =
    this.loadingFacade.sendingGetPerfilesUser$();
  sendingPermisosPerfilUser$: Observable<boolean> =
    this.loadingFacade.sendingPermisosPerfilUser$();

  formControls = {
    perfil_id: new FormControl('', [Validators.required]),
  };

  formPerfilUser = new FormGroup(this.formControls);

  constructor(
    private perfilFacade: PerfilFacade,
    private authFacade: AuthFacade,
    private loadingFacade: LoadingsFacade
  ) {}

  perfilar(): void {
    const proxy_id_selected = +this.formPerfilUser.get('perfil_id').value;
    const perfil_selected = this.perfilesUsuario.filter(
      perfil => perfil.id === proxy_id_selected
    );
    if (perfil_selected.length > 1 || perfil_selected.length === 0) {
      throw Error('Falla al obtener el perfil seleccionado');
    }
    this.authFacade.refreshLogin(
      proxy_id_selected,
      perfil_selected[0].model_perfil_id.nombre,
      perfil_selected[0].model_perfil_id.model_rol_id.nombre
    );
  }

  logout(): void {
    this.authFacade.Logout();
  }
}
