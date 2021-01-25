import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import * as loginModel from './login.model';
import { AuthService } from '../../core/services/auth.service';
import { ThrowStmt } from '@angular/compiler';
import { Router } from '@angular/router';
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
      console.log(this.values);
      // this.authService
      //   .auth(this.values.username, this.values.password)
      //   .subscribe((response) => {
      //     console.log(response);
      //     this.authService.setToken(response.data.token);
      //     this.authService.setPrivilegios(response.data.roles_modules);
      //     this.router.navigate(['/dashboard']);
      //   });
      this.authService.authmock(this.values.username).subscribe((response) => {
        console.log(response);
        this.authService.setToken(response.data.token);
        this.authService.setPrivilegios(response.data.roles_modules);
        this.authService.setNombre(response.data.nombre_usuario);
        this.router.navigate(['/dashboard']);
      });
    }
  }
}
