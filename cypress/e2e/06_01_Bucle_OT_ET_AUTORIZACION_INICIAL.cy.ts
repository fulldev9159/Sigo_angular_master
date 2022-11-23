import { cubicacionContratoMOCK200ok } from '@mocksOT';

describe('OT_ET_AUTORIZACION_INICIAL BUCLE', () => {
  beforeEach(() => {
    cy.viewport(1500, 1700);
  });

  it('should let enter to web', () => {
    cy.visit('http://localhost:4206/login/auth');
    cy._login('msupervisor1', 'asdasd');
    cy._select_profile('Supervisor (Telefónica)');
    cy.get('button[id="navbar-list-ot"]').click();
  });

  it('aceptar ot supervisor', () => {
    cy.get('#table-ejecucion>p-table>div>div>table>tbody')
      .contains('OT Test Bucle Cypress')
      .siblings()
      .eq(8)
      .find('button[id="play-button"]')
      .click();
    cy.get('button[id="button-confirmar"]').click();
    cy.wait(1000);
  });

  it('should let enter to web', () => {
    cy.visit('http://localhost:4206/login/auth');
    cy._login('mjefearea1', 'asdasd');
    cy._select_profile('Jefe de Área Telefónica');
    cy.get('button[id="navbar-list-ot"]').click();
  });

  it('aceptar ot jefe area', () => {
    cy.get('#table-ejecucion>p-table>div>div>table>tbody')
      .contains('OT Test Bucle Cypress')
      .siblings()
      .eq(8)
      .find('button[id="play-button"]')
      .click();
    cy.get('button[id="button-confirmar"]').click();
    cy.wait(1000);
  });
});
