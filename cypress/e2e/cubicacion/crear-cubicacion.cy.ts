import {
  tipoCubicacionMOCK200OK,
  getAgenciasContratoMOCK200OK2,
  ContratosUsuarioMOCK200OK,
  getProveedoresAgenciaContratoMOCK200OK2,
  getActividadesContratoProveedorMOCK200ok,
  getAgenciasContratoMOCK200OK,
  getProveedoresAgenciaContratoMOCK200OK,
} from '../../../src/mocks';

it('should let enter to create cubicacion', () => {
  cy.visit('http://localhost:4206/login/auth');
  cy._login('mgestor1', 'asdasd');
  cy._select_profile('Gestor/JP');
  cy.get('#crear-cubicacion-sidebar').click();
});

describe.skip('Test responsive', () => {});

describe('Test como se debe desplegar el formulario en un inicio', () => {
  describe('Visibilidad', () => {
    it('should display name cubicacion input enabled', () => {
      cy.get('input[name="input-nombre-cubicacion"]').should('be.enabled');
    });

    it('should display tipo cubicacion enabled', () => {
      cy.get('#select-tipo-cubicacion>div').should(
        'not.have.class',
        'p-disabled'
      );
    });

    it('should display Contrato Marco enabled', () => {
      cy.get('#select-contrato_marco>div').should(
        'not.have.class',
        'p-disabled'
      );
    });

    it('should display Agencia disabled', () => {
      cy.get('#select-agencia>div').should('have.class', 'p-disabled');
    });

    it('should display Proveedor disabled', () => {
      cy.get('#select-proveedor>div').should('have.class', 'p-disabled');
    });

    it('should display Actividad disabled', () => {
      cy.get('#select-actividad>div').should('have.class', 'p-disabled');
    });

    it('should display Tipo Servicio disabled', () => {
      cy.get('#select-tipo-servicio>div').should('have.class', 'p-disabled');
    });

    it('should display Servicio disabled', () => {
      cy.get('#select-servicio>div').should('have.class', 'p-disabled');
    });

    it('should display Unidad Obra disabled', () => {
      cy.get('#select-unidad-obra>div').should('have.class', 'p-disabled');
    });
  });

  describe('Usabilidad', () => {
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
  });
});

describe('Testing comportamiento sección descripcion dependiendo del contrato', () => {
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

describe('Testing comportamiento inputs', () => {
  describe('Agencia', (name = 'Agencia') => {
    let selector = '#select-agencia';
    it(`should display dropdown ${name} as required`, () => {
      cy._select_dropdown('#select-contrato_marco', 'BUCLE');
      cy.get(selector).click();
      cy.wait(1).then(() => {
        cy._check_dropdown_required(selector);
      });
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
      cy.intercept(
        'POST',
        '/cubicacion/proveedores_from_agencia_contrato/get'
      ).as('HTTPRESPONSE');
      cy.wait('@HTTPRESPONSE').then(() => {
        cy._check_dropdown_required(selector);
      });
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
});

describe.skip('Testing Formulario Components', () => {
  it('should let enter to create cubicacion', () => {
    cy.visit('http://localhost:4206/login/auth');
    cy._login('mgestor1', 'asdasd');
    cy._select_profile('Gestor/JP');
    cy.get('#crear-cubicacion-sidebar').click();
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
        '#select-proveedor',
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

  describe('Tipo Servicio', (name = 'Tipo Servicio') => {
    let selector = '#select-tipo-servicio';
    it(`should display dropdown ${name} as required`, () => {
      cy._select_dropdown('#select-contrato_marco', 'BUCLE');
      cy._select_dropdown('#select-agencia', 'APOQUINDO');
      cy._select_dropdown(
        '#select-agencia',
        '330000659 - COBRA CHILE SERVICIOS S.A.'
      );

      cy._select_dropdown('#select-actividad', 'DISEÑO');
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
        '#select-proveedor',
        '330000659 - COBRA CHILE SERVICIOS S.A.'
      );
      cy._select_dropdown('#select-actividad', 'DISEÑO');
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
