import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    component.config = {
      header: true,
      headerConfig: {
        title: 'Tabla de productos',
        searchText: 'buscar...',
        actionsType: '',
        paginator: false,
      },
      body: {
        headers: [
          {
            field: null,
            type: 'CHECKBOX',
            sort: 'id',
            header: 'id',
            editable: false,
            width: '',
          },
          {
            field: 'Nombre',
            type: 'TEXT',
            sort: 'name',
            header: 'name',
            editable: false,
            width: '',
          },
          {
            field: 'Precio',
            type: 'NUMBER',
            sort: 'price',
            header: 'price',
            editable: false,
            width: '',
          },
          {
            field: 'Categoría',
            type: 'TEXT',
            sort: 'category',
            header: 'category',
            editable: false,
            width: '',
          },
          {
            field: 'Vistas',
            type: 'TEXT',
            sort: 'quantity',
            header: 'quantity',
            editable: false,
            width: '',
          },
          {
            field: 'Estado',
            type: 'TEXT',
            sort: 'inventoryStatus',
            header: 'inventoryStatus',
            editable: false,
            width: '',
          },
          {
            field: null,
            type: 'ACTIONS',
            sort: null,
            header: null,
            editable: false,
            width: '',
          },
        ],
        sort: [],
        actions: [
          {
            icon: 'p-button-icon pi pi-save',
            class: 'p-button-rounded p-button-success p-mr-2',
            label: '',
            onClick: (item, event) => {},
          },
          {
            icon: 'p-button-icon pi pi-pencil',
            class: 'p-button-rounded p-button-warning p-mr-2',
            label: '',
            onClick: (item, event) => {},
          },
          {
            icon: 'p-button-icon pi pi-trash',
            class: 'p-button-rounded p-button-danger',
            label: '',
            onClick: (item, event) => {},
          },
        ],
      },
    };

    component.items = [
      {
        id: 1000,
        code: 'f230fh0g3',
        name: 'Bamboo Watch',
        description: 'Product Description',
        price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5,
      },
    ];
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
