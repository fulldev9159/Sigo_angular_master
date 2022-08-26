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

    cy.get('input[name="input-direccion-desde"]').should('not.exist');
    cy.get('input[name="input-altura-desde"]').should('not.exist');
    cy.get('input[name="input-direccion-hasta"]').should('not.exist');
    cy.get('input[name="input-altura-hasta"]').should('not.exist');
    cy.get('#select-contrato_marco')
      .click()
      .contains('ul li > span', 'UNIFICADO_FIJA')
      .click();

    cy.get('input[name="input-direccion-desde"]').should('not.exist');
    cy.get('input[name="input-altura-desde"]').should('not.exist');
    cy.get('input[name="input-direccion-hasta"]').should('not.exist');
    cy.get('input[name="input-altura-hasta"]').should('not.exist');
    cy.get('#select-contrato_marco')
      .click()
      .contains('ul li > span', 'UNIFICADO_MOVIL')
      .click();
    cy.get('input[name="input-direccion-desde"]').should('not.exist');
    cy.get('input[name="input-altura-desde"]').should('not.exist');
    cy.get('input[name="input-direccion-hasta"]').should('not.exist');
    cy.get('input[name="input-altura-hasta"]').should('not.exist');
    cy.get('#select-contrato_marco').click();
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
      cy._select_dropdown('#select-unidad-obra', '0 - SIN UO');
      cy.get('#select-unidad-obra').click();
    });
  });
});

describe('Testing comportamiento Selectores al comenzar a realizar cambios de selecciones', () => {
  beforeEach(() => {
    cy._select_dropdown('#select-contrato_marco', 'SBE_2018');

    // INTERCEPTORS
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

    // // INICIALIZAR TESTS
    // cy.wait('@HTTPRESPONSE-AGENCIA').then(() => {
    //   cy._select_dropdown('#select-contrato_marco', 'BUCLE');
    // });
    // cy.wait('@HTTPRESPONSE-AGENCIA').then(() => {
    //   cy._select_dropdown('#select-agencia', 'APOQUINDO');
    // });
    // cy.wait('@HTTPRESPONSE-PROVEEDORES').then(() => {
    //   cy._select_dropdown(
    //     '#select-proveedor',
    //     '330000659 - COBRA CHILE SERVICIOS S.A.'
    //   );
    // });
    // cy.wait('@HTTPRESPONSE-ACTIVIDAD').then(() => {
    //   cy._select_dropdown('#select-actividad', 'DISEÑO');
    // });

    // cy.wait('@HTTPRESPONSE-TIPO-SERVICIO').then(() => {
    //   cy._select_dropdown('#select-tipo-servicio', 'PROYECTOS');
    // });

    // cy.wait('@HTTPRESPONSE-SERVICIO').then(() => {
    //   cy._select_dropdown(
    //     '#select-servicio',
    //     'D021 - DISEÑO DE RED INTERIOR RED DE F.O. (DITIFO)'
    //   );
    // });

    // cy.wait('@HTTPRESPONSE-UNIDAD-OBRA').then(() => {
    //   cy._select_dropdown('#select-servicio', '0 - SIN UO');
    // });
  });

  it('All selectors should be disabled except contrato and agencia if contrato changed', () => {
    // cy._select_dropdown('#select-contrato_marco', 'SBE_2018');
    cy.get('#select-proveedor>div').should('have.class', 'p-disabled');
    cy.get('#select-actividad>div').should('have.class', 'p-disabled');
    cy.get('#select-tipo-servicio>div').should('have.class', 'p-disabled');
    cy.get('#select-servicio>div').should('have.class', 'p-disabled');
    cy.get('#select-unidad-obra>div').should('have.class', 'p-disabled');
  });

  // it('All selectors should be disabled except contrato, agencia andproveedor if agencia changed', () => {
  //   cy._select_dropdown('#select-agencia', 'PROVIDENCIA');
  //   cy.get('#select-actividad>div').should('have.class', 'p-disabled');
  //   cy.get('#select-tipo-servicio>div').should('have.class', 'p-disabled');
  //   cy.get('#select-servicio>div').should('have.class', 'p-disabled');
  //   cy.get('#select-unidad-obra>div').should('have.class', 'p-disabled');
  // });
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
