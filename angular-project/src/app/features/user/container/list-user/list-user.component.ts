import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';

import { Router } from '@angular/router';
import { UserFacade } from '@storeOT/features/user/user.facade';
import {
  ListPerfilesUserType,
  Perfil,
  PosiblesSuperiores,
  RequestAgregarPerfilUsusario,
  TableUserData,
  User,
} from '@data';
import { ListUserTableService } from './list-user-table.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
})
export class ListUserComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  // DATOS A USAR
  usersTableData$: Observable<TableUserData[]>;

  // DISPLAY MODALS
  displayModalDeleteUser = false;
  displayModalActivarUser = false;

  // FORMULARIO

  // TABLE
  configTable = null;

  // EXTRAS
  usuario_id = null;
  txt_activar = null;
  estado_usuario = null;

  // CONSTRUCTOR
  constructor(
    private userFacade: UserFacade,
    private listUserTableService: ListUserTableService,
    private router: Router,
    private confirmationService: ConfirmationService
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
    this.userFacade.getAllUsers();
  }

  onInitSetInitialData(): void {
    this.configTable = this.listUserTableService.getTableConfig();
    (this.configTable.body.actions as Array<Object>).push(
      {
        icon: ' pi pi-pencil',
        class: 'p-button-text p-button-sm',
        label: 'Editar',
        onClick: (event: Event, item: User) => {
          if (item) {
            this.router.navigate(['/app/user/form-user', item.id]);
          }
        },
      },
      {
        icon: 'pi pi-eye',
        class: 'p-button-text p-button-sm',
        label: 'Detalle',
        onClick: (event: Event, item: User) => {
          // this.userFacade.getAllDataUsuario(item.id);
        },
      },
      {
        icon: 'pi pi-trash',
        class: 'p-button-text p-button-danger p-button-sm',
        label: 'Eliminar',
        onClick: (event: Event, item: User) => {
          this.displayModalDeleteUser = true;
          this.usuario_id = item.id;
        },
      },
      {
        icon: ' pi pi-ban',
        class: 'p-button-text p-button-danger p-button-sm',
        labelVariable: true,
        label: 'activo',
        onClick: (event: Event, item: User) => {
          this.displayModalActivarUser = true;
          this.usuario_id = item.id;
          this.txt_activar = item.estado ? 'Bloquear' : 'Activar';
          this.estado_usuario = item.estado;
        },
      },
      {
        icon: ' pi pi-plus',
        class: 'p-button-text p-button-danger p-button-sm',
        label: 'Administrar Perfiles',
        onClick: (event: Event, item: User) => {
          if (item) {
            this.router.navigate(['/app/user/list-perfiles-user', item.id]);
          }
        },
      }
    );
    this.usersTableData$ = this.userFacade.getAllUsers$().pipe(
      map(usuarios => {
        if (usuarios) {
          return usuarios.map(usuario => ({
            id: usuario.id,
            username: usuario.username,
            rut: usuario.rut,
            nombres: usuario.nombres,
            apellidos: usuario.apellidos,
            empresa: usuario.model_proveedor_id
              ? usuario.model_proveedor_id.nombre
              : '',
            area: usuario.model_area_id ? usuario.model_area_id.nombre : '',
            estado: usuario.estado,
          }));
        }
      })
    );
  }

  onInitAccionesInicialesAdicionales(): void {}

  closeModalDeleteUser(): void {
    this.displayModalDeleteUser = false;
  }

  closeModalActivarUser(): void {
    this.displayModalActivarUser = false;
  }

  DeleteUsuario() {
    if (this.usuario_id) {
      this.userFacade.deleteUser(+this.usuario_id);
      this.closeModalDeleteUser();
    }
  }

  ActivarUsuario() {
    if (this.usuario_id) {
      // this.userFacade.activateUser(this.usuario_id, !this.estado_usuario);
      this.closeModalActivarUser();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
