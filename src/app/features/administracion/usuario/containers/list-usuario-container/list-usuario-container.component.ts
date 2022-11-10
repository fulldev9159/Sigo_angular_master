import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';

import { Router } from '@angular/router';
import { UsuarioFacade as UserFacade } from '@storeOT/usuario/usuario.facades';
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
} from '@model';
//// import { ListUserTableService } from './list-user-table.service';
import { LogService } from '@log';
import { faEye, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'zwc-list-usuario-container',
  templateUrl: './list-usuario-container.component.html',
  styleUrls: ['./list-usuario-container.component.scss'],
})
export class ListUsuarioContainerComponent implements OnInit, OnDestroy {
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

  // EXTRAS
  usuario_id: any = null;
  txt_activar: any = null;
  estado_usuario: any = null;
  uploadedFiles: any[] = [];
  formControls = {
    files: new FormControl([]),
  };
  form: FormGroup = new FormGroup(this.formControls);

  verIcon = faEye;
  editIcon = faPencil;
  trashICon = faTrash;

  constructor(
    private userFacade: UserFacade,
    private router: Router,
    private logger: LogService
  ) {}

  ngOnInit(): void {
    this.userFacade.resetData();

    this.userFacade.getAllUsers();

    this.onInitSetInitialData();
  }

  onInitSetInitialData(): void {
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

        return [];
      })
    );
    this.contratosUser$ = this.userFacade.getContratosUsuario$();
  }

  closeModalDeleteUser(): void {
    this.displayModalDeleteUser = false;
    this.usuario_id = null;
  }

  closeModalActivarUser(): void {
    this.displayModalActivarUser = false;
    this.usuario_id = null;
  }

  closeModalVerContratos(): void {
    this.userFacade.resetContratos();
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
    this.logger.debug('ADD', event);
    this.uploadedFiles = event;
  }

  onDeleteFile(event: any): void {}

  EnviarFirma(): void {
    if (this.usuario_id) {
      const index: any = 'files';
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

  verContratos(item: TableUserData): void {
    this.displayModalVerContratos = true;
    this.userFacade.getContratosUsuario(item.id);
  }

  eliminar(item: TableUserData): void {
    this.displayModalDeleteUser = true;
    this.usuario_id = item.id;
  }

  estadoAccion(item: TableUserData): void {
    this.displayModalActivarUser = true;
    this.usuario_id = item.id;
    this.txt_activar = item.estado ? 'bloquear' : 'activar';
    this.estado_usuario = item.estado;
  }

  firmaAccion(item: TableUserData): void {
    this.displayModalFirma = true;
    this.usuario_id = item.id;
  }

  administrarPerfiles(item: TableUserData): void {
    this.router.navigate([
      '/administracion/usuarios/list-perfiles-usuario',
      item.id,
    ]);
  }
}
