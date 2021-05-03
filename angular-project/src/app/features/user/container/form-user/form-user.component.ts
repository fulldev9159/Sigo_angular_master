import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { ProfileFacade } from '@storeOT/features/profile/profile.facade';
import { UserFacade } from '@storeOT/features/user/user.facade';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit, OnDestroy {

  // declarations
  public formUser: FormGroup;
  public authLogin = null;
  public areas$: Observable<any[]>;
  public providers$: Observable<any[]>;
  public profiles$: Observable<any[]>;
  public highers$: Observable<any[]>;
  private destroyInstance: Subject<boolean> = new Subject();

  constructor(
    private fb: FormBuilder,
    private authFacade: AuthFacade,
    private userFacade: UserFacade,
    private profileFacade: ProfileFacade
  ) {
    this.authFacade
      .getLogin$()
      .pipe(takeUntil(this.destroyInstance))
      .subscribe((authLogin) => {
        if (authLogin) {
          // asignamos datos de usuario autenticado a variable local
          this.authLogin = authLogin;

          this.userFacade.getAreas({ token: this.authLogin.token });

          this.userFacade.getProviders({ token: this.authLogin.token });

          this.userFacade.getHighers({ token: this.authLogin.token });

          this.profileFacade.getProfile({ token: this.authLogin.token });
        }
      });
  }

  ngOnInit(): void {

    this.initForm();

    this.areas$ = this.userFacade.getAreas$();

    this.providers$ = this.userFacade.getProviders$();

    this.profiles$ = this.profileFacade.getProfile$();

    this.highers$ = this.userFacade.getHighers$();
  }

  initForm() {
    this.formUser = this.fb.group({
      username: null,
      nombre: [null, Validators.required],
      apellidos: null,
      rut: null,
      celular: null,
      email: null,
      provider: false,
      proveedor_id: null,
      area_id: null,
      superior_id: null,
      profile_id: null
    });
  }

  ngOnDestroy(): void {
    this.destroyInstance.next(true);
    this.destroyInstance.complete();
  }

}
