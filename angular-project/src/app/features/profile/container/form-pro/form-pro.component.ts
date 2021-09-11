import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as Model from '@storeOT/features/profile/profile.model';
import { ProfileFacade } from '@storeOT/features/profile/profile.facade';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { map, takeUntil } from 'rxjs/operators';
import * as _ from 'lodash';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as Data from '@data';

@Component({
  selector: 'app-form-pro',
  templateUrl: './form-pro.component.html',
  styleUrls: ['./form-pro.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormProComponent implements OnInit, OnDestroy {
  // declarations
  public groups = null;
  public profileId = null;
  public authLogin = null;
  public selectedItems = [];
  public formProfile: FormGroup;
  public permissions$: Observable<any>;
  public profiles$: Observable<any[]>;
  public permissionsOriginal$: Observable<Data.Permiso[]>;
  private destroyInstance$: Subject<boolean> = new Subject();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authFacade: AuthFacade,
    private rutaActiva: ActivatedRoute,
    private profileFacade: ProfileFacade,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initForm();

    // traemos contratos des api mediante efectos
    this.authFacade
      .getLogin$()
      .pipe(takeUntil(this.destroyInstance$))
      .subscribe(authLogin => {
        if (authLogin) {
          // asignamos datos de usuario autenticado a variable local
          this.authLogin = authLogin;

          if (this.authLogin) {
            this.formProfile.get('token').setValue(this.authLogin.token);
          }

          // generamos llamada a api para rescatar permisos
          this.profileFacade.getPermissions();

          // generamos llamada a api para perfiles
          this.profileFacade.getProfile();
        }
      });

    // escuchamos cambios en store para traer perfiles
    this.profiles$ = this.profileFacade.getProfile$();

    // escuchamos cambios en store para traer permisos a la vista permisos
    this.permissionsOriginal$ = this.profileFacade.getPermissions$();

    this.permissions$ = this.profileFacade.getPermissions$().pipe(
      map((permissions: Data.Permiso[]) => {
        const data = permissions.map((permit: Data.Permiso) => {
          let permitCustom;
          if (permit && permit.slug) {
            permitCustom = { ...permit, module: permit.slug.split('_')[0] };
          }
          return permitCustom;
        });

        return _.chain(data)
          .groupBy('module')
          .map((value, key) => ({ module: key, permissions: value }))
          .value();
      })
    );

    this.rutaActiva.params.subscribe((params: Params) => {
      if (params.id) {
        this.profileId = params.id;
      }

      if (this.profileId) {
        this.profileFacade
          .getFormProfile$()
          .pipe(takeUntil(this.destroyInstance$))
          .subscribe(res => {
            if (res) {
              // inicializamos formulario
              this.formProfile.patchValue(res);
              this.selectedItems = res.permisos.map((p: any) => p.id);
            } else {
              this.router.navigate(['/app/profile/list-pro']);
            }
          });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroyInstance$.next(true);
    this.destroyInstance$.complete();
  }

  initForm(): void {
    this.formProfile = this.fb.group({
      id: null,
      token: [null, Validators.required],
      nombre: [null, Validators.required],
      descripcion: null,
      permisos: null,
      superior: null,
    });
  }

  cancelAction(): void {
    this.formProfile.reset();
  }

  saveProfile(): void {
    const formData = {
      ...this.formProfile.value,
      token: this.authLogin.token,
      permisos: this.selectedItems,
    };
    if (formData.id) {
      formData.superior = +formData.superior;
      if (formData.superior === 0) {
        formData.superior = null;
      }
      this.profileFacade.editProfile(formData);
      this.messageService.add({
        severity: 'success',
        summary: 'Perfil editado',
        detail: 'Perfil editado con Éxito!',
      });
      this.router.navigate(['/app/profile/list-pro']);
    } else {
      delete formData.id;
      formData.superior = +formData.superior;
      if (formData.superior === 0) {
        formData.superior = null;
      }
      this.profileFacade.createPerfil(formData);
      this.messageService.add({
        severity: 'success',
        summary: 'Perfil generado',
        detail: 'Perfil generado con Éxito!',
      });
      this.router.navigate(['/app/profile/list-pro']);
    }
  }
}
