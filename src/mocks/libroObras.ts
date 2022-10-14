import { CategoriaArchivo, Response } from '@model';
import { RegistroLibroDeObras } from 'src/app/core/model/libro-obras';

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

export let getRegistrosLibroObrasMOCK200ok: Response<RegistroLibroDeObras[]> = {
  status: { code: 0, desc: 'OK' },
  data: [
    {
      id: 3,
      tipo_item: 'ENTRADA_LIBRO_OBRA',
      created_at: null,
      usuario_id: 2,
      usuario_nombre: 'JESSICA MOVISTAR CASTILLO 1',
      perfil_id: 8,
      perfil_nombre: 'Gestor/JP',
      observaciones: 'Otro registro de prueba',
      archivos: [
        {
          concepto: 'LIBRO_OBRAS',
          categoria_id: 7,
          categoria_nombre: 'Archivo Comprimido',
          extension: '.png',
          nombre_original:
            'Captura de Pantalla 2022-10-13 a la(s) 14.34.28.png',
          size: 191981,
          human_size: '192.0 kB',
          url: '/files/repositorio_archivos/download/zoj6anwIZrkw2xuV',
          created_at: null,
        },
      ],
    },
    {
      id: 2,
      tipo_item: 'ENTRADA_LIBRO_OBRA',
      created_at: null,
      usuario_id: 2,
      usuario_nombre: 'JESSICA MOVISTAR CASTILLO 1',
      perfil_id: 8,
      perfil_nombre: 'Gestor/JP',
      observaciones: 'adas',
      archivos: [
        {
          concepto: 'LIBRO_OBRAS',
          categoria_id: 3,
          categoria_nombre: 'Carta de Adjudicación',
          extension: '.png',
          nombre_original:
            'Captura de Pantalla 2022-10-05 a la(s) 16.52.47.png',
          size: 256562,
          human_size: '256.6 kB',
          url: '/files/repositorio_archivos/download/PM4GkamuE2oQAmcj',
          created_at: null,
        },
      ],
    },
    {
      id: 1,
      tipo_item: 'ENTRADA_LIBRO_OBRA',
      created_at: null,
      usuario_id: 2,
      usuario_nombre: 'JESSICA MOVISTAR CASTILLO 1',
      perfil_id: 8,
      perfil_nombre: 'Gestor/JP',
      observaciones: 'TEST',
      archivos: [
        {
          concepto: 'LIBRO_OBRAS',
          categoria_id: 1,
          categoria_nombre: 'Plano as Built',
          extension: '.png',
          nombre_original:
            'Captura de Pantalla 2022-09-29 a la(s) 10.15.37.png',
          size: 805242,
          human_size: '805.2 kB',
          url: '/files/repositorio_archivos/download/B40QNE8sQxZ6pNue',
          created_at: null,
        },
        {
          concepto: 'LIBRO_OBRAS',
          categoria_id: 1,
          categoria_nombre: 'Plano as Built',
          extension: '.txt',
          nombre_original: 'panic.txt',
          size: 14553,
          human_size: '14.6 kB',
          url: '/files/repositorio_archivos/download/ndGXnaotGArZmXh6',
          created_at: null,
        },
        {
          concepto: 'LIBRO_OBRAS',
          categoria_id: 1,
          categoria_nombre: 'Plano as Built',
          extension: '.pdf',
          nombre_original: 'Workflow with localhost.pdf',
          size: 2754451,
          human_size: '2.8 MB',
          url: '/files/repositorio_archivos/download/OMm0XJeu0m09lBFR',
          created_at: null,
        },
      ],
    },
    {
      id: 35,
      tipo_item: 'BITACORA',
      created_at: null,
      nivel: 'SUCCESS',
      evento: 'CAMBIO_ESTADO',
      mensaje:
        'Se cambia de (OT_ST_ABIERTA[1], OT_ET_UNKNOWN[-1]) a (OT_ST_ABIERTA[1], OT_ET_AUTORIZACION_INICIAL[24])',
      metadata:
        '{"to": {"tipo_etapa": {"id": 24, "slug": "OT_ET_AUTORIZACION_INICIAL", "nombre": "Autorizar inicialmente la OT"}, "tipo_estado": {"id": 1, "slug": "OT_ST_ABIERTA", "nombre": "Abierta"}}, "from": {"tipo_etapa": {"id": -1, "slug": "OT_ET_UNKNOWN", "nombre": "Etapa Desconocida"}, "tipo_estado": {"id": 1, "slug": "OT_ST_ABIERTA", "nombre": "Abierta"}}, "ot_id": 1}',
    },
  ],
};
