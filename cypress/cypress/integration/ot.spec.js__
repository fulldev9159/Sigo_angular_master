describe('OT Test', () => {
  // BASE
  const nombre_form = 'app-input > #nombre-ot';
  const contrato_form = '#contratosUser > app-select > .form-control';
  const cubicacion_form = '#cubicacion-de-ot > .form-control';

  // MOVIL
  const plan_proyecto_form = '#plan-proyecto > .form-control';
  const sitio_form = '#sitio > .form-control';

  // FIJO
  const numero_interno = '#control_numero_interno > app-input > .form-control';
  const tipo_numpero_form =
    '#control_tipo_numero_interno_id > app-select > .form-control';

  // BUCLE
  const oficina_form = '#control-oficina-central > app-select > .form-control';
  const solicitado_por_form =
    '#control-solicitado-por > app-select > .form-control';
  const direccion_form = '#control-direccion > app-input > .form-control';
  const altura_form = '#control-altura > app-input > .form-control';
  const piso_form = '#control-piso > app-input > .form-control';
  const departamento_form = '#control-departamento > app-input > .form-control';
  const comuna_form = '#control-comuna > app-select > .form-control';
  const tipo_red_form = '#control-tipo-red > app-select > .form-control';
  const tipo_trabajo_form =
    '#control-tipo-trabajo > app-select > .form-control';
  const tiene_boleta_form = '#control-tiene-boleta';
  const tiene_permiso_form = '#control-tiene-permiso';
  const tiene_area_negocio =
    '#control-area-negocio > app-select > .form-control';
  const proyectista_form = '#control-proyectista > app-input > .form-control';

  // ORDINARIO
  const carta_adj_form =
    '#control_carta_adjudicacion > app-input > .form-control';
  const fecha_adj_form = '#control_fecha_adjudicacion>p-calendar';
  const numero_pedido_form =
    '#control_numero_pedido > app-input > .form-control';
  const materia_form = '#control_materia > app-input > .form-control';

  // SUSTENTO FINANCIERO
  const check_opex = '#option_opex > .p-radiobutton > .p-radiobutton-box';
  const check_capex = '#option_capex > .p-radiobutton > .p-radiobutton-box';

  const pmo_form = '#pmo > .form-control';
  const linea_presupuestaria_form = '#linea-presupuestaria > .form-control';
  const pep2_form = '#pep2 > .form-control';

  const id_opex_form = '#id-opex > .form-control';
  const cuenta_sap_form = '#cuenta-sap > .form-control';
  const ceco_form = '#ceco > .form-control';

  const sust_capex = [pmo_form, linea_presupuestaria_form, pep2_form];
  const sust_opex = [id_opex_form, cuenta_sap_form, ceco_form];

  // EXTRAS
  const fecha_inicio_form = '#fecha-inicio-ot > span > input';
  const fecha_termino_form = '#fecha-termino-ot > span > input';
  const proyecto_form = '#proyecto-ot > .form-control';
  const admin_ec_form = '#control_admin_contrato > app-select > .form-control';
  const observaciones_form = '#observaciones';

  const base_form = [nombre_form, contrato_form];
  const movil_form = [plan_proyecto_form, sitio_form];
  const fijo_form = [numero_interno, tipo_numpero_form];
  const bucle_form = [
    oficina_form,
    solicitado_por_form,
    direccion_form,
    altura_form,
    piso_form,
    departamento_form,
    comuna_form,
    tipo_red_form,
    tipo_trabajo_form,
    tiene_boleta_form,
    tiene_permiso_form,
    tiene_area_negocio,
    proyectista_form,
  ];

  const ordinario_form = [
    carta_adj_form,
    fecha_adj_form,
    numero_pedido_form,
    materia_form,
  ];
  const sustento_form = [pmo_form, linea_presupuestaria_form, pep2_form];
  const extras_form = [
    fecha_inicio_form,
    fecha_termino_form,
    proyecto_form,
    admin_ec_form,
    observaciones_form,
  ];

  beforeEach(() => {
    cy.login('mgestor1', '123', 'Gestor/JP');
    cy.contains('Crear OT').click();

    cy.get('#create-button').should('be.disabled');
  });

  it('Revisar cambio de formulario entre tipos de contrato', () => {
    cy._shoul_be_enabled(base_form);
    cy._shoul_be_disabled([cubicacion_form]);

    cy._shoul_not_exist(movil_form);
    cy._shoul_not_exist(fijo_form);
    cy._shoul_not_exist(sustento_form);
    cy._shoul_not_exist(extras_form);

    // ::::: REVISION CONTRATO BUCLE
    cy.get('#contratosUser > app-select > .form-control').select('BUCLE');
    cy.get('#cubicacion-de-ot > .form-control').select('Cub Bucle');

    cy._shoul_not_exist(movil_form);
    cy._shoul_not_exist(fijo_form);
    cy._shoul_not_exist(ordinario_form);

    cy._shoul_be_enabled(bucle_form);
    cy._shoul_be_enabled([pmo_form]);
    cy._shoul_be_disabled([linea_presupuestaria_form, pep2_form]);
    cy._shoul_be_enabled(extras_form);

    // :::::: REVISION FORMULARIO MOVIL
    // cy.get('#contratosUser > app-select > .form-control').select('SBE');
    // cy.get('#cubicacion-de-ot > .form-control').select('Cub Movil');

    // cy._shoul_not_exist(bucle_form);
    // cy._shoul_not_exist(fijo_form);
    // cy._shoul_not_exist(ordinario_form);

    // cy._shoul_be_enabled(movil_form);
    // cy._shoul_be_enabled([pmo_form]);
    // cy._shoul_be_disabled([linea_presupuestaria_form, pep2_form]);
    // cy._shoul_be_enabled(extras_form);

    // ::::: REVISION CONTRATO ORDINARIO
    // cy.get('#contratosUser > app-select > .form-control').select(
    //   'Contrato Ordinario'
    // );
    // cy.get('#cubicacion-de-ot > .form-control').select('Cub Ordinario');

    // cy._shoul_not_exist(bucle_form);
    // cy._shoul_not_exist(fijo_form);
    // cy._shoul_not_exist(movil_form);

    // cy._shoul_be_enabled(ordinario_form);
    // cy._shoul_be_enabled([pmo_form]);
    // cy._shoul_be_disabled([linea_presupuestaria_form, pep2_form]);
    // cy._shoul_be_enabled(extras_form);

    // ::::: REVISION CONTRATO FIJO
    // cy.get('#contratosUser > app-select > .form-control').select(
    //   'UNIFICADO-2019-FIJA'
    // );
    // cy.get('#cubicacion-de-ot > .form-control').select('Cub Fijo');

    // cy._shoul_not_exist(bucle_form);
    // cy._shoul_not_exist(ordinario_form);
    // cy._shoul_not_exist(movil_form);

    // cy._shoul_be_enabled(fijo_form);
    // cy._shoul_be_enabled([pmo_form]);
    // cy._shoul_be_disabled([linea_presupuestaria_form, pep2_form]);
    // cy._shoul_be_enabled(extras_form);
  });

  it.only('Revisar sustento financiero', () => {
    // ::::: REVISION USANDO CONTRATO BUCLE
    cy.get('#contratosUser > app-select > .form-control').select('BUCLE');
    cy.get('#cubicacion-de-ot > .form-control').select('Cub Bucle');

    cy._shoul_be_enabled([pmo_form]);
    cy._shoul_be_disabled([linea_presupuestaria_form, pep2_form]);
    cy._shoul_not_exist(sust_opex);

    cy.get(pmo_form).select('31');
    cy._shoul_be_enabled([pmo_form, linea_presupuestaria_form]);
    cy._shoul_be_disabled([pep2_form]);
    cy._shoul_not_exist(sust_opex);

    cy.get(linea_presupuestaria_form).select('10952');
    cy._shoul_be_enabled(sust_capex);
    cy._shoul_not_exist(sust_opex);

    cy.get(check_opex).click();
    cy._shoul_be_enabled([id_opex_form]);
    cy._shoul_be_disabled([cuenta_sap_form, ceco_form]);
    cy._shoul_not_exist(sust_capex);

    cy.get(id_opex_form).select('00-01820');
    cy._shoul_be_enabled([id_opex_form, cuenta_sap_form]);
    cy._shoul_be_disabled([ceco_form]);
    cy._shoul_not_exist(sust_capex);

    cy.get(cuenta_sap_form).select('6052561');
    cy._shoul_be_enabled([id_opex_form, cuenta_sap_form, ceco_form]);
    cy._shoul_not_exist(sust_capex);

    cy.get(check_capex).click();
    cy._shoul_be_enabled([pmo_form]);
    cy._shoul_be_disabled([linea_presupuestaria_form, pep2_form]);
    cy._shoul_not_exist(sust_opex);
  });
});
