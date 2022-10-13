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

  it('informacion ot BUCLE', () => {
    cy.get('#p-tabpanel-1-label').click();
    cy.get('#table-abiertas>p-table>div>div>table>tbody')
      .contains('OT Test Bucle Cypress')
      .siblings()
      .eq(7)
      .find('button[id="info-button"]')
      .click();

    cy._check_info_base_ot(
      'Bucle',
      'BUCLE',
      10,
      'Cubicacion Bucle Cypress Editada',
      'Autorizar inicialmente la OT',
      'Abierta',
      'JESSICA MOVISTAR CASTILLO 1',
      'JESSICA MOVISTAR CASTILLO 1'
    );

    // DATOS CONTRATO
    cy.get(
      '#table-contrato-bucle > tr:nth-child(1) > td:nth-child(2)'
    ).contains('0189');
    cy.get(
      '#table-contrato-bucle > tr:nth-child(2) > td:nth-child(2)'
    ).contains('ATC');
    cy.get(
      '#table-contrato-bucle > tr:nth-child(3) > td:nth-child(2)'
    ).contains('aa');
    cy.get(
      '#table-contrato-bucle > tr:nth-child(3) > td:nth-child(4)'
    ).contains('bbb');
    cy.get(
      '#table-contrato-bucle > tr:nth-child(4) > td:nth-child(2)'
    ).contains('ccc');
    cy.get(
      '#table-contrato-bucle > tr:nth-child(4) > td:nth-child(4)'
    ).contains('ddd');
    cy.get(
      '#table-contrato-bucle > tr:nth-child(5) > td:nth-child(2)'
    ).contains('Buin');
    cy.get(
      '#table-contrato-bucle > tr:nth-child(6) > td:nth-child(2)'
    ).contains('ATP');
    cy.get(
      '#table-contrato-bucle > tr:nth-child(7) > td:nth-child(2)'
    ).contains('FO Empresa');
    cy.get(
      '#table-contrato-bucle > tr:nth-child(8) > td:nth-child(2)'
    ).contains('No');
    cy.get(
      '#table-contrato-bucle > tr:nth-child(9) > td:nth-child(2)'
    ).contains('No');
    cy.get(
      '#table-contrato-bucle > tr:nth-child(10) > td:nth-child(2)'
    ).contains('NORMAL');
    cy.get(
      '#table-contrato-bucle > tr:nth-child(11) > td:nth-child(2)'
    ).contains('Andoria algoritmo');

    // USUARIOS INVOLUCRADOS
    cy.get(
      '#table-usuarios-involucrados > tr:nth-child(2) > td:nth-child(1)'
    ).contains('Administrador Contratista');
    cy.get(
      '#table-usuarios-involucrados > tr:nth-child(2) > td:nth-child(2)'
    ).contains('Luk COBRA CHILE Antonella');
  });

  it('informacion ot FIJO', () => {
    cy.get('button[id="navbar-list-ot"]').click();
    cy.get('#p-tabpanel-1-label').click();
    cy.get('#table-abiertas>p-table>div>div>table>tbody')
      .contains('OT Test FIJA Cypress')
      .siblings()
      .eq(7)
      .find('button[id="info-button"]')
      .click();

    cy._check_info_base_ot(
      'Fijo',
      'UNIFICADO_FIJA',
      11,
      'Cubicacion FIJA Cypress',
      'Autorizar OT por Proveedor',
      'Abierta',
      'JESSICA MOVISTAR CASTILLO 1',
      'JESSICA MOVISTAR CASTILLO 1'
    );

    // DATOS CONTRATO
    cy.get(
      '#table-tipo-num-interno > tr:nth-child(1) > td:nth-child(2)'
    ).contains('@TIEMPOS');
    cy.get('#table-num-internos > tr:nth-child(2) > td:nth-child(1)').contains(
      '123456'
    );
    cy.get('#table-num-internos > tr:nth-child(3) > td:nth-child(1)').contains(
      '12Acao'
    );

    // USUARIOS INVOLUCRADOS
    cy.get(
      '#table-usuarios-involucrados > tr:nth-child(2) > td:nth-child(1)'
    ).contains('Administrador Contratista');
    cy.get(
      '#table-usuarios-involucrados > tr:nth-child(2) > td:nth-child(2)'
    ).contains('Luk GENERATEL SPA Antonella');
  });

  it('informacion ot ORDINARIO', () => {
    cy.get('button[id="navbar-list-ot"]').click();
    cy.get('#p-tabpanel-1-label').click();
    cy.get('#table-abiertas>p-table>div>div>table>tbody')
      .contains('OT Test ORDINARIO Cypress')
      .siblings()
      .eq(7)
      .find('button[id="info-button"]')
      .click();

    cy._check_info_base_ot(
      'Ordinario',
      'CONTRATO_ORDINARIO',
      13,
      'Cubicacion ORDINARIO Cypress',
      'Autorizar OT por Proveedor',
      'Abierta',
      'JESSICA MOVISTAR CASTILLO 1',
      'JESSICA MOVISTAR CASTILLO 1'
    );

    // DATOS CONTRATO
    cy.get(
      '#table-contrato-ordinario > tr:nth-child(1) > td:nth-child(2)'
    ).contains('12354556');
    cy.get(
      '#table-contrato-ordinario > tr:nth-child(3) > td:nth-child(2)'
    ).contains('Pedido#2333');
    cy.get(
      '#table-contrato-ordinario > tr:nth-child(4) > td:nth-child(2)'
    ).contains('M32');

    // USUARIOS INVOLUCRADOS
    cy.get(
      '#table-usuarios-involucrados > tr:nth-child(2) > td:nth-child(1)'
    ).contains('Administrador Contratista');
    cy.get(
      '#table-usuarios-involucrados > tr:nth-child(2) > td:nth-child(2)'
    ).contains('Jack ZWEICOM SPA Shephard');
  });

  it('informacion ot MOVIL', () => {
    cy.get('button[id="navbar-list-ot"]').click();
    cy.get('#p-tabpanel-1-label').click();
    cy.get('#table-abiertas>p-table>div>div>table>tbody')
      .contains('OT Test MOVIL Cypress')
      .siblings()
      .eq(7)
      .find('button[id="info-button"]')
      .click();

    cy._check_info_base_ot(
      'Móvil',
      'UNIFICADO_MOVIL',
      12,
      'Cubicacion MOVIL Cypress',
      'Autorizar OT por Proveedor',
      'Abierta',
      'JESSICA MOVISTAR CASTILLO 1',
      'JESSICA MOVISTAR CASTILLO 1'
    );

    // DATOS CONTRATO
    cy.get(
      '#table-contrato-movil > tr:nth-child(1) > td:nth-child(2)'
    ).contains('3G');
    cy.get(
      '#table-contrato-movil > tr:nth-child(2) > td:nth-child(2)'
    ).contains('ANGOL - ALEMANIA');

    // USUARIOS INVOLUCRADOS
    cy.get(
      '#table-usuarios-involucrados > tr:nth-child(2) > td:nth-child(1)'
    ).contains('Administrador Contratista');
    cy.get(
      '#table-usuarios-involucrados > tr:nth-child(2) > td:nth-child(2)'
    ).contains('Luk GENERATEL SPA Antonella');
  });
});
