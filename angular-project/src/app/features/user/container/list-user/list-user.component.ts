import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';

import { Router } from '@angular/router';
import { UserFacade } from '@storeOT/features/user/user.facade';
import {
  ContratosUser,
  ListPerfilesUserType,
  Perfil,
  PosiblesSuperiores,
  RequestActivateUser,
  RequestAgregarPerfilUsusario,
  RequestUpFirmaUser,
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
  @ViewChild('filesform', { static: true }) filesform: any;
  subscription: Subscription = new Subscription();

  // DATOS A USAR
  usersTableData$: Observable<TableUserData[]>;
  contratosUser$: Observable<ContratosUser[]>;
  // DISPLAY MODALS
  displayModalDeleteUser = false;
  displayModalActivarUser = false;
  displayModalVerContratos = false;
  displayModalFirma = false;

  // FORMULARIO

  // TABLE
  configTable = null;

  // EXTRAS
  usuario_id = null;
  txt_activar = null;
  estado_usuario = null;
  uploadedFiles: any[] = [];
  formControls = {
    files: new FormControl([]),
  };
  form: FormGroup = new FormGroup(this.formControls);

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
    (this.configTable.body.actions as Array<any>).push(
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
        label: 'Ver contratos',
        onClick: (event: Event, item: User) => {
          this.displayModalVerContratos = true;
          this.userFacade.getContratosUser(item.id);
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
        label: 'estado',
        onClick: (event: Event, item: User) => {
          this.displayModalActivarUser = true;
          this.usuario_id = item.id;
          this.txt_activar = item.estado ? 'bloquear' : 'activar';
          this.estado_usuario = item.estado;
        },
      },
      {
        icon: ' pi pi-id-card',
        labelVariable: true,
        label: 'firma',
        onClick: (event: Event, item: User) => {
          this.displayModalFirma = true;
          this.usuario_id = item.id;
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
            celular: usuario.celular,
            email: usuario.email,
            create_at: new Date(usuario.created_at),
            update_at: new Date(usuario.updated_at),
            estado: usuario.estado,
            firma: usuario.firma_archivo_id ? true : false,
          }));
        }
      })
    );
    this.contratosUser$ = this.userFacade.getContratosUser$();
  }

  onInitAccionesInicialesAdicionales(): void {}

  closeModalDeleteUser(): void {
    this.displayModalDeleteUser = false;
    this.usuario_id = null;
  }

  closeModalActivarUser(): void {
    this.displayModalActivarUser = false;
    this.usuario_id = null;
  }

  closeModalVerContratos(): void {
    this.displayModalVerContratos = false;
    this.usuario_id = null;
  }

  closeModalFirma(): void {
    this.displayModalFirma = false;
    this.uploadedFiles = [];
    this.filesform.clear();
  }

  DeleteUsuario(): void {
    if (this.usuario_id) {
      this.userFacade.deleteUser(+this.usuario_id);
      this.closeModalDeleteUser();
    }
  }

  ActivarUsuario(): void {
    if (this.usuario_id) {
      const request: RequestActivateUser = {
        usuario_id: this.usuario_id,
        values: {
          estado: !this.estado_usuario,
        },
      };
      this.userFacade.activateUser(request);
      this.closeModalActivarUser();
      setTimeout(() => {
        this.userFacade.getAllUsers();
      }, 700);
    }
  }
  onUpload(event: any): void {
    console.log('ADD', event);
    this.uploadedFiles = event;
  }

  onDeleteFile(event: any): void {}

  EnviarFirma(): void {
    if (this.usuario_id) {
      const index = 'files';
      const request: RequestUpFirmaUser = {
        files: this.uploadedFiles[index],
      };

      this.userFacade.upFirmaUser(this.usuario_id, request);
      this.closeModalFirma();
      setTimeout(() => {
        this.userFacade.getAllUsers();
      }, 700);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
