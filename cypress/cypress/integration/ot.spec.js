describe('OT Test', () => {
  beforeEach(() => {
    cy.login('mgestor1', '123', 'Gestor/JP');
    cy.contains('Crear OT').click();

    cy.get('#create-button').should('be.disabled');
  });

  it('Revisar cambio de formulario entre tipos de contrato', () => {
    cy.get('app-input > #nombre-ot').should('be.enabled');
    cy.get('#contratosUser > app-select > .form-control').should('be.enabled');
    cy.get('#cubicacion-de-ot > .form-control').should('be.disabled');

    // NO DEBEN EXISTIR AÚN
    cy.get('#plan-proyecto > .form-control').should('not.exist');
    cy.get('#sitio > .form-control').should('not.exist');
    cy.get(
      '#control_tipo_numero_interno_id > app-select > .form-control'
    ).should('not.exist');
    cy.get('#control_numero_interno > app-input > .form-control').should(
      'not.exist'
    );

    // SUSTENTO
    cy.get('#pmo > .form-control').should('not.exist');
    cy.get('#linea-presupuestaria > .form-control').should('not.exist');
    cy.get('#pep2 > .form-control').should('not.exist');

    // EXTRAS
    cy.get('#fecha-inicio-ot > span > input').should('not.exist');
    cy.get('#fecha-termino-ot > span > input').should('not.exist');
    cy.get('#proyecto-ot > .form-control').should('not.exist');
    cy.get('#control_admin_contrato > app-select > .form-control').should(
      'not.exist'
    );
    cy.get('#observaciones').should('not.exist');

    // :::::: REVISION FORMULARIO MOVIL
    cy.get('#contratosUser > app-select > .form-control').select('SBE');
    cy.get('#cubicacion-de-ot > .form-control').select('Cub Movil');

    // DEBEN APARECER
    // MOVIL
    cy.get('#plan-proyecto > .form-control').should('be.enabled');
    cy.get('#sitio > .form-control').should('be.disabled');

    // SUSTENTO
    cy.get('#pmo > .form-control').should('be.disabled');
    cy.get('#linea-presupuestaria > .form-control').should('be.disabled');
    cy.get('#pep2 > .form-control').should('be.disabled');

    // EXTRAS
    cy.get('#fecha-inicio-ot > span > input').should('be.enabled');
    cy.get('#fecha-termino-ot > span > input').should('be.enabled');
    cy.get('#proyecto-ot > .form-control').should('be.exist');
    cy.get('#control_admin_contrato > app-select > .form-control').should(
      'be.enabled'
    );
    cy.get('#observaciones').should('be.enabled');

    // ::::: REVISION CONTRATO BUCLE
    cy.get('#contratosUser > app-select > .form-control').select('BUCLE');

    // NO DEBEN EXISTIR AÚN
    // MOVIL
    cy.get('#plan-proyecto > .form-control').should('not.exist');
    cy.get('#sitio > .form-control').should('not.exist');

    // SUSTENTO
    cy.get('#pmo > .form-control').should('not.exist');
    cy.get('#linea-presupuestaria > .form-control').should('not.exist');
    cy.get('#pep2 > .form-control').should('not.exist');

    // EXTRAS
    cy.get('#fecha-inicio-ot > span > input').should('not.exist');
    cy.get('#fecha-termino-ot > span > input').should('not.exist');
    cy.get('#proyecto-ot > .form-control').should('not.exist');
    cy.get('#control_admin_contrato > app-select > .form-control').should(
      'not.exist'
    );
    cy.get('#observaciones').should('not.exist');
    cy.get('#cubicacion-de-ot > .form-control').select('Cub Bucle');

    // DEBEN APARECER
    // BUCLE
    cy.get('#control-oficina-central > app-select > .form-control').should(
      'be.enabled'
    );
    cy.get('#control-solicitado-por > app-select > .form-control').should(
      'be.enabled'
    );
    cy.get('#control-direccion > app-input > .form-control').should(
      'be.enabled'
    );
    cy.get('#control-altura > app-input > .form-control').should('be.enabled');
    cy.get('#control-piso > app-input > .form-control').should('be.enabled');
    cy.get('#control-departamento > app-input > .form-control').should(
      'be.enabled'
    );
    cy.get('#control-comuna > app-select > .form-control').should('be.enabled');
    cy.get('#control-tipo-red > app-select > .form-control').should(
      'be.enabled'
    );
    cy.get('#control-tipo-trabajo > app-select > .form-control').should(
      'be.enabled'
    );
    cy.get('#control-tiene-boleta').should('be.enabled');
    cy.get('#control-tiene-permiso').should('be.enabled');
    cy.get('#control-area-negocio > app-select > .form-control').should(
      'be.enabled'
    );
    cy.get('#control-proyectista > app-input > .form-control').should(
      'be.enabled'
    );
    // SUSTENTO
    cy.get('#pmo > .form-control').should('be.enabled');
    cy.get('#linea-presupuestaria > .form-control').should('be.disabled');
    cy.get('#pep2 > .form-control').should('be.disabled');

    // EXTRAS
    cy.get('#fecha-inicio-ot > span > input').should('be.enabled');
    cy.get('#fecha-termino-ot > span > input').should('be.enabled');
    cy.get('#proyecto-ot > .form-control').should('be.exist');
    cy.get('#control_admin_contrato > app-select > .form-control').should(
      'be.enabled'
    );
    cy.get('#observaciones').should('be.enabled');

    // ::::: REVISION CONTRATO BUCLE
    cy.get('#contratosUser > app-select > .form-control').select('BUCLE');

    // NO DEBEN EXISTIR AÚN
    // MOVIL
    cy.get('#plan-proyecto > .form-control').should('not.exist');
    cy.get('#sitio > .form-control').should('not.exist');

    // SUSTENTO
    cy.get('#pmo > .form-control').should('not.exist');
    cy.get('#linea-presupuestaria > .form-control').should('not.exist');
    cy.get('#pep2 > .form-control').should('not.exist');

    // EXTRAS
    cy.get('#fecha-inicio-ot > span > input').should('not.exist');
    cy.get('#fecha-termino-ot > span > input').should('not.exist');
    cy.get('#proyecto-ot > .form-control').should('not.exist');
    cy.get('#control_admin_contrato > app-select > .form-control').should(
      'not.exist'
    );
    cy.get('#observaciones').should('not.exist');
    cy.get('#cubicacion-de-ot > .form-control').select('Cub Bucle');

    // DEBEN APARECER
    // BUCLE
    cy.get('#control-oficina-central > app-select > .form-control').should(
      'be.enabled'
    );
    cy.get('#control-solicitado-por > app-select > .form-control').should(
      'be.enabled'
    );
    cy.get('#control-direccion > app-input > .form-control').should(
      'be.enabled'
    );
    cy.get('#control-altura > app-input > .form-control').should('be.enabled');
    cy.get('#control-piso > app-input > .form-control').should('be.enabled');
    cy.get('#control-departamento > app-input > .form-control').should(
      'be.enabled'
    );
    cy.get('#control-comuna > app-select > .form-control').should('be.enabled');
    cy.get('#control-tipo-red > app-select > .form-control').should(
      'be.enabled'
    );
    cy.get('#control-tipo-trabajo > app-select > .form-control').should(
      'be.enabled'
    );
    cy.get('#control-tiene-boleta').should('be.enabled');
    cy.get('#control-tiene-permiso').should('be.enabled');
    cy.get('#control-area-negocio > app-select > .form-control').should(
      'be.enabled'
    );
    cy.get('#control-proyectista > app-input > .form-control').should(
      'be.enabled'
    );
    // SUSTENTO
    cy.get('#pmo > .form-control').should('be.enabled');
    cy.get('#linea-presupuestaria > .form-control').should('be.disabled');
    cy.get('#pep2 > .form-control').should('be.disabled');

    // EXTRAS
    cy.get('#fecha-inicio-ot > span > input').should('be.enabled');
    cy.get('#fecha-termino-ot > span > input').should('be.enabled');
    cy.get('#proyecto-ot > .form-control').should('be.exist');
    cy.get('#control_admin_contrato > app-select > .form-control').should(
      'be.enabled'
    );
    cy.get('#observaciones').should('be.enabled');

    // ::::: REVISION CONTRATO BUCLE
    cy.get('#contratosUser > app-select > .form-control').select(
      'Contrato Ordinario'
    );

    // NO DEBEN EXISTIR AÚN
    // MOVIL
    cy.get('#plan-proyecto > .form-control').should('not.exist');
    cy.get('#sitio > .form-control').should('not.exist');

    // SUSTENTO
    cy.get('#pmo > .form-control').should('not.exist');
    cy.get('#linea-presupuestaria > .form-control').should('not.exist');
    cy.get('#pep2 > .form-control').should('not.exist');

    // EXTRAS
    cy.get('#fecha-inicio-ot > span > input').should('not.exist');
    cy.get('#fecha-termino-ot > span > input').should('not.exist');
    cy.get('#proyecto-ot > .form-control').should('not.exist');
    cy.get('#control_admin_contrato > app-select > .form-control').should(
      'not.exist'
    );
    cy.get('#observaciones').should('not.exist');
    cy.get('#cubicacion-de-ot > .form-control').select('Cub Ordinario');

    // DEBEN APARECER
    // ORDINARIO
    cy.get('#control_carta_adjudicacion > app-input > .form-control').should(
      'be.enabled'
    );
    cy.get('#control_fecha_adjudicacion>p-calendar').should('be.exist');
    cy.get('#control_numero_pedido > app-input > .form-control').should(
      'be.enabled'
    );
    cy.get('#control_materia > app-input > .form-control').should('be.enabled');

    // SUSTENTO
    cy.get('#pmo > .form-control').should('be.enabled');
    cy.get('#linea-presupuestaria > .form-control').should('be.disabled');
    cy.get('#pep2 > .form-control').should('be.disabled');
    cy.get('#control_materia > app-input > .form-control');
    // EXTRAS
    cy.get('#fecha-inicio-ot > span > input').should('be.enabled');
    cy.get('#fecha-termino-ot > span > input').should('be.enabled');
    cy.get('#proyecto-ot > .form-control').should('be.exist');
    cy.get('#control_admin_contrato > app-select > .form-control').should(
      'be.enabled'
    );
    cy.get('#observaciones').should('be.enabled');

    // ::::: REVISION CONTRATO FIJO
    cy.get('#contratosUser > app-select > .form-control').select(
      'UNIFICADO-2019-FIJA'
    );

    // NO DEBEN EXISTIR AÚN
    // FIJO
    cy.get(
      '#control_tipo_numero_interno_id > app-select > .form-control'
    ).should('not.exist');
    cy.get('#control_numero_interno > app-input > .form-control').should(
      'not.exist'
    );

    // SUSTENTO
    cy.get('#pmo > .form-control').should('not.exist');
    cy.get('#linea-presupuestaria > .form-control').should('not.exist');
    cy.get('#pep2 > .form-control').should('not.exist');

    // EXTRAS
    cy.get('#fecha-inicio-ot > span > input').should('not.exist');
    cy.get('#fecha-termino-ot > span > input').should('not.exist');
    cy.get('#proyecto-ot > .form-control').should('not.exist');
    cy.get('#control_admin_contrato > app-select > .form-control').should(
      'not.exist'
    );
    cy.get('#observaciones').should('not.exist');
    cy.get('#cubicacion-de-ot > .form-control').select('Cub Fijo');

    // DEBEN APARECER
    // FIJO
    cy.get(
      '#control_tipo_numero_interno_id > app-select > .form-control'
    ).should('be.enabled');
    cy.get('#control_numero_interno > app-input > .form-control').should(
      'be.disabled'
    );

    // SUSTENTO
    cy.get('#pmo > .form-control').should('be.enabled');
    cy.get('#linea-presupuestaria > .form-control').should('be.disabled');
    cy.get('#pep2 > .form-control').should('be.disabled');

    // EXTRAS
    cy.get('#fecha-inicio-ot > span > input').should('be.enabled');
    cy.get('#fecha-termino-ot > span > input').should('be.enabled');
    cy.get('#proyecto-ot > .form-control').should('be.exist');
    cy.get('#control_admin_contrato > app-select > .form-control').should(
      'be.enabled'
    );
    cy.get('#observaciones').should('be.enabled');
  });
});
