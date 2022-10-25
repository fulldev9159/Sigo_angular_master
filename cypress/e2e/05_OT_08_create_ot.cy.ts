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

  describe('Crear ot contrato bucle', () => {
    it('create', () => {
      cy.get('input[name="input-nombre-ot"]').type('OT Test Bucle Cypress');
      cy._select_dropdown_async(
        '/ot/cubicaciones_from_contrato/get',
        '#select-contrato_marco',
        'BUCLE',
        '#select-cubicacion',
        'Cubicacion Bucle Cypress Editada'
      );
      cy.get('#crear-ot').should('be.disabled');
      cy.get('input[name="input-nombre-ot"]').click();

      cy._select_dropdown('#select-oficina-central', '0189 - S.FCO LAS CONDES');
      cy._select_dropdown('#select-solicitado-por', 'ATC');
      cy.get('input[name="input-direccion"]').type('aa');
      cy.get('input[name="input-altura"]').type('bbb');
      cy.get('input[name="input-piso"]').type('ccc');
      cy.get('input[name="input-departamento"]').type('ddd');

      cy._select_dropdown('#select-comuna', 'Buin');
      cy.get('#crear-ot').should('be.disabled');
      cy._select_dropdown('#select-tipo-red', 'ATP');
      cy._select_dropdown('#select-tipo-trabajo', 'Ampliacion');
      cy._select_dropdown('#select-area-negocio', 'NORMAL');
      cy.get('#crear-ot').should('be.disabled');
      cy.get('input[name="input-nombre-proyectista"]').type(
        'Andoria algoritmo'
      );
      cy.get('#crear-ot').should('be.disabled');

      cy._select_dropdown('#select-pmo', '25');
      cy._select_dropdown('#select-linea-presupuestaria', 'CHI100');

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
      cy._select_dropdown(
        '#select-admin-contrato',
        'Luk COBRA CHILE Antonella'
      );

      cy.get('#crear-ot').should('be.enabled');
      cy.get('#crear-ot').click();

      cy.wait(1000);
    });
  });

  describe('Crear ot contrato FIJA', () => {
    it('create', () => {
      cy.intercept('POST', '/ot/ot_has_numero_interno_niid/get').as(
        'HTTPRESPONSE'
      );
      cy.get('button[id="navbar-create-ot"]').click();
      cy.get('input[name="input-nombre-ot"]').type('OT Test FIJA Cypress');
      cy._select_dropdown_async(
        '/ot/cubicaciones_from_contrato/get',
        '#select-contrato_marco',
        'UNIFICADO_FIJA',
        '#select-cubicacion',
        'Cubicacion FIJA Cypress'
      );
      cy.get('#crear-ot').should('be.disabled');
      cy.get('input[name="input-nombre-ot"]').click();

      // FIJA
      cy._select_dropdown('#select-tipo-numero-interno', '@TIEMPOS');
      cy.get('input[name="input-numero-interno"]').type('123456');
      cy.get('#agregar-numero-interno').click();
      cy.wait('@HTTPRESPONSE').then(() => {
        cy.get('input[name="input-numero-interno"]').type('12Acao');
        cy.get('#agregar-numero-interno').click();
      });

      cy.get('#crear-ot').should('be.disabled');

      cy._select_dropdown('#select-pmo', '25');
      cy._select_dropdown('#select-linea-presupuestaria', 'CHI100');

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
      cy._select_dropdown(
        '#select-admin-contrato',
        'Luk GENERATEL SPA Antonella'
      );

      cy.get('#crear-ot').should('be.enabled');
      cy.get('#crear-ot').click();

      cy.wait(1000);
    });
  });

  describe('Crear ot contrato ORDINARIA', () => {
    it('create', () => {
      cy.intercept('POST', '/ot/ot_has_numero_interno_niid/get').as(
        'HTTPRESPONSE'
      );
      cy.get('button[id="navbar-create-ot"]').click();
      cy.get('input[name="input-nombre-ot"]').type('OT Test ORDINARIO Cypress');
      cy._select_dropdown_async(
        '/ot/cubicaciones_from_contrato/get',
        '#select-contrato_marco',
        'CONTRATO_ORDINARIO',
        '#select-cubicacion',
        'Cubicacion ORDINARIO Cypress'
      );
      cy.get('#crear-ot').should('be.disabled');
      cy.get('input[name="input-nombre-ot"]').click();

      // ORDINARIO
      cy.get('input[name="input-numero-carta"]').type('12354556');
      cy.get('#fecha-adjudicacion > span > input').click();
      cy.get(
        '#fecha-adjudicacion > span > div > div > div > div > table > tbody > tr:nth-child(3) > td:nth-child(2)> span'
      ).click();
      cy.get('input[name="input-numero-pedido"]').type('Pedido#2333');
      cy.get('input[name="input-materia"]').type('M32');

      cy.get('#crear-ot').should('be.disabled');

      cy._select_dropdown('#select-pmo', '25');
      cy._select_dropdown('#select-linea-presupuestaria', 'CHI100');

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
      cy._select_dropdown(
        '#select-admin-contrato',
        'Jack ZWEICOM SPA Shephard'
      );

      cy.get('#crear-ot').should('be.enabled');
      cy.get('#crear-ot').click();

      cy.wait(1000);
    });
  });

  describe('Crear ot contrato MOVIL', () => {
    it('create', () => {
      cy.intercept('POST', '/ot/ot_has_numero_interno_niid/get').as(
        'HTTPRESPONSE'
      );
      cy.get('button[id="navbar-create-ot"]').click();
      cy.get('input[name="input-nombre-ot"]').type('OT Test MOVIL Cypress');
      cy._select_dropdown_async(
        '/ot/cubicaciones_from_contrato/get',
        '#select-contrato_marco',
        'UNIFICADO_MOVIL',
        '#select-cubicacion',
        'Cubicacion MOVIL Cypress'
      );
      cy.get('#crear-ot').should('be.disabled');
      cy.get('input[name="input-nombre-ot"]').click();

      // MOVIL
      cy._select_dropdown('#select-plan-proyecto', '3G');
      cy._select_dropdown('#select-sitio-plan', 'ANGOL - ALEMANIA');

      cy.get('#crear-ot').should('be.disabled');

      cy._select_dropdown('#select-pmo', '25');
      cy._select_dropdown('#select-linea-presupuestaria', 'CHI100');

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
      cy._select_dropdown(
        '#select-admin-contrato',
        'Luk GENERATEL SPA Antonella'
      );

      cy.get('#crear-ot').should('be.enabled');
      cy.get('#crear-ot').click();

      cy.wait(1000);
    });
  });
});
