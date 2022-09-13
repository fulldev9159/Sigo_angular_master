beforeEach(() => {
  cy.viewport(1500, 1700);
});

it('should let enter to create cubicacion', () => {
  cy.visit('http://localhost:4206/login/auth');
  cy._login('mgestor1', 'asdasd');
  cy._select_profile('Gestor/JP');
  cy.get('#crear-ot-sidebar').click();
});

describe('Visibilidad e Interacción Inicial', () => {});
