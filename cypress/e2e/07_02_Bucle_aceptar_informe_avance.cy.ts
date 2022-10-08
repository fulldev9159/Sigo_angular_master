import {
  getTipoServiciosContratoMOCK200ok,
  ServiciosAgenciaContratoProveedorMOCK200OK,
  UnidadObraServicioMOCK200OK,
} from '@mocksOT';
import {
  adicionalesBucle1,
  crearCubicacion,
  CubicacionEditada,
} from 'cypress/fixtures/testedCubicacion';

describe.skip('ACEPTAR INFORME DE AVANCE ', () => {
  it('Debe desplegar detalles de la cubicacion "Cubicacion Bucle"', () => {
    cy.intercept('POST', '/ot/informe_avance/detalle/get').as('HTTPRESPONSE');

    cy.visit('http://localhost:4206/login/auth');
    cy._login('ccadmincontrato1', 'asdasd');
    cy._select_profile('Administrador EECC');
    cy.get('button[id="navbar-list-ot"]').click();
    cy.get('button[id="play-button"]').click();

    const data = CubicacionEditada;

    cy.wait('@HTTPRESPONSE').then(() => {
      cy.get('.table-informe-avance>zwc-form-table-services>form>table>tbody')
        .find('tr')
        .should('have.length', 14);

      data.items.forEach(servicio => {
        cy.get('.table-informe-avance>zwc-form-table-services>form>table')
          .contains('td', servicio.nombre.split('-')[0].trim())
          .siblings()
          .eq(0)
          .contains(servicio.nombre.split('-')[1].trim());

        // cy.get('.table-informe-avance>zwc-form-table-services>form>table')
        //   .contains('td', servicio.nombre.split('-')[0].trim())
        //   .siblings()
        //   .eq(1)
        //   .contains(servicio.tipo_servicio);

        cy.get('.table-informe-avance>zwc-form-table-services>form>table')
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

        // cy.get('.table-informe-avance>zwc-form-table-services>form>table')
        //   .contains('td', servicio.nombre.split('-')[0].trim())
        //   .siblings()
        //   .eq(3)
        //   .contains(servicio.precio);

        // cy.get('.table-informe-avance>zwc-form-table-services>form>table')
        //   .contains('td', servicio.nombre.split('-')[0].trim())
        //   .siblings()
        //   .eq(4)
        //   .contains(servicio.total);

        cy.get('.table-informe-avance>zwc-form-table-services>form>table')
          .contains('td', servicio.nombre.split('-')[0].trim())
          .siblings()
          .eq(3)
          .contains(servicio.unidad_obras[0].nombre.split('-')[0].trim());

        cy.get('.table-informe-avance>zwc-form-table-services>form>table')
          .contains('td', servicio.nombre.split('-')[0].trim())
          .siblings()
          .eq(4)
          .contains(servicio.unidad_obras[0].nombre.split('-')[1].trim());

        // cy.get('.table-informe-avance>zwc-form-table-services>form>table')
        //   .contains('td', servicio.nombre.split('-')[0].trim())
        //   .siblings()
        //   .eq(7)
        //   .contains(servicio.actividad);

        if (servicio.unidad_obras[0].nombre !== '0 - SIN UO') {
          cy.get('.table-informe-avance>zwc-form-table-services>form>table')
            .contains(
              'td',
              servicio.unidad_obras[0].nombre.split('-')[0].trim()
            )
            .siblings()
            .eq(6)
            .find('p-inputnumber>span>input')
            .invoke('val')
            .then(val => {
              expect(val).to.eql(
                servicio.unidad_obras[0].cantidad.split(',')[1] === undefined
                  ? servicio.unidad_obras[0].cantidad + ',00'
                  : +servicio.unidad_obras[0].cantidad.split(',')[1] > 9
                  ? servicio.unidad_obras[0].cantidad
                  : servicio.unidad_obras[0].cantidad + 0
              );
            });

          //   cy.get('.table-informe-avance>zwc-form-table-services>form>table')
          //     .contains('td', servicio.nombre.split('-')[0].trim())
          //     .siblings()
          //     .eq(9)
          //     .contains(servicio.unidad_obras[0].precio);

          //   cy.get('.table-informe-avance>zwc-form-table-services>form>table')
          //     .contains('td', servicio.nombre.split('-')[0].trim())
          //     .siblings()
          //     .eq(10)
          //     .contains(servicio.unidad_obras[0].total);
        }

        servicio.unidad_obras.forEach((uo, index) => {
          if (index !== 0) {
            cy.get('.table-informe-avance>zwc-form-table-services>form>table')
              .contains('td', uo.nombre.split('-')[0].trim())
              .siblings()
              .eq(0)
              .contains(uo.nombre.split('-')[1].trim());

            // cy.get('.table-informe-avance>zwc-form-table-services>form>table')
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

              //   cy.get('.table-informe-avance>zwc-form-table-services>form>table')
              //     .contains('td', uo.nombre.split('-')[0].trim())
              //     .siblings()
              //     .eq(3)
              //     .contains(uo.precio);

              //   cy.get('.table-informe-avance>zwc-form-table-services>form>table')
              //     .contains('td', uo.nombre.split('-')[0].trim())
              //     .siblings()
              //     .eq(4)
              //     .contains(uo.total);
            }
          }
        });
      });

      // REVISAR LOS SERVICIOS ADICIONALES
      const dataServiciosAdicionales = adicionalesBucle1;
      cy.get(
        '.table-agregar-servicios-adicionales>zwc-table-agregar-servicios>div>div>zwc-form-table-services>form>table>tbody'
      )
        .find('tr')
        .should('have.length', 7);

      dataServiciosAdicionales.items.forEach(servicio => {
        cy.get(
          '.table-agregar-servicios-adicionales>zwc-table-agregar-servicios>div>div>zwc-form-table-services>form>table'
        )
          .contains('td', servicio.nombre.split('-')[0].trim())
          .siblings()
          .eq(0)
          .contains(servicio.nombre.split('-')[1].trim());

        // cy.get('.table-informe-avance>zwc-form-table-services>form>table')
        //   .contains('td', servicio.nombre.split('-')[0].trim())
        //   .siblings()
        //   .eq(1)
        //   .contains(servicio.tipo_servicio);

        cy.get(
          '.table-agregar-servicios-adicionales>zwc-table-agregar-servicios>div>div>zwc-form-table-services>form>table'
        )
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

        // cy.get('.table-informe-avance>zwc-form-table-services>form>table')
        //   .contains('td', servicio.nombre.split('-')[0].trim())
        //   .siblings()
        //   .eq(3)
        //   .contains(servicio.precio);

        // cy.get('.table-informe-avance>zwc-form-table-services>form>table')
        //   .contains('td', servicio.nombre.split('-')[0].trim())
        //   .siblings()
        //   .eq(4)
        //   .contains(servicio.total);

        cy.get(
          '.table-agregar-servicios-adicionales>zwc-table-agregar-servicios>div>div>zwc-form-table-services>form>table'
        )
          .contains('td', servicio.nombre.split('-')[0].trim())
          .siblings()
          .eq(3)
          .contains(servicio.unidad_obras[0].nombre.split('-')[0].trim());

        cy.get(
          '.table-agregar-servicios-adicionales>zwc-table-agregar-servicios>div>div>zwc-form-table-services>form>table'
        )
          .contains('td', servicio.nombre.split('-')[0].trim())
          .siblings()
          .eq(4)
          .contains(servicio.unidad_obras[0].nombre.split('-')[1].trim());

        // cy.get('.table-informe-avance>zwc-form-table-services>form>table')
        //   .contains('td', servicio.nombre.split('-')[0].trim())
        //   .siblings()
        //   .eq(7)
        //   .contains(servicio.actividad);

        if (servicio.unidad_obras[0].nombre !== '0 - SIN UO') {
          cy.get(
            '.table-agregar-servicios-adicionales>zwc-table-agregar-servicios>div>div>zwc-form-table-services>form>table'
          )
            .contains(
              'td',
              servicio.unidad_obras[0].nombre.split('-')[0].trim()
            )
            .siblings()
            .eq(6)
            .find('p-inputnumber>span>input')
            .invoke('val')
            .then(val => {
              expect(val).to.eql(
                servicio.unidad_obras[0].cantidad.split(',')[1] === undefined
                  ? servicio.unidad_obras[0].cantidad + ',00'
                  : +servicio.unidad_obras[0].cantidad.split(',')[1] > 9
                  ? servicio.unidad_obras[0].cantidad
                  : servicio.unidad_obras[0].cantidad + 0
              );
            });

          //   cy.get('.table-informe-avance>zwc-form-table-services>form>table')
          //     .contains('td', servicio.nombre.split('-')[0].trim())
          //     .siblings()
          //     .eq(9)
          //     .contains(servicio.unidad_obras[0].precio);

          //   cy.get('.table-informe-avance>zwc-form-table-services>form>table')
          //     .contains('td', servicio.nombre.split('-')[0].trim())
          //     .siblings()
          //     .eq(10)
          //     .contains(servicio.unidad_obras[0].total);
        }

        servicio.unidad_obras.forEach((uo, index) => {
          if (index !== 0) {
            cy.get(
              '.table-agregar-servicios-adicionales>zwc-table-agregar-servicios>div>div>zwc-form-table-services>form>table'
            )
              .contains('td', uo.nombre.split('-')[0].trim())
              .siblings()
              .eq(0)
              .contains(uo.nombre.split('-')[1].trim());

            // cy.get('.table-informe-avance>zwc-form-table-services>form>table')
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

              //   cy.get('.table-informe-avance>zwc-form-table-services>form>table')
              //     .contains('td', uo.nombre.split('-')[0].trim())
              //     .siblings()
              //     .eq(3)
              //     .contains(uo.precio);

              //   cy.get('.table-informe-avance>zwc-form-table-services>form>table')
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

  it(
    'Debe desplegar error si trata de ingresar el servicio J451-D03 con el mensaje "Servicio y unidad de obra ya existen en el informe de avance. Debe cambiar la cantidad en el informe de avance"',
    {
      retries: 2,
    },
    () => {
      cy._select_dropdown('#select-actividad', 'MATRIZ');
      cy._select_dropdown('#select-tipo-servicio', 'CABLES');
      cy._select_dropdown(
        '#select-servicio',
        'J451 - EMPALME DE UN PAR (CON CONECTOR INDIVIDUAL O DERIVADO)'
      );
      cy._select_dropdown(
        '#select-unidad-obra',
        'D013 - CONECTOR ROJO CAL.24-19'
      );

      cy.get('#agregar-button').click();
      cy.get(
        '#alert-sevicio-existente>p-message>div>span.p-inline-message-text'
      ).contains(
        'Servicio y unidad de obra ya existen en el informe de avance. Debe cambiar la cantidad en el informe de avance'
      );
    }
  );

  it('El mensaje de alerta debería desaparecer si cambio de actividad', () => {
    // cy._select_dropdown(
    //   '#select-servicio',
    //   'J912 - ABRIR EMPALME COM. TIPO MECANICO TTRC O EFA'
    // );
    // cy.get(
    //   '#alert-sevicio-existente>p-message>div>span.p-inline-message-text'
    // ).should('not.exist');
  });

  it('Enviar informe de avance debe desplegar el mensaje y redirigir al listar ot', () => {
    cy.get('button[id="aceptar-button"]').click();
  });
});
