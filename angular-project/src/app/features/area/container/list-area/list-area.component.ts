import { Component, OnInit } from '@angular/core';
import { AreaFacade } from '@storeOT/features/area/area.facade';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-list-area',
  templateUrl: './list-area.component.html',
  styleUrls: ['./list-area.component.scss'],
})
export class ListAreaComponent implements OnInit {
  public areas$: Observable<any[]>;
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
          // width: '10%',
          editable: false,
        },
        {
          field: 'Descripcion',
          type: 'TEXT',
          sort: 'descripcion',
          header: 'descripcion',
          // width: '10%',
          editable: false,
        },
        {
          field: 'Tipo Área',
          type: 'TEXT-LABEL',
          sort: 'interno',
          header: 'interno',
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
          width: '4.4rem',
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
              this.router.navigate(['/app/area/form-area', item.id]);
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

  constructor(private areaFacade: AreaFacade, private router: Router) {}

  ngOnInit(): void {
    this.areaFacade.getAreas();
    this.areas$ = this.areaFacade.getAreas$().pipe(
      map(areas => {
        if (areas) {
          return areas.map(area => ({
            ...area,
            interno: area.interno ? 'Movistar' : 'Contratista',
            estado: area.activa,
          }));
        }
      })
    );
  }
}
