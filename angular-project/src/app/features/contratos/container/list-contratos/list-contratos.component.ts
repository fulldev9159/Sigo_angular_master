import { Component, OnInit } from '@angular/core';
import { ContratoFacade } from '@storeOT/features/contratos/contratos.facade';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ContratoMarco } from '@data';

@Component({
  selector: 'app-list-contratos',
  templateUrl: './list-contratos.component.html',
  styleUrls: ['./list-contratos.component.scss'],
})
export class ListContratosComponent implements OnInit {
  public contratos$: Observable<ContratoMarco[]>;
  public configTable = {
    header: true,
    headerConfig: {
      title: '',
      searchText: 'buscar...',
      paginator: true,
      actionsType: 'Buttons',
    },
    body: {
      headers: [
        {
          field: 'Nombre',
          type: 'TEXT',
          sort: 'nombre',
          header: 'nombre',
          // width: '10%',
          editable: false,
        },
        {
          field: 'Costo Max',
          type: 'NUMBER',
          sort: 'costo_max',
          header: 'costo_max',
          // width: '10%',
          editable: false,
        },
        {
          field: 'Tipo_pago',
          type: 'TEXT',
          sort: 'tipo_pago',
          header: 'tipo_pago',
          // width: '10%',
          editable: false,
        },
        {
          field: 'Fecha Inicio',
          type: 'DATE',
          sort: 'fecha_inicio',
          header: 'fecha_inicio',
          // width: '10%',
          editable: false,
        },
        {
          field: 'Fecha Fin',
          type: 'DATE',
          sort: 'fecha_fin',
          header: 'fecha_fin',
          // width: '10%',
          editable: false,
        },
        {
          field: 'Aprob. Jerarquica',
          type: 'TEXT',
          sort: 'aprob_jerarq_inic',
          header: 'aprob_jerarq_inic',
          // width: '8%',
          editable: false,
        },
        {
          field: 'Tiene Encuesta',
          type: 'TEXT',
          sort: 'tiene_encuesta',
          header: 'tiene_encuesta',
          // width: '8%',
          editable: false,
        },
        {
          field: 'Tipo Contrato',
          type: 'TEXT',
          sort: 'tiene_encuesta',
          header: 'tiene_encuesta',
          // width: '8%',
          editable: false,
        },
        {
          field: 'Tipo Moneda',
          type: 'TEXT',
          sort: 'tiene_encuesta',
          header: 'tiene_encuesta',
          // width: '8%',
          editable: false,
        },
        {
          field: 'Tipo Pago',
          type: 'TEXT',
          sort: 'tipo_pago',
          header: 'tipo_pago',
          // width: '8%',
          editable: false,
        },
        {
          field: 'Validación de OP',
          type: 'TEXT',
          sort: 'validacion_operaciones',
          header: 'validacion_operaciones',
          // width: '8%',
          editable: false,
        },
        {
          field: 'Estado',
          type: 'TEXT',
          sort: 'activa',
          header: 'activa',
          // width: '8%',
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
      sort: ['nombre'],
      actions: [
        {
          icon: ' pi pi-pencil',
          class: 'p-button-text p-button-sm',
          label: 'Editar',
          onClick: (event: Event, item: any) => {
            if (item) {
              // this.router.navigate(['/app/area/form-area', item.id]);
            }
          },
        },
        // {
        //   icon: ' pi pi-ban',
        //   class: 'p-button-text p-button-danger p-button-sm',
        //   labelVariable: true,
        //   label: 'activo',
        //   onClick: (event: Event, item: any) => {
        //     // if (item.eliminable) {
        //     // const txt = item.activo ? 'Bloquear' : 'Activar';
        //     // this.confirmationService.confirm({
        //     //   target: event.target as EventTarget,
        //     //   message: `¿Está seguro que desea ${txt} este Usuario?`,
        //     //   icon: 'pi pi-exclamation-triangle',
        //     //   acceptLabel: 'Confirmar',
        //     //   rejectLabel: 'Cancelar',
        //     //   accept: () => {
        //     //     this.userFacade.activateUser(+item.id, !item.activo);
        //     //   },
        //     // });
        //     // }
        //   },
        // },
      ],
    },
  };

  constructor(private contratoFacade: ContratoFacade, private router: Router) {}

  ngOnInit(): void {
    this.contratoFacade.reset();
    this.contratoFacade.getAllContratos();
    this.contratos$ = this.contratoFacade.getAllContratos$();
    // .pipe(
    //   map(areas => {
    //     if (areas) {
    //       return areas.map(area => ({
    //         ...area,
    //         interno: area.interno ? 'Movistar' : 'Contratista',
    //         activa: area.activa ? 'Activa' : 'Inactiva',
    //       }));
    //     }
    //   })
    // );
  }
}
