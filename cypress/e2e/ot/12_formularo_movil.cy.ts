import {
  PlanProyectoMOCK200ok,
  SitoMOCK200ok,
  TipoDeNumeroInternoMOCK200ok,
} from '@mocksOT';

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
      'UNIFICADO_MOVIL',
      '#select-cubicacion',
      'Testing Cubicacion MOVIL Precargada NO USAR'
    );

    cy._check_dropdown(
      '#select-plan-proyecto',
      PlanProyectoMOCK200ok.data.items
        .sort((a, b) =>
          a.nombre > b.nombre ? 1 : b.nombre > a.nombre ? -1 : 0
        )
        .map(value => value.nombre)
    );

    cy.get('#select-sitio-plan>div').should('have.class', 'p-disabled');
    cy._check_dropdown_async(
      '/ot/sitio_plan_plid/get',
      '#select-plan-proyecto',
      '3G',
      '#select-sitio-plan',
      SitoMOCK200ok.data.items
        .sort((a, b) =>
          a.nombre > b.nombre ? 1 : b.nombre > a.nombre ? -1 : 0
        )
        .map(value => value.nombre)
    );
    cy.get('#select-sitio-plan>div').should('not.have.class', 'p-disabled');
  });
});
