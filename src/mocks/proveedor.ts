import { ProveedorAgenciaContrato, Response } from '@model';

export let getProveedoresAgenciaContratoMOCK200OK: Response<{
  items: ProveedorAgenciaContrato[];
}> = {
  status: { code: 0, desc: 'OK' },
  data: {
    items: [
      {
        id: 15,
        nombre: 'COBRA CHILE SERVICIOS S.A.',
        codigo_acuerdo: '330000659',
        cmarco_has_proveedor_id: 7,
      },
    ],
  },
};
