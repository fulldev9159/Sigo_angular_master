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

  beforeEach(() => {
    cy.login('mgestor1', '123', 'Gestor/JP');
    cy.contains('Cubicación').click();
    cy.contains('Crear Cubicación').click();

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

    cy.get('#servicios > app-select > select ').select(
      `${servicio2_cod} - ${servicio2}`
    );
    cy.get('#unidad-obra > app-select > select').select(
      `${servicio_2_uo_1_cod} - ${servicio_2_uo_1}`
    );
    cy.contains('Agregar').click();
    cy.get('#unidad-obra > app-select > select').select(
      `${servicio_2_uo_2_cod} - ${servicio_2_uo_2}`
    );
    cy.contains('Agregar').click();
  });
  it('Revisasr que se agreguen correctamente los items al carrito', () => {
    cy.wait(500);
    const fila1 = '.table-carrito > table > tbody > tr:nth-child(1) > td';
    const fila2 = '.table-carrito > table > tbody > tr:nth-child(2) > td';
    const fila3 = '.table-carrito > table > tbody > tr:nth-child(3) > td';
    cy.get(fila1).eq(0).contains(servicio1_cod);
    cy.get(fila1).eq(1).contains(servicio1);
    // cy.get(cssSelector).eq(2).contains(servicio1);
    // cy.get(cssSelector).eq(3).contains(servicio1);
    cy.get(fila1).eq(4).contains('$121.861.440');
    cy.get(fila1).eq(5).contains('15');
    cy.get(fila1).eq(6).contains('$121.861.440');
    cy.get(fila1).eq(8).contains(servicio_1_uo_1_cod);
    cy.get(fila1).eq(9).contains(servicio_1_uo_1);

    cy.get(fila2).eq(0).contains(servicio2_cod);
    cy.get(fila2).eq(1).contains(servicio2);
    // cy.get(cssSelector).eq(2).contains(servicio1);
    // cy.get(cssSelector).eq(3).contains(servicio1);
    cy.get(fila2).eq(4).contains('$149.340.000');
    cy.get(fila2).eq(5).contains('45');
    cy.get(fila2).eq(6).contains('$149.340.000');
    cy.get(fila2).eq(8).contains(servicio_2_uo_2_cod);
    cy.get(fila2).eq(9).contains(servicio_2_uo_2);

    cy.get(fila3).eq(0).contains(servicio_2_uo_1_cod);
    cy.get(fila3).eq(1).contains(servicio_2_uo_1);
  });
});
