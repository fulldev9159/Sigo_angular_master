describe('Cubicacion Test', () => {
  // TESTING
  const contrato_test = 'BUCLE';
  const agencia_test = 'PROVIDENCIA';
  const proveedor_test = '330000659 - NOKIA SOLUTIONS AND NETWORKS CHILE LTDA';
  const actividad_test = 'Fibra Optica';
  const tipo_servicio_test = 'Fibra Optica';

  const serv_1_test = 'J757 - DESMONTAR CABLE DE FIBRA OPTICA EN AEREO';
  const serv_1_precio_test = 171.57;
  const serv_1_precio_test_text = `$${serv_1_precio_test
    .toString()
    .replace('.', ',')}`;
  const serv_1_uo_1_test = 'D351 - KIT RETENCION FIBRA 14 MM';
  const serv_1_uo_1_precio_test = 57000;
  const serv_1_uo_1_precio_test_text = `$${serv_1_uo_1_precio_test}`;

  const serv_2_test = 'J756 - INSTALAR CABLE DE FIBRA OPTICA AEREO';
  const serv_2_precio_test = 457.52;
  const serv_2_precio_test_text = `$${serv_2_precio_test
    .toString()
    .replace('.', ',')}`;
  const serv_2_uo_1_test =
    'H089 - CABLE AEREO 32 FO/PKP (CON LASHING RECUBIERTO)';
  const serv_2_uo_2_test =
    'H088 - CABLE AEREO 24 FO/PKP (CON LASHING RECUBIERTO)';
  const serv_2_uo_3_test =
    'H093 - CABLE AEREO 64 FO/PKP (CON LASHING RECUBIERTO)';
  const serv_2_uo_4_test =
    'H095 - CABLE AEREO 96 FO/PKP (CON LASHING RECUBIERTO)';

  // DATOS REALES
  // MOVIL
  const contrato_movil = 'UNIFICADO-2019-MOVIL';
  const agencia_movil = 'Región Metropolitana de Santiago';
  const proveedor_movil = '3300213678 - 2021-2023 GENERATEL SPA';
  const actividad_movil = 'INSTALACIONES EN EDIFICIO';
  const tipo_servicio_movil = 'Instalaciones en edificios de red';
  const serv_1_movil =
    'ServGeneratel82 - Ingenieria de detalles con Estudio de factilidad de un MO';
  const serv_1_uo_1_movil = '0 - SIN UO';

  // BUCLE
  const contrato_bucle = 'BUCLE';
  const agencia_bucle = 'APOQUINDO';
  const proveedor_bucle = '330000659 - NOKIA SOLUTIONS AND NETWORKS CHILE LTDA';
  const actividad_bucle = 'Fibra Optica';
  const tipo_servicio_bucle = 'Fibra Optica';
  const serv_1_bucle = 'J757 - DESMONTAR CABLE DE FIBRA OPTICA EN AEREO';
  const serv_1_uo_1_bucle = 'D351 - KIT RETENCION FIBRA 14 MM';

  // FIJO
  const contrato_fijo = 'UNIFICADO-2019-FIJA';
  const agencia_fijo = 'Región Metropolitana de Santiago';
  const proveedor_fijo = '3300213682 - 2021-2023 GENERATEL SPA';
  const actividad_fijo = 'INSTALACIONES EN EDIFICIO';
  const tipo_servicio_fijo = 1;
  const serv_1_fijo =
    'ServGeneratel82 - Ingenieria de detalles con Estudio de factilidad de un MO';
  const serv_1_uo_1_fijo = '0 - SIN UO';

  beforeEach(() => {
    cy.viewport(1500, 1700);
    cy.login('mgestor1', '123', 'Gestor/JP');
    cy.contains('Cubicación').click();
    cy.contains('Crear Cubicación').click();

    cy.get('#create-button').should('be.disabled');
  });

  it('Revisar que se agreguen correctamente los items al carrito', () => {
    cy.cubBase('CubTest', 'Full', contrato_test, agencia_test, proveedor_test);
    cy.cubFiltros(
      actividad_test.toUpperCase(),
      tipo_servicio_test.toUpperCase()
    );

    // Agregar un servicio y un UO
    cy.cubAddService(serv_1_test, serv_1_uo_1_test);
    // Agregar otro servicio con 2 UO
    cy.cubAddService(serv_2_test, serv_2_uo_1_test);
    cy.cubAddService(serv_2_test, serv_2_uo_2_test);

    // REVISAR SI LA TABLA CONTIENE TODOS LOS DATOS CORRESPONDIENTES
    // SERVICIO 1
    cy.cubCheckTableDataServUO(
      1,
      serv_1_test,
      tipo_servicio_test,
      1,
      serv_1_precio_test_text,
      serv_1_precio_test_text,
      serv_1_uo_1_test,
      actividad_test,
      1,
      serv_1_uo_1_precio_test_text,
      serv_1_uo_1_precio_test_text
    );

    // SERVICIO 2
    cy.cubCheckTableDataServUO(
      2,
      serv_2_test,
      tipo_servicio_test,
      1,
      serv_2_precio_test_text,
      serv_2_precio_test_text,
      serv_2_uo_2_test,
      actividad_test,
      1,
      '$0',
      '$0'
    );
    cy.cubCheckTableDataUOB(3, serv_2_uo_1_test, actividad_test, 1, '$0', '$0');

    // REVISAR TOTALES
    cy.cubTablaTotales(
      [
        { precio: serv_1_precio_test, cantidad: 1 },
        { precio: serv_2_precio_test, cantidad: 1 },
      ],
      [{ precio: serv_1_uo_1_precio_test, cantidad: 1 }]
    );

    // ELIMINAR UNO, AGREGAR TODO Y ELIMINAR TODO
    cy.get(':nth-child(8) > .icon > .eliminar-color').click();

    cy.cubAddService(serv_2_test, serv_2_uo_1_test);
    cy.cubAddService(serv_2_test, serv_2_uo_3_test);
    cy.cubAddService(serv_2_test, serv_2_uo_4_test);

    // SERVICIO 1
    cy.cubCheckTableDataServUO(
      1,
      serv_1_test,
      tipo_servicio_test,
      1,
      serv_1_precio_test_text,
      serv_1_precio_test_text,
      serv_1_uo_1_test,
      actividad_test,
      1,
      serv_1_uo_1_precio_test_text,
      serv_1_uo_1_precio_test_text
    );

    // SERVICIO 2
    cy.cubCheckTableDataServUO(
      2,
      serv_2_test,
      tipo_servicio_test,
      1,
      serv_2_precio_test_text,
      serv_2_precio_test_text,
      serv_2_uo_4_test,
      actividad_test,
      1,
      '$0',
      '$0'
    );
    cy.cubCheckTableDataUOB(3, serv_2_uo_3_test, actividad_test, 1, '$0', '$0');
    cy.cubCheckTableDataUOB(4, serv_2_uo_1_test, actividad_test, 1, '$0', '$0');
    cy.cubCheckTableDataUOB(5, serv_2_uo_2_test, actividad_test, 1, '$0', '$0');

    // ELIMINAR TODO
    cy.get(':nth-child(2) > :nth-child(7) > .icon > .ui ').click();
    cy.get(':nth-child(1) > :nth-child(7) > .icon > .ui').click();

    cy.get('.text-left > p').contains('Al menos 1 servicio debe ser ingresado');
    cy.get('#create-button').should('be.disabled');

    // CASO ESPECIAL
    cy.cubAddService(serv_2_test, serv_2_uo_1_test);
    cy.cubAddService(serv_2_test, serv_2_uo_2_test);
    cy.cubAddService(serv_1_test, serv_1_uo_1_test);
    cy.cubAddService(serv_2_test, serv_2_uo_3_test);
    cy.cubAddService(serv_2_test, serv_2_uo_4_test);

    // REVISAR SI LA TABLA CONTIENE TODOS LOS DATOS CORRESPONDIENTES
    // SERVICIO 1
    cy.cubCheckTableDataServUO(
      1,
      serv_1_test,
      tipo_servicio_test,
      1,
      serv_1_precio_test_text,
      serv_1_precio_test_text,
      serv_1_uo_1_test,
      actividad_test,
      1,
      serv_1_uo_1_precio_test_text,
      serv_1_uo_1_precio_test_text
    );

    // SERVICIO 2
    cy.cubCheckTableDataServUO(
      2,
      serv_2_test,
      tipo_servicio_test,
      1,
      serv_2_precio_test_text,
      serv_2_precio_test_text,
      serv_2_uo_4_test,
      actividad_test,
      1,
      '$0',
      '$0'
    );
    cy.cubCheckTableDataUOB(3, serv_2_uo_3_test, actividad_test, 1, '$0', '$0');
    cy.cubCheckTableDataUOB(4, serv_2_uo_2_test, actividad_test, 1, '$0', '$0');
    cy.cubCheckTableDataUOB(5, serv_2_uo_1_test, actividad_test, 1, '$0', '$0');
  });

  it('Revisar cambios de cantidades', () => {
    cy.cubBase('CubTest', 'Full', contrato_test, agencia_test, proveedor_test);
    cy.cubFiltros(
      actividad_test.toUpperCase(),
      tipo_servicio_test.toUpperCase()
    );

    cy.cubAddService(serv_1_test, serv_1_uo_1_test);
    cy.cubAddService(serv_2_test, serv_2_uo_1_test);

    // AUMENTAR LA CANTIDAD SERVICIO
    const fila2 = '.table-carrito > table > tbody > tr:nth-child(2) > td';
    cy.get(fila2 + ':nth-child(4)>app-input>input')
      .clear()
      .type('{del}4');

    // REVISAR VALORES
    // SERVICIO 1
    cy.cubCheckTableDataServUO(
      1,
      serv_1_test,
      tipo_servicio_test,
      1,
      serv_1_precio_test_text,
      serv_1_precio_test_text,
      serv_1_uo_1_test,
      actividad_test,
      1,
      serv_1_uo_1_precio_test_text,
      serv_1_uo_1_precio_test_text
    );
    // SERVICIO 2
    cy.cubCheckTableDataServUO(
      2,
      serv_2_test,
      tipo_servicio_test,
      4,
      serv_2_precio_test_text,
      '$2.844,48',
      serv_2_uo_1_test,
      actividad_test,
      1,
      '$0',
      '$0'
    );
  });

  it('Revisar que no permita agregar el mismo servicio/uo', () => {
    cy.cubBase('CubTest', 'Full', contrato_test, agencia_test, proveedor_test);
    cy.cubFiltros(
      actividad_test.toUpperCase(),
      tipo_servicio_test.toUpperCase()
    );

    cy.cubAddService(serv_1_test, serv_1_uo_1_test);
    cy.cubAddService(serv_1_test, serv_1_uo_1_test);

    cy.get('#mensaje-repetido').contains(
      'Ya ha agregado este servico/Unidad Obra'
    );
  });

  it('Revisar que no permita agregar el mismo servicio/uo', () => {
    cy.cubBase('CubTest', 'Full', contrato_test, agencia_test, proveedor_test);
    cy.cubFiltros(
      actividad_test.toUpperCase(),
      tipo_servicio_test.toUpperCase()
    );

    cy.cubAddService(serv_1_test, serv_1_uo_1_test);

    cy.get(':nth-child(15) > .icon > .ui').click();
    cy.get('.row > table > tbody > .ng-star-inserted > :nth-child(1)').contains(
      '165211'
    );
    cy.get('.row > table > tbody > .ng-star-inserted > :nth-child(2)').contains(
      'KIT RETENCION FIBRA 14 MM'
    );
    cy.get('.row > table > tbody > .ng-star-inserted > :nth-child(3)').contains(
      'PROVEEDOR'
    );
    cy.get('.row > table > tbody > .ng-star-inserted > :nth-child(4)').contains(
      serv_1_uo_1_precio_test_text
    );
  });

  it('Crear cubicaciones', () => {
    // MOVIL;
    cy.cubBase(
      'Cub Movil',
      'Full',
      contrato_movil,
      agencia_movil,
      proveedor_movil
    );
    cy.cubFiltros(actividad_movil.toUpperCase(), tipo_servicio_movil);
    cy.cubAddService(serv_1_movil, serv_1_uo_1_movil);
    cy.get('#create-button').click();

    // BUCLE
    cy.contains('Nueva Cubicación').click();
    cy.cubBase(
      'Cub Bucle',
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

    // FIJO
    cy.contains('Nueva Cubicación').click();
    cy.cubBase('Cub Fijo', 'Full', contrato_fijo, agencia_fijo, proveedor_fijo);
    cy.cubFiltros(actividad_fijo.toUpperCase(), tipo_servicio_fijo);
    cy.cubAddService(serv_1_fijo, serv_1_uo_1_fijo);
    cy.get('#create-button').click();

    // ORDINARIO
    // cy.contains('Nueva Cubicación').click();
    // cy.createCub(
    //   'Cub Ordinario',
    //   'Full',
    //   'Contrato Ordinario',
    //   'ANTOFAGASTA',
    //   '24242424 - NOKIA SOLUTIONS AND NETWORKS CHILE LTDA',
    //   'DISEÑO',
    //   'PROYECTOS',
    //   'D003 - DISEÑO DE PROYECTO INMOBILIARIO EN RED DE FO-COBRE (VDSL)',
    //   '0 - SIN UO'
    // );
  });
});
