import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@coreOT/services/auth.service';
import * as loginModel from '@coreOT/models/login.model';
import { Router } from '@angular/router';
import { SharedService } from '@coreOT/services/shared.service';
declare let Snackbar: object | any;
@Component({
  selector: 'ot-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private authService: AuthService,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  ngOnInit(): void {}

  get values(): loginModel.Credential {
    const data = this.form.getRawValue();
    return {
      username: data.username.trim(),
      password: data.password.trim(),
    } as loginModel.Credential;
  }

  get valid(): boolean {
    return this.form.valid;
  }

  submit(): void {
    if (this.valid) {
      this.authService.auth(this.values.username).subscribe(
        (response) => {
          this.authService.setItemStorage('username', this.values.username);
          this.authService.setItemStorage('otec_token', response.data.token);
          this.authService.setItemStorage(
            'nombreCompleto',
            response.data.nombre_usuario
          );
          Object.keys(response.data.roles_modulos).forEach((roles) => {
            this.authService.setItemStorage('rol', roles);
          });
          Object.keys(response.data.roles_modulos).forEach((roles) => {
            this.authService.setItemStorage(
              'modulos',
              Object.keys(response.data.roles_modulos[roles].modulos).toString()
            );
          });
          this.router.navigate(['/dashboard']);
        },
        (err) => {
          this.sharedService.showMessage(
            'No fue posible iniciar sesión',
            'error'
          );
          console.error(err.message);
        }
      );
    } else {
      this.sharedService.showMessage(
        'Debe ingresar todos los campos correctamente',
        'error'
      );
    }
  }
}
