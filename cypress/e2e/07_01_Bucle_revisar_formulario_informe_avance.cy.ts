import {
  getTipoServiciosContratoMOCK200ok,
  ServiciosAgenciaContratoProveedorMOCK200OK,
  UnidadObraServicioMOCK200OK,
} from '@mocksOT';
import {
  adicionalesBucle1,
  CubicacionEditada,
} from 'cypress/fixtures/testedCubicacionBUCLE';

describe('REVISAR FORMULARIO INFORME DE AVANCE', () => {
  it('Debe desplegar detalles de la cubicacion "Cubicacion Bucle"', () => {
    cy.intercept('POST', '/ot/informe_avance/detalle/get').as('HTTPRESPONSE');

    cy.visit('http://localhost:4206/login/auth');
    cy._login('cctrabajador1', 'asdasd');
    cy._select_profile('Trabajador EECC');
    cy.get('button[id="navbar-list-ot"]').click();
    cy.get('button[id="play-button"]').click();

    const data = CubicacionEditada;

    cy.wait('@HTTPRESPONSE').then(() => {
      data.items.forEach(servicio => {
        cy.get('.table-informe-avance>zwc-table-servicios>form>table')
          .contains('td', servicio.nombre.split('-')[0].trim())
          .siblings()
          .eq(0)
          .contains(servicio.nombre.split('-')[1].trim());

        // cy.get('.table-informe-avance>zwc-table-servicios>form>table')
        //   .contains('td', servicio.nombre.split('-')[0].trim())
        //   .siblings()
        //   .eq(1)
        //   .contains(servicio.tipo_servicio);

        cy.get('.table-informe-avance>zwc-table-servicios>form>table')
          .contains('td', servicio.nombre.split('-')[0].trim())
          .siblings()
          .eq(2)
          .find('p-inputnumber>span>input')
          .invoke('val')
          .then(val => {
            expect(val).to.eql(
              servicio.cantidad.split(',')[1] === undefined
                ? servicio.cantidad + ',00'
                : +servicio.cantidad.split(',')[1] > 9
                ? servicio.cantidad
                : servicio.cantidad + 0
            );
          });

        // cy.get('.table-informe-avance>zwc-table-servicios>form>table')
        //   .contains('td', servicio.nombre.split('-')[0].trim())
        //   .siblings()
        //   .eq(3)
        //   .contains(servicio.precio);

        // cy.get('.table-informe-avance>zwc-table-servicios>form>table')
        //   .contains('td', servicio.nombre.split('-')[0].trim())
        //   .siblings()
        //   .eq(4)
        //   .contains(servicio.total);

        servicio.unidad_obras.forEach((uo, index) => {
          if (uo.nombre !== '0 - SIN UO') {
            cy.get('.table-informe-avance>zwc-table-servicios>form>table')
              .contains('td', uo.nombre.split('-')[0].trim())
              .siblings()
              .eq(0)
              .contains(uo.nombre.split('-')[1].trim());

            // cy.get('.table-informe-avance>zwc-table-servicios>form>table')
            //   .contains('td', uo.nombre.split('-')[0].trim())
            //   .siblings()
            //   .eq(1)
            //   .contains(servicio.actividad);

            if (uo.nombre !== '0 - SIN UO') {
              cy.get('table')
                .contains('td', uo.nombre.split('-')[0].trim())
                .siblings()
                .eq(2)
                .find('p-inputnumber>span>input')
                .invoke('val')
                .then(val => {
                  expect(val).to.eql(
                    uo.cantidad.split(',')[1] === undefined
                      ? uo.cantidad + ',00'
                      : +uo.cantidad.split(',')[1] > 9
                      ? uo.cantidad
                      : uo.cantidad + 0
                  );
                });

              //   cy.get('.table-informe-avance>zwc-table-servicios>form>table')
              //     .contains('td', uo.nombre.split('-')[0].trim())
              //     .siblings()
              //     .eq(3)
              //     .contains(uo.precio);

              //   cy.get('.table-informe-avance>zwc-table-servicios>form>table')
              //     .contains('td', uo.nombre.split('-')[0].trim())
              //     .siblings()
              //     .eq(4)
              //     .contains(uo.total);
            }
          }
        });
      });
    });
  });

  // REVISION
  it('Debe desplegar el carrito para adicionales vacio', () => {
    cy.get('.table-adicionales>zwc-table-servicios>form>table>tbody')
      .find('tr')
      .should('have.length', 0);
  });

  it('Debe desplegar los datos para poder agregar servicios adicionales', () => {
    // TIPO SERVICIO
    cy._select_dropdown('#select-actividad', 'DISEÑO');
    cy._check_dropdown_required('#select-tipo-servicio');
    cy._check_dropdown_data(
      '#select-tipo-servicio',
      getTipoServiciosContratoMOCK200ok.data.items,
      'descripcion'
    );

    // TIPO SERVICIO
    cy._select_dropdown('#select-tipo-servicio', 'PROYECTOS');
    cy.get('.pi-spinner', { timeout: 5000 }).should('not.exist');

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

  it(
    'Debe resetearse los filtros al cambiar de filtros',
    {
      retries: 2,
    },
    () => {
      // CAMBIAR ACTIVIDAD
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

      // CAMBIAR TIPO SERVICIO
      cy._select_dropdown('#select-actividad', 'DISTRIBUCION');
      cy._select_dropdown('#select-tipo-servicio', 'CABLES');
      cy._select_dropdown(
        '#select-servicio',
        'J679 - ATENCION DE ALARMAS DE PRESURIZACION. LOCALIZACION DE FUGAS EN VIA NEUMATICA SECUNDARIA.'
      );
      cy._select_dropdown('#select-unidad-obra', '0 - SIN UO');

      cy._select_dropdown('#select-tipo-servicio', 'DTH');
      cy.get('#select-unidad-obra>div').should('have.class', 'p-disabled');
    }
  );
});
