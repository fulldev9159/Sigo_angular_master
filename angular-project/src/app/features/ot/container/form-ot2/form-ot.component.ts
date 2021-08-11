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
import { map, takeUntil } from 'rxjs/operators';

import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { OtFacade } from '@storeOT/features/ot/ot.facade';
import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';

import { Cubicacion } from '@storeOT/features/cubicacion/cubicacion.model';
import { Login } from '@data';

@Component({
  selector: 'app-form-ot2',
  templateUrl: './form-ot.component.html',
  styleUrls: ['./form-ot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormOt2Component implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  public authLogin: Login = null;
  public cubicaciones$: Observable<Cubicacion[]>;

  formControls = {
    nombre: new FormControl('', [
      Validators.required,
      this.noWhitespace,
      Validators.maxLength(100),
    ]),
    tipo: new FormControl(null, [Validators.required]),
    cubicacion_id: new FormControl(null, [Validators.required]),
  };

  formOT: FormGroup = new FormGroup(this.formControls);

  constructor(
    private router: Router,
    private otFacade: OtFacade,
    private cubageFacade: CubicacionFacade,
    private authFacade: AuthFacade
  ) {}

  ngOnInit(): void {
    this.otFacade.resetData();
    this.initObservables();
    this.initData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  initObservables(): void {
    this.cubicaciones$ = this.cubageFacade
      .getCubicacionSelector$()
      .pipe(
        map(cubicaciones =>
          cubicaciones.filter(
            cubicacion =>
              !cubicacion.asignado &&
              this.authLogin.usuario_id === cubicacion.creador_usuario_id
          )
        )
      );
  }

  initData(): void {
    this.subscription.add(
      this.authFacade.getLogin$().subscribe(profile => {
        if (profile) {
          this.cubageFacade.getCubicacionAction(+profile.perfiles[0].id);
          this.authLogin = profile;
        }
      })
    );
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
