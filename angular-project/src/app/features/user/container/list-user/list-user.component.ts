import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';

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

  // FORMULARIO

  // TABLE
  configTable = null;

  // EXTRAS

  // CONSTRUCTOR
  constructor(
    private userFacade: UserFacade,
    private listUserTableService: ListUserTableService
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
  }

  onInitAccionesInicialesAdicionales(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
