import {
  CECOMOCK200ok,
  LineaPresupuestariaMOCK200ok,
  OPEXMOCK200ok,
  PEP2MOCK200ok,
  PlanProyectoMOCK200ok,
  PMOMOCK200ok,
  SAPMOCK200ok,
  SitoMOCK200ok,
} from '@mocksOT';

describe('Formulario serccion Sustento Financiero', () => {
  beforeEach(() => {
    cy.viewport(1500, 1700);
  });

  it('should let enter to create cubicacion', () => {
    cy.visit('http://localhost:4206/login/auth');
    cy._login('mgestor1', 'asdasd');
    cy._select_profile('Gestor/JP');
    cy.get('#crear-ot-sidebar').click();
  });

  it('Escoger contrato  debe desplegar el formulario correspondiente', () => {
    cy.intercept('POST', '/ot/plan/getall').as('HTTPRESPONSE-CUBICACIONES');

    cy._select_dropdown_async(
      '/ot/cubicaciones_from_contrato/get',
      '#select-contrato_marco',
      'UNIFICADO_MOVIL',
      '#select-cubicacion',
      'Testing Cubicacion MOVIL Precargada NO USAR'
    );
    cy.wait('@HTTPRESPONSE-CUBICACIONES').then(() => {
      // CAPEX
      cy._check_dropdown(
        '#select-pmo',
        PMOMOCK200ok.data.items
          .sort((a, b) => (a.pmo_codigo > b.pmo_codigo ? 1 : -1))
          .map(value => value.pmo_codigo)
      );
      cy._check_dropdown_async(
        '/ot/lps/get',
        '#select-pmo',
        '25',
        '#select-lp',
        LineaPresupuestariaMOCK200ok.data.items
          .sort((a, b) =>
            a.linea_presupuestaria_codigo > b.linea_presupuestaria_codigo
              ? 1
              : -1
          )
          .map(value => value.linea_presupuestaria_codigo)
      );
      cy._check_dropdown_async(
        '/ot/sustento_financiero_capex_pmolp/get',
        '#select-lp',
        'CHI100',
        '#select-pep2',
        PEP2MOCK200ok.data.items
          .sort((a, b) => (a.pep2 > b.pep2 ? 1 : -1))
          .map(value => value.pep2)
      );

      // OPEX
      cy._check_dropdown(
        '#select-opex',
        OPEXMOCK200ok.data.items
          .sort((a, b) => (a.id_opex > b.id_opex ? 1 : -1))
          .map(value => value.id_opex)
      );
      cy._check_dropdown_async(
        '/ot/sustento_financiero_opex_idopx/get',
        '#select-opex',
        '00-01820',
        '#select-sap',
        SAPMOCK200ok.data.items
          .sort((a, b) => (a.cuenta_sap > b.cuenta_sap ? 1 : -1))
          .map(value => value.cuenta_sap)
      );
      cy._check_dropdown_async(
        '/ot/sustento_financiero_opex_opxsap/get',
        '#select-sap',
        '6052561',
        '#select-ceco',
        CECOMOCK200ok.data.items
          .sort((a, b) => (a.ceco > b.ceco ? 1 : -1))
          .map(value => value.ceco)
      );
    });
  });
});
