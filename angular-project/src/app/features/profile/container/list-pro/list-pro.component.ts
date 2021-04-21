import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-list-pro',
  templateUrl: './list-pro.component.html',
  styleUrls: ['./list-pro.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListProComponent implements OnInit, OnDestroy {

  // declarations
  public items$: Observable<any[]>;
  private destroyInstance: Subject<boolean> = new Subject();
  public configTable = {
    header: true,
    headerConfig: {
      title: '',
      searchText: 'buscar...'
    },
    body: {
      headers: [
        // {
        //   field: null,
        //   type: 'CHECKBOX',
        //   sort: 'id',
        //   header: 'id',
        //   editable: false
        // },
        {
          field: 'Nombre',
          type: 'TEXT',
          sort: 'nombre',
          header: 'nombre',
          editable: false
        },
        {
          field: 'Fecha creación',
          type: 'DATE',
          sort: 'fecha_creacion',
          header: 'fecha_creacion',
          editable: false
        },
        {
          field: 'Región',
          type: 'TEXT',
          sort: 'region_nombre',
          header: 'region_nombre',
          editable: false
        },
        {
          field: 'Contrato marco',
          type: 'TEXT',
          sort: 'contrato_marco_nombre',
          header: 'contrato_marco_nombre',
          editable: false
        },
        {
          field: 'Total',
          type: 'NUMBER',
          sort: 'total',
          header: 'total',
          editable: false
        },
        {
          field: null,
          type: 'ACTIONS',
          sort: null,
          header: null,
          editable: false
        }
      ],
      sort: ['nombre', 'fecha', 'region_nombre', 'contrato_marco_nombre', 'total'],
      actions: [
        {
          icon: 'p-button-icon pi pi-copy',
          class: 'p-button-rounded p-button-info p-mr-2',
          onClick: (item) => {
            this.confirmationService.confirm({
              target: event.target as EventTarget,
              message: `¿Está seguro que desea realizar copia de esta cubicación?`,
              icon: 'pi pi-exclamation-triangle',
              acceptLabel: 'Confirmar',
              rejectLabel: 'Cancelar',
              accept: () => {
                const cubicacion = {
                  ...item,
                  id: (+(new Date())).toString()
                }
                // this.cubageFacade.replyCubicacion(cubicacion);
              },
            });
          }
        },
        {
          icon: 'p-button-icon pi pi-pencil',
          class: 'p-button-rounded p-button-warning p-mr-2',
          onClick: (item) => {
            if (item) {
              this.router.navigate(['/app/cubicacion/form-cub', item.id]);
            }
          }
        },
        {
          icon: 'p-button-icon pi pi-trash',
          class: 'p-button-rounded p-button-danger',
          onClick: (item, position) => {
            this.confirmationService.confirm({
              target: event.target as EventTarget,
              message: `¿Está seguro que desea eliminar esta cubicación?`,
              icon: 'pi pi-exclamation-triangle',
              acceptLabel: 'Confirmar',
              rejectLabel: 'Cancelar',
              accept: () => {
                // this.cubageFacade.deleteCubicacion(position);
              },
              // reject: () => {
              //   console.log('Cancelo eliminar');
              //   console.log(item);
              //   console.log('Cancelo eliminar');
              // },
            });
          }
        }
      ]
    }
  };

  public data = [
    {
      id: 1000,
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5
    },
    {
      id: 1001,
      code: 'nvklal433',
      name: 'Black Watch',
      description: 'Product Description',
      price: 72,
      category: 'Accessories',
      quantity: 61,
      inventoryStatus: 'INSTOCK',
      rating: 4
    },
    {
      id: 1002,
      code: 'zz21cz3c1',
      name: 'Blue Band',
      description: 'Product Description',
      price: 79,
      category: 'Fitness',
      quantity: 2,
      inventoryStatus: 'LOWSTOCK',
      rating: 3
    },
    {
      id: 1003,
      code: '244wgerg2',
      name: 'Blue T-Shirt',
      description: 'Product Description',
      price: 29,
      category: 'Clothing',
      quantity: 25,
      inventoryStatus: 'INSTOCK',
      rating: 5
    },
    {
      id: 1004,
      code: 'h456wer53',
      name: 'Bracelet',
      description: 'Product Description',
      price: 15,
      category: 'Accessories',
      quantity: 73,
      inventoryStatus: 'INSTOCK',
      rating: 4
    },
    {
      id: 1005,
      code: 'av2231fwg',
      name: 'Brown Purse',
      description: 'Product Description',
      price: 120,
      category: 'Accessories',
      quantity: 0,
      inventoryStatus: 'OUTOFSTOCK',
      rating: 4
    },
    {
      id: 1006,
      code: 'bib36pfvm',
      name: 'Chakra Bracelet',
      description: 'Product Description',
      price: 32,
      category: 'Accessories',
      quantity: 5,
      inventoryStatus: 'LOWSTOCK',
      rating: 3
    },
    {
      id: 1007,
      code: 'mbvjkgip5',
      name: 'Galaxy Earrings',
      description: 'Product Description',
      price: 34,
      category: 'Accessories',
      quantity: 23,
      inventoryStatus: 'INSTOCK',
      rating: 5
    },
    {
      id: 1008,
      code: 'vbb124btr',
      name: 'Game Controller',
      description: 'Product Description',
      price: 99,
      category: 'Electronics',
      quantity: 2,
      inventoryStatus: 'LOWSTOCK',
      rating: 4
    },
    {
      id: 1009,
      code: 'cm230f032',
      name: 'Gaming Set',
      description: 'Product Description',
      price: 299,
      category: 'Electronics',
      quantity: 63,
      inventoryStatus: 'INSTOCK',
      rating: 3
    },
    {
      id: 1010,
      code: 'plb34234v',
      name: 'Gold Phone Case',
      description: 'Product Description',
      price: 24,
      category: 'Accessories',
      quantity: 0,
      inventoryStatus: 'OUTOFSTOCK',
      rating: 4
    },
    {
      id: 1011,
      code: '4920nnc2d',
      name: 'Green Earbuds',
      description: 'Product Description',
      price: 89,
      category: 'Electronics',
      quantity: 23,
      inventoryStatus: 'INSTOCK',
      rating: 4
    },
    {
      id: 1012,
      code: '250vm23cc',
      name: 'Green T- Shirt',
      description: 'Product Description',
      price: 49,
      category: 'Clothing',
      quantity: 74,
      inventoryStatus: 'INSTOCK',
      rating: 5
    },
    {
      id: 1013,
      code: 'fldsmn31b',
      name: 'Grey T - Shirt',
      description: 'Product Description',
      price: 48,
      category: 'Clothing',
      quantity: 0,
      inventoryStatus: 'OUTOFSTOCK',
      rating: 3
    },
    {
      id: 1014,
      code: 'waas1x2as',
      name: 'Headphones',
      description: 'Product Description',
      price: 175,
      category: 'Electronics',
      quantity: 8,
      inventoryStatus: 'LOWSTOCK',
      rating: 5
    },
    {
      id: 1015,
      code: 'vb34btbg5',
      name: 'Light Green T - Shirt',
      description: 'Product Description',
      price: 49,
      category: 'Clothing',
      quantity: 34,
      inventoryStatus: 'INSTOCK',
      rating: 4
    },
    {
      id: 1016,
      code: 'k8l6j58jl',
      name: 'Lime Band',
      description: 'Product Description',
      price: 79,
      category: 'Fitness',
      quantity: 12,
      inventoryStatus: 'INSTOCK',
      rating: 3
    },
    {
      id: 1017,
      code: 'v435nn85n',
      name: 'Mini Speakers',
      description: 'Product Description',
      price: 85,
      category: 'Clothing',
      quantity: 42,
      inventoryStatus: 'INSTOCK',
      rating: 4
    },
    {
      id: 1018,
      code: '09zx9c0zc',
      name: 'Painted Phone Case',
      description: 'Product Description',
      price: 56,
      category: 'Accessories',
      quantity: 41,
      inventoryStatus: 'INSTOCK',
      rating: 5
    },
    {
      id: 1019,
      code: 'mnb5mb2m5',
      name: 'Pink Band',
      description: 'Product Description',
      price: 79,
      category: 'Fitness',
      quantity: 63,
      inventoryStatus: 'INSTOCK',
      rating: 4
    },
    {
      id: 1020,
      code: 'r23fwf2w3',
      name: 'Pink Purse',
      description: 'Product Description',
      price: 110,
      category: 'Accessories',
      quantity: 0,
      inventoryStatus: 'OUTOFSTOCK',
      rating: 4
    },
    {
      id: 1021,
      code: 'pxpzczo23',
      name: 'Purple Band',
      description: 'Product Description',
      price: 79,
      category: 'Fitness',
      quantity: 6,
      inventoryStatus: 'LOWSTOCK',
      rating: 3
    },
    {
      id: 1022,
      code: '2c42cb5cb',
      name: 'Purple Gemstone Necklace',
      description: 'Product Description',
      price: 45,
      category: 'Accessories',
      quantity: 62,
      inventoryStatus: 'INSTOCK',
      rating: 4
    },
    {
      id: 1023,
      code: '5k43kkk23',
      name: 'Purple T - Shirt',
      description: 'Product Description',
      price: 49,
      category: 'Clothing',
      quantity: 2,
      inventoryStatus: 'LOWSTOCK',
      rating: 5
    },
    {
      id: 1024,
      code: 'lm2tny2k4',
      name: 'Shoes',
      description: 'Product Description',
      price: 64,
      category: 'Clothing',
      quantity: 0,
      inventoryStatus: 'INSTOCK',
      rating: 4
    },
    {
      id: 1025,
      code: 'nbm5mv45n',
      name: 'Sneakers',
      description: 'Product Description',
      price: 78,
      category: 'Clothing',
      quantity: 52,
      inventoryStatus: 'INSTOCK',
      rating: 4
    },
    {
      id: 1026,
      code: 'zx23zc42c',
      name: 'Teal T - Shirt',
      description: 'Product Description',
      price: 49,
      category: 'Clothing',
      quantity: 3,
      inventoryStatus: 'LOWSTOCK',
      rating: 3
    },
    {
      id: 1027,
      code: 'acvx872gc',
      name: 'Yellow Earbuds',
      description: 'Product Description',
      price: 89,
      category: 'Electronics',
      quantity: 35,
      inventoryStatus: 'INSTOCK',
      rating: 3
    },
    {
      id: 1028,
      code: 'tx125ck42',
      name: 'Yoga Mat',
      description: 'Product Description',
      price: 20,
      category: 'Fitness',
      quantity: 15,
      inventoryStatus: 'INSTOCK',
      rating: 5
    },
    {
      id: 1029,
      code: 'gwuby345v',
      name: 'Yoga Set',
      description: 'Product Description',
      price: 20,
      category: 'Fitness',
      quantity: 25,
      inventoryStatus: 'INSTOCK',
      rating: 8
    }
  ];

  constructor(
    private router: Router,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    // this.items$ = this.cubageFacade.getCubicacion$();
  }

  ngOnDestroy(): void {
    this.destroyInstance.next(true);
    this.destroyInstance.complete();
  }

}
