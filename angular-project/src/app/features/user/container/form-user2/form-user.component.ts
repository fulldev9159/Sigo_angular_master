import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import {
  map,
  take,
  takeUntil,
  withLatestFrom,
  filter,
  tap,
  find,
} from 'rxjs/operators';

import { UserFacade } from '@storeOT/features/user/user.facade';
import { ProfileFacade } from '@storeOT/features/profile/profile.facade';

import {
  Provider,
  Area,
  Contract,
  PerfilSuperiorFormUser,
} from '@storeOT/features/user/user.model';
import { Profile, Permit } from '@storeOT/features/profile/profile.model';

import { SnackBarService } from '@utilsSIGO/snack-bar';
import * as _ from 'lodash';

@Component({
  selector: 'app-form-user2',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormUser2Component implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  jerarquia: any = {};
  ModalDataPermissions: any[] = [];
  DisplayPermisosModal = false;

  superiores = [];
  perfilId: number;
  profilesConSuperiores: PerfilSuperiorFormUser[] = [];

  formControls = {
    username: new FormControl(null, [Validators.required, this.noWhitespace]),
    nombres: new FormControl(null, [Validators.required, this.noWhitespace]),
    apellidos: new FormControl(null, [Validators.required, this.noWhitespace]),
    rut: new FormControl(null, [Validators.required, this.noWhitespace]),
    firma: new FormControl(null),
    celular: new FormControl(null),
    email: new FormControl(null, [Validators.required, Validators.email]),
    provider: new FormControl('movistar'),
    proveedor_id: new FormControl(null, [Validators.required]),
    area_id: new FormControl(null, [Validators.required]),
    contratos_marco: new FormControl(null, []),
    perfiles: new FormControl([], []),
    // new FormArray([
    //   new FormGroup({
    //     perfil_id: new FormControl(null, [Validators.required]),
    //     persona_a_cargo_id: new FormControl(null, []),
    //   }),
    // ]),
  };

  formUser: FormGroup = new FormGroup(this.formControls);

  providers$: Observable<Provider[]>;
  areas$: Observable<Area[]>;
  contracts$: Observable<Contract[]>;
  profiles$: Observable<Profile[]>;
  highers$: Observable<any[]>;

  constructor(
    private userFacade: UserFacade,
    private router: Router,
    private profileFacade: ProfileFacade,
    private snackService: SnackBarService
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
    this.profiles$ = this.profileFacade.getProfile$().pipe(
      map(perfiles => perfiles || []),
      tap(perfiles => {
        perfiles.forEach(perfil => {
          if (perfil.superior_nombre === undefined) {
            this.jerarquia[perfil.nombre] = {};
          }
        });

        perfiles.forEach(perfil => {
          Object.keys(this.jerarquia).forEach(j => {
            if (perfil.superior_nombre === j) {
              this.jerarquia[perfil.superior_nombre][perfil.nombre] = {};
            }
          });
        });

        perfiles.forEach(perfil => {
          Object.keys(this.jerarquia).forEach(superior => {
            if (Object.keys(this.jerarquia[superior]).length > 0) {
              Object.keys(this.jerarquia[superior]).forEach(subjerarquia => {
                if (perfil.superior_nombre === subjerarquia) {
                  this.jerarquia[superior][subjerarquia][perfil.nombre] = {};
                }
              });
            }
          });
        });

        perfiles.forEach(perfil => {
          Object.keys(this.jerarquia).forEach(superior => {
            if (Object.keys(this.jerarquia[superior]).length > 0) {
              Object.keys(this.jerarquia[superior]).forEach(subjerarquia => {
                if (
                  Object.keys(this.jerarquia[superior][subjerarquia]).length > 0
                ) {
                  Object.keys(this.jerarquia[superior][subjerarquia]).forEach(
                    subsubjerarquia => {
                      if (perfil.superior_nombre === subsubjerarquia) {
                        this.jerarquia[superior][subjerarquia][subsubjerarquia][
                          perfil.nombre
                        ] = {};
                      }
                    }
                  );
                }
              });
            }
          });
        });
      })
    );
    this.contracts$ = this.userFacade
      .getContracts$()
      .pipe(map(contratos => contratos || []));

    this.highers$ = this.userFacade.getHighers$();
  }

  initFormControlsEvents(): void {
    this.initProviderRadioFormControlEvent();
    this.initProveerdorFromControlEvent();
    this.subscription.add(
      this.highers$
        .pipe(withLatestFrom(this.providers$, this.profiles$))
        .subscribe(([superiores, proveedores, perfiles]) => {
          console.log('incio $', superiores);
          let Proveedor = '';
          let perfilExistente;
          let nombrePerfil: any;
          if (this.formUser.get('provider').value === 'movistar') {
            Proveedor = 'Movitar';
          } else if (this.formUser.get('provider').value === 'contratista') {
            Proveedor = proveedores.find(
              proveedor =>
                +proveedor.id === +this.formUser.get('proveedor_id').value
            ).nombre;
          }

          console.log('Proveedor', Proveedor);

          if (this.perfilId !== undefined) {
            console.log('perfilId', this.perfilId);
            console.log(
              'PerfilesConSuperior Actual:',
              this.profilesConSuperiores
            );
            perfilExistente = this.profilesConSuperiores.find(
              x => x.perfil_id === this.perfilId
            );
            console.log('PerfilExistente', perfilExistente);
            console.log('perfiles', perfiles);
            nombrePerfil = perfiles.find(x => +x.id === +this.perfilId).nombre;
            console.log('nombre', nombrePerfil);

            if (perfilExistente === undefined) {
              this.profilesConSuperiores.push({
                perfil_id: +this.perfilId,
                personas_superiores: superiores,
              });
              console.log(
                'PerfilesConSuperior Saliente:',
                this.profilesConSuperiores
              );
              if (superiores.length === 0) {
                this.snackService.showMessage(
                  `El perfil ${nombrePerfil} no tienen personas superiores de ${Proveedor}`,
                  'warning'
                );
              }
            } else if (superiores && superiores.length === 0) {
              this.snackService.showMessage(
                `El perfil ${nombrePerfil} no tienen personas superiores de ${Proveedor}`,
                'warning'
              );
            }
          }
          return superiores;
        })
    );
  }

  initProviderRadioFormControlEvent(): void {
    this.subscription.add(
      this.formUser.get('provider').valueChanges.subscribe(provider => {
        this.resetProveedorFormControl();
        this.resetAreaFormControl();
        this.resetProfilesFormControl();

        if (provider === 'movistar') {
          this.userFacade.getProviders({
            interno: true,
          });
          this.userFacade.getAreas({
            interno: true,
          });
          this.userFacade.getContracts({
            proveedor_id: null,
          });
        } else if (provider === 'contratista') {
          this.userFacade.getProviders({
            interno: false,
          });
          this.userFacade.getAreas({
            interno: false,
          });
          this.userFacade.resetContratos();
        }
      })
    );
  }

  initProveerdorFromControlEvent(): void {
    this.subscription.add(
      this.formUser
        .get('proveedor_id')
        .valueChanges.pipe(
          withLatestFrom(
            this.formUser
              .get('provider')
              .valueChanges.pipe(
                filter(key => key !== undefined && key !== null)
              )
          )
        )
        .subscribe(([proveedor_id, provider]) => {
          this.resetProfilesFormControl();
          if (
            proveedor_id !== null &&
            proveedor_id !== undefined &&
            provider === 'contratista'
          ) {
            this.userFacade.getContracts({
              proveedor_id: +proveedor_id,
            });
          }
        })
    );
  }

  resetProveedorFormControl(): void {
    this.formUser.get('proveedor_id').reset();
  }

  resetAreaFormControl(): void {
    this.formUser.get('area_id').reset();
  }

  resetProfilesFormControl(): void {
    this.formUser.get('perfiles').reset();
  }

  initData(): void {
    this.userFacade.getProviders({
      interno: true,
    });
    this.userFacade.getAreas({
      interno: true,
    });
    this.userFacade.getContracts({
      proveedor_id: null,
    });
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

  addPerfil(): void {
    (this.formUser.get('perfiles') as FormArray).push(
      new FormGroup({
        perfil_id: new FormControl(null, [Validators.required]),
        persona_a_cargo_id: new FormControl(null, []),
      })
    );
  }

  deletePerfil(): void {}

  changePerfil(index: number): void {
    this.perfilId = +this.formUser.value.perfiles[index].perfil_id;
    // const inArray = this.profilesConSuperiores.findIndex(
    //   p => +p.perfil_id === +this.perfilId
    // );
    // if (inArray === -1) {
    this.userFacade.getHighers({
      proveedor_id:
        +this.formUser.value.proveedor_id !== 0
          ? +this.formUser.value.proveedor_id
          : 1,
      perfil_id: this.perfilId,
    });
    // }
  }

  listMandatory(perfil_id: number): any {
    if (perfil_id) {
      if (this.profilesConSuperiores.length > 0) {
        const perfilObject = this.profilesConSuperiores.find(
          m => +m.perfil_id === +perfil_id
        );
        if (perfilObject) {
          return perfilObject.personas_superiores;
        } else {
          return [];
        }
      } else {
        return [];
      }
    }
  }

  getSuperiores(): string[] {
    return Object.keys(this.jerarquia).length > 0
      ? Object.keys(this.jerarquia)
      : [];
  }

  getSub(superior: string): string[] {
    return Object.keys(this.jerarquia[superior]).length > 0
      ? Object.keys(this.jerarquia[superior])
      : [];
  }

  getSubSub(superior: string, sub: string): string[] {
    if (this.jerarquia[superior][sub]) {
      return Object.keys(this.jerarquia[superior][sub]).length > 0
        ? Object.keys(this.jerarquia[superior][sub])
        : [];
    }
  }

  getSubSubSub(superior: string, sub: string, subsub: string): string[] {
    if (this.jerarquia[superior][sub][subsub]) {
      return Object.keys(this.jerarquia[superior][sub][subsub]).length > 0
        ? Object.keys(this.jerarquia[superior][sub][subsub])
        : [];
    }
  }

  getSubSubSubSub(
    superior: string,
    sub: string,
    subsub: string,
    subsubsub: string
  ): string[] {
    if (this.jerarquia[superior][sub][subsub][subsubsub]) {
      return Object.keys(this.jerarquia[superior][sub][subsub][subsubsub])
        .length > 0
        ? Object.keys(this.jerarquia[superior][sub][subsub][subsubsub])
        : [];
    }
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
}
