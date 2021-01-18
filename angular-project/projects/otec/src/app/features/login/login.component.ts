import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import * as loginModel from './login.model'
import {AuthService}from '../../core/services/auth.service'
@Component({
  selector: 'otec-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  constructor(
    private readonly fb: FormBuilder,
    private authService:AuthService
    ) {
    this.form = this.fb.group({
      username: ['', [Validators.required,Validators.maxLength(50)]],
      password: ['', [Validators.required,Validators.maxLength(100)]]
    });
  }
  
  ngOnInit(): void {  }

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

  submit() {
    if (this.valid) {
      console.log(this.values)
      this.authService.auth(this.values.username,this.values.password).subscribe(response=>{
        console.log(response)
      })
    //   this.service.login(this.values).subscribe(response => {
    //     this.router.navigate(['/admin']);
    //   }, err => {
    //     this.showMessage('No fue posible iniciar sesión', 'error');
    //     console.error(err.message);
    //   });
    }
  }
}
