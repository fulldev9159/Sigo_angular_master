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
})
export class FormUser2Component implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  DisplayPermisosModal = false;
  ModalDataPermissions = [];

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
    this.areas$ = this.userFacade.getAreas$().pipe(
      map(areas => areas || []),
      tap(areas => this.checkAreaAndEnable(areas))
    );
    this.profiles$ = this.profileFacade
      .getProfile$()
      .pipe(map(perfiles => perfiles || []));
    this.contracts$ = this.userFacade.getContracts$().pipe(
      map(contratos => contratos || []),
      tap(contratos => this.checkContratosAndEnable(contratos))
    );
  }

  initFormControlsEvents(): void {
    this.initProviderRadioFormControlEvent();
    this.initProveerdorFromControlEvent();
    this.initAreaFormControlEvent();
  }

  initProviderRadioFormControlEvent(): void {
    this.subscription.add(
      this.formUser.get('provider').valueChanges.subscribe(provider => {
        this.resetProveedorFormControl();
        this.resetAreaFormControl();
        this.userFacade.resetContratos();
        if (provider === 'movistar') {
          this.userFacade.getProviders({
            interno: true,
          });
        } else if (provider === 'contratista') {
          this.userFacade.getProviders({
            interno: false,
          });
        }
      })
    );
  }

  initProveerdorFromControlEvent(): void {
    this.subscription.add(
      this.formUser.get('proveedor_id').valueChanges.subscribe(proveedor_id => {
        this.resetAreaFormControl();
        if (proveedor_id !== null && proveedor_id !== undefined) {
          const radioProvider = this.formUser.get('provider').value;
          if (radioProvider === 'contratista') {
            this.userFacade.getAreas({
              interno: false,
            });
          } else if (radioProvider === 'movistar') {
            this.userFacade.getAreas({
              interno: true,
            });
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
          const providerID = this.formUser.get('proveedor_id').value;
          if (radioProvider === 'contratista') {
            this.userFacade.getContracts({
              proveedor_id: +providerID,
            });
          } else if (radioProvider === 'movistar') {
            this.userFacade.getContracts({
              proveedor_id: null,
            });
          }
        } else {
          this.disableContratosFormControl();
        }
      })
    );
  }

  //  --- ENABLED ---
  checkAreaAndEnable(areas: Area[]): void {
    if (areas.length > 0) {
      this.formUser.get('area_id').enable();
    } else {
      this.formUser.get('area_id').disable();
    }
  }

  checkContratosAndEnable(contratos: Contract[]): void {
    if (contratos.length > 0) {
      this.formUser.get('contratos_marco').enable();
    } else {
      this.formUser.get('contratos_marco').disable();
    }
  }
  //  ---- DISABLED ---
  disableAreaFormControl(): void {
    this.formUser.get('area_id').disable({ emitEvent: false });
  }

  disableContratosFormControl(): void {
    this.formUser.get('contratos_marco').disable({ emitEvent: false });
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

  // --- INIT DATA ---
  initData(): void {
    this.userFacade.getProviders({
      interno: true,
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
