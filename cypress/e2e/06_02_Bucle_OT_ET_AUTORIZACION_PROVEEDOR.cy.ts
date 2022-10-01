import { cubicacionContratoMOCK200ok } from '@mocksOT';

describe('OT_ET_AUTORIZACION_INICIAL BUCLE', () => {
  beforeEach(() => {
    cy.viewport(1500, 1700);
  });

  it('should let enter to web', () => {
    cy.visit('http://localhost:4206/login/auth');
    cy._login('ccadmincontrato1', 'asdasd');
    cy._select_profile('Administrador EECC');
    cy.get('button[id="navbar-list-ot"]').click();
  });

  it('aceptar ot supervisor', () => {
    cy.intercept('POST', '/ot/posibles_trabajadores/get').as('HTTPRESPONSE');
    cy.get('button[id="play-button"]').click();
    cy.wait('@HTTPRESPONSE').then(() => {
      cy._select_dropdown(
        '#select-supervisor-trabajos',
        'Ana COBRA CHILE Antonella'
      );
      cy.get('button[id="button-confirmar"]').click();
      cy.wait(1000);
    });
  });
});
