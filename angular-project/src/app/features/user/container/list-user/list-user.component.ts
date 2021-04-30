import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit, OnDestroy {

  // declarations
  private destroyInstance: Subject<boolean> = new Subject();
  public configTable = {
    header: true,
    headerConfig: {
      title: '',
      searchText: 'buscar...',
    },
    body: {
      headers: [
        {
          field: 'Usuario',
          type: 'TEXT',
          sort: 'nombre',
          header: 'nombre',
          editable: false
        },
        {
          field: 'Rut',
          type: 'TEXT',
          sort: 'descripcion',
          header: 'descripcion',
          editable: false,
        },
        {
          field: 'DV',
          type: 'TEXT',
          sort: 'fecha_creacion',
          header: 'fecha_creacion',
          editable: false,
        },
        {
          field: 'Nombres',
          type: 'TEXT',
          sort: 'nombre',
          header: 'nombre',
          editable: false,
        },
        {
          field: 'Apellidos',
          type: 'TEXT',
          sort: 'nombre',
          header: 'nombre',
          editable: false,
        },
        {
          field: 'Email',
          type: 'TEXT',
          sort: 'nombre',
          header: 'nombre',
          editable: false,
        },
        {
          field: 'Celular',
          type: 'TEXT',
          sort: 'nombre',
          header: 'nombre',
          editable: false,
        },
        {
          field: null,
          type: 'ACTIONS',
          sort: null,
          header: null,
          editable: false
        }

      ],
      sort: ['nombre', 'descripcion'],
      actions: [
        {
          icon: 'p-button-icon pi pi-pencil',
          class: 'p-button-rounded p-button-warning p-mr-2',
          onClick: (item) => {
            console.log(item);
          }
        },
        {
          icon: 'p-button-icon pi pi-eye',
          class: 'p-button-rounded p-button-info p-mr-2',
          onClick: (item) => {
            console.log(item);
          },
        },
        {
          icon: 'p-button-icon pi pi-trash',
          class: 'p-button-rounded p-button-danger',
          onClick: (item) => {
            console.log(item);
          },
        },
      ],
    },
  };

  constructor(
    private router: Router,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroyInstance.next(true);
    this.destroyInstance.complete();
  }

}
