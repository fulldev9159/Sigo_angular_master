import { TipoDeNumeroInternoMOCK200ok } from '@mocksOT';

describe('Formulario serccion Contrato FIJO', () => {
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
      'UNIFICADO_FIJA',
      '#select-cubicacion',
      'Testing Cubicacion Fija Precargada NO USAR'
    );

    cy._check_dropdown(
      '#select-tipo-numero-interno',
      TipoDeNumeroInternoMOCK200ok.data.items
        .sort((a, b) =>
          a.nombre > b.nombre ? 1 : b.nombre > a.nombre ? -1 : 0
        )
        .map(value => value.nombre)
    );

    cy.get('input[name="input-numero-interno"]').should('be.disabled');
  });
});
