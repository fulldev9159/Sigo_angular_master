describe.skip('Cubicacion Test', () => {
  // DATOS REALES

  // BUCLE
  const contrato_bucle = 'BUCLE';
  const agencia_bucle = 'APOQUINDO';
  const proveedor_bucle = '330000659 - NOKIA SOLUTIONS AND NETWORKS CHILE LTDA';
  const actividad_bucle = 'Fibra Optica';
  const tipo_servicio_bucle = 'Fibra Optica';
  const serv_1_bucle = 'J757 - DESMONTAR CABLE DE FIBRA OPTICA EN AEREO';
  const serv_1_uo_1_bucle = 'D351 - KIT RETENCION FIBRA 14 MM';

  // BASE
  const nombre_form = 'app-input > #nombre-ot';
  const contrato_form = '#contratosUser > app-select > .form-control';
  const cubicacion_form = '#cubicacion-de-ot > .form-control';

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

  const sustento_form = [pmo_form, linea_presupuestaria_form, pep2_form];
  const extras_form = [
    fecha_inicio_form,
    fecha_termino_form,
    proyecto_form,
    admin_ec_form,
    observaciones_form,
  ];

  const nombre = 'rechazo jerarquico 2';

  beforeEach(() => {
    cy.viewport(1500, 1700);
    cy.login('mgestor1', '123', 'Gestor/JP');
  });

  it('Crear cubicaciones', () => {
    cy.contains('Cubicación').click();
    cy.contains('Crear Cubicación').click();

    // BUCLE
    cy.cubBase(
      'Cub Bucle ' + nombre,
      'Full',
      contrato_bucle,
      agencia_bucle,
      proveedor_bucle
    );
    cy.cubFiltros(
      actividad_bucle.toUpperCase(),
      tipo_servicio_bucle.toUpperCase()
    );
    cy.cubAddService(serv_1_bucle, serv_1_uo_1_bucle);
    cy.get('#create-button').click();
  });

  it('Crear OT', () => {
    cy.contains('Crear OT').click();
    cy.get(nombre_form).type('OT BUCLE ' + nombre);
    cy.get('#contratosUser > app-select > .form-control').select('BUCLE');
    cy.get('#cubicacion-de-ot > .form-control').select('Cub Bucle ' + nombre);

    cy.get(oficina_form).select('0189 - S.FCO LAS CONDES');
    cy.get(solicitado_por_form).select('MARKETING');
    cy.get(direccion_form).type('Direccion cualquiera');
    cy.get(altura_form).type('150');
    cy.get(piso_form).type('1');
    cy.get(departamento_form).type('2131');
    cy.get(comuna_form).select('Cerro Navia');
    cy.get(tipo_red_form).select('ATP');
    cy.get(tiene_area_negocio).select('NORMAL');
    cy.get(tipo_trabajo_form).select('TIEMPO - @TIEMPO');
    cy.get(proyectista_form).type('Jose');

    cy.get(pmo_form).select('31');
    cy.get(linea_presupuestaria_form).select('10952');
    cy.get(pep2_form).select('P-0077-21-0102-40050-601');

    cy.get(fecha_inicio_form).click();
    cy.get(
      '#fecha-inicio-ot > span > div > div > div > div > table > tbody > tr:nth-child(3) > td:nth-child(2)> span'
    ).click();
    cy.get(fecha_termino_form).click();
    cy.get(
      '#fecha-termino-ot > span > div > div > div > div > table > tbody > tr:nth-child(3) > td:nth-child(7) > span'
    ).click();
    cy.get(admin_ec_form).select('Jose NOKIA Campos Jaraquemada');
    cy.get(observaciones_form).type('asdasd');
    cy.get('#create-button').click();
  });
});
