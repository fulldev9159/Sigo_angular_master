import { tipoCubicacionMOCK200OK } from '../../../src/mocks';

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
