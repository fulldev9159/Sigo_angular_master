import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import * as loginModel from './login.model';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
declare let Snackbar: object | any;
@Component({
  selector: 'otec-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(
    private readonly fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  ngOnInit(): void {
    this.showMessage('No fue posible iniciar sesión', 'error');
  }

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
      this.authService
        .auth(this.values.username, this.values.password)
        .subscribe(
          (response) => {
            console.log('response');
            console.log(response);
            // console.log(Object.keys(response.data.roles_modules))
            this.authService.setToken(response.data.token);
            this.authService.setPrivilegios(response.data.roles_modulos);
            this.authService.setNombre(response.data.nombre_usuario);
            this.router.navigate(['/dashboard']);
          },
          (err) => {
            this.showMessage('No fue posible iniciar sesión', 'error');
            console.error(err.message);
          }
        );
    }
  }

  showMessage(message: string, type: string): void {
    Snackbar.show({
      pos: 'bottom-right',
      text: message,
      backgroundColor: '#212121',
      actionText: 'OK',
      actionTextColor: ((color) => {
        if (color === 'error') {
          return '#DB2828';
        }
        return '#2185D0';
      })(type),
      duration: 5000,
    });
  }
}
