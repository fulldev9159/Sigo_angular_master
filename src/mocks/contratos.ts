import { AgenciaContrato, Response } from '@model';

export let getAgenciasContratoMOCK200OK: Response<{
  items: AgenciaContrato[];
}> = {
  status: { code: 0, desc: 'OK' },
  data: {
    items: [
      { id: 20, nombre: 'APOQUINDO' },
      { id: 19, nombre: 'PROVIDENCIA' },
    ],
  },
};
