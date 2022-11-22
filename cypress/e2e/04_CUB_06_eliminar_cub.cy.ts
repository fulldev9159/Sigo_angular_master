describe('Eliminar Cubicacion', () => {
  beforeEach(() => {
    cy.viewport(1500, 700);
  });

  it('should let enter to create cubicacion', () => {
    cy.visit('http://localhost:4206/login/auth');
    cy._login('mgestor1', 'asdasd');
    cy._select_profile('Gestor/JP');
    cy.get('button[id="navbar-list-cub"]').click();
  });

  it('eliminar Cubicacion', () => {
    cy._filter_table(
      'filter-nombre-cubicacion',
      'Cloned Cubicacion Bucle Cypress'
    );
    cy.get('tbody').find('tr').should('have.length', 1);
    cy.get('button[id="button-eliminar-cubicacion"]').click();

    cy.get('#mensaje-confirmacion').contains(
      '¿Está seguro que desea eliminar esta cubicación ID'
    );
    cy.get('button[id="button-confirmar"]').click();
    cy.wait(2500);
    cy._filter_table(
      'filter-nombre-cubicacion',
      'Cloned Cubicacion Bucle Cypress'
    );
    cy.get('tbody').find('tr').should('have.length', 0);
  });
});
