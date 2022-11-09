import { nombreCubicacion, nombreOT } from 'cypress/fixtures/automatizacion';
import {
  adicionalesBucle1,
  crearCubicacion,
  CubicacionEditada,
} from 'cypress/fixtures/testedCubicacionBUCLE';

describe('Create Cubicacion BUCLE', () => {
  it('should let enter to create cubicacion', () => {
    cy.viewport(1500, 1700);
    cy.visit('http://localhost:4206/login/auth');
    cy._login('mgestor1', 'asdasd');
    cy._select_profile('Gestor/JP');
    cy.get('button[id="navbar-create-cub"]').click();
  });

  it('create BUCLE CUB', () => {
    cy.viewport(1500, 1700);
    const data = crearCubicacion;
    // FORMULARIO
    cy.get('input[name="input-nombre-cubicacion"]').type(nombreCubicacion);
    cy._select_dropdown('#select-tipo-cubicacion', 'Construcción');
    cy._select_dropdown('#select-contrato_marco', 'BUCLE');
    cy.get('input[name="input-direccion-desde"]').type('a');
    cy.get('input[name="input-altura-desde"]').type('a');
    cy.get('input[name="input-direccion-hasta"]').type('a');
    cy.get('input[name="input-altura-hasta"]').type('a');
    cy.get('textarea[id="input-descripcion"]').type(nombreCubicacion);
    cy._select_dropdown('#select-agencia', 'APOQUINDO');
    cy._select_dropdown(
      '#select-proveedor',
      '330000659 - COBRA CHILE SERVICIOS S.A.'
    );

    data.items.forEach(item => {
      cy.get('input[name="input-nombre-cubicacion"]').click();
      cy._select_dropdown('#select-actividad', item.actividad);

      cy.get('input[name="input-nombre-cubicacion"]').click();
      cy._select_dropdown('#select-tipo-servicio', item.tipo_servicio);
      cy.get('input[name="input-nombre-cubicacion"]').click();
      cy._select_dropdown('#select-servicio', item.nombre);

      item.unidad_obras.forEach((uo, index) => {
        cy.get('input[name="input-nombre-cubicacion"]').click();
        cy._select_dropdown('#select-unidad-obra', uo.nombre);
        cy.get('input[name="input-nombre-cubicacion"]').click();
        cy.get('#agregar-button').click();

        if (uo.nombre.split('-')[1].trim() !== 'SIN UO') {
          cy.get('table')
            .contains('td', uo.nombre.split('-')[1].trim())
            .siblings()
            .eq(2)
            .find('p-inputnumber>span>input')
            .clear()
            .type(`${uo.cantidad}{enter}`);
        }
      });
      cy.get('table')
        .contains('td', item.nombre.split('-')[1].trim())
        .siblings()
        .eq(2)
        .find('p-inputnumber>span>input')
        .clear()
        .type(`${item.cantidad}{enter}`);
    });

    cy.get('button[id="crear-cubicacion"]').click();
    cy.get('.snackbar-container').should('exist');

    cy.wait(2500);
  });
});

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
      cy.get('input[name="input-nombre-ot"]').type(nombreOT);
      cy._select_dropdown_async(
        '/ot/cubicaciones_from_contrato/get',
        '#select-contrato_marco',
        'BUCLE',
        '#select-cubicacion',
        nombreCubicacion
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

      // FIJA
      cy._select_dropdown('#select-tipo-numero-interno', '@TIEMPOS');
      cy.get('input[name="input-numero-interno"]').type('123456');
      cy.get('#agregar-numero-interno').click();
      cy.wait(2000).then(() => {
        cy.get('input[name="input-numero-interno"]').type('12Acao');
        cy.get('#agregar-numero-interno').click();
      });

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
});

describe.skip('OT_ET_AUTORIZACION_INICIAL BUCLE', () => {
  beforeEach(() => {
    cy.viewport(1500, 1700);
  });

  it('should let enter to web', () => {
    cy.visit('http://localhost:4206/login/auth');
    cy._login('msupervisor1', 'asdasd');
    cy._select_profile('Supervisor (Telefónica)');
    cy.get('button[id="navbar-list-ot"]').click();
  });

  it('aceptar ot supervisor', () => {
    cy.get('#table-ejecucion>p-table>div>.p-datatable-header>div>span>input')
      .clear()
      .type(nombreOT);

    cy.get('button[id="play-button"]').click();
    cy.get('button[id="button-confirmar"]').click();
    cy.wait(1000);
  });

  it('should let enter to web', () => {
    cy.visit('http://localhost:4206/login/auth');
    cy._login('mjefearea1', 'asdasd');
    cy._select_profile('Jefe de Área Telefónica');
    cy.get('button[id="navbar-list-ot"]').click();
  });

  it('aceptar ot jefe area', () => {
    cy.get('#table-ejecucion>p-table>div>.p-datatable-header>div>span>input')
      .clear()
      .type(nombreOT);
    cy.get('button[id="play-button"]').click();
    cy.get('button[id="button-confirmar"]').click();
    cy.wait(1000);
  });
});

describe.skip('OT_ET_AUTORIZACION_PROVEEDOR BUCLE', () => {
  beforeEach(() => {
    cy.viewport(1500, 1700);
  });

  it('should let enter to web', () => {
    cy.visit('http://localhost:4206/login/auth');
    cy._login('ccadmincontrato1', 'asdasd');
    cy._select_profile('Administrador EECC');
    cy.get('button[id="navbar-list-ot"]').click();
  });

  it('aceptar ot supervisor', () => {
    cy.intercept('POST', '/ot/posibles_trabajadores/get').as('HTTPRESPONSE');
    cy.get('#table-ejecucion>p-table>div>.p-datatable-header>div>span>input')
      .clear()
      .type(nombreOT);
    cy.get('button[id="play-button"]').click();
    cy.wait('@HTTPRESPONSE').then(() => {
      cy._select_dropdown(
        '#select-supervisor-trabajos',
        'Ana COBRA CHILE Antonella'
      );
      cy.get('button[id="button-confirmar"]').click();
      cy.wait(1000);
    });
  });
});

describe.skip('GUARDAR BORRADOR ADICIONALES INFORME DE AVANCE', () => {
  beforeEach(() => {
    cy.viewport(1500, 700);
  });

  it('Debe desplegar detalles de la cubicacion "Cubicacion Bucle"', () => {
    cy.visit('http://localhost:4206/login/auth');
    cy._login('cctrabajador1', 'asdasd');
    cy._select_profile('Trabajador EECC');
    cy.get('button[id="navbar-list-ot"]').click();
    cy.get('#table-ejecucion>p-table>div>.p-datatable-header>div>span>input')
      .clear()
      .type(nombreOT);

    cy.get('button[id="play-button"]').click();
  });

  // CASO 1: SERVICIO Y UNIDAD DE OBRA A AGREGAR YA EXISTE EN EL INFORME DE AVANCE
  it('Agregar el servicio J101 uo C926 debe desplegar mensaje "Servicio y unidad de obra ya existen en el informe de avance. Debe cambiar la cantidad en el informe de avance"', () => {
    cy.wait(1500);
    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy._select_dropdown('#select-actividad', 'MATRIZ');

    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy._select_dropdown('#select-tipo-servicio', 'LINEAS');
    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy._select_dropdown(
      '#select-servicio',
      'J101 - INSTALAR CABLE EN CANALIZACION GRUPOS A Y B'
    );

    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy._select_dropdown('#select-unidad-obra', 'C926 - CABLE 1800-26 PS');
    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy.get('#agregar-button').click();

    cy.get(
      '#alert-sevicio-existente>p-message>div>span.p-inline-message-text'
    ).contains(
      'Servicio y unidad de obra ya existen en el informe de avance. Debe cambiar la cantidad en el informe de avance'
    );
  });

  // CASO 2.3: SERVICIO A AGREGAR YA EXISTE EN EL INFORME DE AVANCE PERO LA UO ES NUEVA -
  //        EL SERVICIO Y LA UO AUN NO SE HAN AGREGADO COMO ADICIONAL
  it('Agregar una nueva UO C048 al servicio J101, servicio que ya existe en el informe pero no se ha agregado aún como adicional', () => {
    cy.intercept('POST', '/ot/informe_avance/detalle/get').as('HTTPRESPONSE');

    cy.wait(1500);
    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy._select_dropdown('#select-actividad', 'MATRIZ');

    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy._select_dropdown('#select-tipo-servicio', 'LINEAS');
    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy._select_dropdown(
      '#select-servicio',
      'J101 - INSTALAR CABLE EN CANALIZACION GRUPOS A Y B'
    );

    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy._select_dropdown('#select-unidad-obra', 'C048 - CABLE 900-26 SUB');
    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy.get('#agregar-button').click();

    cy.wait(1000);
    cy.get('.table-adicionales>zwc-table-servicios>form>table')
      .contains('td', 'C048')
      .siblings()
      .eq(0)
      .contains('CABLE 900-26 SUB');

    cy.wait(1000);
    cy.get('.table-adicionales>zwc-table-servicios>form>table')
      .contains('td', 'J101')
      .siblings()
      .eq(2)
      .contains('Su cantidad se debe modificar desde el informe de avance');
  });

  // CASO 2.2: SERVICIO A AGREGAR YA EXISTE EN EL INFORME DE AVANCE PERO LA UO ES NUEVA -
  //        EL SERVICIO YA EXISTE COMO ADICIONAL Y LA UNIDAD DE OBRA NO HAN SIDO AGREGADA

  it('Agregar una nueva UO C870 al servicio J101, servicio que ya existe en el informe y que ya ha sido agregado con una uo adicional', () => {
    cy.intercept('POST', '/ot/informe_avance/detalle/get').as('HTTPRESPONSE');

    cy.wait(1500);
    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy._select_dropdown('#select-actividad', 'MATRIZ');

    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy._select_dropdown('#select-tipo-servicio', 'LINEAS');
    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy._select_dropdown(
      '#select-servicio',
      'J101 - INSTALAR CABLE EN CANALIZACION GRUPOS A Y B'
    );

    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy._select_dropdown('#select-unidad-obra', 'C870 - CABLE PS 1212-26 SUB.');
    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy.get('#agregar-button').click();

    cy.wait(1000);
    cy.get('.table-adicionales>zwc-table-servicios>form>table')
      .contains('td', 'C870')
      .siblings()
      .eq(0)
      .contains('CABLE PS 1212-26 SUB.');

    cy.wait(1000);
    cy.get('.table-adicionales>zwc-table-servicios>form>table')
      .contains('td', 'J101')
      .siblings()
      .eq(2)
      .contains('Su cantidad se debe modificar desde el informe de avance');
  });

  // CASO 2.1: SERVICIO A AGREGAR YA EXISTE EN EL INFORME DE AVANCE PERO LA UO ES NUEVA
  // Y EL SERVICIO Y LA UO YA HAN SIDO AGREGADOS COMO ADICIONALES

  it('Al presionar nuevamente el agregar debe desplegar mensaje error "El servicio/UO ya fue agregado como adicional"', () => {
    cy.get('#agregar-button').click();
    cy.get(
      '#alert-sevicio-existente>p-message>div>span.p-inline-message-text'
    ).contains('El servicio/UO ya fue agregado como adicional');
  });

  // CASO 3.1: EL SERVICIO Y LA UO NO EXISTEN EN EL INFORME DE AVANCE Y
  // SERVICIO/UO NO SE HA AGREGADO COMO ADICIONAL

  it('Agregar una nueva UO DT09 al servicio nuevo T057', () => {
    cy.intercept('POST', '/ot/informe_avance/detalle/get').as('HTTPRESPONSE');

    cy.wait(1500);
    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy._select_dropdown('#select-actividad', 'DISTRIBUCION');

    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy._select_dropdown('#select-tipo-servicio', 'DTH');
    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy._select_dropdown(
      '#select-servicio',
      'T057 - ACTIVACION DEL AMPLIFICADOR EN DIRECTA'
    );

    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy._select_dropdown(
      '#select-unidad-obra',
      'DT09 - AMPLIFICADOR FI TELEVES'
    );
    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy.get('#agregar-button').click();

    cy.wait(1000);
    cy.get('.table-adicionales>zwc-table-servicios>form>table')
      .contains('td', 'DT09')
      .siblings()
      .eq(0)
      .contains('AMPLIFICADOR FI TELEVES');

    cy.wait(1000);
    cy.get('.table-adicionales>zwc-table-servicios>form>table')
      .contains('td', 'T057')
      .siblings()
      .eq(0)
      .contains('ACTIVACION DEL AMPLIFICADOR EN DIRECTA');
  });

  // CASO 3.3: EL SERVICIO Y LA UO NO EXISTEN EN EL INFORME DE AVANCE Y
  // SERVICIO YA SE HA AGREGADO COMO ADICIONAL PERO LA UO AÚN NO
  it('Agregar una nueva UO DT07 al servicio nuevo T057 servicio ya agregado como adicional', () => {
    cy.intercept('POST', '/ot/informe_avance/detalle/get').as('HTTPRESPONSE');

    cy.wait(1500);
    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy._select_dropdown('#select-actividad', 'DISTRIBUCION');

    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy._select_dropdown('#select-tipo-servicio', 'DTH');
    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy._select_dropdown(
      '#select-servicio',
      'T057 - ACTIVACION DEL AMPLIFICADOR EN DIRECTA'
    );

    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy._select_dropdown(
      '#select-unidad-obra',
      'DT07 - ANTENA SATELITAL, MARCA AZURE SHINE, MODELO AZ-120FM, S/SERIGRAFÍA.'
    );
    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy.get('#agregar-button').click();

    cy.wait(1000);
    cy.get('.table-adicionales>zwc-table-servicios>form>table')
      .contains('td', 'DT07')
      .siblings()
      .eq(0)
      .contains(
        'ANTENA SATELITAL, MARCA AZURE SHINE, MODELO AZ-120FM, S/SERIGRAFÍA.'
      );
  });

  // AGREGAR ADICIONALES
  it('Al agregar un servicio adicional no existente en el informe de avance y presionar guardar borrador debe actualizar la pagina con el nuevo adicional en el carrito y no debe aparecer en el informe', () => {
    cy.intercept('POST', '/ot/informe_avance/detalle/get').as('HTTPRESPONSE');

    // AGREGAR T051 con 2 UO DT04 - DT01
    // AGREGAR T052 con 1 UO DT01

    const dataServiciosAdicionales = adicionalesBucle1;

    dataServiciosAdicionales.items.forEach(item => {
      cy.get('body').trigger('keydown', { keyCode: 27 });
      cy._select_dropdown('#select-actividad', item.actividad.toUpperCase());

      cy.get('body').trigger('keydown', { keyCode: 27 });
      cy._select_dropdown(
        '#select-tipo-servicio',
        item.tipo_servicio.toUpperCase()
      );
      cy.get('body').trigger('keydown', { keyCode: 27 });
      cy._select_dropdown('#select-servicio', item.nombre);

      item.unidad_obras.forEach((uo, index) => {
        cy.get('body').trigger('keydown', { keyCode: 27 });
        cy._select_dropdown('#select-unidad-obra', uo.nombre);
        cy.get('body').trigger('keydown', { keyCode: 27 });
        cy.get('#agregar-button').click();

        if (uo.nombre.split('-')[1].trim() !== 'SIN UO') {
          cy.get('table')
            .contains('td', uo.nombre.split('-')[1].trim())
            .siblings()
            .eq(2)
            .find('p-inputnumber>span>input')
            .clear()
            .type(`{del}${uo.cantidad}{enter}`);
        }
      });
      cy.get('table')
        .contains('td', item.nombre.split('-')[1].trim())
        .siblings()
        .eq(2)
        .find('p-inputnumber>span>input')
        .clear()
        .type(`{del}${item.cantidad}{enter}`);
    });

    cy.wait(100);
    cy.get('button[id="guardar-borrador-button"]').click();
  });
});

describe.skip('ENVIAR INFORME DE AVANCE SUPERVISOR DE TRABAJOS', () => {
  beforeEach(() => {
    cy.viewport(1500, 700);
  });

  it('Acceder al informe de avance"', () => {
    cy.visit('http://localhost:4206/login/auth');
    cy._login('cctrabajador1', 'asdasd');
    cy._select_profile('Trabajador EECC');
    cy.get('button[id="navbar-list-ot"]').click();
    cy.get('#table-ejecucion>p-table>div>.p-datatable-header>div>span>input')
      .clear()
      .type(nombreOT);
    cy.get('button[id="play-button"]').click();
  });

  it('Al realizar últimos cambios al informe de avance', () => {
    cy.intercept('POST', '/ot/informe_avance/detalle/get').as('HTTPRESPONSE');
    cy.get('.table-informe-avance>zwc-table-servicios>.carrito-container>table')
      .contains('td', 'J730')
      .siblings()
      .eq(2)
      .find('p-inputnumber>span>input')
      .clear()
      .type(`24{enter}`);

    cy.get('button[id="guardar-borrador-button"]').click();

    cy.get('.table-informe-avance>zwc-table-servicios>.carrito-container>table')
      .contains('td', 'J451')
      .siblings()
      .eq(2)
      .find('p-inputnumber>span>input')
      .clear()
      .type(`20{enter}`);

    cy.get('.table-informe-avance>zwc-table-servicios>.carrito-container>table')
      .contains('td', 'D013')
      .siblings()
      .eq(2)
      .find('p-inputnumber>span>input')
      .clear()
      .type(`15{enter}`);

    cy.get('button[id="enviar-button"]').click();
    cy.get('#button-confirmar').click();

    cy.wait(1000);
  });
});
