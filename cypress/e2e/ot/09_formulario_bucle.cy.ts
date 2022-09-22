import {
  AreaNegocioMOCK200ok,
  CentralesMOCK200ok,
  ComunasMOCK200ok,
  cubicacionContratoMOCK200ok,
  SolicitadoPorMOCK200ok,
  TipoDeTrabajoMOCK200ok,
  TipoRedMOCK200ok,
} from '@mocksOT';

describe('Formulario sección Contrato BUCLE', () => {
  beforeEach(() => {
    cy.viewport(1500, 1700);
  });

  it('should let enter to create cubicacion', () => {
    cy.visit('http://localhost:4206/login/auth');
    cy._login('mgestor1', 'asdasd');
    cy._select_profile('Gestor/JP');
    cy.get('button[id="navbar-create-ot"]').click();
  });

  it('Escoger un contrato sin cubicacion debe indicar un mensaje', () => {
    cy.intercept('POST', '/ot/cubicaciones_from_contrato/get').as(
      'HTTPRESPONSE-CUBICACIONES'
    );
    cy._select_dropdown('#select-contrato_marco', 'SBE_2018');
    cy.get('input[name="input-nombre-ot"]').click();

    cy.wait('@HTTPRESPONSE-CUBICACIONES').then(() => {
      cy.get('.error-message>.p-error').contains(
        'No existen cubicaciones creadas con el contrato marco escogido '
      );
    });

    cy._select_dropdown('#select-contrato_marco', 'BUCLE');
    cy.get('input[name="input-nombre-ot"]').click();
    cy.wait('@HTTPRESPONSE-CUBICACIONES').then(() => {
      cy.get('.error-message>.p-error').should('not.exist');
    });
  });

  it('Escoger contrato bucle debe desplegar el formulario correspondiente', () => {
    cy._select_dropdown(
      '#select-cubicacion',
      'Cubicacion Bucle Cypress Editada'
    );

    cy.wait(450);
    cy._check_dropdown(
      '#select-oficina-central',
      CentralesMOCK200ok.data.items
        .sort((a, b) =>
          a.idafac > b.idafac ? 1 : b.idafac > a.idafac ? -1 : 0
        )
        .map(value => `${value.idafac} - ${value.descripcion}`)
    );

    cy._check_dropdown(
      '#select-solicitado-por',
      SolicitadoPorMOCK200ok.data.items
        .sort((a, b) =>
          a.descripcion > b.descripcion
            ? 1
            : b.descripcion > a.descripcion
            ? -1
            : 0
        )
        .map(value => value.descripcion)
    );

    cy._check_input('input[name="input-direccion"]', 'required');
    cy._check_input('input[name="input-altura"]', 'required');
    cy._check_input('input[name="input-piso"]', 'required');
    cy._check_input('input[name="input-departamento"]', 'required');

    cy._check_dropdown(
      '#select-comuna',
      ComunasMOCK200ok.data.items
        .sort((a, b) =>
          a.comuna_nombre > b.comuna_nombre
            ? 1
            : b.comuna_nombre > a.comuna_nombre
            ? -1
            : 0
        )
        .map(value => value.comuna_nombre)
    );

    cy._check_dropdown(
      '#select-tipo-red',
      TipoRedMOCK200ok.data.items
        .sort((a, b) =>
          a.descripcion > b.descripcion
            ? 1
            : b.descripcion > a.descripcion
            ? -1
            : 0
        )
        .map(value => value.descripcion)
    );

    cy._check_dropdown(
      '#select-tipo-trabajo',
      TipoDeTrabajoMOCK200ok.data.items
        .sort((a, b) =>
          a.tipo_trabajo_descripcion > b.tipo_trabajo_descripcion
            ? 1
            : b.tipo_trabajo_descripcion > a.tipo_trabajo_descripcion
            ? -1
            : 0
        )
        .map(value => value.tipo_trabajo_descripcion)
    );

    cy._check_dropdown(
      '#select-area-negocio',
      AreaNegocioMOCK200ok.data.items
        .sort((a, b) =>
          a.descripcion > b.descripcion
            ? 1
            : b.descripcion > a.descripcion
            ? -1
            : 0
        )
        .map(value => value.descripcion)
    );
    cy._check_input('input[name="input-nombre-proyectista"]', 'required');
  });
});
