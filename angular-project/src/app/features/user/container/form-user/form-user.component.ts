import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { ProfileFacade } from '@storeOT/features/profile/profile.facade';
import { UserFacade } from '@storeOT/features/user/user.facade';
import { MessageService } from 'primeng/api';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import * as Model from '@storeOT/features/user/user.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormUserComponent implements OnInit, OnDestroy {

  // declarations
  public user_id: number;
  public perfilId: number;
  public proveedor_id = null;
  public profiles = [];
  public formUser: FormGroup;
  public authLogin = null;
  public areas$: Observable<any[]>;
  public providers$: Observable<any[]>;
  public profiles$: Observable<any[]>;
  public highers$: Observable<any[]>;
  public contracts$: Observable<any[]>;
  public profilesMandatory$: Observable<any[]>;
  private destroyInstance$: Subject<boolean> = new Subject();
  private pageSubscription: Subscription[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authFacade: AuthFacade,
    private userFacade: UserFacade,
    private rutaActiva: ActivatedRoute,
    private profileFacade: ProfileFacade,
    private messageService: MessageService
  ) {
    const subscription = this.authFacade
      .getLogin$()
      .pipe(take(1), takeUntil(this.destroyInstance$))
      .subscribe((authLogin) => {
        if (authLogin) {
          // asignamos datos de usuario autenticado a variable local
          this.authLogin = authLogin;

          this.userFacade.getProviders({ token: this.authLogin.token, interno: true });

          this.profileFacade.getProfile({ token: this.authLogin.token });
        }
      });
    this.pageSubscription.push(subscription);

  }

  ngOnInit(): void {

    this.profilesMandatory$ = of([]);

    this.initForm();

    this.areas$ = this.userFacade.getAreas$();

    this.providers$ = this.userFacade.getProviders$();

    this.profiles$ = this.profileFacade.getProfile$();

    this.highers$ = this.userFacade.getHighers$()
      .pipe(
        map(highers => {
          if (highers && highers.length > 0) {
            const perfil = this.formUser.get('perfiles').value.findIndex(p => +p.perfil_id === +this.perfilId);
            if (perfil !== -1) {
              this.profiles.push({ perfil_id: +this.perfilId, perfiles: highers });
              this.profilesMandatory$ = of(this.profiles);
            }
          }
          return highers;
        }), takeUntil(this.destroyInstance$));

    this.contracts$ = this.userFacade.getContracts$();

    const subscription = this.rutaActiva.params
      .pipe(take(1), takeUntil(this.destroyInstance$))
      .subscribe(
        (params: Params) => {
          if (params.id) {
            this.user_id = params.id;
          } else {
            this.addProfile();
          }

          if (this.user_id) {
            const subscription2 = this.userFacade.getForm$()
              .pipe(take(1), takeUntil(this.destroyInstance$))
              .subscribe(res => {
                if (res) {
                  // inicializamos formulario
                  this.formUser.patchValue(res);
                  if (res.perfiles.length > 1) {
                    res.perfiles.forEach(profile => {
                      this.addProfile(profile);
                    });

                    // agrupamos en perfil_id
                    const groups = _.chain(res.perfiles)
                      .groupBy('perfil_id')
                      .map((value, key) => ({ perfil_id: key, profiles: value }))
                      .value();

                    // rescatamos jefaturas
                    groups.forEach(group => {
                      this.changePerfil(+group.perfil_id);
                    });
                  }
                } else {
                  this.router.navigate(['/app/user/list-user']);
                }
              });
            this.pageSubscription.push(subscription2);
          }
        }
      );

    this.pageSubscription.push(subscription);

  }

  initForm(form?: Model.Form): void {
    this.formUser = this.fb.group({
      id: null,
      username: [null, Validators.required],
      nombres: [null, Validators.required],
      apellidos: [null, Validators.required],
      rut: [null, Validators.compose([Validators.required, Validators.maxLength(15), Validators.minLength(10)])],
      firma: null,
      celular: null,
      email: [null, Validators.compose([Validators.required, Validators.email])],
      provider: 'false',
      proveedor_id: null,
      area_id: [null, Validators.required],
      perfiles: this.fb.array([]),
      contratos_marco: null
    });

    const subscriptionForm = this.formUser.get('proveedor_id').valueChanges
      .pipe(take(1), takeUntil(this.destroyInstance$))
      .subscribe(p => {
        if (p) {
          // this.proveedor_id = +p;
          this.userFacade.getContracts({ token: this.authLogin.token, proveedor_id: +p });
        }
      });
    this.pageSubscription.push(subscriptionForm);

    const subscriptionForm2 = this.formUser.get('provider').valueChanges
      .pipe(takeUntil(this.destroyInstance$))
      .subscribe(provider => {
        if (provider) {
          if (provider === 'false') {
            // rescatamos contratos para contratista
            this.formUser.get('proveedor_id').setValue(null);
            // this.proveedor_id = null;
            this.userFacade.getProviders({ token: this.authLogin.token, interno: true });
            this.userFacade.getContracts({ token: this.authLogin.token, proveedor_id: null });
            this.userFacade.getAreas({ token: this.authLogin.token, interno: true });
          }

          if (provider === 'true') {
            this.userFacade.getProviders({ token: this.authLogin.token, interno: false });
            this.userFacade.getAreas({ token: this.authLogin.token, interno: false });
          }
        }
      });

    this.pageSubscription.push(subscriptionForm2);

    // rescatamos contratos para movistar
    this.userFacade.getContracts({ token: this.authLogin.token, proveedor_id: null });

    // rescatamos areas
    this.userFacade.getAreas({ token: this.authLogin.token, interno: true });

  }

  get perfiles(): FormArray {
    return this.formUser.get('perfiles') as FormArray;
  }

  addProfile(profile?: any): void {
    this.perfiles.push(this.fb.group({
      perfil_id: [profile ? profile.perfil_id : null, Validators.required],
      persona_a_cargo_id: profile ? profile.persona_a_cargo_id : null
    }));
  }

  removeProfile(index: number): void {
    this.perfiles.removeAt(index);
  }

  changePerfil(perfilId: number): void {
    this.perfilId = +perfilId;

    // verificamos si existen jefes para perfil seleccionado
    // de existir no ejecutamos petición
    const inArray = this.profiles.findIndex(p => +p.perfil_id === +this.perfilId);
    if (inArray === -1) {
      this.userFacade.getHighers({
        token: this.authLogin.token,
        proveedor_id: +this.formUser.value.proveedor_id !== 0 ? +this.formUser.value.proveedor_id : 1, perfil_id: perfilId
      });
    }
  }

  save(form: any): void {
    if (!form.id) {
      delete form.provider;
      form.proveedor_id = +form.proveedor_id;
      form.area_id = +form.area_id;
      form.perfiles = form.perfiles.map(p => {
        return { perfil_id: +p.perfil_id, persona_a_cargo_id: p.persona_a_cargo_id !== null ? +p.persona_a_cargo_id : null };
      });
      this.userFacade.postUser({ user: form });
      this.messageService.add({
        severity: 'success',
        summary: 'Usuario creado',
        detail: 'Datos de usuario guardados con Éxito!',
      });
    }

    if (form.id) {
      delete form.provider;
      form.username = null;
      form.proveedor_id = +form.proveedor_id;
      form.area_id = +form.area_id;
      form.perfiles = form.perfiles.map(p => {
        return { perfil_id: +p.perfil_id, persona_a_cargo_id: p.persona_a_cargo_id !== null ? +p.persona_a_cargo_id : null };
      });
      this.userFacade.editUser({ user: form });
      this.messageService.add({
        severity: 'success',
        summary: 'Usuario guardado',
        detail: 'edición realizada con Éxito!',
      });
    }

    this.router.navigate(['/app/user/list-user']);
  }

  ngOnDestroy(): void {
    this.destroyInstance$.next(true);
    this.destroyInstance$.complete();
    this.pageSubscription.forEach((subscription) => subscription.unsubscribe());
  }

}
