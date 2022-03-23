import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import {
  ListPerfilesUserType,
  Perfil,
  PosiblesSuperiores,
  RequestAgregarPerfilUsusario,
  RequestUpdatePerfilUsusario,
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
  // userSelected4addPerfil$: Observable<User>;
  perfilesUser$: Observable<ListPerfilesUserType[]>;
  allPerfiles$: Observable<Perfil[]>;
  posiblesSuperiores$: Observable<PosiblesSuperiores[]>;
  // perfilSelected$: Observable<ListPerfilesUserType>;

  // DISPLAY MODALS
  displayModalPerfilesUser$: Observable<boolean>;
  displayModalEliminarPerfilUsuario = false;
  // FORMULARIO
  formAddControls: any;
  formAddPerfil: FormGroup;

  // TABLE
  configTable = null;

  // EXTRAS
  usuario_id: number;
  usuarioproxy_id: number;
  addMode = false;
  superior_proxy_id = -1;

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
          // this.userFacade.seletedUser4AddPerfil(+id);
          this.userFacade.getPerfilesUser(+id);
        }
      })
    );
  }

  onInitSetInitialData(): void {
    this.configTable = this.listPerfilesUserTableService.getTableConfig();
    this.configTable.body.actions.push(
      {
        icon: ' pi pi-pencil',
        class: 'p-button-text p-button-sm',
        label: 'Editar superior',
        onClick: (event: Event, item: ListPerfilesUserType) => {
          if (item) {
            this.userFacade.displayModalPerfilesUser(true);
            this.userFacade.getAllPerfiles();
            this.userFacade.perfilSelected(item);
          }
        },
      },
      {
        icon: 'pi pi-trash',
        class: 'p-button-text p-button-danger p-button-sm',
        label: 'Eliminar',
        onClick: (event: Event, item: ListPerfilesUserType) => {
          this.displayModalEliminarPerfilUsuario = true;
          console.log(item);
          this.usuarioproxy_id = item.proxy_id;
        },
      }
    );
    this.formAddControls = this.listPerfilesUserFormService.FormConfig();
    this.formAddPerfil = new FormGroup(this.formAddControls);
    // this.userSelected4addPerfil$ = this.userFacade.getseletedUser4AddPerfil$();
    this.perfilesUser$ = this.userFacade.pefilesUsuario$().pipe(
      map(perfiles => {
        if (perfiles) {
          return perfiles.map(perfil => ({
            id: perfil.perfil_id,
            perfil_propio: perfil.perfil_propio ? 'Propio' : 'Remplazo',
            proxy_id: perfil.id,
            descripcion: perfil.model_perfil_id.descripcion,
            // rol: perfil.model_perfil_id.model_rol_id
            //   .nombre,
            nombre: perfil.model_perfil_id.nombre,
            superior: perfil.model_superior_proxy_id
              ? perfil.model_superior_proxy_id.model_usuario_id.nombres +
                ' ' +
                perfil.model_superior_proxy_id.model_usuario_id.apellidos
              : '',
            superior_proxy_id: perfil.superior_proxy_id,
            nombreUser:
              perfil.model_usuario_id.nombres +
              ' ' +
              perfil.model_usuario_id.apellidos,
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

    this.subscription.add(
      this.userFacade.perfilSelected$().subscribe(perfil => {
        if (perfil) {
          setTimeout(() => {
            this.formAddPerfil.get('perfil_id').setValue(+perfil.id);
            this.formAddPerfil.get('perfil_id').disable({ emitEvent: false });
          }, 700);

          this.superior_proxy_id = +perfil.superior_proxy_id;
          this.usuarioproxy_id = +perfil.proxy_id;
        }
      })
    );

    // DISPLAYS MODAL
    this.displayModalPerfilesUser$ =
      this.userFacade.displayModalPerfilesUser$();
  }

  onInitAccionesInicialesAdicionales(): void {
    this.formAddPerfil.get('superior_proxy_id').disable({ emitEvent: false });
    this.subscription.add(
      this.formAddPerfil
        .get('perfil_id')
        .valueChanges // .pipe(withLatestFrom(this.userSelected4addPerfil$))
        .subscribe(perfil_id => {
          if (perfil_id) {
            console.log('Cambio');
            this.formAddPerfil
              .get('superior_proxy_id')
              .enable({ emitEvent: false });
            this.formAddPerfil.get('superior_proxy_id').setValue(null);
            this.userFacade.getPosiblesSuperiores(this.usuario_id, +perfil_id);
            if (this.superior_proxy_id !== -1) {
              setTimeout(() => {
                this.formAddPerfil
                  .get('superior_proxy_id')
                  .enable({ emitEvent: false });
                this.formAddPerfil
                  .get('superior_proxy_id')
                  .setValue(this.superior_proxy_id);
              }, 700);
            }

            // this.usuario_id = user.id;
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
    this.superior_proxy_id = -1;
  }

  closeModalEliminarPerfilUsuario(): void {
    this.displayModalEliminarPerfilUsuario = false;
    this.usuarioproxy_id = null;
  }

  EliminarPerfilUsuario(): void {
    this.userFacade.deletePerfilUsuario(this.usuarioproxy_id);
    setTimeout(() => {
      this.closeModalEliminarPerfilUsuario();
      this.userFacade.getPerfilesUser(this.usuario_id);
    }, 700);
  }

  AgregarPerfil(): void {
    const request: RequestAgregarPerfilUsusario = {
      perfil_id: +this.formAddPerfil.get('perfil_id').value,
      usuario_id: this.usuario_id,
      superior_proxy_id:
        this.formAddPerfil.get('superior_proxy_id').value === 'NaN'
          ? null
          : +this.formAddPerfil.get('superior_proxy_id').value,
    };

    console.log(request);

    this.userFacade.agregarPerfilUsuario(request);

    setTimeout(() => {
      this.userFacade.displayModalPerfilesUser(false);
      this.formAddPerfil.reset();
      this.userFacade.getPerfilesUser(this.usuario_id);
      this.userFacade.getAllPerfiles();
      this.formAddPerfil.reset();
      this.formAddPerfil.get('superior_proxy_id').disable({ emitEvent: false });
      this.superior_proxy_id = -1;
      this.addMode = false;
    }, 700);
  }

  EditarSuperiorPerfil(): void {
    const request: RequestUpdatePerfilUsusario = {
      usuarioproxy_id: this.usuarioproxy_id,
      values: {
        superior_proxy_id:
          this.formAddPerfil.get('superior_proxy_id').value === 'NaN'
            ? null
            : +this.formAddPerfil.get('superior_proxy_id').value,
      },
    };

    console.log(request);

    this.userFacade.editarSuperiorPerfilUsuario(request);

    setTimeout(() => {
      this.userFacade.displayModalPerfilesUser(false);
      this.formAddPerfil.reset();
      this.userFacade.getPerfilesUser(this.usuario_id);
      this.userFacade.getAllPerfiles();
      this.formAddPerfil.reset();
      this.formAddPerfil.get('superior_proxy_id').disable({ emitEvent: false });
      this.superior_proxy_id = -1;
      this.addMode = false;
    }, 700);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
