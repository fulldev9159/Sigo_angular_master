import {
  tipoCubicacionMOCK200OK,
  ContratosUsuarioMOCK200OK,
  getActividadesContratoProveedorMOCK200ok,
  getAgenciasContratoMOCK200OK,
  getProveedoresAgenciaContratoMOCK200OK,
  getTipoServiciosContratoMOCK200ok,
  ServiciosAgenciaContratoProveedorMOCK200OK,
  UnidadObraServicioMOCK200OK,
} from '@mocksOT';

interface DATA_TABLE_SERVICE_UO {
  fila: number;
  servicio: string;
  tipo_servicio: string;
  cantidad_servicio: number;
  precio: string;
  total: string;
  uo: string;
  actividad: string;
  uo_precio: string;
  uo_total: string;
  cantidad_uo: number;
}
interface DATA_TABLE_UO {
  fila: number;
  uo: string;
  actividad: string;
  uo_precio: string;
  uo_total: string;
  cantidad_uo: number;
}

describe('04_CUB_01_FORMULARIO_SPEC', () => {
  beforeEach(() => {
    cy.viewport(1500, 1700);
  });

  it('should let enter to create cubicacion', () => {
    cy.visit('http://localhost:4206/login/auth');
    cy._login('mgestor1', 'asdasd');
    cy._select_profile('Gestor/JP');
    cy.get('button[id="navbar-create-cub"]').click();
  });

  describe.skip('Test responsive', () => {});

  describe('Visubilidad e Interacción Incial', () => {
    describe('Visibilidad', () => {
      it('should display ', () => {
        cy.get('input[name="input-nombre-cubicacion"]').should('be.enabled');
        cy.get('#select-tipo-cubicacion>div').should(
          'not.have.class',
          'p-disabled'
        );
        cy.get('#select-contrato_marco>div').should(
          'not.have.class',
          'p-disabled'
        );
        cy.get('#select-agencia>div').should('have.class', 'p-disabled');
        cy.get('#select-proveedor>div').should('have.class', 'p-disabled');
        cy.get('#select-actividad>div').should('have.class', 'p-disabled');
        cy.get('#select-tipo-servicio>div').should('have.class', 'p-disabled');
        cy.get('#select-servicio>div').should('have.class', 'p-disabled');
        cy.get('#select-unidad-obra>div').should('have.class', 'p-disabled');
      });
    });

    describe('Interacción', () => {
      it('should display ', () => {
        cy._check_input('input[name="input-nombre-cubicacion"]', 'required');

        // TIPO CUBICACION
        cy._check_dropdown_required('#select-tipo-cubicacion');
        cy._check_dropdown_data(
          '#select-tipo-cubicacion',
          tipoCubicacionMOCK200OK.data.items,
          'descripcion'
        );

        // CONTRATO MARCO
        cy._check_dropdown_required('#select-contrato_marco');
        cy._check_dropdown_data(
          '#select-contrato_marco',
          ContratosUsuarioMOCK200OK.data.items,
          'model_contrato_id.nombre'
        );
      });
    });
  });

  describe('Testing comportamiento sección descripcion dependiendo del contrato', () => {
    it(`should display dirección inputs for bucle contract`, () => {
      cy._select_dropdown('#select-contrato_marco', 'BUCLE');
      cy._check_input('input[name="input-direccion-desde"]', 'required');
      cy._check_input('input[name="input-altura-desde"]', 'required');
      cy._check_input('input[name="input-direccion-hasta"]', 'required');
      cy._check_input('input[name="input-altura-hasta"]', 'required');
    });

    it(
      'should not display dirección inputs for contracts doent bucle',
      {
        retries: 2,
      },
      () => {
        cy._select_dropdown('#select-contrato_marco', 'CONTRATO_ORDINARIO');
        cy.get('input[name="input-nombre-cubicacion"]').click();
        cy.get('input[name="input-direccion-desde"]').should('not.exist');
        cy.get('input[name="input-altura-desde"]').should('not.exist');
        cy.get('input[name="input-direccion-hasta"]').should('not.exist');
        cy.get('input[name="input-altura-hasta"]').should('not.exist');
        cy._select_dropdown('#select-contrato_marco', 'UNIFICADO_FIJA');
        cy.get('input[name="input-direccion-desde"]').should('not.exist');
        cy.get('input[name="input-altura-desde"]').should('not.exist');
        cy.get('input[name="input-direccion-hasta"]').should('not.exist');
        cy.get('input[name="input-altura-hasta"]').should('not.exist');
        cy._select_dropdown('#select-contrato_marco', 'UNIFICADO_MOVIL');
        cy.get('input[name="input-direccion-desde"]').should('not.exist');
        cy.get('input[name="input-altura-desde"]').should('not.exist');
        cy.get('input[name="input-direccion-hasta"]').should('not.exist');
        cy.get('input[name="input-altura-hasta"]').should('not.exist');
        cy.get('input[name="input-nombre-cubicacion"]').click();
      }
    );
  });

  describe('Testing comportamiento de dropdown en una selección inicial', () => {
    describe('Agencia', () => {
      it('test', () => {
        cy._select_dropdown('#select-contrato_marco', 'BUCLE');
        cy.get('input[name="input-nombre-cubicacion"]').click();

        // AGENCIA
        cy._check_dropdown_required('#select-agencia');
        cy._check_dropdown_data(
          '#select-agencia',
          getAgenciasContratoMOCK200OK.data.items,
          'nombre'
        );
      });
    });
    describe('Proveedor', () => {
      it('test', () => {
        // PROVEEDOR
        cy._select_dropdown('#select-agencia', 'APOQUINDO');
        cy._check_dropdown_required('#select-proveedor');
        let datosProv = getProveedoresAgenciaContratoMOCK200OK.data.items
          .sort((a, b) =>
            a.nombre > b.nombre ? 1 : b.nombre > a.nombre ? -1 : 0
          )
          .map(value => `${value.codigo_acuerdo} - ${value.nombre}`);
        cy.get('#select-proveedor').click();
        cy.get(
          '#select-proveedor>div>.p-dropdown-panel>div>ul>p-dropdownitem> li.p-ripple'
        ).each(($el, index, $list) => {
          expect($el.text()).eq(datosProv[index]);
        });
        cy.get('#select-proveedor').click();
      });
    });

    describe('ACTIVIDAD', () => {
      it('test', () => {
        // ACTIVIDAD
        cy._select_dropdown(
          '#select-proveedor',
          '330000659 - COBRA CHILE SERVICIOS S.A.'
        );
        cy._check_dropdown_required('#select-actividad');
        cy._check_dropdown_data(
          '#select-actividad',
          getActividadesContratoProveedorMOCK200ok.data.items,
          'descripcion'
        );
      });
    });

    describe('TIPO SERVICIO', () => {
      it('test', () => {
        // TIPO SERVICIO
        cy._select_dropdown('#select-actividad', 'DISEÑO');
        cy._check_dropdown_required('#select-tipo-servicio');
        cy._check_dropdown_data(
          '#select-tipo-servicio',
          getTipoServiciosContratoMOCK200ok.data.items,
          'descripcion'
        );
      });
    });

    describe('SERVICIO', () => {
      it('test', () => {
        // TIPO SERVICIO

        cy._select_dropdown('#select-tipo-servicio', 'PROYECTOS');
        cy.get('.pi-spinner', { timeout: 5000 }).should('not.exist');
        // TODO: VER PORQUE SE PEGA
        // cy.get('#select-servicio').click();
        // cy.get('body').trigger('keydown', { keyCode: 27 });
        // cy.get('#select-servicio' + '+zwc-input-alert>small').contains(
        //   'Este campo es requerido'
        // );

        let datosServ = ServiciosAgenciaContratoProveedorMOCK200OK.data.items
          .sort((a, b) =>
            a.descripcion > b.descripcion
              ? 1
              : b.descripcion > a.descripcion
              ? -1
              : 0
          )
          .map(value => `${value.numero_producto} - ${value.descripcion}`);
        cy.get('#select-servicio').click();
        cy.get(
          '#select-servicio' +
            '>div>.p-dropdown-panel>div>ul>p-dropdownitem>li.p-ripple'
        ).each(($el, index, $list) => {
          expect($el.text()).eq(datosServ[index]);
        });
        cy.get('#select-servicio').click();
      });
    });

    describe('UO', () => {
      it('test', () => {
        // UO
        cy._select_dropdown(
          '#select-servicio',
          'D021 - DISEÑO DE RED INTERIOR RED DE F.O. (DITIFO)'
        );
        // TODO: VER PORQUE SE PEGA
        cy.get('.pi-spinner', { timeout: 5000 }).should('not.exist');

        // cy._check_dropdown_required('#select-unidad-obra');
        let datos = UnidadObraServicioMOCK200OK.data.items
          .sort((a, b) =>
            a.model_unidad_obra_cod.descripcion >
            b.model_unidad_obra_cod.descripcion
              ? 1
              : b.model_unidad_obra_cod.descripcion >
                a.model_unidad_obra_cod.descripcion
              ? -1
              : 0
          )
          .map(
            value =>
              `${value.unidad_obra_cod} - ${value.model_unidad_obra_cod.descripcion}`
          );
        cy.get('#select-unidad-obra').click();
        cy.get(
          '#select-unidad-obra' +
            '>div>.p-dropdown-panel>div>ul>p-dropdownitem>li.p-ripple'
        ).each(($el, index, $list) => {
          expect($el.text()).eq(datos[index]);
        });
        cy.get('#select-unidad-obra').click();
      });
    });
  });

  describe('Testing comportamiento Selectores al comenzar a realizar cambios de selecciones', () => {
    it(
      'All selectors should be disabled except contrato and agencia if contrato changed',
      {
        retries: 2,
      },
      () => {
        cy._select_dropdown('#select-contrato_marco', 'SBE_2018');
        cy.get('#select-proveedor>div').should('have.class', 'p-disabled');
        cy.get('#select-actividad>div').should('have.class', 'p-disabled');
        cy.get('#select-tipo-servicio>div').should('have.class', 'p-disabled');
        cy.get('#select-servicio>div').should('have.class', 'p-disabled');
        cy.get('#select-unidad-obra>div').should('have.class', 'p-disabled');
        cy.get('#select-contrato_marco').click();
      }
    );

    it(
      'All selectors should be disabled except contrato, agencia andproveedor if agencia changed',
      {
        retries: 2,
      },
      () => {
        cy._select_dropdown('#select-contrato_marco', 'BUCLE');
        cy._select_dropdown('#select-agencia', 'APOQUINDO');
        cy._select_dropdown(
          '#select-proveedor',
          '330000659 - COBRA CHILE SERVICIOS S.A.'
        );
        cy._select_dropdown('#select-actividad', 'DISEÑO');
        cy._select_dropdown('#select-tipo-servicio', 'PROYECTOS');
        cy._select_dropdown(
          '#select-servicio',
          'D021 - DISEÑO DE RED INTERIOR RED DE F.O. (DITIFO)'
        );
        cy._select_dropdown('#select-unidad-obra', '0 - SIN UO');
        cy._select_dropdown('#select-agencia', 'PROVIDENCIA');
        cy.get('#select-actividad>div').should('have.class', 'p-disabled');
        cy.get('#select-tipo-servicio>div').should('have.class', 'p-disabled');
        cy.get('#select-servicio>div').should('have.class', 'p-disabled');
        cy.get('#select-unidad-obra>div').should('have.class', 'p-disabled');
      }
    );

    it('All selectors should be disabled except contrato, agencia , proveedor and actividad if proveedor changed', () => {
      cy._select_dropdown('#select-contrato_marco', 'SBE_2018');
      cy._select_dropdown(
        '#select-agencia',
        'Región Metropolitana de Santiago'
      );
      cy._select_dropdown(
        '#select-proveedor',
        '3300193078 - 2021-2023 MARJOS Y COMPAÑIA LIMITADA'
      );
      cy._select_dropdown('#select-actividad', 'INSTALACIONES EN MOVIL');
      cy._select_dropdown('#select-tipo-servicio', 'Adicionales');
      cy._select_dropdown(
        '#select-servicio',
        'ServMARJOS 625 - ADICIONAL-Acarreo con Animal para distancia mayor a 500 m_RM,V,VI,VII'
      );
      cy._select_dropdown('#select-unidad-obra', '0 - SIN UO');
      cy._select_dropdown(
        '#select-proveedor',
        '3300193077 - AJ INGENIEROS S.A'
      );
      cy.get('#select-tipo-servicio>div').should('have.class', 'p-disabled');
      cy.get('#select-servicio>div').should('have.class', 'p-disabled');
      cy.get('#select-unidad-obra>div').should('have.class', 'p-disabled');
    });

    it(
      'only tipo servicio, servicios y uo should be disabled if actividad changed',
      {
        retries: 2,
      },
      () => {
        cy._select_dropdown('#select-contrato_marco', 'BUCLE');
        cy._select_dropdown('#select-agencia', 'APOQUINDO');
        cy._select_dropdown(
          '#select-proveedor',
          '330000659 - COBRA CHILE SERVICIOS S.A.'
        );
        cy._select_dropdown('#select-actividad', 'DISTRIBUCION');
        cy._select_dropdown('#select-tipo-servicio', 'CABLES');
        cy._select_dropdown(
          '#select-servicio',
          'J679 - ATENCION DE ALARMAS DE PRESURIZACION. LOCALIZACION DE FUGAS EN VIA NEUMATICA SECUNDARIA.'
        );
        cy._select_dropdown('#select-unidad-obra', '0 - SIN UO');

        cy._select_dropdown('#select-actividad', 'ABANDONOS');
        cy.get('#select-servicio>div').should('have.class', 'p-disabled');
        cy.get('#select-unidad-obra>div').should('have.class', 'p-disabled');

        cy.get('input[name="input-nombre-cubicacion"]').click();
      }
    );

    it('only tipo servicios y uo should be disabled if actividad changed', () => {
      cy._select_dropdown('#select-actividad', 'DISTRIBUCION');
      cy._select_dropdown('#select-tipo-servicio', 'CABLES');
      cy._select_dropdown(
        '#select-servicio',
        'J679 - ATENCION DE ALARMAS DE PRESURIZACION. LOCALIZACION DE FUGAS EN VIA NEUMATICA SECUNDARIA.'
      );
      cy._select_dropdown('#select-unidad-obra', '0 - SIN UO');

      cy._select_dropdown('#select-tipo-servicio', 'DTH');
      cy.get('#select-unidad-obra>div').should('have.class', 'p-disabled');
    });
  });

  describe('Tabla carrito', () => {
    it('ingresar', () => {
      cy.viewport(1500, 1700);
      cy.visit('http://localhost:4206/login/auth');
      cy._login('mgestor1', 'asdasd');
      cy._select_profile('Gestor/JP');
      cy.get('button[id="navbar-create-cub"]').click();
    });

    it('El botón agregar servicio debería habilitarse solo si tiene todos los campos requeridos', () => {
      cy.get('#agregar-button').should('be.disabled');

      // RELLENAR EL FORMULARIO PARA AGREGAR UN SERVICIO

      // SELECT
      cy._select_dropdown('#select-contrato_marco', 'BUCLE');
      cy._select_dropdown('#select-agencia', 'APOQUINDO');
      cy._select_dropdown(
        '#select-proveedor',
        '330000659 - COBRA CHILE SERVICIOS S.A.'
      );
      cy.get('#agregar-button').should('be.disabled');
      cy._select_dropdown('#select-actividad', 'DISTRIBUCION');

      cy.get('#agregar-button').should('be.disabled');
      cy._select_dropdown('#select-tipo-servicio', 'CABLES');

      cy.get('#agregar-button').should('be.disabled');
      cy._select_dropdown(
        '#select-servicio',
        'J679 - ATENCION DE ALARMAS DE PRESURIZACION. LOCALIZACION DE FUGAS EN VIA NEUMATICA SECUNDARIA.'
      );

      cy.get('#agregar-button').should('be.disabled');
      cy._select_dropdown('#select-unidad-obra', '0 - SIN UO');

      cy.get('#agregar-button').should('be.enabled');
    });

    // TODO: REVISAR PORQUE FALLA
    // it('El botón agregar servicio debería bloquearse mientras se agrega un servicio y Debería desplegar el mensaje "El servicio ya fue agregado a la cubicación" cuando el usuario ingrese el mismo servicio 2 veces', () => {
    //   cy.intercept('POST', '/cubicacion/datos_unidad_obra_material/get').as(
    //     'HTTPRESPONSE-DATA-SERVICE'
    //   );
    //   cy.get('#agregar-button').click();
    //   cy.get('#agregar-button').should('be.disabled');
    //   cy.wait(0);
    //   cy.wait('@HTTPRESPONSE-DATA-SERVICE').then(() => {
    //     cy.wait(0);
    //     cy.get('#agregar-button').click();
    //     cy.get(
    //       '#alert-sevicio-existente>p-message>div>span.p-inline-message-text'
    //     ).contains('El servicio ya fue agregado a la cubicación');
    //   });
    // });

    it('El mensaje de alerta debería desaparecer si cambio de actividad', () => {
      cy._select_dropdown(
        '#select-servicio',
        'J912 - ABRIR EMPALME COM. TIPO MECANICO TTRC O EFA'
      );
      cy.get(
        '#alert-sevicio-existente>p-message>div>span.p-inline-message-text'
      ).should('not.exist');
    });

    it('should add service and displayed into carrito', () => {
      cy.viewport(1500, 1700);
      cy.visit('http://localhost:4206/login/auth');
      cy._login('mgestor1', 'asdasd');
      cy._select_profile('Gestor/JP');
      cy.get('button[id="navbar-create-cub"]').click();

      // VALIDAR MONTOS
      cy.get('td[class="total-servicio-monto"]').contains('$0');
      cy.get('td[class="total-uo-monto"]').contains('$0');
      cy.get('td[class="total-cubicacion-monto"]').contains('$0');

      // SELECT

      // REVISAR AGREGANDO UN SERVICIO J101 CON 2 UNIDADES DE OBRA
      cy._select_dropdown('#select-contrato_marco', 'BUCLE');
      cy._select_dropdown('#select-agencia', 'APOQUINDO');
      cy._select_dropdown(
        '#select-proveedor',
        '330000659 - COBRA CHILE SERVICIOS S.A.'
      );
      cy._select_dropdown('#select-actividad', 'MATRIZ');
      cy._select_dropdown('#select-tipo-servicio', 'LINEAS');

      cy._select_dropdown(
        '#select-servicio',
        'J101 - INSTALAR CABLE EN CANALIZACION GRUPOS A Y B'
      );
      cy._select_dropdown('#select-unidad-obra', 'C048 - CABLE 900-26 SUB');

      cy.get('input[name="input-nombre-cubicacion"]').click();
      cy.get('#agregar-button').click();

      // TODO: VER PQ FALLA EN PIPELINE
      // cy.wait('@HTTPRESPONSE-UNIDAD-OBRA-DETALLE').then(() => {
      //   let data_service: DATA_TABLE_SERVICE_UO = {
      //     fila: 1,
      //     servicio: 'J101 - INSTALAR CABLE EN CANALIZACION GRUPOS A Y B',
      //     tipo_servicio: 'Lineas',
      //     cantidad_servicio: 1.0,
      //     precio: '$471,6',
      //     total: '$471,6',
      //     uo: 'C048 - CABLE 900-26 SUB',
      //     actividad: 'Matriz',
      //     uo_precio: '$0',
      //     cantidad_uo: 1,
      //     uo_total: '$0',
      //   };
      //   cy._check_table_cub_service_uo(data_service);
      // });

      // VALIDAR MONTOS
      cy.get('td[class="total-servicio-monto"]').contains('$471,6');
      cy.get('td[class="total-uo-monto"]').contains('$0');
      cy.get('td[class="total-cubicacion-monto"]').contains('$471,6');

      cy._select_dropdown('#select-unidad-obra', 'C926 - CABLE 1800-26 PS');
      cy.get('input[name="input-nombre-cubicacion"]').click();
      cy.get('#agregar-button').click();
      // TODO: VER PQ FALLA EN PIPELINE

      // cy.wait('@HTTPRESPONSE-UNIDAD-OBRA-DETALLE').then(() => {
      //   const data_uo: DATA_TABLE_UO = {
      //     fila: 2,
      //     uo: 'C926 - CABLE 1800-26 PS',
      //     actividad: 'Matriz',
      //     uo_precio: '$0',
      //     cantidad_uo: 1,
      //     uo_total: '$0',
      //   };
      //   cy._check_table_cub_uo(data_uo);
      // });

      // VALIDAR MONTOS
      cy.get('td[class="total-servicio-monto"]').contains('$471,6');
      cy.get('td[class="total-uo-monto"]').contains('$0');
      cy.get('td[class="total-cubicacion-monto"]').contains('$471,6');

      // AGREGAR OTRO SERVICIO MATRIZ CABLES J451 CON UNA UO
      cy._select_dropdown('#select-tipo-servicio', 'CABLES');
      cy._select_dropdown(
        '#select-servicio',
        'J451 - EMPALME DE UN PAR (CON CONECTOR INDIVIDUAL O DERIVADO)'
      );
      cy._select_dropdown(
        '#select-unidad-obra',
        'D013 - CONECTOR ROJO CAL.24-19'
      );

      cy.get('input[name="input-nombre-cubicacion"]').click();
      cy.get('#agregar-button').click();

      // TODO: VER PQ FALLA EN PIPELINE

      // cy.wait('@HTTPRESPONSE-UNIDAD-OBRA-DETALLE').then(() => {
      //   const data_service: DATA_TABLE_SERVICE_UO = {
      //     fila: 3,
      //     servicio:
      //       'J451 - EMPALME DE UN PAR (CON CONECTOR INDIVIDUAL O DERIVADO)',
      //     tipo_servicio: 'Cables',
      //     cantidad_servicio: 1,
      //     precio: '$180,32',
      //     total: '$180,32',
      //     uo: 'D013 - CONECTOR ROJO CAL.24-19',
      //     actividad: 'Matriz',
      //     uo_precio: '$56,8',
      //     cantidad_uo: 1,
      //     uo_total: '$56,8',
      //   };
      //   cy._check_table_cub_service_uo(data_service);
      // });
      // VALIDAR MONTOS
      cy.get('td[class="total-servicio-monto"]').contains('$651,92');
      cy.get('td[class="total-uo-monto"]').contains('$56,8');
      cy.get('td[class="total-cubicacion-monto"]').contains('$708,72');

      // MODIFICAR LA CANTIDAD DEL SERVICIO J101
      cy.get(
        '.carrito-container> table > tbody > tr:nth-child(1) > td:nth-child(4)>div>p-inputnumber>span>input'
      )
        .clear()
        .type('{del}4,53{enter}');

      // TODO: VER PQ FALLA EN PIPELINE

      // let data_service = {
      //   fila: 1,
      //   servicio: 'J101 - INSTALAR CABLE EN CANALIZACION GRUPOS A Y B',
      //   tipo_servicio: 'Lineas',
      //   cantidad_servicio: 4.53,
      //   precio: '$471,6',
      //   total: '$2.136,35',
      //   uo: 'C048 - CABLE 900-26 SUB',
      //   actividad: 'Matriz',
      //   uo_precio: '$0',
      //   cantidad_uo: 1,
      //   uo_total: '$0',
      // };
      // cy._check_table_cub_service_uo(data_service);

      // VALIDAR MONTOS
      cy.get('td[class="total-servicio-monto"]').contains('$2.316,67');
      cy.get('td[class="total-uo-monto"]').contains('$56,8');
      cy.get('td[class="total-cubicacion-monto"]').contains('$2.373,47');

      // MODIFICAR LA CANTIDAD DE LA UO D013
      cy.get(
        '.carrito-container> table > tbody > tr:nth-child(3) > td:nth-child(11)>div>p-inputnumber>span>input'
      )
        .clear()
        .type('{del}5,24{enter}');
      // TODO: VER PQ FALLA EN PIPELINE

      // data_service = {
      //   fila: 3,
      //   servicio: 'J451 - EMPALME DE UN PAR (CON CONECTOR INDIVIDUAL O DERIVADO)',
      //   tipo_servicio: 'Cables',
      //   cantidad_servicio: 1,
      //   precio: '$180,32',
      //   total: '$180,32',
      //   uo: 'D013 - CONECTOR ROJO CAL.24-19',
      //   actividad: 'Matriz',
      //   uo_precio: '$56,8',
      //   cantidad_uo: 5.24,
      //   uo_total: '$297,63',
      // };
      // cy._check_table_cub_service_uo(data_service);

      // VALIDAR MONTOS
      cy.get('td[class="total-servicio-monto"]').contains('$2.316,67');
      cy.get('td[class="total-uo-monto"]').contains('$297,63');
      cy.get('td[class="total-cubicacion-monto"]').contains('$2.614,3');
    });

    it('delete items carrito', () => {
      cy.get(
        '.carrito-container> table > tbody > tr:nth-child(2) > td:nth-child(7)>button'
      ).click();
      cy.get(
        '.carrito-container> table > tbody > tr:nth-child(1) > td:nth-child(7)>button'
      ).click();

      // TODO: VER PQ FALLA EN PIPELINE

      // let data_service = {
      //   fila: 1,
      //   servicio: 'J451 - EMPALME DE UN PAR (CON CONECTOR INDIVIDUAL O DERIVADO)',
      //   tipo_servicio: 'Cables',
      //   cantidad_servicio: 1,
      //   precio: '$180,32',
      //   total: '$180,32',
      //   uo: 'D013 - CONECTOR ROJO CAL.24-19',
      //   actividad: 'Matriz',
      //   uo_precio: '$56,8',
      //   cantidad_uo: 5.24,
      //   uo_total: '$297,63',
      // };
      // cy._check_table_cub_service_uo(data_service);

      // VALIDAR MONTOS
      cy.get('td[class="total-servicio-monto"]').contains('$180,32');
      cy.get('td[class="total-uo-monto"]').contains('$297,63');
      cy.get('td[class="total-cubicacion-monto"]').contains('$477,95');
    });
  });

  describe('Excepcion crear cubicación sin contratos asignado', () => {
    beforeEach(() => {
      cy.visit('http://localhost:4206/login/auth');
      cy._login('mtestsincontratos', 'asdasd');
      cy._select_profile('Gestor/JP');
      cy.get('button[id="navbar-create-cub"]').click();
    });

    it('should display message "No tiene contratos asignados. Favor contactar con el administrador del sistema" ', () => {
      cy.get('.snackbar-container').should('exist');
    });
  });
});
