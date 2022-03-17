import { Component, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UserFacade } from '@storeOT/features/user/user.facade';
import {
  ListPerfilesUser,
  Perfil,
  PosiblesSuperiores,
  RequestAgregarPerfilUsusario,
  TableUserData,
  User,
} from '@data';
import { ListUserTableService } from './list-user-table.service';
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
})
export class ListUserComponent implements OnInit {
  subscription: Subscription = new Subscription();
  usersTableData$: Observable<TableUserData[]>;
  perfilesUser$: Observable<ListPerfilesUser[]>;
  allPerfiles$: Observable<Perfil[]>;
  posiblesSuperiores$: Observable<PosiblesSuperiores[]>;
  displayModalPerfilesUser$: Observable<boolean>;
  userSelected4addPerfil$: Observable<User>;
  usuario_id: number;

  formAddControls = {
    id: new FormControl(null),
    perfil_id: new FormControl(null, [Validators.required]),
    superior_id: new FormControl(null, [Validators.required]),
  };

  formAddPerfil: FormGroup = new FormGroup(this.formAddControls);

  configTable = null;

  constructor(
    private userFacade: UserFacade,
    private listUserTableService: ListUserTableService
  ) {}

  ngOnInit(): void {
    this.onInitResetInicial();
    this.onInitCargarDataInicial();
    this.onInitInicializarDataASync();
    this.onInitAccionesInicialesAdicionales();
  }

  onInitResetInicial() {
    this.userFacade.resetData();
  }

  onInitCargarDataInicial() {
    this.configTable = this.listUserTableService.getTableConfig();
    this.userFacade.getAllUsers();
  }

  onInitInicializarDataASync() {
    this.userSelected4addPerfil$ = this.userFacade.getseletedUser4AddPerfil$();
    this.usersTableData$ = this.userFacade.getAllUsers$().pipe(
      map(usuarios => {
        if (usuarios) {
          return usuarios.map(usuario => ({
            id: usuario.id,
            username: usuario.username,
            rut: usuario.rut,
            nombres: usuario.nombres,
            apellidos: usuario.apellidos,
            empresa: usuario.model_proveedor_id.nombre,
            area: usuario.model_area_id.nombre,
            estado: usuario.estado,
          }));
        }
      })
    );
    this.perfilesUser$ = this.userFacade.pefilesUsuario$().pipe(
      map(perfiles => {
        if (perfiles) {
          return perfiles.map(perfil => ({
            id: perfil.perfil_id,
            perfil_propio: perfil.perfil_propio,
            proxy_id: perfil.proxy_id,
            descripcion:
              perfil.model_usuarioproxy_id.model_perfil_id.descripcion,
            rol: perfil.model_usuarioproxy_id.model_perfil_id.model_rol_id
              .nombre,
            nombre: perfil.model_usuarioproxy_id.model_perfil_id.nombre,
            superior:
              perfil.model_usuarioproxy_id.model_superior_id.nombres +
              ' ' +
              perfil.model_usuarioproxy_id.model_superior_id.apellidos,
          }));
        }
      })
    );
    this.allPerfiles$ = this.userFacade.gelAllPerfiles$().pipe(
      withLatestFrom(this.perfilesUser$),
      map(([allperfiles, listPerfilesuser]) => {
        if (allperfiles && listPerfilesuser) {
          return allperfiles.filter(perfil => {
            const perfilesUser: number[] = listPerfilesuser.map(
              userperfil => userperfil.id
            );
            return !perfilesUser.includes(perfil.id);
          });
        }
      })
    );
    this.posiblesSuperiores$ = this.userFacade.getPosiblesSuperiores$();
    this.displayModalPerfilesUser$ =
      this.userFacade.displayModalPerfilesUser$();
  }

  onInitAccionesInicialesAdicionales() {
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

  closeAddPerfil(): void {
    this.userFacade.displayModalPerfilesUser(false);
    this.formAddPerfil.reset();
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
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
