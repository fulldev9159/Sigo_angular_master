describe('Area Test', () => {
  beforeEach(() => {
    cy.viewport(1500, 1700);
    cy.login('admin', 'M0v15tar.', 'Admin');
    cy.contains('Area').click();
  });
  it('Editar Area', () => {
    cy.get('.p-inputtext').type('AreaTest');
    cy.get('.icon > .ui').click();

    // Validar Campos
    cy.get('app-input > .form-control').should('have.value', 'AreaTest');
    cy.get('#descripcion').should('have.value', 'Descripción Test');
    cy.get('#tipo-interno > .p-radiobutton >div>input')
      .should('be.checked')
      .and('have.value', 'interno');
    cy.get('#estado-activo> .p-radiobutton >div>input')
      .should('be.checked')
      .and('have.value', 'activa');

    // Editar Campos
    cy.get('app-input > .form-control').clear().type('EditAreaTest');
    cy.get('#descripcion').clear().type('Edit Descripción Area');
    cy.get('#tipo-externo > .p-radiobutton > .p-radiobutton-box').click();
    cy.get('#estado-inactivo > .p-radiobutton > .p-radiobutton-box').click();

    cy.get('#submit-area').click();

    cy.get('.p-inputtext').type('AreaTest');

    // Validar
    cy.get('.bloqueado > :nth-child(1)').contains('EditAreaTest');
    cy.get('.bloqueado > :nth-child(2)').contains('Edit Descripción Area');
    cy.get('.bloqueado > :nth-child(3)').contains('Contratista');
    cy.get('.bloqueado > :nth-child(4)').contains('Inactivo');
  });
});
