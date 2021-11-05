import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { map, take, tap, withLatestFrom } from 'rxjs/operators';

import { UserFacade } from '@storeOT/features/user/user.facade';
import { ProfileFacade } from '@storeOT/features/profile/profile.facade';

import * as Data from '@data';

import * as _ from 'lodash';
import { Perfil, PosiblesSuperiores } from '@data';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss'],
})
export class FormUserComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  DisplayPermisosModal = false;
  ModalDataPermissions = [];

  formControls = {
    id: new FormControl(null),
    username: new FormControl(null, [
      Validators.required,
      this.noWhitespace,
      Validators.maxLength(20),
    ]),
    nombres: new FormControl(null, [
      Validators.required,
      this.noWhitespace,
      Validators.maxLength(45),
    ]),
    apellidos: new FormControl(null, [
      Validators.required,
      this.noWhitespace,
      ,
      Validators.maxLength(45),
    ]),
    rut: new FormControl(null, [
      Validators.required,
      this.noWhitespace,
      Validators.maxLength(50),
    ]),
    firma: new FormControl(null),
    celular: new FormControl(null, [Validators.maxLength(15)]),
    email: new FormControl(null, [
      Validators.required,
      Validators.email,
      Validators.maxLength(45),
    ]),
    provider: new FormControl('movistar'),
    proveedor_id: new FormControl(null, [Validators.required]),
    area_id: new FormControl(null, [Validators.required]),
    contratos_marco: new FormControl(null),
    perfiles: new FormControl(null, [Validators.required]),
    superior: new FormControl(null, [Validators.required]),
  };

  formUser: FormGroup = new FormGroup(this.formControls);

  proveedores$: Observable<Data.Proveedor[]>;
  areas$: Observable<Data.Area[]>;
  contracts$: Observable<Data.Contrato[]>;
  profiles$: Observable<Data.Perfil[]>;
  samecompanyusers$: Observable<PosiblesSuperiores[]>;
  roles: any;
  perfiles: any;

  constructor(
    private userFacade: UserFacade,
    private router: Router,
    private profileFacade: ProfileFacade,
    private route: ActivatedRoute,
    private detector: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.userFacade.resetData();
    this.initObservables();
    this.initFormControlsEvents();
    this.initData();

    this.subscription.add(
      this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        if (id !== null) {
          const userID = +params.get('id');
          this.userFacade.getAllDataUsuario(userID);
        }
      })
    );

    this.subscription.add(
      this.userFacade
        .getAllDataUsuario$()
        .pipe(withLatestFrom(this.proveedores$))
        .subscribe(([user, proveedores]) => {
          if (user) {
            console.log(user);
            this.formUser.get('id').setValue(user.id);
            this.formUser.get('username').setValue(user.username);
            this.formUser.get('username').disable();
            this.formUser.get('nombres').setValue(user.nombres);
            this.formUser.get('apellidos').setValue(user.apellidos);
            this.formUser.get('email').setValue(user.email);
            this.formUser.get('rut').setValue(user.rut);
            this.formUser.get('celular').setValue(user.celular);

            // ToDO: Que el endpoint de get proveedores retorne si este es interno o externo
            // const proveedor = proveedores.find(proveedor=>{proveedor.id===user.proveedor_id})
            if (user.proveedor_id === 1) {
              this.formUser.get('provider').setValue('movistar');
            } else {
              this.formUser.get('provider').setValue('contratista');
            }
            const delay = 700;
            setTimeout(() => {
              this.formUser.get('proveedor_id').setValue(user.proveedor_id);
            }, delay);
            setTimeout(() => {
              this.formUser.get('area_id').setValue(user.area_id);
            }, delay);
            setTimeout(() => {
              this.formUser
                .get('contratos_marco')
                .setValue(user.contratos_marco.map(contrato => contrato.id));
            }, delay);
            setTimeout(() => {
              this.formUser.get('superior').setValue(17);
            }, 1500);
            this.formUser
              .get('perfiles')
              .setValue(user.perfiles.map(perfil => perfil.id));

            setTimeout(() => {
              this.detector.detectChanges();
            }, 2000);
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  initObservables(): void {
    this.proveedores$ = this.userFacade
      .getProviders$()
      .pipe(map(perfiles => perfiles || []));
    this.areas$ = this.userFacade.getAreas$().pipe(
      map(areas => areas || []),
      tap(areas => this.checkAreaAndEnable(areas))
    );
    this.profiles$ = this.profileFacade.getProfile$().pipe(
      map(perfiles => {
        return perfiles || [];
      })
    );
    this.subscription.add(
      this.profiles$.subscribe(perfiles => {
        this.roles = perfiles.reduce((ac, perfil) => {
          ac[perfil.rol_nombre] = [];
          return ac;
        }, {});
        perfiles.forEach(perfil => this.roles[perfil.rol_nombre].push(perfil));
        this.perfiles = Object.keys(this.roles).map(rol => {
          return {
            label: rol,
            value: 'rol',
            items: this.roles[rol].map((perfil: Perfil) => {
              return { label: perfil.nombre, value: perfil.id };
            }),
          };
        });
      })
    );
    this.contracts$ = this.userFacade.getContracts$().pipe(
      map(contratos => contratos || []),
      tap(contratos => this.checkContratosAndEnable(contratos))
    );
    this.samecompanyusers$ = this.userFacade.getPosiblesSuperiores$().pipe(
      map(usuarios => usuarios || []),
      tap(usuarios => this.checkSuperioresAndEnable(usuarios))
    );
  }

  initFormControlsEvents(): void {
    this.initProviderRadioFormControlEvent();
    this.initProveerdorFromControlEvent();
    this.initAreaFormControlEvent();
    this.initSuperiorFromControlEvent();
  }

  initProviderRadioFormControlEvent(): void {
    this.subscription.add(
      this.formUser.get('provider').valueChanges.subscribe(provider => {
        this.resetProveedorFormControl();
        this.resetAreaFormControl();
        this.userFacade.resetContratos();
        if (provider === 'movistar') {
          this.userFacade.getProviders(true);
        } else if (provider === 'contratista') {
          this.userFacade.getProviders(false);
        }
      })
    );
  }

  initProveerdorFromControlEvent(): void {
    this.subscription.add(
      this.formUser.get('proveedor_id').valueChanges.subscribe(proveedor_id => {
        this.resetAreaFormControl();
        this.resetContratosFormControl();
        if (proveedor_id !== null && proveedor_id !== undefined) {
          const radioProvider = this.formUser.get('provider').value;
          if (radioProvider === 'contratista') {
            this.userFacade.getAreas(false);
          } else if (radioProvider === 'movistar') {
            this.userFacade.getAreas(true);
          }
        } else {
          this.disableAreaFormControl();
        }
      })
    );
  }

  initAreaFormControlEvent(): void {
    this.subscription.add(
      this.formUser.get('area_id').valueChanges.subscribe(area_id => {
        if (area_id !== null && area_id !== undefined) {
          const radioProvider = this.formUser.get('provider').value;
          const proveedor_id = this.formUser.get('proveedor_id').value;
          if (radioProvider === 'contratista') {
            this.userFacade.getContracts(+proveedor_id);
          } else if (radioProvider === 'movistar') {
            this.userFacade.getContracts(null);
          }
        } else {
          this.disableContratosFormControl();
        }
      })
    );
  }

  initSuperiorFromControlEvent(): void {
    this.subscription.add(
      this.formUser
        .get('contratos_marco')
        .valueChanges.subscribe(contratos_marco_id => {
          this.resetSuperiorFormControl();
          if (
            contratos_marco_id !== null &&
            contratos_marco_id !== undefined &&
            contratos_marco_id.length > 0
          ) {
            const proveedor_id = this.formUser.get('proveedor_id').value;
            const area_id = this.formUser.get('area_id').value;
            this.userFacade.getPosiblesSuperiores(
              +proveedor_id,
              +area_id,
              contratos_marco_id
            );
          } else {
            this.disableSuperiorFormControl();
          }
        })
    );
  }

  //  --- ENABLED ---
  checkAreaAndEnable(areas: Data.Area[]): void {
    if (areas.length > 0) {
      this.formUser.get('area_id').enable();
    } else {
      this.formUser.get('area_id').disable();
    }
  }

  checkContratosAndEnable(contratos: Data.Contrato[]): void {
    if (contratos.length > 0) {
      this.formUser.get('contratos_marco').enable();
    } else {
      this.formUser.get('contratos_marco').disable();
    }
  }

  checkSuperioresAndEnable(usuarios: PosiblesSuperiores[]): void {
    if (usuarios.length > 0) {
      this.formUser.get('superior').enable();
    } else {
      this.formUser.get('superior').disable();
    }
  }
  //  ---- DISABLED ---
  disableAreaFormControl(): void {
    this.formUser.get('area_id').disable({ emitEvent: false });
  }

  disableContratosFormControl(): void {
    this.formUser.get('contratos_marco').disable({ emitEvent: false });
  }
  disableSuperiorFormControl(): void {
    this.formUser.get('superior').disable({ emitEvent: false });
  }
  //  --- RESET -----
  resetProveedorFormControl(): void {
    this.formUser.get('proveedor_id').reset();
  }

  resetAreaFormControl(): void {
    this.formUser.get('area_id').reset();
  }

  resetContratosFormControl(): void {
    this.formUser.get('contratos_marco').reset();
  }

  resetSuperiorFormControl(): void {
    this.userFacade.resetSuperiores();
    this.formUser.get('superior').reset();
  }

  // --- INIT DATA ---
  initData(): void {
    this.userFacade.getProviders(true);
    this.profileFacade.getProfile();
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

  showPermisos(perfil: number): void {
    this.subscription.add(
      this.profiles$.pipe(take(1)).subscribe(x => {
        x.forEach(y => {
          console.log('dsfs');
          if (y.id === perfil) {
            const data = y.permisos.map(permit => {
              let permitCustom;
              if (permit && permit.slug) {
                permitCustom = { ...permit, module: permit.slug.split('_')[0] };
              }
              return permitCustom;
            });
            // console.log(_.chain(data).groupBy('module').map((value, key) => ({ module: key, permissions: value })).value())
            this.ModalDataPermissions = _.chain(data)
              .groupBy('module')
              .map((value, key) => ({ module: key, permissions: value }))
              .value();
            this.DisplayPermisosModal = true;
          }
        });
      })
    );
  }

  save(): void {
    let data: Data.CreateUserRequest;
    const perfiles = this.formUser.get('perfiles').value;
    data = {
      username: this.formUser.get('username').value,
      nombres: this.formUser.get('nombres').value,
      apellidos: this.formUser.get('apellidos').value,
      rut: this.formUser.get('rut').value,
      firma: null,
      celular: this.formUser.get('celular').value,
      email: this.formUser.get('email').value,
      proveedor_id: +this.formUser.get('proveedor_id').value,
      area_id: +this.formUser.get('area_id').value,
      perfiles: perfiles.map(perfil_id => ({
        perfil_id,
        persona_a_cargo_id: 1,
      })),
      contratos_marco: this.formUser.get('contratos_marco').value,
      superior_id:
        this.formUser.get('superior').value === null
          ? null
          : +this.formUser.get('superior').value,
    };
    if (this.formUser.get('id').value !== null) {
      let request: Data.EditUserRequest;
      request = {
        id: +this.formUser.get('id').value,
        ...data,
      };
      console.log('EDIT REQUEST', request);
      this.userFacade.editUserNew(request);
      // ToDo: Esto es un WA para que no se habra el modal
      this.userFacade.SetDisplayDetalleModal(false);
    } else {
      let request: Data.CreateUserRequest;
      request = data;
      console.log('CREATE REQUEST', request);
      this.userFacade.createUser(request);
    }
  }
}
