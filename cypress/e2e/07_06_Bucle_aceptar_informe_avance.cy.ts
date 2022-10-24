import {
  getTipoServiciosContratoMOCK200ok,
  ServiciosAgenciaContratoProveedorMOCK200OK,
  UnidadObraServicioMOCK200OK,
} from '@mocksOT';
import {
  adicionalesBucle1,
  crearCubicacion,
  CubicacionEditada,
} from 'cypress/fixtures/testedCubicacionBUCLE';

describe.skip('ACEPTAR INFORME DE AVANCE ', () => {
  it('Enviar informe de avance debe desplegar el mensaje y redirigir al listar ot', () => {
    cy.get('button[id="aceptar-button"]').click();
  });
});
