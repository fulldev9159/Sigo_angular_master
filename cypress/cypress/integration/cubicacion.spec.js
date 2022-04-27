describe('My First Test', () => {
  const servicio1_cod = 'D020';
  const servicio1 = 'DISEÑO DE RED INTERIOR RED DE COBRE (DITICU)';
  const servicio_1_uo_1_cod = '0';
  const servicio_1_uo_1 = 'SIN UO';
  const servicio2_cod = 'D010';
  const servicio2 =
    'DISEÑO P2P EN RED DE COBRE PARA TELEALIMENTACION (AEREO O SUBTERRANEO)';
  const servicio_2_uo_1_cod = 'T383';
  const servicio_2_uo_1 = 'TERMINAL OPTICO MULTIOPERADOR EDIFICIO';
  const servicio_2_uo_2_cod = 'T382';
  const servicio_2_uo_2 = 'CAJA TERMINAL OPT.C/SPLITTER Y CONEC.TEL IP68';
  const servicio_2_uo_3_cod = 'T376';
  const servicio_2_uo_3 = 'CAJA TERMINAL OPT.C/SPLITTER Y CONEC.TEL';
  const servicio_2_uo_4_cod = '0';
  const servicio_2_uo_4 = 'SIN UO';

  beforeEach(() => {
    cy.login('mgestor1', '123', 'Gestor/JP');
    cy.contains('Cubicación').click();
    cy.contains('Crear Cubicación').click();

    cy.get('#create-button').should('be.disabled');
  });
  it('Revisasr que se agreguen correctamente los items al carrito', () => {
    cy.get('#nomnbreCub>app-input>input').type('CubTest');
    cy.get('#tipoCub > app-select > select').select('Full');
    cy.get('#contratosUser > app-select > select').select('SBE');
    cy.get('#agencias > app-select > select').select('RANCAGUA');
    cy.get('#proveedores > app-select > select').select(1);
    cy.get('#direcciondesde > app-input > input').type('las casas norte');
    cy.get('#alturadesde > app-input > input').type('1714');
    cy.get('#direccionhasta > app-input > input').type('las casas sur');
    cy.get('#alturahasta > app-input > input').type('1817');
    cy.get('#descripcion > app-textarea > textarea').type('Cub descripción');
    cy.get('#actividad > app-select > select').select('DISEÑO');
    cy.get('#tiposervicio > app-select > select').select('CANALIZACION');
    cy.get('#servicios > app-select > select ').select(
      `${servicio1_cod} - ${servicio1}`
    );
    cy.get('#unidad-obra > app-select > select').select(
      `${servicio_1_uo_1_cod} - ${servicio_1_uo_1}`
    );
    cy.contains('Agregar').click();
    cy.wait(500);

    cy.get('#servicios > app-select > select ').select(
      `${servicio2_cod} - ${servicio2}`
    );
    cy.get('#unidad-obra > app-select > select').select(
      `${servicio_2_uo_1_cod} - ${servicio_2_uo_1}`
    );
    cy.contains('Agregar').click();
    cy.wait(500);

    cy.get('#unidad-obra > app-select > select').select(
      `${servicio_2_uo_2_cod} - ${servicio_2_uo_2}`
    );
    cy.contains('Agregar').click();
    cy.wait(1000);

    // REVISAR SI LA TABLA CONTIENE TODOS LOS DATOS CORRESPONDIENTES
    const fila1 = '.table-carrito > table > tbody > tr:nth-child(1) > td';
    const fila2 = '.table-carrito > table > tbody > tr:nth-child(2) > td';
    const fila3 = '.table-carrito > table > tbody > tr:nth-child(3) > td';
    cy.get(fila1).eq(0).contains(servicio1_cod);
    cy.get(fila1).eq(1).contains(servicio1);
    cy.get(fila1).eq(2).contains('Canalizacion');
    cy.get(fila1 + ':nth-child(4)>app-input>input')
      .invoke('val')
      .then(val => {
        expect(parseInt(val)).to.eql(1);
      });
    cy.get(fila1).eq(4).contains('$12.240');
    cy.get(fila1).eq(5).contains('$12.240');

    cy.get(fila1).eq(7).contains(servicio_1_uo_1_cod);
    cy.get(fila1).eq(8).contains(servicio_1_uo_1);
    cy.get(fila1).eq(9).contains('Diseño');
    cy.get(fila1 + ':nth-child(11)>app-input>input')
      .invoke('val')
      .then(val => {
        expect(parseInt(val)).to.eql(1);
      });
    cy.get(fila1).eq(11).contains('CLP');
    cy.get(fila1).eq(12).contains('$0');
    cy.get(fila1).eq(13).contains('$0');

    // FILA 2 SERVICIO
    cy.get(fila2).eq(0).contains(servicio2_cod);
    cy.get(fila2).eq(1).contains(servicio2);
    cy.get(fila2).eq(2).contains('Canalizacion');
    cy.get(fila2 + ':nth-child(4)>app-input>input')
      .invoke('val')
      .then(val => {
        expect(parseInt(val)).to.eql(1);
      });
    cy.get(fila2).eq(4).contains('$15.000');
    cy.get(fila2).eq(5).contains('$15.000');

    cy.get(fila2).eq(7).contains(servicio_2_uo_2_cod);
    cy.get(fila2).eq(8).contains(servicio_2_uo_2);
    cy.get(fila2).eq(9).contains('Diseño');
    cy.get(fila2 + ':nth-child(11)>app-input>input')
      .invoke('val')
      .then(val => {
        expect(parseInt(val)).to.eql(1);
      });
    cy.get(fila2).eq(11).contains('CLP');
    cy.get(fila2).eq(12).contains('$0');
    cy.get(fila2).eq(13).contains('$0');

    // FILA 3
    cy.get(fila3).eq(0).contains(servicio_2_uo_1_cod);
    cy.get(fila3).eq(1).contains(servicio_2_uo_1);
    cy.get(fila3).eq(2).contains('Diseño');
    cy.get(fila3 + ':nth-child(4)>app-input>input')
      .invoke('val')
      .then(val => {
        expect(parseInt(val)).to.eql(1);
      });
    cy.get(fila3).eq(4).contains('CLP');
    cy.get(fila3).eq(5).contains('$0');
    cy.get(fila3).eq(6).contains('$0');

    // REVISAR TOTALES
    cy.get(
      '#table-totales>div.col-3 > table > tr:nth-child(1) > td:nth-child(2)'
    ).contains('$27.240');
    cy.get(
      '#table-totales>div.col-3 > table > tr:nth-child(2) > td:nth-child(2)'
    ).contains('$0');
    cy.get(
      '#table-totales>div.col-3 > table > tr:nth-child(3) > td:nth-child(2)'
    ).contains('$27.240');

    // ELIMINAR UNO AGREGAR TODO Y ELIMINAR TODO
    cy.get(':nth-child(8) > .icon > .eliminar-color').click();
    cy.get('#unidad-obra > app-select > select').select(
      `${servicio_2_uo_1_cod} - ${servicio_2_uo_1}`
    );
    cy.contains('Agregar').click();
    cy.wait(500);

    cy.get('#unidad-obra > app-select > select').select(
      `${servicio_2_uo_3_cod} - ${servicio_2_uo_3}`
    );
    cy.contains('Agregar').click();
    cy.wait(700);
    cy.get('#unidad-obra > app-select > select').select(
      `${servicio_2_uo_4_cod} - ${servicio_2_uo_4}`
    );
    cy.contains('Agregar').click();
    cy.wait(1000);

    // REVISAR SI LA TABLA CONTIENE TODOS LOS DATOS CORRESPONDIENTES
    const fila4 = '.table-carrito > table > tbody > tr:nth-child(4) > td';
    const fila5 = '.table-carrito > table > tbody > tr:nth-child(5) > td';
    cy.get(fila1).eq(0).contains(servicio1_cod);
    cy.get(fila1).eq(1).contains(servicio1);
    cy.get(fila1).eq(2).contains('Canalizacion');
    cy.get(fila1 + ':nth-child(4)>app-input>input')
      .invoke('val')
      .then(val => {
        expect(parseInt(val)).to.eql(1);
      });
    cy.get(fila1).eq(4).contains('$12.240');
    cy.get(fila1).eq(5).contains('$12.240');

    cy.get(fila1).eq(7).contains(servicio_1_uo_1_cod);
    cy.get(fila1).eq(8).contains(servicio_1_uo_1);
    cy.get(fila1).eq(9).contains('Diseño');
    cy.get(fila1 + ':nth-child(11)>app-input>input')
      .invoke('val')
      .then(val => {
        expect(parseInt(val)).to.eql(1);
      });
    cy.get(fila1).eq(11).contains('CLP');
    cy.get(fila1).eq(12).contains('$0');
    cy.get(fila1).eq(13).contains('$0');

    // FILA 2 SERVICIO
    cy.get(fila2).eq(0).contains(servicio2_cod);
    cy.get(fila2).eq(1).contains(servicio2);
    cy.get(fila2).eq(2).contains('Canalizacion');
    cy.get(fila2 + ':nth-child(4)>app-input>input')
      .invoke('val')
      .then(val => {
        expect(parseInt(val)).to.eql(1);
      });
    cy.get(fila2).eq(4).contains('$15.000');
    cy.get(fila2).eq(5).contains('$15.000');

    cy.get(fila2).eq(7).contains(servicio_2_uo_4_cod);
    cy.get(fila2).eq(8).contains(servicio_2_uo_4);
    cy.get(fila2).eq(9).contains('Diseño');
    cy.get(fila2 + ':nth-child(11)>app-input>input')
      .invoke('val')
      .then(val => {
        expect(parseInt(val)).to.eql(1);
      });
    cy.get(fila2).eq(11).contains('CLP');
    cy.get(fila2).eq(12).contains('$0');
    cy.get(fila2).eq(13).contains('$0');

    // FILA 3
    cy.get(fila3).eq(0).contains(servicio_2_uo_3_cod);
    cy.get(fila3).eq(1).contains(servicio_2_uo_3);
    cy.get(fila3).eq(2).contains('Diseño');
    cy.get(fila3 + ':nth-child(4)>app-input>input')
      .invoke('val')
      .then(val => {
        expect(parseInt(val)).to.eql(1);
      });
    cy.get(fila3).eq(4).contains('CLP');
    cy.get(fila3).eq(5).contains('$0');
    cy.get(fila3).eq(6).contains('$0');

    // FILA 4
    cy.get(fila4).eq(0).contains(servicio_2_uo_1_cod);
    cy.get(fila4).eq(1).contains(servicio_2_uo_1);
    cy.get(fila4).eq(2).contains('Diseño');
    cy.get(fila4 + ':nth-child(4)>app-input>input')
      .invoke('val')
      .then(val => {
        expect(parseInt(val)).to.eql(1);
      });
    cy.get(fila4).eq(4).contains('CLP');
    cy.get(fila4).eq(5).contains('$0');
    cy.get(fila4).eq(6).contains('$0');

    // FILA 5
    cy.get(fila5).eq(0).contains(servicio_2_uo_2_cod);
    cy.get(fila5).eq(1).contains(servicio_2_uo_2);
    cy.get(fila5).eq(2).contains('Diseño');
    cy.get(fila5 + ':nth-child(4)>app-input>input')
      .invoke('val')
      .then(val => {
        expect(parseInt(val)).to.eql(1);
      });
    cy.get(fila5).eq(4).contains('CLP');
    cy.get(fila5).eq(5).contains('$0');
    cy.get(fila5).eq(6).contains('$0');

    // ELIMINAR TODO
    cy.get(':nth-child(2) > :nth-child(7) > .icon > .ui ').click();
    cy.get(':nth-child(1) > :nth-child(7) > .icon > .ui').click();

    cy.get('.text-left > p').contains('Al menos 1 servicio debe ser ingresado');
    cy.get('#create-button').should('be.disabled');

    // CASO ESPECIAL
    cy.get('#servicios > app-select > select ').select(
      `${servicio2_cod} - ${servicio2}`
    );
    cy.get('#unidad-obra > app-select > select').select(
      `${servicio_2_uo_1_cod} - ${servicio_2_uo_1}`
    );
    cy.contains('Agregar').click();
    cy.wait(500);

    cy.get('#unidad-obra > app-select > select').select(
      `${servicio_2_uo_2_cod} - ${servicio_2_uo_2}`
    );
    cy.contains('Agregar').click();
    cy.wait(1000);

    cy.get('#servicios > app-select > select ').select(
      `${servicio1_cod} - ${servicio1}`
    );
    cy.get('#unidad-obra > app-select > select').select(
      `${servicio_1_uo_1_cod} - ${servicio_1_uo_1}`
    );
    cy.contains('Agregar').click();
    cy.wait(500);

    cy.get('#servicios > app-select > select ').select(
      `${servicio2_cod} - ${servicio2}`
    );
    cy.get('#unidad-obra > app-select > select').select(
      `${servicio_2_uo_3_cod} - ${servicio_2_uo_3}`
    );
    cy.contains('Agregar').click();
    cy.wait(700);
    cy.get('#unidad-obra > app-select > select').select(
      `${servicio_2_uo_4_cod} - ${servicio_2_uo_4}`
    );
    cy.contains('Agregar').click();
    cy.wait(1000);

    // REVISAR SI LA TABLA CONTIENE TODOS LOS DATOS CORRESPONDIENTES
    cy.get(fila1).eq(0).contains(servicio1_cod);
    cy.get(fila1).eq(1).contains(servicio1);
    cy.get(fila1).eq(2).contains('Canalizacion');
    cy.get(fila1 + ':nth-child(4)>app-input>input')
      .invoke('val')
      .then(val => {
        expect(parseInt(val)).to.eql(1);
      });
    cy.get(fila1).eq(4).contains('$12.240');
    cy.get(fila1).eq(5).contains('$12.240');

    cy.get(fila1).eq(7).contains(servicio_1_uo_1_cod);
    cy.get(fila1).eq(8).contains(servicio_1_uo_1);
    cy.get(fila1).eq(9).contains('Diseño');
    cy.get(fila1 + ':nth-child(11)>app-input>input')
      .invoke('val')
      .then(val => {
        expect(parseInt(val)).to.eql(1);
      });
    cy.get(fila1).eq(11).contains('CLP');
    cy.get(fila1).eq(12).contains('$0');
    cy.get(fila1).eq(13).contains('$0');

    // FILA 2 SERVICIO
    cy.get(fila2).eq(0).contains(servicio2_cod);
    cy.get(fila2).eq(1).contains(servicio2);
    cy.get(fila2).eq(2).contains('Canalizacion');
    cy.get(fila2 + ':nth-child(4)>app-input>input')
      .invoke('val')
      .then(val => {
        expect(parseInt(val)).to.eql(1);
      });
    cy.get(fila2).eq(4).contains('$15.000');
    cy.get(fila2).eq(5).contains('$15.000');

    cy.get(fila2).eq(7).contains(servicio_2_uo_4_cod);
    cy.get(fila2).eq(8).contains(servicio_2_uo_4);
    cy.get(fila2).eq(9).contains('Diseño');
    cy.get(fila2 + ':nth-child(11)>app-input>input')
      .invoke('val')
      .then(val => {
        expect(parseInt(val)).to.eql(1);
      });
    cy.get(fila2).eq(11).contains('CLP');
    cy.get(fila2).eq(12).contains('$0');
    cy.get(fila2).eq(13).contains('$0');

    // FILA 3
    cy.get(fila3).eq(0).contains(servicio_2_uo_3_cod);
    cy.get(fila3).eq(1).contains(servicio_2_uo_3);
    cy.get(fila3).eq(2).contains('Diseño');
    cy.get(fila3 + ':nth-child(4)>app-input>input')
      .invoke('val')
      .then(val => {
        expect(parseInt(val)).to.eql(1);
      });
    cy.get(fila3).eq(4).contains('CLP');
    cy.get(fila3).eq(5).contains('$0');
    cy.get(fila3).eq(6).contains('$0');

    // FILA 4
    cy.get(fila4).eq(0).contains(servicio_2_uo_2_cod);
    cy.get(fila4).eq(1).contains(servicio_2_uo_2);
    cy.get(fila4).eq(2).contains('Diseño');
    cy.get(fila4 + ':nth-child(4)>app-input>input')
      .invoke('val')
      .then(val => {
        expect(parseInt(val)).to.eql(1);
      });
    cy.get(fila4).eq(4).contains('CLP');
    cy.get(fila4).eq(5).contains('$0');
    cy.get(fila4).eq(6).contains('$0');

    // FILA 5
    cy.get(fila5).eq(0).contains(servicio_2_uo_1_cod);
    cy.get(fila5).eq(1).contains(servicio_2_uo_1);
    cy.get(fila5).eq(2).contains('Diseño');
    cy.get(fila5 + ':nth-child(4)>app-input>input')
      .invoke('val')
      .then(val => {
        expect(parseInt(val)).to.eql(1);
      });
    cy.get(fila5).eq(4).contains('CLP');
    cy.get(fila5).eq(5).contains('$0');
    cy.get(fila5).eq(6).contains('$0');
  });

  it('Revisar cambios de cantidades', () => {
    cy.get('#contratosUser > app-select > select').select('SBE');
    cy.get('#agencias > app-select > select').select('RANCAGUA');
    cy.get('#proveedores > app-select > select').select(1);
    cy.get('#actividad > app-select > select').select('DISEÑO');
    cy.get('#tiposervicio > app-select > select').select('CANALIZACION');

    cy.get('#servicios > app-select > select ').select(
      `${servicio2_cod} - ${servicio2}`
    );
    cy.get('#unidad-obra > app-select > select').select(
      `${servicio_2_uo_1_cod} - ${servicio_2_uo_1}`
    );
    cy.contains('Agregar').click();
    cy.wait(500);

    cy.get('#servicios > app-select > select ').select(
      `${servicio1_cod} - ${servicio1}`
    );
    cy.get('#unidad-obra > app-select > select').select(
      `${servicio_1_uo_1_cod} - ${servicio_1_uo_1}`
    );
    cy.contains('Agregar').click();
    cy.wait(500);

    // AUMENTAR LA CANTIDAD SERVICIO
    const fila1 = '.table-carrito > table > tbody > tr:nth-child(1) > td';
    const fila2 = '.table-carrito > table > tbody > tr:nth-child(2) > td';

    cy.get(fila2 + ':nth-child(4)>app-input>input')
      .clear()
      .type('{del}4');
    cy.get(fila1).eq(5).contains('$15.000');
    cy.get(fila1).eq(4).contains('$15.000');
    cy.get(fila2).eq(5).contains('$48.960');
    cy.get(fila2).eq(4).contains('$12.240');
    cy.get(
      '#table-totales>div.col-3 > table > tr:nth-child(1) > td:nth-child(2)'
    ).contains('$63.960');
    cy.get(
      '#table-totales>div.col-3 > table > tr:nth-child(2) > td:nth-child(2)'
    ).contains('$0');
    cy.get(
      '#table-totales>div.col-3 > table > tr:nth-child(3) > td:nth-child(2)'
    ).contains('$63.960');
  });

  it('Revisar que no permita agregar el mismo servicio/uo', () => {
    cy.get('#contratosUser > app-select > select').select('SBE');
    cy.get('#agencias > app-select > select').select('RANCAGUA');
    cy.get('#proveedores > app-select > select').select(1);
    cy.get('#actividad > app-select > select').select('DISEÑO');
    cy.get('#tiposervicio > app-select > select').select('CANALIZACION');

    cy.get('#servicios > app-select > select ').select(
      `${servicio2_cod} - ${servicio2}`
    );
    cy.get('#unidad-obra > app-select > select').select(
      `${servicio_2_uo_1_cod} - ${servicio_2_uo_1}`
    );
    cy.contains('Agregar').click();
    cy.wait(500);

    cy.get('#unidad-obra > app-select > select').select(
      `${servicio_2_uo_1_cod} - ${servicio_2_uo_1}`
    );
    cy.contains('Agregar').click();
    cy.wait(500);

    cy.get('#mensaje-repetido').contains(
      'Ya ha agregado este servico/Unidad Obra'
    );
  });

  it('Revisar que no permita agregar el mismo servicio/uo', () => {
    cy.get('#contratosUser > app-select > select').select('SBE');
    cy.get('#agencias > app-select > select').select('RANCAGUA');
    cy.get('#proveedores > app-select > select').select(1);
    cy.get('#actividad > app-select > select').select('DISEÑO');
    cy.get('#tiposervicio > app-select > select').select('CANALIZACION');

    cy.get('#servicios > app-select > select ').select(
      `${servicio2_cod} - ${servicio2}`
    );
    cy.get('#unidad-obra > app-select > select').select(
      `${servicio_2_uo_1_cod} - ${servicio_2_uo_1}`
    );
    cy.contains('Agregar').click();
    cy.wait(500);

    cy.get(':nth-child(15) > .icon > .ui').click();
    cy.get('.row > table > tbody > .ng-star-inserted > :nth-child(1)').contains(
      '530345'
    );
    cy.get('.row > table > tbody > .ng-star-inserted > :nth-child(2)').contains(
      'TERMINAL OPTICO MULTIOPERADOR EDIFICIO'
    );
    cy.get('.row > table > tbody > .ng-star-inserted > :nth-child(3)').contains(
      'TELEFONICA'
    );
    cy.get('.row > table > tbody > .ng-star-inserted > :nth-child(4)').contains(
      '$90.496'
    );
  });
});
