describe('Usuario Test', () => {
  beforeEach(() => {
    cy.viewport(1500, 1700);
    cy.login('admin', 'M0v15tar.', 'Admin');
    cy.contains('Usuarios').click();
  });
  it('Crear Usuario Contratista', () => {
    cy.contains('Nuevo Usuario').click();
    cy.get('input[name="username"]').type('UserTestContratista');
    cy.get('input[name="rut"]').type('123456222-9');
    cy.get('input[name="nombres"]').type('Test Name Contratista');
    cy.get('input[name="apellidos"]').type('Test Apellido Contratista');
    cy.get('input[name="email"]').type('test@test.com');
    cy.get('#proveedor > .p-radiobutton > .p-radiobutton-box').click();
    cy.get('#proveedor-select > app-select > select').select('ZWEICOM S.A.');
    cy.get('#area-select > app-select > select ').select('Contratista');

    cy.get('.p-multiselect-label').click();
    cy.get('.p-multiselect-header > .p-checkbox > .p-checkbox-box').click();

    cy.get('#submit-user').click();
    cy.wait(700);

    // Validar
    cy.get('.p-inputtext').clear().type('UserTestContratista');
    cy._checkList(1, 'UserTestContratista');
    cy._checkList(2, '123456222-9');
    cy._checkList(3, 'Test Name Contratista');
    cy._checkList(4, 'Test Apellido Contratista');
    cy._checkList(5, 'Zweicom S.a.');
    cy._checkList(6, 'Contratista');
    cy._checkList(8, 'test@test.com');
    cy._checkList(11, 'Sin firma');
    cy._checkList(12, 'Activo');
  });

  it('Crear Usuario Movistar', () => {
    cy.contains('Nuevo Usuario').click();
    cy.get('input[name="username"]').type('UserTestMovistar');
    cy.get('input[name="rut"]').type('123456222-9');
    cy.get('input[name="nombres"]').type('Test Name Movistar');
    cy.get('input[name="apellidos"]').type('Test Apellido Movistar');
    cy.get('input[name="email"]').type('test@test.com');
    cy.get('#movistar > .p-radiobutton > .p-radiobutton-box').click();
    cy.get('#proveedor-select > app-select > select').select(
      'Telefonica Chile Servicios Corporativos Ltda.'
    );
    cy.get('#area-select > app-select > select ').select(
      'Ingenieria Acceso Movil'
    );

    cy.get('.p-multiselect-label').click();
    cy.get('.p-multiselect-header > .p-checkbox > .p-checkbox-box').click();

    cy.get('#submit-user').click();
    cy.wait(700);

    // Validar
    cy.get('.p-inputtext').type('UserTestMovistar');
    cy._checkList(1, 'UserTestMovistar');
    cy._checkList(2, '123456222-9');
    cy._checkList(3, 'Test Name Movistar');
    cy._checkList(4, 'Test Apellido Movistar');
    cy._checkList(5, 'Telefonica Chile Servicios Corporativos Ltda.');
    cy._checkList(6, 'Ingenieria Acceso Movil');
    cy._checkList(8, 'test@test.com');
    cy._checkList(11, 'Sin firma');
    cy._checkList(12, 'Activo');
  });

  it('Ver contratos Contratista', () => {
    cy.get('.p-inputtext').type('UserTestMovistar');
    cy.get('.p-button-text').click();
    cy.get(':nth-child(2) > .p-menuitem-link > .p-menuitem-text').click();
    cy.get(':nth-child(1) > .perfil-item > div').contains('CONTRATO_ORDINARIO');
    cy.get(':nth-child(2) > .perfil-item > div').contains('BUCLE');
    cy.get(':nth-child(3) > .perfil-item > div').contains('SBE_2018');
    cy.get(':nth-child(4) > .perfil-item > div').contains('UNIFICADO_FIJA');
    cy.get(':nth-child(5) > .perfil-item > div').contains('UNIFICADO_MOVIL');
  });

  it('Cargar Firma', () => {
    cy.get('.p-inputtext').type('UserTestMovistar');
    cy.get('.p-button-text').click();
    cy.get(':nth-child(5) > .p-menuitem-link > .p-menuitem-text').click();
    cy.get(
      'p-fileupload > div > div.p-fileupload-buttonbar > span > input[type=file]'
    ).attachFile('Ambiente.PNG');
    cy.get('#addFirma-button').click();

    cy.get('.p-inputtext').clear().type('UserTestMovistar');
    cy._checkList(11, 'Con firma');
  });
});
