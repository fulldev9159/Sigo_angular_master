import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { map, take, takeUntil } from 'rxjs/operators';

import { UserFacade } from '@storeOT/features/user/user.facade';
import { ProfileFacade } from '@storeOT/features/profile/profile.facade';

import { Provider, Area } from '@storeOT/features/user/user.model';
import { Profile } from '@storeOT/features/profile/profile.model';

@Component({
  selector: 'app-form-user2',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormUser2Component implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  formControls = {
    username: new FormControl(null, [Validators.required, this.noWhitespace]),
    nombres: new FormControl(null, [Validators.required, this.noWhitespace]),
    apellidos: new FormControl(null, [Validators.required, this.noWhitespace]),
    rut: new FormControl(null, [Validators.required, this.noWhitespace]),
    firma: new FormControl(null),
    celular: new FormControl(null),
    email: new FormControl(null, [Validators.required, Validators.email]),
    provider: new FormControl('false'),
    proveedor_id: new FormControl(null, [Validators.required]),
    area_id: new FormControl(null, [Validators.required]),
  };

  formUser: FormGroup = new FormGroup(this.formControls);

  providers$: Observable<Provider[]>;
  areas$: Observable<Area[]>;
  profiles$: Observable<Profile[]>;

  constructor(
    private userFacade: UserFacade,
    private router: Router,
    private profileFacade: ProfileFacade
  ) {}
  ngOnInit(): void {
    this.userFacade.resetData();

    this.initObservables();
    this.initFormControlsEvents();
    this.initData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  initObservables(): void {
    this.providers$ = this.userFacade
      .getProviders$()
      .pipe(map(perfiles => perfiles || []));
    this.areas$ = this.userFacade.getAreas$().pipe(map(areas => areas || []));
    this.profiles$ = this.profileFacade
      .getProfile$()
      .pipe(map(perfiles => perfiles || []));
  }

  initFormControlsEvents() {
    this.initProveerdorFromControlEvent();
  }

  initProveerdorFromControlEvent() {
    this.subscription.add(
      this.formUser.get('proveedor_id').valueChanges.subscribe(proveedor_id => {
        this.resetAreaFormControler();
        if (proveedor_id !== null && proveedor_id !== undefined) {
          this.userFacade.getContracts({
            proveedor_id: +proveedor_id,
          });
        }
      })
    );
  }

  resetAreaFormControler() {
    this.userFacade.resetArea();
    this.formUser.get('area_id').reset;
  }

  initData(): void {
    this.userFacade.getProviders({
      interno: true,
    });
    this.userFacade.getAreas({
      interno: true,
    });
  }

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
