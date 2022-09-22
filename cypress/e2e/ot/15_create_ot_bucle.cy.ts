describe('Create ot bucle', () => {
  beforeEach(() => {
    cy.viewport(1500, 1700);
  });

  it('should let enter to create cubicacion', () => {
    cy.visit('http://localhost:4206/login/auth');
    cy._login('mgestor1', 'asdasd');
    cy._select_profile('Gestor/JP');
    cy.get('button[id="navbar-create-ot"]').click();
  });

  it('Crear ot contrato bucle', () => {
    cy.get('input[name="input-nombre-ot"]').type('OT Test Bucle Cypress');
    cy._select_dropdown_async(
      '/ot/cubicaciones_from_contrato/get',
      '#select-contrato_marco',
      'BUCLE',
      '#select-cubicacion',
      'Cubicacion Bucle Cypress Editada'
    );
    cy.get('#crear-ot').should('be.disabled');

    cy._select_dropdown('#select-oficina-central', '0189 - S.FCO LAS CONDES');
    cy._select_dropdown('#select-solicitado-por', 'ATC');
    cy.get('input[name="input-direccion"]').type('aa');
    cy.get('input[name="input-altura"]').type('bbb');
    cy.get('input[name="input-piso"]').type('ccc');
    cy.get('input[name="input-departamento"]').type('ddd');

    cy._select_dropdown('#select-comuna', 'Buin');
    cy.get('#crear-ot').should('be.disabled');
    cy._select_dropdown('#select-tipo-red', 'ATP');
    cy._select_dropdown('#select-tipo-trabajo', 'FO Empresa');
    cy._select_dropdown('#select-area-negocio', 'NORMAL');
    cy.get('#crear-ot').should('be.disabled');
    cy.get('input[name="input-nombre-proyectista"]').type('Andoria algoritmo');
    cy.get('#crear-ot').should('be.disabled');

    cy._select_dropdown_async(
      '/ot/lps/get',
      '#select-pmo',
      '25',
      '#select-linea-presupuestaria',
      'CHI100'
    );
    cy.get('#crear-ot').should('be.disabled');
    cy._select_dropdown('#select-pep2', 'P-0077-22-2002-05106-021');

    cy.get('#fecha-inicio-ot > span > input').click();
    cy.get(
      '#fecha-inicio-ot > span > div > div > div > div > table > tbody > tr:nth-child(3) > td:nth-child(2)> span'
    ).click();
    cy.get('#fecha-termino-ot > span > input').click();
    cy.get(
      '#fecha-termino-ot > span > div > div > div > div > table > tbody > tr:nth-child(3) > td:nth-child(7) > span'
    ).click();

    cy.get('#crear-ot').should('be.disabled');
    cy._select_dropdown('#select-admin-contrato', 'Luk COBRA CHILE Antonella');

    cy.get('#crear-ot').should('be.enabled');
    cy.get('#crear-ot').click();

    cy.wait(1000);
  });
});
