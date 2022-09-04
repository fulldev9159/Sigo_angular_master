describe('Listar Cubicaciones', () => {
  it('should let enter to create cubicacion', () => {
    cy.visit('http://localhost:4206/login/auth');
    cy._login('mgestor1', 'asdasd');
    cy._select_profile('Gestor/JP');
    cy.get('#listar-cubicacion-sidebar').click();
  });

  it('Debe desplegar 8 cubicaciones', () => {
    cy.viewport(1500, 700);
    cy.get('tbody').find('tr').should('have.length', 8);
    cy._filter_table('filter-nombre-cubicacion', 'Te');
  });
});
