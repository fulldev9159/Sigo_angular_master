import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { map, tap, withLatestFrom } from 'rxjs/operators';

import { UsuarioFacade as UserFacade } from '@storeOT/usuario/usuario.facades';
import { PerfilFacade as ProfileFacade } from '@storeOT/perfil/perfil.facades';

import * as _ from 'lodash';
import {
  Area,
  GuiaSubgrupo,
  ModelProveedor,
  RequestCreateUser,
  ContratosUser,
  RequestUpdateUser,
  PosiblesContratosUser,
} from '@model';

import * as CustomValidators from '@sharedOT/validators';

@Component({
  selector: 'zwc-form-usuario-container',
  templateUrl: './form-usuario-container.component.html',
  styleUrls: ['./form-usuario-container.component.scss'],
})
export class FormUsuarioContainerComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  DisplayPermisosModal = false;
  ModalDataPermissions: any[] = [];

  showPassword = false;
  formControls = {
    id: new FormControl(null),
    guia_subgrupo_id: new FormControl(null, [
      Validators.required,
      CustomValidators.NoWhitespace,
    ]),
    delegated_auth: new FormControl(['true'], []),
    password: new FormControl('', []),
    username: new FormControl(null, [
      Validators.required,
      CustomValidators.NoWhitespace,
      Validators.maxLength(20),
    ]),
    nombres: new FormControl(null, [
      Validators.required,
      CustomValidators.NoWhitespace,
      Validators.maxLength(45),
    ]),
    apellidos: new FormControl(null, [
      Validators.required,
      CustomValidators.NoWhitespace,
      ,
      Validators.maxLength(45),
    ]),
    rut: new FormControl(null, [
      Validators.required,
      CustomValidators.NoWhitespace,
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
    // perfiles: new FormControl(null, [Validators.required]),
    // superior: new FormControl(null, [Validators.required]),
  };

  formUser: FormGroup = new FormGroup(this.formControls);

  guiasSubgrupo$: Observable<GuiaSubgrupo[]>;
  proveedores4createUser$: Observable<ModelProveedor[]>;
  areas4createUser$: Observable<Area[]>;
  posiblesContractosUser$: Observable<PosiblesContratosUser[]>;
  contratosUser$: Observable<ContratosUser[]>;
  usuario_id: number = null;
  // profiles$: Observable<Data.Perfil[]>;
  // samecompanyusers$: Observable<PosiblesSuperiores[]>;
  // roles: any;
  // perfiles: any;

  constructor(
    private userFacade: UserFacade,
    private router: Router,
    private profileFacade: ProfileFacade,
    private route: ActivatedRoute,
    private detector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.userFacade.resetData();
    this.initObservables();
    this.initFormControlsEvents();
    this.initData();

    this.subscription.add(
      this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        if (id !== null) {
          this.usuario_id = +params.get('id');
          this.userFacade.getAllUsers();
          this.userFacade.getContratosUsuario(+params.get('id'));
        }
      })
    );

    this.subscription.add(
      this.userFacade
        .getAllUsers$()
        .pipe(withLatestFrom(this.contratosUser$))
        .subscribe(([users, contratos]) => {
          if (users && users.length > 0 && this.usuario_id) {
            const userSelected = users.find(
              user => user.id === this.usuario_id
            );
            this.formUser.get('id').setValue(userSelected.id);
            this.formUser.get('username').setValue(userSelected.username);
            this.formUser.get('username').disable();
            this.formUser.get('nombres').setValue(userSelected.nombres);
            this.formUser.get('apellidos').setValue(userSelected.apellidos);
            this.formUser.get('email').setValue(userSelected.email);
            this.formUser.get('rut').setValue(userSelected.rut);
            this.formUser.get('celular').setValue(userSelected.celular);
            this.formUser
              .get('guia_subgrupo_id')
              .setValue(userSelected.guia_subgrupo_id);
            this.formUser
              .get('delegated_auth')
              .setValue(userSelected.delegated_auth ? ['true'] : []);

            // ToDO: Que el endpoint de get proveedores retorne si este es interno o externo
            // const proveedor = proveedores.find(proveedor=>{proveedor.id===user.proveedor_id})
            if (userSelected.proveedor_id === 1) {
              this.formUser.get('provider').setValue('movistar');
            } else {
              this.formUser.get('provider').setValue('contratista');
            }
            const delay = 700;
            setTimeout(() => {
              this.formUser
                .get('proveedor_id')
                .setValue(userSelected.proveedor_id);
            }, delay);
            setTimeout(() => {
              this.formUser.get('area_id').setValue(userSelected.area_id);
            }, delay);
            console.log(contratos);
            console.log(contratos.map(contrato => contrato.contrato_id));
            setTimeout(() => {
              this.formUser
                .get('contratos_marco')
                .setValue(contratos.map(contrato => contrato.contrato_id));
            }, 700);
            // setTimeout(() => {
            //   this.formUser.get('superior').setValue(17);
            // }, 1500);
            // this.formUser
            //   .get('perfiles')
            //   .setValue(user.perfiles.map(perfil => perfil.id));

            setTimeout(() => {
              this.detector.detectChanges();
            }, 2000);
          }
        })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  initObservables(): void {
    this.guiasSubgrupo$ = this.userFacade.getAllGuiasSubgrupo$();
    this.proveedores4createUser$ =
      this.userFacade.getAllProveedores4CreateUser$();
    this.areas4createUser$ = this.userFacade
      .getAllarea4createUser$()
      .pipe(tap(areas => this.checkAreaAndEnable(areas)));
    this.contratosUser$ = this.userFacade.getContratosUsuario$();
    // this.profiles$ = this.profileFacade.getProfile$().pipe(
    //   map(perfiles => {
    //     return perfiles || [];
    //   })
    // );
    // this.subscription.add(
    //   this.profiles$.subscribe(perfiles => {
    //     this.roles = perfiles.reduce((ac, perfil) => {
    //       ac[perfil.rol_nombre] = [];
    //       return ac;
    //     }, {});
    //     perfiles.forEach(perfil => this.roles[perfil.rol_nombre].push(perfil));
    //     this.perfiles = Object.keys(this.roles).map(rol => {
    //       return {
    //         label: rol,
    //         value: 'rol',
    //         items: this.roles[rol].map((perfil: Perfil) => {
    //           return { label: perfil.nombre, value: perfil.id };
    //         }),
    //       };
    //     });
    //   })
    // );
    this.posiblesContractosUser$ = this.userFacade
      .getPosiblesContratosUser4CreateEdit$()
      .pipe(
        map(contratos => contratos || []),
        tap(contratos => this.checkContratosAndEnable(contratos))
      );
    // this.proveedores4createUser$.subscribe(perfiles => {
    //   console.log(perfiles);
    // });
    // this.samecompanyusers$ = this.userFacade.getPosiblesSuperiores$().pipe(
    //   map(usuarios => usuarios || []),
    //   tap(usuarios => this.checkSuperioresAndEnable(usuarios))
    // );
  }

  initFormControlsEvents(): void {
    this.initProviderRadioFormControlEvent();
    this.initProveerdorFromControlEvent();
    this.initAreaFormControlEvent();
    this.initSuperiorFromControlEvent();
    this.initDelegatedAuthFormControlEvent();
  }

  initProviderRadioFormControlEvent(): void {
    this.subscription.add(
      this.formUser.get('provider').valueChanges.subscribe(provider => {
        this.resetProveedorFormControl();
        this.resetAreaFormControl();
        this.userFacade.resetContratos();
        if (provider === 'movistar') {
          this.userFacade.getAllProveedores4CreateUser(true);
        } else if (provider === 'contratista') {
          this.userFacade.getAllProveedores4CreateUser(false);
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
            this.userFacade.getAllarea4createUser(false);
          } else if (radioProvider === 'movistar') {
            this.userFacade.getAllarea4createUser(true);
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
          // if (radioProvider === 'contratista') {
          this.userFacade.getPosiblesContratosUser4CreateEdit(+proveedor_id);
          // } else if (radioProvider === 'movistar') {
          //   this.userFacade.getPosiblesContratosUser4CreateEdit(-1);
          // }
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
          // this.resetSuperiorFormControl();
          if (
            contratos_marco_id !== null &&
            contratos_marco_id !== undefined &&
            contratos_marco_id.length > 0
          ) {
            const proveedor_id = this.formUser.get('proveedor_id').value;
            const area_id = this.formUser.get('area_id').value;
            // this.userFacade.getPosiblesSuperiores(
            //   +proveedor_id,
            //   +area_id,
            //   contratos_marco_id
            // );
          } else {
            // this.disableSuperiorFormControl();
          }
        })
    );
  }

  initDelegatedAuthFormControlEvent(): void {
    this.subscription.add(
      this.formUser.get('delegated_auth').valueChanges.subscribe(value => {
        if (this.usuario_id === null) {
          if (value.length > 0) {
            this.formUser.get('password').clearValidators();
          } else {
            this.formUser
              .get('password')
              .setValidators([
                Validators.required,
                CustomValidators.NoWhitespace,
                Validators.maxLength(100),
              ]);
          }
        } else {
          if (value.length > 0) {
            this.formUser.get('password').clearValidators();
          } else {
            this.formUser
              .get('password')
              .setValidators([
                CustomValidators.NoWhitespaceIfHasValue,
                Validators.maxLength(100),
              ]);
          }
        }
        this.formUser.get('password').updateValueAndValidity();
      })
    );
  }

  //  --- ENABLED ---
  checkAreaAndEnable(areas: Area[]): void {
    if (areas?.length > 0) {
      this.formUser.get('area_id').enable();
    } else {
      this.formUser.get('area_id').disable();
    }
  }

  checkContratosAndEnable(contratos: PosiblesContratosUser[]): void {
    if (contratos.length > 0) {
      this.formUser.get('contratos_marco').enable();
    } else {
      this.formUser.get('contratos_marco').disable();
    }
  }

  // checkSuperioresAndEnable(usuarios: PosiblesSuperiores[]): void {
  //   if (usuarios.length > 0) {
  //     this.formUser.get('superior').enable();
  //   } else {
  //     this.formUser.get('superior').disable();
  //   }
  // }
  //  ---- DISABLED ---
  disableAreaFormControl(): void {
    this.formUser.get('area_id').disable({ emitEvent: false });
  }

  disableContratosFormControl(): void {
    this.formUser.get('contratos_marco').disable({ emitEvent: false });
  }
  // disableSuperiorFormControl(): void {
  //   this.formUser.get('superior').disable({ emitEvent: false });
  // }
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

  // resetSuperiorFormControl(): void {
  //   this.userFacade.resetSuperiores();
  //   this.formUser.get('superior').reset();
  // }

  // --- INIT DATA ---
  initData(): void {
    this.userFacade.getAllProveedores4CreateUser(true);
    this.userFacade.getAllGuiasSubgrupo();
    // this.profileFacade.getProfile();
  }

  goBack(): void {
    this.userFacade.resetData();
    this.router.navigate(['/administracion/usuarios/list-usuarios']);
  }

  showPermisos(perfil: number): void {
    // this.subscription.add(
    //   this.profiles$.pipe(take(1)).subscribe(x => {
    //     x.forEach(y => {
    //       if (y.id === perfil) {
    //         const data = y.permisos.map(permit => {
    //           let permitCustom;
    //           if (permit && permit.slug) {
    //             permitCustom = { ...permit, module: permit.slug.split('_')[0] };
    //           }
    //           return permitCustom;
    //         });
    //         // console.log(_.chain(data).groupBy('module').map((value, key) => ({ module: key, permissions: value })).value())
    //         this.ModalDataPermissions = _.chain(data)
    //           .groupBy('module')
    //           .map((value, key) => ({ module: key, permissions: value }))
    //           .value();
    //         this.DisplayPermisosModal = true;
    //       }
    //     });
    //   })
    // );
  }

  save(): void {
    if (this.formUser.get('id').value !== null) {
      const delegated_auth =
        this.formUser.get('delegated_auth').value.length > 0;
      const newPassword = this.formUser.get('password').value;
      const updateRequest: RequestUpdateUser = {
        usuario_id: this.usuario_id,
        values: {
          nombres: this.formUser.get('nombres').value,
          apellidos: this.formUser.get('apellidos').value,
          rut: this.formUser.get('rut').value,
          celular: this.formUser.get('celular').value,
          email: this.formUser.get('email').value,
          proveedor_id: +this.formUser.get('proveedor_id').value,
          area_id: +this.formUser.get('area_id').value,
          guia_subgrupo_id: +this.formUser.get('guia_subgrupo_id').value,
          delegated_auth,
          password: delegated_auth
            ? undefined
            : newPassword.length > 0
            ? newPassword
            : undefined,
        },
        contratos_marco: this.formUser.get('contratos_marco').value,
      };
      this.userFacade.updateUser(updateRequest);
      // let request: Data.EditUserRequest;
      // request = {
      //   id: +this.formUser.get('id').value,
      //   ...data,
      // };
      // console.log('EDIT REQUEST', request);
      // this.userFacade.editUserNew(request);
      // // ToDo: Esto es un WA para que no se habra el modal
      // this.userFacade.SetDisplayDetalleModal(false);
    } else {
      const delegated_auth =
        this.formUser.get('delegated_auth').value.length > 0;
      const request: RequestCreateUser = {
        username: this.formUser.get('username').value,
        nombres: this.formUser.get('nombres').value,
        apellidos: this.formUser.get('apellidos').value,
        rut: this.formUser.get('rut').value,
        celular: this.formUser.get('celular').value,
        email: this.formUser.get('email').value,
        proveedor_id: +this.formUser.get('proveedor_id').value,
        area_id: +this.formUser.get('area_id').value,
        contratos_marco: this.formUser.get('contratos_marco').value,
        estado: true,
        guia_subgrupo_id: +this.formUser.get('guia_subgrupo_id').value,
        delegated_auth,
        password: delegated_auth
          ? undefined
          : this.formUser.get('password').value,
      };

      console.log(request);
      this.userFacade.createUser(request);
    }
  }

  // onUpload(event: any): void {}

  // onDeleteFile(event: any): void {}
  get values(): any {
    return this.formUser.getRawValue();
  }
}
