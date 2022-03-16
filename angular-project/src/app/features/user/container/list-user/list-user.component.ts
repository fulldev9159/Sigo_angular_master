import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserFacade } from '@storeOT/features/user/user.facade';
import { ConfirmationService } from 'primeng/api';
import { Observable, of, Subscription } from 'rxjs';
// import * as Data from '@data';
import { map, withLatestFrom } from 'rxjs/operators';
import {
  ListPerfilesUser,
  Perfil,
  PosiblesSuperiores,
  RequestAgregarPerfilUsusario,
  TableUserData,
  User,
} from '@data';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
})
export class ListUserComponent implements OnInit {
  subscription: Subscription = new Subscription();
  public DisplayModal$ = of();
  public usersTableData$: Observable<TableUserData[]>;
  perfilesUser$: Observable<ListPerfilesUser[]>;
  allPerfiles$: Observable<Perfil[]>;
  posiblesSuperiores$: Observable<PosiblesSuperiores[]>;
  displayModalPerfilesUser$: Observable<boolean>;
  nombreUsuario: string;
  usuario_id: number;

  formAddControls = {
    id: new FormControl(null),
    perfil_id: new FormControl(null, [Validators.required]),
    superior_id: new FormControl(null, [Validators.required]),
  };

  formAddPerfil: FormGroup = new FormGroup(this.formAddControls);

  public configTable = {
    header: true,
    headerConfig: {
      title: '',
      searchText: 'buscar...',
      paginator: true,
      actionsType: 'Menu',
    },
    body: {
      headers: [
        {
          field: 'username',
          type: 'TEXT',
          sort: 'username',
          header: 'username',
          // width: '10%',
          editable: false,
        },
        {
          field: 'Rut',
          type: 'TEXT',
          sort: 'rut',
          header: 'rut',
          // width: '10%',
          editable: false,
        },
        {
          field: 'Nombres',
          type: 'TEXT-TITLECASE',
          sort: 'nombres',
          header: 'nombres',
          // width: '10%',
          editable: false,
        },
        {
          field: 'Apellidos',
          type: 'TEXT-TITLECASE',
          sort: 'apellidos',
          header: 'apellidos',
          // width: '8%',
          editable: false,
        },
        {
          field: 'Empresa',
          type: 'TEXT-TITLECASE',
          sort: 'empresa',
          header: 'empresa',
          // width: '10%',
          editable: false,
        },
        {
          field: 'Area',
          type: 'TEXT-TITLECASE',
          sort: 'area',
          header: 'area',
          // width: '10%',
          editable: false,
        },
        {
          field: 'Estado',
          type: 'BOOLEANTEXT',
          sort: 'estado',
          header: 'estado',
          booleantrue: 'Activo',
          booleanfalse: 'Bloqueado',
          width: '5%',
          editable: false,
        },
        {
          field: 'Acciones',
          type: 'ACTIONS',
          sort: null,
          header: null,
          editable: false,
        },
      ],
      sort: ['username', 'rut', 'nombres', 'apellidos', 'proveedor_nombre'],
      actions: [
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
            // if (item.eliminable) {
            this.confirmationService.confirm({
              target: event.target as EventTarget,
              message: `¿Está seguro que desea eliminar este Usuario?`,
              icon: 'pi pi-exclamation-triangle',
              acceptLabel: 'Confirmar',
              rejectLabel: 'Cancelar',
              accept: () => {
                this.userFacade.deleteUser(+item.id);
              },
            });
            // }
          },
        },
        {
          icon: ' pi pi-ban',
          class: 'p-button-text p-button-danger p-button-sm',
          labelVariable: true,
          label: 'activo',
          onClick: (event: Event, item: User) => {
            // if (item.eliminable) {
            const txt = item.estado ? 'Bloquear' : 'Activar';
            this.confirmationService.confirm({
              target: event.target as EventTarget,
              message: `¿Está seguro que desea ${txt} este Usuario?`,
              icon: 'pi pi-exclamation-triangle',
              acceptLabel: 'Confirmar',
              rejectLabel: 'Cancelar',
              accept: () => {
                this.userFacade.activateUser(+item.id, !item.estado);
              },
            });
            // }
          },
        },
        {
          icon: ' pi pi-plus',
          class: 'p-button-text p-button-danger p-button-sm',
          label: 'Agregar Perfil',
          onClick: (event: Event, item: User) => {
            this.userFacade.getPerfilesUser(item.id);
            this.nombreUsuario = item.nombres + ' ' + item.apellidos;
            this.usuario_id = item.id;
            this.userFacade.getAllPerfiles();
          },
        },
      ],
    },
  };

  constructor(
    private router: Router,
    private userFacade: UserFacade,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.userFacade.getAllUsers();
    this.formAddPerfil.get('superior_id').disable({ emitEvent: false });
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
            // console.log('listPerfilesuser', listPerfilesuser);
            const perfilesUser: number[] = listPerfilesuser.map(
              userperfil => userperfil.id
            );
            // console.log('IDSES USUARIO', perfilesUser);
            // console.log('ID', perfil.id);
            // console.log('INCLUDES', perfilesUser.includes(perfil.id));
            // console.log('Return', !perfilesUser.includes(perfil.id));
            return !perfilesUser.includes(perfil.id);
          });
        }
      })
    );
    this.posiblesSuperiores$ = this.userFacade.getPosiblesSuperiores$();
    this.DisplayModal$ = this.userFacade.DisplayDetalleModal$();
    this.displayModalPerfilesUser$ =
      this.userFacade.displayModalPerfilesUser$();

    this.subscription.add(
      this.formAddPerfil.get('perfil_id').valueChanges.subscribe(perfil_id => {
        if (perfil_id) {
          this.formAddPerfil.get('superior_id').enable({ emitEvent: false });
          this.formAddPerfil.get('superior_id').setValue(null);
          this.userFacade.getPosiblesSuperiores(+this.usuario_id, +perfil_id);
        }
      })
    );
  }

  // cerrarDisplayModal(value: boolean): void {
  //   this.userFacade.SetDisplayDetalleModal(value);
  // }

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
