import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UserFacade } from '@storeOT/features/user/user.facade';

@Component({
  selector: 'app-form-user2',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormUser2Component implements OnInit, OnDestroy {
  formControls = {
    username: new FormControl(null, [Validators.required, this.noWhitespace]),
    nombres: new FormControl(null, [Validators.required, this.noWhitespace]),
    apellidos: new FormControl(null, [Validators.required, this.noWhitespace]),
    rut: new FormControl(null, [Validators.required, this.noWhitespace]),
    firma: new FormControl(null),
    calular: new FormControl(null),
    email: new FormControl(null, [Validators.required, Validators.email]),
  };

  formUser: FormGroup = new FormGroup(this.formControls);

  constructor(private userFacade: UserFacade, private router: Router) {}
  ngOnInit(): void {}
  ngOnDestroy(): void {}

  goBack(): void {
    this.userFacade.resetData();
    this.router.navigate(['/app/user/list-user']);
  }

  noWhitespace(control: FormControl): any {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }
}
