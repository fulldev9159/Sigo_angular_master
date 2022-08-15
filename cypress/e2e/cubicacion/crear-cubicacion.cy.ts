import {
  tipoCubicacionMOCK200OK,
  getAgenciasContratoMOCK200OK,
  ContratosUsuarioMOCK200OK,
  getProveedoresAgenciaContratoMOCK200OK,
  getActividadesContratoProveedorMOCK200ok,
} from '../../../src/mocks';

describe('Testing Formulario Components', () => {
  it('should let enter to create cubicacion', () => {
    cy.visit('http://localhost:4206/login/auth');
    cy._login('mgestor1', 'asdasd');
    cy._select_profile('Gestor/JP');
    cy.get('#crear-cubicacion-sidebar').click();
  });

  describe('Nombre Cubicacion', () => {
    it('should display name cubicacion input text', () => {
      cy._check_input('input[name="input-nombre-cubicacion"]', 'required');
    });
  });

  describe('Tipo Cubicacion', (name = 'Tipo Cubicaion') => {
    it(`should display dropdown ${name} as required`, () => {
      cy._check_dropdown_required('#select-tipo-cubicacion');
    });

    it(`dropdown ${name} should display data`, () => {
      let datos = tipoCubicacionMOCK200OK.data.items
        .sort((a, b) =>
          a.descripcion > b.descripcion
            ? 1
            : b.descripcion > a.descripcion
            ? -1
            : 0
        )
        .map(value => value.descripcion);
      cy.get('#select-tipo-cubicacion').click();
      cy.get('li.p-ripple').each(($el, index, $list) => {
        expect($el.text()).eq(datos[index]);
      });
    });
  });

  describe('Contrato Marco', (name = 'Contrato Marco') => {
    let selector = '#select-contrato_marco';

    it(`should display dropdown ${name} as required`, () => {
      cy._check_dropdown_required(selector);
    });

    it(`dropdown ${name} should display data`, () => {
      let datos = ContratosUsuarioMOCK200OK.data.items
        .sort((a, b) =>
          a.model_contrato_id.nombre > b.model_contrato_id.nombre
            ? 1
            : b.model_contrato_id.nombre > a.model_contrato_id.nombre
            ? -1
            : 0
        )
        .map(value => value.model_contrato_id.nombre);
      cy.get(selector).click();
      cy.get('li.p-ripple').each(($el, index, $list) => {
        expect($el.text()).eq(datos[index]);
      });
    });

    afterEach(() => {
      cy.get('input[name="input-nombre-cubicacion"]').click();
    });
  });

  describe('Agencia', (name = 'Agencia') => {
    let selector = '#select-agencia';
    it(`should display dropdown ${name} as required`, () => {
      cy._select_dropdown('#select-contrato_marco', 'BUCLE');
      cy._check_dropdown_required(selector);
    });

    it(`dropdown ${name} should display data`, () => {
      let datos = getAgenciasContratoMOCK200OK.data.items
        .sort((a, b) =>
          a.nombre > b.nombre ? 1 : b.nombre > a.nombre ? -1 : 0
        )
        .map(value => value.nombre);
      cy._select_dropdown('#select-contrato_marco', 'BUCLE');
      cy.get(selector).click();
      cy.get('li.p-ripple').each(($el, index, $list) => {
        expect($el.text()).eq(datos[index]);
      });
    });

    afterEach(() => {
      cy.get('input[name="input-nombre-cubicacion"]').click();
    });
  });

  describe('Proveedor', (name = 'Proveedor') => {
    let selector = '#select-proveedor';
    it(`should display dropdown ${name} as required`, () => {
      cy._select_dropdown('#select-contrato_marco', 'BUCLE');
      cy._select_dropdown('#select-agencia', 'APOQUINDO');
      cy._check_dropdown_required(selector);
    });

    it(`dropdown ${name} should display data`, () => {
      let datos = getProveedoresAgenciaContratoMOCK200OK.data.items
        .sort((a, b) =>
          a.nombre > b.nombre ? 1 : b.nombre > a.nombre ? -1 : 0
        )
        .map(value => `${value.codigo_acuerdo} - ${value.nombre}`);
      cy._select_dropdown('#select-contrato_marco', 'BUCLE');
      cy._select_dropdown('#select-agencia', 'APOQUINDO');
      cy.get(selector).click();
      cy.get('li.p-ripple').each(($el, index, $list) => {
        expect($el.text()).eq(datos[index]);
      });
    });

    afterEach(() => {
      cy.get('input[name="input-nombre-cubicacion"]').click();
    });
  });

  describe('Direccion', () => {
    it(`should display dirección inputs for bucle contract`, () => {
      cy._select_dropdown('#select-contrato_marco', 'BUCLE');
      cy._check_input('input[name="input-direccion-desde"]', 'required');
      cy._check_input('input[name="input-altura-desde"]', 'required');
      cy._check_input('input[name="input-direccion-hasta"]', 'required');
      cy._check_input('input[name="input-altura-hasta"]', 'required');
    });

    it('should not display dirección inputs for contracts doent bucle', () => {
      cy._select_dropdown('#select-contrato_marco', 'CONTRATO_ORDINARIO');
      cy.get('input[name="input-direccion-desde"]').should('not.exist');
      cy.get('input[name="input-altura-desde"]').should('not.exist');
      cy.get('input[name="input-direccion-hasta"]').should('not.exist');
      cy.get('input[name="input-altura-hasta"]').should('not.exist');
      cy._select_dropdown('#select-contrato_marco', 'UNIFICADO_MOVIL');
      cy.get('input[name="input-direccion-desde"]').should('not.exist');
      cy.get('input[name="input-altura-desde"]').should('not.exist');
      cy.get('input[name="input-direccion-hasta"]').should('not.exist');
      cy.get('input[name="input-altura-hasta"]').should('not.exist');
      cy._select_dropdown('#select-contrato_marco', 'UNIFICADO_MOVIL');
      cy.get('input[name="input-direccion-desde"]').should('not.exist');
      cy.get('input[name="input-altura-desde"]').should('not.exist');
      cy.get('input[name="input-direccion-hasta"]').should('not.exist');
      cy.get('input[name="input-altura-hasta"]').should('not.exist');
    });
  });

  describe('Actividad', (name = 'Actividad') => {
    let selector = '#select-actividad';
    it(`should display dropdown ${name} as required`, () => {
      cy._select_dropdown('#select-contrato_marco', 'BUCLE');
      cy._select_dropdown('#select-agencia', 'APOQUINDO');
      cy._select_dropdown(
        '#select-agencia',
        '330000659 - COBRA CHILE SERVICIOS S.A.'
      );
      cy._check_dropdown_required(selector);
    });

    it(`dropdown ${name} should display data`, () => {
      let datos = getActividadesContratoProveedorMOCK200ok.data.items
        .sort((a, b) =>
          a.descripcion > b.descripcion
            ? 1
            : b.descripcion > a.descripcion
            ? -1
            : 0
        )
        .map(value => `${value.descripcion}`);
      cy._select_dropdown('#select-contrato_marco', 'BUCLE');
      cy._select_dropdown('#select-agencia', 'APOQUINDO');
      cy._select_dropdown(
        '#select-agencia',
        '330000659 - COBRA CHILE SERVICIOS S.A.'
      );
      cy.get(selector).click();
      cy.get('li.p-ripple').each(($el, index, $list) => {
        expect($el.text()).eq(datos[index]);
      });
    });

    afterEach(() => {
      cy.get('input[name="input-nombre-cubicacion"]').click();
    });
  });
});

describe('Excepcion crear cubicación sin contratos asignado', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4206/login/auth');
    cy._login('mtestsincontratos', 'asdasd');
    cy._select_profile('Gestor/JP');
    cy.get('#crear-cubicacion-sidebar').click();
  });

  it('should display message "No tiene contratos asignados. Favor contactar con el administrador del sistema" ', () => {
    cy.get('.snackbar-container').should('exist');
  });
});
