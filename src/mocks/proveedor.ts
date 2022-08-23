import { ProveedorAgenciaContrato, Response } from '@model';

export let getProveedoresAgenciaContratoMOCK200OK: Response<{
  items: ProveedorAgenciaContrato[];
}> = {
  status: { code: 0, desc: 'OK' },
  data: {
    items: [
      {
        id: 14,
        nombre: 'BBB',
        codigo_acuerdo: '330000659',
        cmarco_has_proveedor_id: 17,
      },
      {
        id: 15,
        nombre: 'COBRA CHILE SERVICIOS S.A.',
        codigo_acuerdo: '330000659',
        cmarco_has_proveedor_id: 7,
      },
      {
        id: 13,
        nombre: 'AAAAA',
        codigo_acuerdo: '330000659',
        cmarco_has_proveedor_id: 27,
      },
    ],
  },
};
