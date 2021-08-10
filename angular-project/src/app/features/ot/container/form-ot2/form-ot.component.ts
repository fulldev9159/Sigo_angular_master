import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  BehaviorSubject,
  Subject,
  Observable,
  Subscription,
  of,
  combineLatest,
} from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { OtFacade } from '@storeOT/features/ot/ot.facade';

@Component({
  selector: 'app-form-ot2',
  templateUrl: './form-ot.component.html',
  styleUrls: ['./form-ot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormOt2Component implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  formControls = {
    nombre: new FormControl('', [
      Validators.required,
      this.noWhitespace,
      Validators.maxLength(100),
    ]),
  };

  formOT: FormGroup = new FormGroup(this.formControls);

  constructor(private router: Router, private otFacade: OtFacade) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  goBack(): void {
    this.otFacade.resetData();
    this.router.navigate(['/app/ot/list-ot']);
  }

  noWhitespace(control: FormControl): any {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }
}
