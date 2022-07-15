describe('Cubicacion Test', () => {
  let data;

  beforeEach(() => {
    cy.viewport(1500, 1700);
    cy.login('mgestor1', '123', 'Gestor/JP');
    cy.contains('Cubicación').click();
    cy.contains('Crear Cubicación').click();

    cy.get('#create-button').should('be.disabled');

    cy.fixture('data').then(fData => {
      data = fData;
    });
  });

  it('Revisar que se agreguen correctamente los items al carrito', () => {
    let bucle = data.bucle.cub;
    cy.cubBase(
      'CubTest',
      'Full',
      bucle.nombre_contrato,
      bucle.agencia,
      bucle.proveedor
    );
    cy.cubFiltros(
      bucle.actividad_1.toUpperCase(),
      bucle.tipo_srv_1.toUpperCase()
    );

    // Agregar un servicio y un UO
    cy.cubAddService(bucle.srv_1.nombre, bucle.srv_1.uob_1.nombre);
    // Agregar otro servicio con 2 UO
    cy.cubAddService(bucle.srv_2.nombre, bucle.srv_2.uob_1.nombre);
    cy.cubAddService(bucle.srv_2.nombre, bucle.srv_2.uob_2.nombre);

    // REVISAR SI LA TABLA CONTIENE TODOS LOS DATOS CORRESPONDIENTES
    // SERVICIO 1
    cy.cubCheckTableDataServUO(
      1,
      bucle.srv_1.nombre,
      bucle.tipo_srv_1,
      1,
      bucle.srv_1.precio_text,
      bucle.srv_1.precio_text,
      bucle.srv_1.uob_1.nombre,
      bucle.actividad_1,
      1,
      bucle.srv_1.uob_1.precio_text,
      bucle.srv_1.uob_1.precio_text
    );

    // SERVICIO 2
    cy.cubCheckTableDataServUO(
      2,
      bucle.srv_2.nombre,
      bucle.tipo_srv_1,
      1,
      bucle.srv_2.precio_text,
      bucle.srv_2.precio_text,
      bucle.srv_2.uob_2.nombre,
      bucle.actividad_1,
      1,
      '$0',
      '$0'
    );
    cy.cubCheckTableDataUOB(
      3,
      bucle.srv_2.uob_1.nombre,
      bucle.actividad_1,
      1,
      '$0',
      '$0'
    );

    // REVISAR TOTALES
    cy.cubTablaTotales(
      [
        { precio: bucle.srv_1.precio_num, cantidad: 1 },
        { precio: bucle.srv_2.precio_num, cantidad: 1 },
      ],
      [{ precio: bucle.srv_1.uob_1.precio_num, cantidad: 1 }]
    );

    // ELIMINAR UNO, AGREGAR TODO Y ELIMINAR TODO
    cy.get(':nth-child(8) > .icon > .eliminar-color').click();

    cy.cubAddService(bucle.srv_2.nombre, bucle.srv_2.uob_1.nombre);
    cy.cubAddService(bucle.srv_2.nombre, bucle.srv_2.uob_3.nombre);
    cy.cubAddService(bucle.srv_2.nombre, bucle.srv_2.uob_4.nombre);

    // SERVICIO 1
    cy.cubCheckTableDataServUO(
      1,
      bucle.srv_1.nombre,
      bucle.tipo_srv_1,
      1,
      bucle.srv_1.precio_text,
      bucle.srv_1.precio_text,
      bucle.srv_1.uob_1.nombre,
      bucle.actividad_1,
      1,
      bucle.srv_1.uob_1.precio_text,
      bucle.srv_1.uob_1.precio_text
    );

    // SERVICIO 2
    cy.cubCheckTableDataServUO(
      2,
      bucle.srv_2.nombre,
      bucle.tipo_srv_1,
      1,
      bucle.srv_2.precio_text,
      bucle.srv_2.precio_text,
      bucle.srv_2.uob_4.nombre,
      bucle.actividad_1,
      1,
      bucle.srv_2.uob_4.precio_text,
      bucle.srv_2.uob_4.precio_text
    );
    cy.cubCheckTableDataUOB(
      3,
      bucle.srv_2.uob_3.nombre,
      bucle.actividad_1,
      1,
      bucle.srv_2.uob_3.precio_text,
      bucle.srv_2.uob_3.precio_text
    );
    cy.cubCheckTableDataUOB(
      4,
      bucle.srv_2.uob_1.nombre,
      bucle.actividad_1,
      1,
      bucle.srv_2.uob_1.precio_text,
      bucle.srv_2.uob_1.precio_text
    );
    cy.cubCheckTableDataUOB(
      5,
      bucle.srv_2.uob_2.nombre,
      bucle.actividad_1,
      1,
      bucle.srv_2.uob_2.precio_text,
      bucle.srv_2.uob_2.precio_text
    );

    // ELIMINAR TODO
    cy.get(':nth-child(2) > :nth-child(7) > .icon > .ui ').click();
    cy.get(':nth-child(1) > :nth-child(7) > .icon > .ui').click();

    cy.get('.text-left > p').contains('Al menos 1 servicio debe ser ingresado');
    cy.get('#create-button').should('be.disabled');

    // CASO ESPECIAL
    cy.cubAddService(bucle.srv_2.nombre, bucle.srv_2.uob_1.nombre);
    cy.cubAddService(bucle.srv_2.nombre, bucle.srv_2.uob_2.nombre);
    cy.cubAddService(bucle.srv_1.nombre, bucle.srv_1.uob_1.nombre);
    cy.cubAddService(bucle.srv_2.nombre, bucle.srv_2.uob_3.nombre);
    cy.cubAddService(bucle.srv_2.nombre, bucle.srv_2.uob_4.nombre);

    // REVISAR SI LA TABLA CONTIENE TODOS LOS DATOS CORRESPONDIENTES
    // SERVICIO 1
    cy.cubCheckTableDataServUO(
      1,
      bucle.srv_1.nombre,
      bucle.tipo_srv_1,
      1,
      bucle.srv_1.precio_text,
      bucle.srv_1.precio_text,
      bucle.srv_1.uob_1.nombre,
      bucle.actividad_1,
      1,
      bucle.srv_1.uob_1.precio_text,
      bucle.srv_1.uob_1.precio_text
    );

    // SERVICIO 2
    cy.cubCheckTableDataServUO(
      2,
      bucle.srv_2.nombre,
      bucle.tipo_srv_1,
      1,
      bucle.srv_2.precio_text,
      bucle.srv_2.precio_text,
      bucle.srv_2.uob_4.nombre,
      bucle.actividad_1,
      1,
      bucle.srv_2.uob_4.precio_text,
      bucle.srv_2.uob_4.precio_text
    );
    cy.cubCheckTableDataUOB(
      3,
      bucle.srv_2.uob_3.nombre,
      bucle.actividad_1,
      1,
      bucle.srv_2.uob_3.precio_text,
      bucle.srv_2.uob_3.precio_text
    );
    cy.cubCheckTableDataUOB(
      4,
      bucle.srv_2.uob_2.nombre,
      bucle.actividad_1,
      1,
      bucle.srv_2.uob_2.precio_text,
      bucle.srv_2.uob_2.precio_text
    );
    cy.cubCheckTableDataUOB(
      5,
      bucle.srv_2.uob_1.nombre,
      bucle.actividad_1,
      1,
      bucle.srv_2.uob_1.precio_text,
      bucle.srv_2.uob_1.precio_text
    );
  });

  it('Revisar cambios de cantidades', () => {
    let bucle = data.bucle.cub;
    cy.cubBase(
      'CubTest',
      'Full',
      bucle.nombre_contrato,
      bucle.agencia,
      bucle.proveedor
    );
    cy.cubFiltros(
      bucle.actividad_1.toUpperCase(),
      bucle.tipo_srv_1.toUpperCase()
    );

    cy.cubAddService(bucle.srv_1.nombre, bucle.srv_1.uob_1.nombre);
    cy.cubAddService(bucle.srv_2.nombre, bucle.srv_2.uob_1.nombre);

    // AUMENTAR LA CANTIDAD SERVICIO
    const fila2 = '.table-carrito > table > tbody > tr:nth-child(2) > td';
    cy.get(fila2 + ':nth-child(4)>app-input>input')
      .clear()
      .type('{del}4');

    // REVISAR VALORES
    // SERVICIO 1
    cy.cubCheckTableDataServUO(
      1,
      bucle.srv_1.nombre,
      bucle.tipo_srv_1,
      1,
      bucle.srv_1.precio_text,
      bucle.srv_1.precio_text,
      bucle.srv_1.uob_1.nombre,
      bucle.actividad_1,
      1,
      bucle.srv_1.uob_1.precio_text,
      bucle.srv_1.uob_1.precio_text
    );
    // SERVICIO 2
    cy.cubCheckTableDataServUO(
      2,
      bucle.srv_2.nombre,
      bucle.tipo_srv_1,
      4,
      bucle.srv_2.precio_text,
      '$1.830,08',
      bucle.srv_2.uob_1.nombre,
      bucle.actividad_1,
      1,
      bucle.srv_2.uob_1.precio_text,
      bucle.srv_2.uob_1.precio_text
    );
  });

  it('Revisar que no permita agregar el mismo servicio/uo', () => {
    let bucle = data.bucle.cub;
    cy.cubBase(
      'CubTest',
      'Full',
      bucle.nombre_contrato,
      bucle.agencia,
      bucle.proveedor
    );
    cy.cubFiltros(
      bucle.actividad_1.toUpperCase(),
      bucle.tipo_srv_1.toUpperCase()
    );

    cy.cubAddService(bucle.srv_1.nombre, bucle.srv_1.uob_1.nombre);
    cy.cubAddService(bucle.srv_1.nombre, bucle.srv_1.uob_1.nombre);

    cy.get('#mensaje-repetido').contains(
      'Ya ha agregado este servico/Unidad Obra'
    );
  });

  it('Revisar detalle de una UOB', () => {
    let bucle = data.bucle.cub;
    cy.cubBase(
      'CubTest',
      'Full',
      bucle.nombre_contrato,
      bucle.agencia,
      bucle.proveedor
    );
    cy.cubFiltros(
      bucle.actividad_1.toUpperCase(),
      bucle.tipo_srv_1.toUpperCase()
    );

    cy.cubAddService(bucle.srv_1.nombre, bucle.srv_1.uob_1.nombre);

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
      bucle.srv_1.uob_1.precio_text
    );
  });

  it('Crear cubicaciones', () => {
    let bucle = data.bucle.cub;
    let movil = data.movil.cub;
    let fijo = data.fijo.cub;
    let ordinario = data.ordinario.cub;

    // MOVIL;
    cy.cubBase(
      'Cub Movil',
      'Full',
      movil.nombre_contrato,
      movil.agencia,
      movil.proveedor
    );
    cy.cubFiltros(movil.actividad_1.toUpperCase(), movil.tipo_srv_1);
    cy.cubAddService(movil.srv_1.nombre, movil.srv_1.uob_1.nombre);
    cy.get('#create-button').click();

    // BUCLE
    cy.contains('Nueva Cubicación').click();
    cy.cubBase(
      'Cub Bucle',
      'Full',
      bucle.nombre_contrato,
      bucle.agencia,
      bucle.proveedor
    );
    cy.cubFiltros(
      bucle.actividad_1.toUpperCase(),
      bucle.tipo_srv_1.toUpperCase()
    );
    cy.cubAddService(bucle.srv_1.nombre, bucle.srv_1.uob_1.nombre);
    cy.get('#create-button').click();

    // FIJO
    cy.contains('Nueva Cubicación').click();
    cy.cubBase(
      'Cub Fijo',
      'Full',
      fijo.nombre_contrato,
      fijo.agencia,
      fijo.proveedor
    );
    cy.cubFiltros(fijo.actividad_1.toUpperCase(), fijo.tipo_srv_1);
    cy.cubAddService(fijo.srv_1.nombre, fijo.srv_1.uob_1.nombre);
    cy.get('#create-button').click();

    // ORDINARIO
    cy.contains('Nueva Cubicación').click();
    cy.cubBase(
      'Cub Ordinario',
      'Full',
      ordinario.nombre_contrato,
      ordinario.agencia,
      ordinario.proveedor
    );
    cy.cubFiltros(ordinario.actividad_1.toUpperCase(), ordinario.tipo_srv_1);
    cy.cubAddService(ordinario.srv_1.nombre, ordinario.srv_1.uob_1.nombre);
    cy.get('#create-button').click();
  });
});
