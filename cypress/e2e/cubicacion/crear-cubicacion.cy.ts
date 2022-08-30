import {
  tipoCubicacionMOCK200OK,
  getAgenciasContratoMOCK200OK2,
  ContratosUsuarioMOCK200OK,
  getProveedoresAgenciaContratoMOCK200OK2,
  getActividadesContratoProveedorMOCK200ok,
  getAgenciasContratoMOCK200OK,
  getProveedoresAgenciaContratoMOCK200OK,
  getTipoServiciosContratoMOCK200ok,
  ServiciosAgenciaContratoProveedorMOCK200OK,
  UnidadObraServicioMOCK200OK,
} from '../../../src/mocks';

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

beforeEach(() => {
  cy.viewport(1500, 1700);
});

it('should let enter to create cubicacion', () => {
  cy.visit('http://localhost:4206/login/auth');
  cy._login('mgestor1', 'asdasd');
  cy._select_profile('Gestor/JP');
  cy.get('#crear-cubicacion-sidebar').click();
});

describe.skip('Test responsive', () => {});

describe('Visubilidad e Interacción Incial', () => {
  describe('Visibilidad', () => {
    it('should display name cubicacion input enabled', () => {
      cy.get('input[name="input-nombre-cubicacion"]').should('be.enabled');
    });

    it('should display tipo cubicacion enabled', () => {
      cy.get('#select-tipo-cubicacion>div').should(
        'not.have.class',
        'p-disabled'
      );
    });

    it('should display Contrato Marco enabled', () => {
      cy.get('#select-contrato_marco>div').should(
        'not.have.class',
        'p-disabled'
      );
    });

    it('should display Agencia disabled', () => {
      cy.get('#select-agencia>div').should('have.class', 'p-disabled');
    });

    it('should display Proveedor disabled', () => {
      cy.get('#select-proveedor>div').should('have.class', 'p-disabled');
    });

    it('should display Actividad disabled', () => {
      cy.get('#select-actividad>div').should('have.class', 'p-disabled');
    });

    it('should display Tipo Servicio disabled', () => {
      cy.get('#select-tipo-servicio>div').should('have.class', 'p-disabled');
    });

    it('should display Servicio disabled', () => {
      cy.get('#select-servicio>div').should('have.class', 'p-disabled');
    });

    it('should display Unidad Obra disabled', () => {
      cy.get('#select-unidad-obra>div').should('have.class', 'p-disabled');
    });
  });

  describe('Interacción', () => {
    it('should display name cubicacion input text', () => {
      cy._check_input('input[name="input-nombre-cubicacion"]', 'required');
    });

    describe('Tipo Cubicacion Dropdown', (name = 'Tipo Cubicaion') => {
      it(`should display dropdown ${name} as required`, () => {
        cy._check_dropdown_required('#select-tipo-cubicacion');
      });

      it(`dropdown ${name} should display data`, () => {
        let datos = tipoCubicacionMOCK200OK.data.items
          .sort((a, b) =>
            a.descripcion > b.descripcion
              ? 1
              : b.descripcion > a.descripcion
              ? -1
              : 0
          )
          .map(value => value.descripcion);
        cy.get('#select-tipo-cubicacion').click();
        cy.get('li.p-ripple').each(($el, index, $list) => {
          expect($el.text()).eq(datos[index]);
        });
        cy.get('#select-tipo-cubicacion').click();
      });
    });

    describe('Contrato Marco Dropdown', (name = 'Contrato Marco') => {
      let selector = '#select-contrato_marco';

      it(`should display dropdown ${name} as required`, () => {
        cy._check_dropdown_required(selector);
      });

      it(`dropdown ${name} should display data`, () => {
        let datos = ContratosUsuarioMOCK200OK.data.items
          .sort((a, b) =>
            a.model_contrato_id.nombre > b.model_contrato_id.nombre
              ? 1
              : b.model_contrato_id.nombre > a.model_contrato_id.nombre
              ? -1
              : 0
          )
          .map(value => value.model_contrato_id.nombre);
        cy.get(selector).click();
        cy.get('li.p-ripple').each(($el, index, $list) => {
          expect($el.text()).eq(datos[index]);
        });
        cy.get(selector).click();
      });
    });
  });
});

describe('Testing comportamiento sección descripcion dependiendo del contrato', () => {
  it(`should display dirección inputs for bucle contract`, () => {
    cy.get('#select-contrato_marco')
      .click()
      .contains('ul li > span', 'BUCLE')
      .click();

    cy._check_input('input[name="input-direccion-desde"]', 'required');
    cy._check_input('input[name="input-altura-desde"]', 'required');
    cy._check_input('input[name="input-direccion-hasta"]', 'required');
    cy._check_input('input[name="input-altura-hasta"]', 'required');
  });

  it('should not display dirección inputs for contracts doent bucle', () => {
    cy.get('#select-contrato_marco')
      .click()
      .contains('ul li > span', 'CONTRATO_ORDINARIO')
      .click();
    cy.get('input[name="input-nombre-cubicacion"]').click();

    cy.get('input[name="input-direccion-desde"]').should('not.exist');
    cy.get('input[name="input-altura-desde"]').should('not.exist');
    cy.get('input[name="input-direccion-hasta"]').should('not.exist');
    cy.get('input[name="input-altura-hasta"]').should('not.exist');
    // cy.get('#select-contrato_marco')
    //   .click()
    //   .contains('ul li > span', 'UNIFICADO_FIJA')
    //   .click();

    // cy.get('input[name="input-direccion-desde"]').should('not.exist');
    // cy.get('input[name="input-altura-desde"]').should('not.exist');
    // cy.get('input[name="input-direccion-hasta"]').should('not.exist');
    // cy.get('input[name="input-altura-hasta"]').should('not.exist');
    // cy.get('#select-contrato_marco')
    //   .click()
    //   .contains('ul li > span', 'UNIFICADO_MOVIL')
    //   .click();
    // cy.get('input[name="input-direccion-desde"]').should('not.exist');
    // cy.get('input[name="input-altura-desde"]').should('not.exist');
    // cy.get('input[name="input-direccion-hasta"]').should('not.exist');
    // cy.get('input[name="input-altura-hasta"]').should('not.exist');
    // cy.get('#select-contrato_marco').click();
  });
});

describe('Testing comportamiento  de dropdown en una selección inicial', () => {
  describe('Agencia', (name = 'Agencia') => {
    let selector = '#select-agencia';

    it(`should display dropdown ${name} as required`, () => {
      cy.intercept('POST', '	/cubicacion/agencias_from_contrato/get').as(
        'HTTPRESPONSE-AGENCIA'
      );
      cy.get('#select-contrato_marco')
        .click()
        .contains('ul li > span', 'BUCLE')
        .click();
      cy.wait('@HTTPRESPONSE-AGENCIA').then(() => {
        cy._check_dropdown_required(selector);
      });
    });

    it(`dropdown ${name} should display data`, () => {
      let datos = getAgenciasContratoMOCK200OK.data.items
        .sort((a, b) =>
          a.nombre > b.nombre ? 1 : b.nombre > a.nombre ? -1 : 0
        )
        .map(value => value.nombre);
      cy.get(selector).click();
      cy.get('li.p-ripple').each(($el, index, $list) => {
        expect($el.text()).eq(datos[index]);
      });
      cy.get(selector).click();
    });
  });

  describe('Proveedor', (name = 'Proveedor') => {
    let selector = '#select-proveedor';
    it(`should display dropdown ${name} as required`, () => {
      cy.intercept(
        'POST',
        '/cubicacion/proveedores_from_agencia_contrato/get'
      ).as('HTTPRESPONSE-PROVEEDORES');

      cy._select_dropdown('#select-agencia', 'APOQUINDO');

      cy.wait('@HTTPRESPONSE-PROVEEDORES').then(() => {
        cy._check_dropdown_required(selector);
      });
    });

    it(`dropdown ${name} should display data`, () => {
      let datos = getProveedoresAgenciaContratoMOCK200OK.data.items
        .sort((a, b) =>
          a.nombre > b.nombre ? 1 : b.nombre > a.nombre ? -1 : 0
        )
        .map(value => `${value.codigo_acuerdo} - ${value.nombre}`);
      cy.get(selector).click();
      cy.get('li.p-ripple').each(($el, index, $list) => {
        expect($el.text()).eq(datos[index]);
      });
      cy.get(selector).click();
    });
  });

  describe('Actividad', (name = 'Actividad') => {
    let selector = '#select-actividad';
    it(`should display dropdown ${name} as required`, () => {
      cy.intercept(
        'POST',
        '/cubicacion/actividad_from_cmarco_has_proveedor/get'
      ).as('HTTPRESPONSE-ACTIVIDAD');
      cy._select_dropdown(
        '#select-proveedor',
        '330000659 - COBRA CHILE SERVICIOS S.A.'
      );
      cy.wait('@HTTPRESPONSE-ACTIVIDAD').then(() => {
        cy._check_dropdown_required(selector);
      });
    });

    it(`dropdown ${name} should display data`, () => {
      let datos = getActividadesContratoProveedorMOCK200ok.data.items
        .sort((a, b) =>
          a.descripcion > b.descripcion
            ? 1
            : b.descripcion > a.descripcion
            ? -1
            : 0
        )
        .map(value => `${value.descripcion}`);
      cy.get(selector).click();
      cy.get(
        '#select-actividad>div>.p-dropdown-panel>div>ul>p-dropdownitem>li.p-ripple'
      ).each(($el, index, $list) => {
        expect($el.text()).eq(datos[index]);
      });
      cy.get(selector).click();
    });
  });

  describe('Tipo Servicio', (name = 'Tipo Servicio') => {
    let selector = '#select-tipo-servicio';
    it(`should display dropdown ${name} as required`, () => {
      cy.intercept('POST', '/cubicacion/tipo_servicio/get').as(
        'HTTPRESPONSE-TIPO-SERVICIO'
      );
      cy._select_dropdown('#select-actividad', 'DISEÑO');
      cy.wait('@HTTPRESPONSE-TIPO-SERVICIO').then(() => {
        cy._check_dropdown_required(selector);
      });
    });

    it(`dropdown ${name} should display data`, () => {
      let datos = getTipoServiciosContratoMOCK200ok.data.items
        .sort((a, b) =>
          a.descripcion > b.descripcion
            ? 1
            : b.descripcion > a.descripcion
            ? -1
            : 0
        )
        .map(value => `${value.descripcion}`);
      cy.get(selector).click();
      cy.get(
        selector + '>div>.p-dropdown-panel>div>ul>p-dropdownitem>li.p-ripple'
      ).each(($el, index, $list) => {
        expect($el.text()).eq(datos[index]);
      });
      cy.get(selector).click();
    });
  });

  describe('Servicios', (name = 'Servicios') => {
    let selector = '#select-servicio';
    it(`should display dropdown ${name} as required`, () => {
      cy.intercept('POST', 'cubicacion/combo_servicios/get').as(
        'HTTPRESPONSE-SERVICIO'
      );
      cy._select_dropdown('#select-tipo-servicio', 'PROYECTOS');
      cy.wait('@HTTPRESPONSE-SERVICIO').then(() => {
        cy.get(selector).click();
        cy.get(selector).click();
        cy._check_dropdown_required(selector);
      });
    });

    it(`dropdown ${name} should display data`, () => {
      let datos = ServiciosAgenciaContratoProveedorMOCK200OK.data.items
        .sort((a, b) =>
          a.descripcion > b.descripcion
            ? 1
            : b.descripcion > a.descripcion
            ? -1
            : 0
        )
        .map(value => `${value.numero_producto} - ${value.descripcion}`);
      cy.get(selector).click();
      cy.get(
        selector + '>div>.p-dropdown-panel>div>ul>p-dropdownitem>li.p-ripple'
      ).each(($el, index, $list) => {
        expect($el.text()).eq(datos[index]);
      });
      cy.get(selector).click();
    });
  });

  describe('Unidad de Obra', (name = 'Unidad de obra') => {
    let selector = '#select-unidad-obra';
    it(`should display dropdown ${name} as required`, () => {
      cy.intercept('POST', '/cubicacion/unidades_obra_from_servicio/get').as(
        'HTTPRESPONSE-UNIDAD-OBRA'
      );
      cy._select_dropdown(
        '#select-servicio',
        'D021 - DISEÑO DE RED INTERIOR RED DE F.O. (DITIFO)'
      );
      cy.wait('@HTTPRESPONSE-UNIDAD-OBRA').then(() => {
        cy.get(selector).click();
        cy.get(selector).click();
        cy._check_dropdown_required(selector);
      });
    });

    it(`dropdown ${name} should display data`, () => {
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
      cy.get(selector).click();
      cy.get(
        selector + '>div>.p-dropdown-panel>div>ul>p-dropdownitem>li.p-ripple'
      ).each(($el, index, $list) => {
        expect($el.text()).eq(datos[index]);
      });
      cy.get(selector).click();
    });
  });
});

describe('Testing comportamiento Selectores al comenzar a realizar cambios de selecciones', () => {
  it('All selectors should be disabled except contrato and agencia if contrato changed', () => {
    cy._select_dropdown('#select-contrato_marco', 'SBE_2018');
    cy.get('#select-proveedor>div').should('have.class', 'p-disabled');
    cy.get('#select-actividad>div').should('have.class', 'p-disabled');
    cy.get('#select-tipo-servicio>div').should('have.class', 'p-disabled');
    cy.get('#select-servicio>div').should('have.class', 'p-disabled');
    cy.get('#select-unidad-obra>div').should('have.class', 'p-disabled');
    cy.get('#select-contrato_marco').click();
  });

  it('All selectors should be disabled except contrato, agencia andproveedor if agencia changed', () => {
    cy.intercept('POST', '/cubicacion/agencias_from_contrato/get').as(
      'HTTPRESPONSE-AGENCIA'
    );
    cy.intercept(
      'POST',
      '/cubicacion/proveedores_from_agencia_contrato/get'
    ).as('HTTPRESPONSE-PROVEEDORES');

    cy.intercept(
      'POST',
      '/cubicacion/actividad_from_cmarco_has_proveedor/get'
    ).as('HTTPRESPONSE-ACTIVIDAD');

    cy.intercept('POST', '/cubicacion/tipo_servicio/get').as(
      'HTTPRESPONSE-TIPO-SERVICIO'
    );

    cy.intercept('POST', 'cubicacion/combo_servicios/get').as(
      'HTTPRESPONSE-SERVICIO'
    );

    cy.intercept('POST', '/cubicacion/unidades_obra_from_servicio/get').as(
      'HTTPRESPONSE-UNIDAD-OBRA'
    );

    cy._select_dropdown('#select-contrato_marco', 'BUCLE');
    cy.wait('@HTTPRESPONSE-AGENCIA').then(() => {
      cy._select_dropdown('#select-agencia', 'APOQUINDO');
    });
    cy.wait('@HTTPRESPONSE-PROVEEDORES').then(() => {
      cy._select_dropdown(
        '#select-proveedor',
        '330000659 - COBRA CHILE SERVICIOS S.A.'
      );
    });
    cy.wait('@HTTPRESPONSE-ACTIVIDAD').then(() => {
      cy._select_dropdown('#select-actividad', 'DISEÑO');
    });

    cy.wait('@HTTPRESPONSE-TIPO-SERVICIO').then(() => {
      cy._select_dropdown('#select-tipo-servicio', 'PROYECTOS');
    });

    cy.wait('@HTTPRESPONSE-SERVICIO').then(() => {
      cy._select_dropdown(
        '#select-servicio',
        'D021 - DISEÑO DE RED INTERIOR RED DE F.O. (DITIFO)'
      );
    });

    cy.wait('@HTTPRESPONSE-UNIDAD-OBRA').then(() => {
      cy._select_dropdown('#select-unidad-obra', '0 - SIN UO');
    });

    cy._select_dropdown('#select-agencia', 'PROVIDENCIA');
    cy.get('#select-actividad>div').should('have.class', 'p-disabled');
    cy.get('#select-tipo-servicio>div').should('have.class', 'p-disabled');
    cy.get('#select-servicio>div').should('have.class', 'p-disabled');
    cy.get('#select-unidad-obra>div').should('have.class', 'p-disabled');
  });

  it('All selectors should be disabled except contrato, agencia , proveedor and actividad if proveedor changed', () => {
    cy.intercept('POST', '/cubicacion/agencias_from_contrato/get').as(
      'HTTPRESPONSE-AGENCIA'
    );
    cy.intercept(
      'POST',
      '/cubicacion/proveedores_from_agencia_contrato/get'
    ).as('HTTPRESPONSE-PROVEEDORES');

    cy.intercept(
      'POST',
      '/cubicacion/actividad_from_cmarco_has_proveedor/get'
    ).as('HTTPRESPONSE-ACTIVIDAD');

    cy.intercept('POST', '/cubicacion/tipo_servicio/get').as(
      'HTTPRESPONSE-TIPO-SERVICIO'
    );

    cy.intercept('POST', 'cubicacion/combo_servicios/get').as(
      'HTTPRESPONSE-SERVICIO'
    );

    cy.intercept('POST', '/cubicacion/unidades_obra_from_servicio/get').as(
      'HTTPRESPONSE-UNIDAD-OBRA'
    );

    cy._select_dropdown('#select-contrato_marco', 'SBE_2018');
    cy.wait('@HTTPRESPONSE-AGENCIA').then(() => {
      cy._select_dropdown(
        '#select-agencia',
        'Región Metropolitana de Santiago'
      );
    });
    cy.wait('@HTTPRESPONSE-PROVEEDORES').then(() => {
      cy._select_dropdown(
        '#select-proveedor',
        '3300193078 - 2021-2023 MARJOS Y COMPAÑIA LIMITADA'
      );
    });
    cy.wait('@HTTPRESPONSE-ACTIVIDAD').then(() => {
      cy._select_dropdown('#select-actividad', 'INSTALACIONES EN MOVIL');
    });

    cy.wait('@HTTPRESPONSE-TIPO-SERVICIO').then(() => {
      cy._select_dropdown('#select-tipo-servicio', 'Adicionales');
    });

    cy.wait('@HTTPRESPONSE-SERVICIO').then(() => {
      cy._select_dropdown(
        '#select-servicio',
        'ServMARJOS 625 - ADICIONAL-Acarreo con Animal para distancia mayor a 500 m_RM,V,VI,VII'
      );
    });

    cy.wait('@HTTPRESPONSE-UNIDAD-OBRA').then(() => {
      cy._select_dropdown('#select-unidad-obra', '0 - SIN UO');
    });

    cy._select_dropdown('#select-proveedor', '3300193077 - AJ INGENIEROS S.A');
    cy.get('#select-tipo-servicio>div').should('have.class', 'p-disabled');
    cy.get('#select-servicio>div').should('have.class', 'p-disabled');
    cy.get('#select-unidad-obra>div').should('have.class', 'p-disabled');
  });

  it('only tipo servicio, servicios y uo should be disabled if actividad changed', () => {
    cy.intercept('POST', '/cubicacion/agencias_from_contrato/get').as(
      'HTTPRESPONSE-AGENCIA'
    );
    cy.intercept(
      'POST',
      '/cubicacion/proveedores_from_agencia_contrato/get'
    ).as('HTTPRESPONSE-PROVEEDORES');

    cy.intercept(
      'POST',
      '/cubicacion/actividad_from_cmarco_has_proveedor/get'
    ).as('HTTPRESPONSE-ACTIVIDAD');

    cy.intercept('POST', '/cubicacion/tipo_servicio/get').as(
      'HTTPRESPONSE-TIPO-SERVICIO'
    );

    cy.intercept('POST', 'cubicacion/combo_servicios/get').as(
      'HTTPRESPONSE-SERVICIO'
    );

    cy.intercept('POST', '/cubicacion/unidades_obra_from_servicio/get').as(
      'HTTPRESPONSE-UNIDAD-OBRA'
    );

    cy._select_dropdown('#select-contrato_marco', 'BUCLE');
    cy.wait('@HTTPRESPONSE-AGENCIA').then(() => {
      cy._select_dropdown('#select-agencia', 'APOQUINDO');
    });
    cy.wait('@HTTPRESPONSE-PROVEEDORES').then(() => {
      cy._select_dropdown(
        '#select-proveedor',
        '330000659 - COBRA CHILE SERVICIOS S.A.'
      );
    });
    cy.wait('@HTTPRESPONSE-ACTIVIDAD').then(() => {
      cy._select_dropdown('#select-actividad', 'DISTRIBUCION');
    });

    cy.wait('@HTTPRESPONSE-TIPO-SERVICIO').then(() => {
      cy._select_dropdown('#select-tipo-servicio', 'CABLES');
    });

    cy.wait('@HTTPRESPONSE-SERVICIO').then(() => {
      cy._select_dropdown(
        '#select-servicio',
        'J679 - ATENCION DE ALARMAS DE PRESURIZACION. LOCALIZACION DE FUGAS EN VIA NEUMATICA SECUNDARIA.'
      );
    });

    cy.wait('@HTTPRESPONSE-UNIDAD-OBRA').then(() => {
      cy._select_dropdown('#select-unidad-obra', '0 - SIN UO');
    });

    cy._select_dropdown('#select-actividad', 'ABANDONOS');
    cy.get('#select-servicio>div').should('have.class', 'p-disabled');
    cy.get('#select-unidad-obra>div').should('have.class', 'p-disabled');

    cy.get('input[name="input-nombre-cubicacion"]').click();
  });

  it('only tipo servicios y uo should be disabled if actividad changed', () => {
    cy.intercept('POST', '/cubicacion/agencias_from_contrato/get').as(
      'HTTPRESPONSE-AGENCIA'
    );
    cy.intercept(
      'POST',
      '/cubicacion/proveedores_from_agencia_contrato/get'
    ).as('HTTPRESPONSE-PROVEEDORES');

    cy.intercept(
      'POST',
      '/cubicacion/actividad_from_cmarco_has_proveedor/get'
    ).as('HTTPRESPONSE-ACTIVIDAD');

    cy.intercept('POST', '/cubicacion/tipo_servicio/get').as(
      'HTTPRESPONSE-TIPO-SERVICIO'
    );

    cy.intercept('POST', 'cubicacion/combo_servicios/get').as(
      'HTTPRESPONSE-SERVICIO'
    );

    cy.intercept('POST', '/cubicacion/unidades_obra_from_servicio/get').as(
      'HTTPRESPONSE-UNIDAD-OBRA'
    );

    cy._select_dropdown('#select-actividad', 'DISTRIBUCION');

    cy.wait('@HTTPRESPONSE-TIPO-SERVICIO').then(() => {
      cy._select_dropdown('#select-tipo-servicio', 'CABLES');
    });

    cy.wait('@HTTPRESPONSE-SERVICIO').then(() => {
      cy._select_dropdown(
        '#select-servicio',
        'J679 - ATENCION DE ALARMAS DE PRESURIZACION. LOCALIZACION DE FUGAS EN VIA NEUMATICA SECUNDARIA.'
      );
    });

    cy.wait('@HTTPRESPONSE-UNIDAD-OBRA').then(() => {
      cy._select_dropdown('#select-unidad-obra', '0 - SIN UO');
    });

    cy._select_dropdown('#select-tipo-servicio', 'DTH');
    cy.get('#select-servicio>div').should('have.class', 'p-disabled');
    cy.get('#select-unidad-obra>div').should('have.class', 'p-disabled');
  });
});

describe.only('Tabla carrito', () => {
  it('ingresar', () => {
    cy.visit('http://localhost:4206/login/auth');
    cy._login('mgestor1', 'asdasd');
    cy._select_profile('Gestor/JP');
    cy.get('#crear-cubicacion-sidebar').click();
  });

  it('El botón agregar servicio debería habilitarse solo si tiene todos los campos requeridos', () => {
    cy.get('#agregar-button').should('be.disabled');

    // RELLENAR EL FORMULARIO PARA AGREGAR UN SERVICIO
    cy.intercept('POST', '/cubicacion/agencias_from_contrato/get').as(
      'HTTPRESPONSE-AGENCIA'
    );
    cy.intercept(
      'POST',
      '/cubicacion/proveedores_from_agencia_contrato/get'
    ).as('HTTPRESPONSE-PROVEEDORES');

    cy.intercept(
      'POST',
      '/cubicacion/actividad_from_cmarco_has_proveedor/get'
    ).as('HTTPRESPONSE-ACTIVIDAD');

    cy.intercept('POST', '/cubicacion/tipo_servicio/get').as(
      'HTTPRESPONSE-TIPO-SERVICIO'
    );

    cy.intercept('POST', 'cubicacion/combo_servicios/get').as(
      'HTTPRESPONSE-SERVICIO'
    );

    cy.intercept('POST', '/cubicacion/unidades_obra_from_servicio/get').as(
      'HTTPRESPONSE-UNIDAD-OBRA'
    );

    // SELECT
    cy._select_dropdown('#select-contrato_marco', 'BUCLE');
    cy.wait('@HTTPRESPONSE-AGENCIA').then(() => {
      cy._select_dropdown('#select-agencia', 'APOQUINDO');
    });
    cy.wait('@HTTPRESPONSE-PROVEEDORES').then(() => {
      cy._select_dropdown(
        '#select-proveedor',
        '330000659 - COBRA CHILE SERVICIOS S.A.'
      );
    });
    cy.get('#agregar-button').should('be.disabled');
    cy.wait('@HTTPRESPONSE-ACTIVIDAD').then(() => {
      cy._select_dropdown('#select-actividad', 'DISTRIBUCION');
    });
    cy.get('#agregar-button').should('be.disabled');

    cy.wait('@HTTPRESPONSE-TIPO-SERVICIO').then(() => {
      cy._select_dropdown('#select-tipo-servicio', 'CABLES');
    });
    cy.get('#agregar-button').should('be.disabled');
    cy.wait('@HTTPRESPONSE-SERVICIO').then(() => {
      cy._select_dropdown(
        '#select-servicio',
        'J679 - ATENCION DE ALARMAS DE PRESURIZACION. LOCALIZACION DE FUGAS EN VIA NEUMATICA SECUNDARIA.'
      );
    });
    cy.get('#agregar-button').should('be.disabled');
    cy.wait('@HTTPRESPONSE-UNIDAD-OBRA').then(() => {
      cy._select_dropdown('#select-unidad-obra', '0 - SIN UO');
    });

    cy.get('#agregar-button').should('be.enabled');
  });

  it('El botón agregar servicio debería bloquearse mientras se agrega un servicio y Debería desplegar el mensaje "El servicio ya fue agregado a la cubicación" cuando el usuario ingrese el mismo servicio 2 veces', () => {
    cy.intercept('POST', '/cubicacion/datos_unidad_obra_material/get').as(
      'HTTPRESPONSE-DATA-SERVICE'
    );
    cy.get('#agregar-button').click();
    cy.get('#agregar-button').should('be.disabled');

    cy.wait('@HTTPRESPONSE-DATA-SERVICE').then(() => {
      cy.get('#agregar-button').click();
      cy.get(
        '#alert-sevicio-existente>p-message>div>span.p-inline-message-text'
      ).contains('El servicio ya fue agregado a la cubicación');
    });
  });

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
    cy.visit('http://localhost:4206/login/auth');
    cy._login('mgestor1', 'asdasd');
    cy._select_profile('Gestor/JP');
    cy.get('#crear-cubicacion-sidebar').click();

    cy.intercept('POST', '/cubicacion/agencias_from_contrato/get').as(
      'HTTPRESPONSE-AGENCIA'
    );
    cy.intercept(
      'POST',
      '/cubicacion/proveedores_from_agencia_contrato/get'
    ).as('HTTPRESPONSE-PROVEEDORES');

    cy.intercept(
      'POST',
      '/cubicacion/actividad_from_cmarco_has_proveedor/get'
    ).as('HTTPRESPONSE-ACTIVIDAD');

    cy.intercept('POST', '/cubicacion/tipo_servicio/get').as(
      'HTTPRESPONSE-TIPO-SERVICIO'
    );

    cy.intercept('POST', 'cubicacion/combo_servicios/get').as(
      'HTTPRESPONSE-SERVICIO'
    );

    cy.intercept('POST', '/cubicacion/unidades_obra_from_servicio/get').as(
      'HTTPRESPONSE-UNIDAD-OBRA'
    );

    cy.intercept('POST', '/cubicacion/datos_unidad_obra_material/get').as(
      'HTTPRESPONSE-UNIDAD-OBRA-DETALLE'
    );

    // SELECT

    // REVISAR AGREGANDO UN SERVICIO J101 CON 2 UNIDADES DE OBRA
    cy._select_dropdown('#select-contrato_marco', 'BUCLE');
    cy.wait('@HTTPRESPONSE-AGENCIA').then(() => {
      cy._select_dropdown('#select-agencia', 'APOQUINDO');
    });
    cy.wait('@HTTPRESPONSE-PROVEEDORES').then(() => {
      cy._select_dropdown(
        '#select-proveedor',
        '330000659 - COBRA CHILE SERVICIOS S.A.'
      );
    });
    cy.wait('@HTTPRESPONSE-ACTIVIDAD').then(() => {
      cy._select_dropdown('#select-actividad', 'MATRIZ');
    });

    cy.wait('@HTTPRESPONSE-TIPO-SERVICIO').then(() => {
      cy._select_dropdown('#select-tipo-servicio', 'LINEAS');
    });

    cy.wait('@HTTPRESPONSE-SERVICIO').then(() => {
      cy._select_dropdown(
        '#select-servicio',
        'J101 - INSTALAR CABLE EN CANALIZACION GRUPOS A Y B'
      );
    });

    cy.wait('@HTTPRESPONSE-UNIDAD-OBRA').then(() => {
      cy._select_dropdown('#select-unidad-obra', 'C048 - CABLE 900-26 SUB');
    });
    cy.get('input[name="input-nombre-cubicacion"]').click();
    cy.get('#agregar-button').click();

    cy.wait('@HTTPRESPONSE-UNIDAD-OBRA-DETALLE').then(() => {
      let data_service: DATA_TABLE_SERVICE_UO = {
        fila: 1,
        servicio: 'J101 - INSTALAR CABLE EN CANALIZACION GRUPOS A Y B',
        tipo_servicio: 'Lineas',
        cantidad_servicio: 1.0,
        precio: '$471,6',
        total: '$471,6',
        uo: 'C048 - CABLE 900-26 SUB',
        actividad: 'Matriz',
        uo_precio: '$0',
        cantidad_uo: 1,
        uo_total: '$0',
      };
      cy._check_table_cub_service_uo(data_service);
    });

    cy._select_dropdown('#select-unidad-obra', 'C926 - CABLE 1800-26 PS');
    cy.get('input[name="input-nombre-cubicacion"]').click();
    cy.get('#agregar-button').click();

    cy.wait('@HTTPRESPONSE-UNIDAD-OBRA-DETALLE').then(() => {
      const data_uo: DATA_TABLE_UO = {
        fila: 2,
        uo: 'C926 - CABLE 1800-26 PS',
        actividad: 'Matriz',
        uo_precio: '$0',
        cantidad_uo: 1,
        uo_total: '$0',
      };
      cy._check_table_cub_uo(data_uo);
    });

    // AGREGAR OTRO SERVICIO MATRIZ CABLES J451 CON UNA UO
    cy._select_dropdown('#select-tipo-servicio', 'CABLES');
    cy.wait('@HTTPRESPONSE-SERVICIO').then(() => {
      cy._select_dropdown(
        '#select-servicio',
        'J451 - EMPALME DE UN PAR (CON CONECTOR INDIVIDUAL O DERIVADO)'
      );
    });

    cy.wait('@HTTPRESPONSE-UNIDAD-OBRA').then(() => {
      cy._select_dropdown(
        '#select-unidad-obra',
        'D013 - CONECTOR ROJO CAL.24-19'
      );
    });
    cy.get('input[name="input-nombre-cubicacion"]').click();
    cy.get('#agregar-button').click();

    cy.wait('@HTTPRESPONSE-UNIDAD-OBRA-DETALLE').then(() => {
      const data_service: DATA_TABLE_SERVICE_UO = {
        fila: 3,
        servicio:
          'J451 - EMPALME DE UN PAR (CON CONECTOR INDIVIDUAL O DERIVADO)',
        tipo_servicio: 'Cables',
        cantidad_servicio: 1,
        precio: '$180,32',
        total: '$180,32',
        uo: 'D013 - CONECTOR ROJO CAL.24-19',
        actividad: 'Matriz',
        uo_precio: '$56,8',
        cantidad_uo: 1,
        uo_total: '$56,8',
      };
      cy._check_table_cub_service_uo(data_service);
    });

    // MODIFICAR LA CANTIDAD DEL SERVICIO J101
    cy.get(
      '.carrito-container> table > tbody > tr:nth-child(1) > td:nth-child(4)>p-inputnumber>span>input'
    )
      .clear()
      .type('{del}4.53{enter}');

    let data_service = {
      fila: 1,
      servicio: 'J101 - INSTALAR CABLE EN CANALIZACION GRUPOS A Y B',
      tipo_servicio: 'Lineas',
      cantidad_servicio: 4.53,
      precio: '$471,6',
      total: '$2.136,35',
      uo: 'C048 - CABLE 900-26 SUB',
      actividad: 'Matriz',
      uo_precio: '$0',
      cantidad_uo: 1,
      uo_total: '$0',
    };
    cy._check_table_cub_service_uo(data_service);

    // MODIFICAR LA CANTIDAD DE LA UO D013
    cy.get(
      '.carrito-container> table > tbody > tr:nth-child(3) > td:nth-child(11)>p-inputnumber>span>input'
    )
      .clear()
      .type('{del}5.24{enter}');
    data_service = {
      fila: 3,
      servicio: 'J451 - EMPALME DE UN PAR (CON CONECTOR INDIVIDUAL O DERIVADO)',
      tipo_servicio: 'Cables',
      cantidad_servicio: 1,
      precio: '$180,32',
      total: '$180,32',
      uo: 'D013 - CONECTOR ROJO CAL.24-19',
      actividad: 'Matriz',
      uo_precio: '$56,8',
      cantidad_uo: 5.24,
      uo_total: '$297,63',
    };
    cy._check_table_cub_service_uo(data_service);
  });

  it('delete items carrito', () => {
    cy.get(
      '.carrito-container> table > tbody > tr:nth-child(2) > td:nth-child(7)>button'
    ).click();
    cy.get(
      '.carrito-container> table > tbody > tr:nth-child(1) > td:nth-child(7)>button'
    ).click();

    let data_service = {
      fila: 1,
      servicio: 'J451 - EMPALME DE UN PAR (CON CONECTOR INDIVIDUAL O DERIVADO)',
      tipo_servicio: 'Cables',
      cantidad_servicio: 1,
      precio: '$180,32',
      total: '$180,32',
      uo: 'D013 - CONECTOR ROJO CAL.24-19',
      actividad: 'Matriz',
      uo_precio: '$56,8',
      cantidad_uo: 5.24,
      uo_total: '$297,63',
    };
    cy._check_table_cub_service_uo(data_service);
  });
});

describe('Excepcion crear cubicación sin contratos asignado', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4206/login/auth');
    cy._login('mtestsincontratos', 'asdasd');
    cy._select_profile('Gestor/JP');
    cy.get('#crear-cubicacion-sidebar').click();
  });

  it('should display message "No tiene contratos asignados. Favor contactar con el administrador del sistema" ', () => {
    cy.get('.snackbar-container').should('exist');
  });
});
