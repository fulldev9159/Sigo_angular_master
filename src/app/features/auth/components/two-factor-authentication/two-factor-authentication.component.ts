import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PerfilesUsuario } from '@model';
import { AuthFacade } from '@storeOT/auth/auth.facades';
import { LoadingsFacade } from '@storeOT/loadings/loadings.facade';
import { PerfilFacade } from '@storeOT/perfil/perfil.facades';
import { map, Observable, take, tap } from 'rxjs';

@Component({
  selector: 'zwc-two-factor-authentication',
  templateUrl: './two-factor-authentication.component.html',
  styleUrls: ['./two-factor-authentication.component.scss'],
})
export class TwoFactorAuthenticationComponent {
  formControls = {
    code: new FormControl('', [Validators.required]),
  };

  form2FA = new FormGroup(this.formControls);
  sendingLogin$: Observable<boolean> = this.loadingFacade.sendigLoading$();

  constructor(
    private perfilFacade: PerfilFacade,
    private authFacade: AuthFacade,
    private loadingFacade: LoadingsFacade
  ) {}

  login2FA(): void {
    if (this.form2FA.valid) {
      const { code } = this.form2FA.getRawValue();

      this.authFacade.Login2FA(code);
    }
  }

  logout(): void {
    this.authFacade.Logout();
  }
}
