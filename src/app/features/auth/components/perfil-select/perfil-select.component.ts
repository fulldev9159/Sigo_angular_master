import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ResolveEnd, ResolveStart, Router } from '@angular/router';
import { AuthFacade } from '@storeOT/auth/auth.facades';
import { PerfilFacade } from '@storeOT/perfil/perfil.facades';
import { filter, map, merge, Observable, take } from 'rxjs';

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

  formControls = {
    perfil_id: new FormControl('', [Validators.required]),
  };

  formPerfilUser = new FormGroup(this.formControls);

  constructor(
    private perfilFacade: PerfilFacade,
    private authFacade: AuthFacade
  ) {}

  logout(): void {
    this.authFacade.Logout();
  }
}
