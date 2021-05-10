import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { ProfileFacade } from '@storeOT/features/profile/profile.facade';
import { UserFacade } from '@storeOT/features/user/user.facade';
import { MessageService } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit, OnDestroy {

  // declarations
  public proveedor_id = null;
  public formUser: FormGroup;
  public authLogin = null;
  public areas$: Observable<any[]>;
  public providers$: Observable<any[]>;
  public profiles$: Observable<any[]>;
  public highers$: Observable<any[]>;
  public contracts$: Observable<any[]>;
  private destroyInstance: Subject<boolean> = new Subject();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authFacade: AuthFacade,
    private userFacade: UserFacade,
    private profileFacade: ProfileFacade,
    private messageService: MessageService
  ) {
    this.authFacade
      .getLogin$()
      .pipe(takeUntil(this.destroyInstance))
      .subscribe((authLogin) => {
        if (authLogin) {
          // asignamos datos de usuario autenticado a variable local
          this.authLogin = authLogin;

          this.userFacade.getProviders({ token: this.authLogin.token });

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

    this.contracts$ = this.userFacade.getContracts$();
  }

  initForm(): void {
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

    this.formUser.get('proveedor_id').valueChanges.subscribe(p => {
      if (p) {
        // this.proveedor_id = +p;
        this.userFacade.getContracts({ token: this.authLogin.token, proveedor_id: +p });
      }
    });

    this.formUser.get('provider').valueChanges.subscribe(provider => {
      if (provider) {
        if (provider === 'false') {
          // rescatamos contratos para contratista
          this.formUser.get('proveedor_id').setValue(1);
          // this.proveedor_id = null;
          this.userFacade.getContracts({ token: this.authLogin.token, proveedor_id: null })
          this.userFacade.getAreas({ token: this.authLogin.token, interno: true });
        }

        if (provider === 'true') {
          this.userFacade.getAreas({ token: this.authLogin.token, interno: false });
        }
      }
    });

    // rescatamos contratos para movistar
    this.userFacade.getContracts({ token: this.authLogin.token, proveedor_id: null });

    // rescatamos areas
    this.userFacade.getAreas({ token: this.authLogin.token, interno: true });

    this.addProfile();
  }

  get perfiles() {
    return this.formUser.get('perfiles') as FormArray;
  }

  addProfile() {
    this.perfiles.push(this.fb.group({ perfil_id: [null, Validators.required], persona_a_cargo_id: null }));
  }

  removeProfile(index: number) {
    this.perfiles.removeAt(index);
  }

  changePerfil(perfilId: number): void {
    this.userFacade.getHighers({ token: this.authLogin.token, proveedor_id: +this.formUser.value.proveedor_id !== 0 ? +this.formUser.value.proveedor_id : 1, perfil_id: perfilId });
  }

  save(form: any): void {
    delete form.provider;
    form.proveedor_id = +form.proveedor_id;
    form.area_id = +form.area_id;
    form.perfiles = form.perfiles.map(p => { return { perfil_id: +p.perfil_id, persona_a_cargo_id: p.persona_a_cargo_id !== null ? +p.persona_a_cargo_id : null } });
    this.userFacade.postUser({ user: form });
    this.messageService.add({
      severity: 'success',
      summary: 'Usuario guardado',
      detail: 'Datos de usuario con Éxito!',
    });

    this.router.navigate(['/app/user/list-user']);
  }

  ngOnDestroy(): void {
    this.destroyInstance.next(true);
    this.destroyInstance.complete();
  }

}
