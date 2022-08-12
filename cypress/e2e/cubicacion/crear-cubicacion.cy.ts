describe('Crear Cubicacion', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4206/login/auth');
    cy._login('mgestor1', 'asdasd');
    cy._select_profile('Gestor/JP');
    cy.get('#crear-cubicacion-sidebar').click();
  });

  it('should display name cubicacion input text', () => {
    cy._check_input('input[name="input-nombre-cubicacion"]', 'required');
  });

  it('should display dropdown tipo cubicacion', () => {
    cy.get('#select-tipo-cubicacion').click();
    cy.get('#select-tipo-cubicacion').click();
    cy.get('#select-tipo-cubicacion+zwc-input-alert>small').contains(
      'Este campo es requerido'
    );
  });
});
