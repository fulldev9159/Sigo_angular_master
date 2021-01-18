import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import * as loginModel from './login.model'
@Component({
  selector: 'otec-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

//   form:FormGroup=this.formBuilder.group({
//     username: ['', [Validators.required,Validators.maxLength(50)]],
//     password: ['', [Validators.required, Validators.maxLength(100)]],
// });
  // controls = {
  //   username: new FormControl('', [
  //     Validators.required,
  //     Validators.maxLength(50)
  //   ]),
  //   password: new FormControl('', [
  //     Validators.required,
  //     Validators.maxLength(100)
  //   ]),
  // };

  // form: FormGroup = new FormGroup(this.controls);

  form: FormGroup;
  constructor(private readonly fb: FormBuilder) {
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
    //   this.service.login(this.values).subscribe(response => {
    //     this.router.navigate(['/admin']);
    //   }, err => {
    //     this.showMessage('No fue posible iniciar sesión', 'error');
    //     console.error(err.message);
    //   });
    }
  }
}
