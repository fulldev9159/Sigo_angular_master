import { CategoriaArchivo, Response } from '@model';

export let getCategoriaMOCK200ok: Response<{ items: CategoriaArchivo[] }> = {
  status: { code: 0, desc: 'OK' },
  data: {
    items: [
      { id: 7, nombre: 'Archivo Comprimido' },
      { id: 3, nombre: 'Carta de Adjudicación' },
      { id: 6, nombre: 'Documento de Excel' },
      { id: 5, nombre: 'Documento de Word' },
      { id: 8, nombre: 'Documento PDF' },
      { id: 2, nombre: 'Evidencia de Servicio' },
      { id: 4, nombre: 'Imagen' },
      { id: 1, nombre: 'Plano as Built' },
    ],
  },
};

// {"status":{"code":0,"desc":"OK"},"data":{"libro_obras_id":1}}
