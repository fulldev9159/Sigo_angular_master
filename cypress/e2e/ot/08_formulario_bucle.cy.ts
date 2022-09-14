import { cubicacionContratoMOCK200ok } from '@mocksOT';

beforeEach(() => {
  cy.viewport(1500, 1700);
});

it('should let enter to create cubicacion', () => {
  cy.visit('http://localhost:4206/login/auth');
  cy._login('mgestor1', 'asdasd');
  cy._select_profile('Gestor/JP');
  cy.get('#crear-ot-sidebar').click();
});

describe('Visibilidad e Interacción Inicial', () => {
  it('Debe desplegar el formulario base', () => {
    cy.get('input[name="input-nombre-ot"]').should('be.enabled');
    cy._check_input('input[name="input-nombre-ot"]', 'required');

    cy._check_dropdown_required('#select-contrato_marco');
  });

  it('Cubicacion dropdown debe estar disabled y debe cambiar a enabled cuando escoja un contrato con cubicaciones', () => {
    cy.get('#select-cubicacion>div').should('have.class', 'p-disabled');
  });

  let selector = '#select-cubicacion';

  it(`should display dropdown cubicaciones as required`, () => {
    cy.intercept('POST', '/ot/cubicaciones_from_contrato/get').as(
      'HTTPRESPONSE-CUBICACIONES'
    );
    cy.get('#select-contrato_marco')
      .click()
      .contains('ul li > span', 'BUCLE')
      .click();
    cy.wait('@HTTPRESPONSE-CUBICACIONES').then(() => {
      cy._check_dropdown_required(selector);
    });
  });

  it(`dropdown cubicaciones should display data`, () => {
    let datos = cubicacionContratoMOCK200ok.data.items
      .sort((a, b) =>
        a.cubicacion_nombre > b.cubicacion_nombre
          ? 1
          : b.cubicacion_nombre > a.cubicacion_nombre
          ? -1
          : 0
      )
      .map(value => value.cubicacion_nombre);
    cy.get(selector).click();
    cy.get('li.p-ripple').each(($el, index, $list) => {
      expect($el.text()).eq(datos[index]);
    });
    cy.get(selector).click();
  });

  it('Escoger un contrato sin cubicacion debe indicar un mensaje', () => {
    cy.intercept('POST', '/ot/cubicaciones_from_contrato/get').as(
      'HTTPRESPONSE-CUBICACIONES'
    );
    cy._select_dropdown('#select-contrato_marco', 'SBE_2018');
    cy.get('input[name="input-nombre-ot"]').click();

    cy.wait('@HTTPRESPONSE-CUBICACIONES').then(() => {
      cy.get('.error-message>.p-error').contains(
        'No existen cubicaciones creadas con el contrato marco escogido '
      );
    });

    cy._select_dropdown('#select-contrato_marco', 'BUCLE');
    cy.get('input[name="input-nombre-ot"]').click();
    cy.wait('@HTTPRESPONSE-CUBICACIONES').then(() => {
      cy.get('.error-message>.p-error').should('not.exist');
    });
  });
});
