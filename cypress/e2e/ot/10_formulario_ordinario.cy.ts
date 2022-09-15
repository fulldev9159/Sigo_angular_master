describe('Formulario Contrato Bucle', () => {
  beforeEach(() => {
    cy.viewport(1500, 1700);
  });

  it('should let enter to create cubicacion', () => {
    cy.visit('http://localhost:4206/login/auth');
    cy._login('mgestor1', 'asdasd');
    cy._select_profile('Gestor/JP');
    cy.get('#crear-ot-sidebar').click();
  });

  it('Escoger contrato ordinario debe desplegar el formulario correspondiente', () => {
    cy._select_dropdown_async(
      '/ot/cubicaciones_from_contrato/get',
      '#select-contrato_marco',
      'CONTRATO_ORDINARIO',
      '#select-cubicacion',
      'Testing Cubicacion Ordinario Precargada NO USAR'
    );

    cy._check_input('input[name="input-numero-carta"]', 'required');
    cy._check_input('input[name="input-numero-pedido"]', 'required');
    cy._check_input('input[name="input-materia"]', 'required');
  });
});
