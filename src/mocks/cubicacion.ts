import { Response, TipoCubicacion } from '@model';

export let tipoCubicacionMOCK200OK: Response<{ items: TipoCubicacion[] }> = {
  status: { code: 0, desc: 'OK' },
  data: {
    items: [
      { id: 1, slug: 'OT', descripcion: 'Construcción' },
      { id: 2, slug: 'AP', descripcion: 'Ingeniería' },
      { id: 3, slug: 'FULL', descripcion: 'Full' },
    ],
  },
};

export let saveCubicacionMOCK200ok: Response<{ cubicacion_id: number }> = {
  status: { code: 0, desc: 'OK' },
  data: { cubicacion_id: 3 },
};
