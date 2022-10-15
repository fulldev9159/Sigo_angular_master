describe('listar las ot', () => {
  beforeEach(() => {
    cy.viewport(1500, 1700);
  });

  it('should let enter to create cubicacion', () => {
    cy.visit('http://localhost:4206/login/auth');
    cy._login('mgestor1', 'asdasd');
    cy._select_profile('Gestor/JP');
    cy.get('button[id="navbar-list-ot"]').click();
  });

  it('list ot', () => {
    // PESTAÑA EJECUCION
    cy.get('#table-ejecucion>p-table>div>div>table>tbody')
      .find('tr')
      .should('have.length', 0);
    // PESTAÑA ABIERTAS
    cy.get('#p-tabpanel-1-label').click();
    cy.get('#table-abiertas>p-table>div>div>table>tbody')
      .find('tr')
      .should('have.length', 4);
    // OTS
    cy.get('#table-abiertas>p-table>div>div>table>tbody')
      .contains('td', 'OT Test Bucle Cypress')
      .should('have.length', 1);
    cy.get('#table-abiertas>p-table>div>div>table>tbody')
      .contains('td', 'OT Test FIJA Cypress')
      .should('have.length', 1);
    cy.get('#table-abiertas>p-table>div>div>table>tbody')
      .contains('td', 'OT Test ORDINARIO Cypress')
      .should('have.length', 1);
    cy.get('#table-abiertas>p-table>div>div>table>tbody')
      .contains('td', 'OT Test MOVIL Cypress')
      .should('have.length', 1);

    // PESTAÑA CERRADAS
    cy.get('#p-tabpanel-2-label').click();
    cy.get('#table-cerradas>p-table>div>div>table>tbody')
      .find('tr')
      .should('have.length', 0);
    // PESTAÑA ANULADAS
    cy.get('#p-tabpanel-3-label').click();
    cy.get('#table-anuladas>p-table>div>div>table>tbody')
      .find('tr')
      .should('have.length', 0);
    // PESTAÑA QUEBRADAS
    cy.get('#p-tabpanel-4-label').click();
    cy.get('#table-quebradas>p-table>div>div>table>tbody')
      .find('tr')
      .should('have.length', 0);
  });
});
