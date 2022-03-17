import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import {
  ListPerfilesUserType,
  Perfil,
  PosiblesSuperiores,
  RequestAgregarPerfilUsusario,
  TableUserData,
  User,
} from '@data';
import { UserFacade } from '@storeOT/features/user/user.facade';
import { map, withLatestFrom } from 'rxjs/operators';
import { ListPerfilesUserTableService } from './list-perfiles-user-table.service';
import { ListPerfilesUserFormService } from './list-perfiles-user-form.service';

@Component({
  selector: 'app-list-perfiles-user',
  templateUrl: './list-perfiles-user.component.html',
  styleUrls: ['./list-perfiles-user.component.scss'],
})
export class ListPerfilesUserComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  // DATOS A USAR
  allUsers$: Observable<User>;
  userSelected4addPerfil$: Observable<User>;
  perfilesUser$: Observable<ListPerfilesUserType[]>;
  allPerfiles$: Observable<Perfil[]>;
  posiblesSuperiores$: Observable<PosiblesSuperiores[]>;
  perfilSelected$: Observable<ListPerfilesUserType>;

  // DISPLAY MODALS
  displayModalPerfilesUser$: Observable<boolean>;

  // FORMULARIO
  formAddControls: any;
  formAddPerfil: FormGroup;

  // TABLE
  configTable = null;

  // EXTRAS
  usuario_id: number;
  addMode: boolean = false;

  constructor(
    private userFacade: UserFacade,
    private route: ActivatedRoute,
    private listPerfilesUserTableService: ListPerfilesUserTableService,
    private listPerfilesUserFormService: ListPerfilesUserFormService
  ) {}

  ngOnInit(): void {
    this.onInitResetInicial();
    this.onInitGetInitialData();
    this.onInitSetInitialData();
    this.onInitAccionesInicialesAdicionales();
  }

  onInitResetInicial(): void {
    this.userFacade.resetData();
  }

  onInitGetInitialData(): void {
    this.subscription.add(
      this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        if (id !== null) {
          this.usuario_id = +id;
          this.userFacade.seletedUser4AddPerfil(+id);
          this.userFacade.getPerfilesUser(+id);
        }
      })
    );
  }

  onInitSetInitialData(): void {
    this.configTable = this.listPerfilesUserTableService.getTableConfig();
    this.formAddControls = this.listPerfilesUserFormService.FormConfig();
    this.formAddPerfil = new FormGroup(this.formAddControls);
    this.userSelected4addPerfil$ = this.userFacade.getseletedUser4AddPerfil$();
    this.perfilesUser$ = this.userFacade.pefilesUsuario$().pipe(
      map(perfiles => {
        if (perfiles) {
          return perfiles.map(perfil => ({
            id: perfil.perfil_id,
            perfil_propio: perfil.perfil_propio ? 'Propio' : 'Remplazo',
            proxy_id: perfil.proxy_id,
            descripcion:
              perfil.model_usuarioproxy_id.model_perfil_id.descripcion,
            rol: perfil.model_usuarioproxy_id.model_perfil_id.model_rol_id
              .nombre,
            nombre: perfil.model_usuarioproxy_id.model_perfil_id.nombre,
            superior: perfil.model_usuarioproxy_id.model_superior_id
              ? perfil.model_usuarioproxy_id.model_superior_id.nombres +
                ' ' +
                perfil.model_usuarioproxy_id.model_superior_id.apellidos
              : '',
            superior_id: perfil.model_usuarioproxy_id.superior_id
              ? perfil.model_usuarioproxy_id.superior_id
              : null,
          }));
        }
      })
    );
    this.allPerfiles$ = this.userFacade.gelAllPerfiles$().pipe(
      withLatestFrom(this.perfilesUser$),
      map(([allperfiles, listPerfilesuser]) => {
        if (allperfiles && listPerfilesuser && this.addMode) {
          return allperfiles.filter(perfil => {
            const perfilesUser: number[] = listPerfilesuser.map(
              userperfil => userperfil.id
            );
            return !perfilesUser.includes(perfil.id);
          });
        } else {
          return allperfiles;
        }
      })
    );
    this.posiblesSuperiores$ = this.userFacade.getPosiblesSuperiores$();
    this.displayModalPerfilesUser$ =
      this.userFacade.displayModalPerfilesUser$();
    this.subscription.add(
      this.userFacade.perfilSelected$().subscribe(perfil => {
        if (perfil) {
          setTimeout(() => {
            this.formAddPerfil.get('perfil_id').setValue(+perfil.id);
            this.formAddPerfil.get('perfil_id').disable({ emitEvent: false });
          }, 700);

          setTimeout(() => {
            this.formAddPerfil.get('superior_id').enable({ emitEvent: false });
            this.formAddPerfil.get('superior_id').setValue(+perfil.superior_id);
          }, 700);
        }
      })
    );
  }

  onInitAccionesInicialesAdicionales(): void {
    this.formAddPerfil.get('superior_id').disable({ emitEvent: false });
    this.subscription.add(
      this.formAddPerfil
        .get('perfil_id')
        .valueChanges.pipe(withLatestFrom(this.userSelected4addPerfil$))
        .subscribe(([perfil_id, user]) => {
          if (perfil_id) {
            this.formAddPerfil.get('superior_id').enable({ emitEvent: false });
            this.formAddPerfil.get('superior_id').setValue(null);
            this.userFacade.getPosiblesSuperiores(+user.id, +perfil_id);
            this.usuario_id = user.id;
          }
        })
    );
  }

  openModalAddPerfilUser(): void {
    this.userFacade.displayModalPerfilesUser(true);
    this.userFacade.getAllPerfiles();
    this.addMode = true;
  }

  closeAddPerfil(): void {
    this.userFacade.displayModalPerfilesUser(false);
    this.formAddPerfil.reset();
    this.addMode = false;
    this.userFacade.resetPerfilSelected();
  }

  AgregarPerfil(): void {
    const request: RequestAgregarPerfilUsusario = {
      perfil_id: +this.formAddPerfil.get('perfil_id').value,
      usuario_id: this.usuario_id,
      superior_id:
        this.formAddPerfil.get('superior_id').value === 'NaN'
          ? null
          : +this.formAddPerfil.get('superior_id').value,
    };

    console.log(request);

    this.userFacade.agregarPerfilUsuario(request);
    this.userFacade.displayModalPerfilesUser(false);
    this.formAddPerfil.reset();
    this.userFacade.getPerfilesUser(this.usuario_id);
    this.userFacade.getAllPerfiles();
    this.formAddPerfil.reset();
    this.formAddPerfil.get('superior_id').disable({ emitEvent: false });
    this.addMode = false;
  }

  EditarSuperiorPerfil(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
