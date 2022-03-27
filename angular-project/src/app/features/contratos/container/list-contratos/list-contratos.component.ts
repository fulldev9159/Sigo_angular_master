import { Component, OnInit } from '@angular/core';
import { ContratoFacade } from '@storeOT/features/contratos/contratos.facade';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ReqActivarContrato, TableListContratosMarcos } from '@data';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-list-contratos',
  templateUrl: './list-contratos.component.html',
  styleUrls: ['./list-contratos.component.scss'],
})
export class ListContratosComponent implements OnInit {
  public contratos$: Observable<TableListContratosMarcos[]>;
  public configTable = {
    header: true,
    headerConfig: {
      title: '',
      searchText: 'buscar...',
      paginator: true,
      actionsType: 'ButtonsTest',
    },
    body: {
      headers: [
        {
          field: 'Nombre',
          type: 'TEXT-MAIN',
          sort: 'nombre',
          header: 'nombre',
          width: '15%',
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
          field: 'Tipo Contrato',
          type: 'TEXT-LABEL',
          sort: 'tipo_contrato',
          header: 'tipo_contrato',
          // width: '8%',
          editable: false,
        },
        {
          field: 'Tipo Moneda',
          type: 'TEXT-LABEL',
          sort: 'tipo_moneda',
          header: 'tipo_moneda',
          // width: '8%',
          editable: false,
        },
        {
          field: 'Req. Aprob. Jerarquica',
          type: 'TEXT-LABEL',
          sort: 'aprob_jerarq_inic',
          header: 'aprob_jerarq_inic',
          // width: '8%',
          editable: false,
        },
        {
          field: 'Req. validacion Oper.',
          type: 'TEXT-LABEL',
          sort: 'validacion_operaciones',
          header: 'validacion_operaciones',
          // width: '8%',
          editable: false,
        },
        {
          field: 'Tiene Encuesta',
          type: 'TEXT-LABEL',
          sort: 'tiene_encuesta',
          header: 'tiene_encuesta',
          // width: '8%',
          editable: false,
        },
        {
          field: 'Tipo Pago',
          type: 'TEXT-LABEL',
          sort: 'tipo_pago',
          header: 'tipo_pago',
          // width: '8%',
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
          field: 'Estado',
          type: 'BOOLEANTEXT',
          sort: 'estado',
          header: 'estado',
          booleantrue: 'Activo',
          booleanfalse: 'Inactivo',
          width: '6rem',
          editable: false,
        },
        {
          field: '',
          type: 'ACTIONS',
          sort: null,
          header: null,
          width: '10rem',
          editable: false,
        },
      ],
      sort: ['nombre'],
      actions: [
        {
          // icon: ' pi pi-pencil',
          // class: 'p-button-text p-button-sm',
          type: 'alldisplay',
          label: 'Editar',
          onClick: (event: Event, item: any) => {
            if (item) {
              this.router.navigate(['/app/contratos/form-contratos', item.id]);
            }
          },
        },
        {
          // icon: ' pi pi-ban',
          // class: 'p-button-text p-button-danger p-button-sm',
          type: 'alldisplay-activacion',
          // labelVariable: true,
          label: 'estado',
          onClick: (event: Event, item: any) => {
            // const estado = item.estado === 'Activo' ? false : true;
            const txt = !item.estado ? 'activar' : 'desactivar';
            this.confirmationService.confirm({
              target: event.target as EventTarget,
              message: `¿Está seguro que desea ${txt} este contrato?`,
              icon: 'pi pi-exclamation-triangle',
              acceptLabel: 'Confirmar',
              rejectLabel: 'Cancelar',
              accept: () => {
                const request: ReqActivarContrato = {
                  contrato_marco_id: +item.id,
                  values: {
                    estado: !item.estado,
                  },
                };
                this.contratoFacade.ActivateContrato(request);
              },
            });
          },
        },
      ],
    },
  };

  constructor(
    private contratoFacade: ContratoFacade,
    private router: Router,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.contratoFacade.reset();
    this.contratoFacade.getAllContratos();
    this.contratos$ = this.contratoFacade.getAllContratos$().pipe(
      map(contratos => {
        if (contratos) {
          return contratos.map(contrato => ({
            ...contrato,
            estado: contrato.estado,
            aprob_jerarq_inic: contrato.aprob_jerarq_inic ? 'Si' : 'No',
            tiene_encuesta: contrato.tiene_encuesta ? 'Si' : 'No',
            validacion_operaciones: contrato.validacion_operaciones
              ? 'Si'
              : 'No',
            tipo_contrato: contrato.model_tipo_contrato_id.nombre,
            tipo_moneda: contrato.model_tipo_moneda_id.codigo,
          }));
        }
      })
    );
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
