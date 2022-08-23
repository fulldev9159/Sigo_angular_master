import {
  ActividadContratoProveedor,
  AgenciaContrato,
  Response,
  TipoServicioContrato,
} from '@model';

export let getAgenciasContratoMOCK200OK2: Response<{
  items: AgenciaContrato[];
}> = {
  status: { code: 0, desc: 'OK' },
  data: {
    items: [
      { id: 19, nombre: 'BBB' },
      { id: 20, nombre: 'APOQUINDO' },
      { id: 19, nombre: 'PROVIDENCIA' },
    ],
  },
};

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

export let getActividadesContratoProveedorMOCK200ok: Response<{
  items: ActividadContratoProveedor[];
}> = {
  status: { code: 0, desc: 'OK' },
  data: {
    items: [
      { actividad_id: 1, descripcion: 'ABANDONOS' },
      { actividad_id: 3, descripcion: 'CANALIZACION' },
      { actividad_id: 8, descripcion: 'DISEÑO' },
      { actividad_id: 4, descripcion: 'DISTRIBUCION' },
      { actividad_id: 6, descripcion: 'FIBRA OPTICA' },
      { actividad_id: 13, descripcion: 'FTTX' },
      { actividad_id: 9, descripcion: 'MATRIZ' },
    ],
  },
};

export let getTipoServiciosContratoMOCK200ok: Response<{
  items: TipoServicioContrato[];
}> = {
  status: { code: 0, desc: 'OK' },
  data: { items: [{ id: 6, descripcion: 'PROYECTOS' }] },
};
