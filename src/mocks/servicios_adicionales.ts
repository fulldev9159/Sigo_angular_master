import { Response, ResponseAgregarAdicionales } from '@model';

export let ServiciosAdicionalesSolicitudMOCK200ok: Response<ResponseAgregarAdicionales> =
  { status: { code: 0, desc: 'OK' }, data: { ot_id: 1, informe_avance_id: 1 } };
