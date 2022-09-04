import { Cubicacion, Response, TipoCubicacion } from '@model';

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

export let listaCubicacionesMOCK200ok: Response<{ items: Cubicacion[] }> = {
  status: { code: 0, desc: 'OK' },
  data: {
    items: [
      {
        cubicacion_id: 2,
        cubicacion_nombre: 'AAAA',
        cubicacion_descripcion: 's',
        cubicacion_fecha_creacion: null,
        creador_usuario_id: 2,
        creador_username: 'mgestor1',
        creador_usuario_nombre: 'JESSICA MOVISTAR CASTILLO 1',
        agencia_id: 20,
        direccion_desde: 'a',
        altura_desde: 'd',
        direccion_hasta: 's',
        altura_hasta: 'd',
        tipo_cubicacion_id: 3,
        tipo_cubicacion_descripcion: 'Full',
        codigo_acuerdo: '330000659',
        cmarco_has_proveedor_id: 7,
        agencia_nombre: 'APOQUINDO',
        agencia_region_id: 13,
        agencia_region_nombre: 'Región Metropolitana de Santiago',
        agencia_codigo: '20',
        agencia_estado: true,
        contrato_id: 9,
        contrato_marco_nombre: 'BUCLE',
        contrato_marco_tipo_id: 4,
        contrato_marco_tipo_nombre: 'Bucle',
        proveedor_id: 15,
        proveedor_nombre: 'COBRA CHILE SERVICIOS S.A.',
        ot_id: 1,
        ot_nombre: 'Test Operaciones OT',
        asignado: 1,
        total: 481800,
        total_tipo_moneda: 'CLP',
      },
      {
        cubicacion_id: 1,
        cubicacion_nombre: 'ZZZZZ',
        cubicacion_descripcion: 'c',
        cubicacion_fecha_creacion: null,
        creador_usuario_id: 2,
        creador_username: 'mgestor1',
        creador_usuario_nombre: 'JESSICA MOVISTAR CASTILLO 1',
        agencia_id: 20,
        direccion_desde: 'z',
        altura_desde: 'c',
        direccion_hasta: 'c',
        altura_hasta: 'c',
        tipo_cubicacion_id: 3,
        tipo_cubicacion_descripcion: 'Full',
        codigo_acuerdo: '330000659',
        cmarco_has_proveedor_id: 7,
        agencia_nombre: 'APOQUINDO',
        agencia_region_id: 13,
        agencia_region_nombre: 'Región Metropolitana de Santiago',
        agencia_codigo: '20',
        agencia_estado: true,
        contrato_id: 9,
        contrato_marco_nombre: 'BUCLE',
        contrato_marco_tipo_id: 4,
        contrato_marco_tipo_nombre: 'Bucle',
        proveedor_id: 15,
        proveedor_nombre: 'COBRA CHILE SERVICIOS S.A.',
        ot_id: 2,
        ot_nombre: 'planing',
        asignado: 1,
        total: 5094.04,
        total_tipo_moneda: 'CLP',
      },
      {
        cubicacion_id: 3,
        cubicacion_nombre: 'DDDDDDD',
        cubicacion_descripcion: 'wer',
        cubicacion_fecha_creacion: null,
        creador_usuario_id: 2,
        creador_username: 'mgestor1',
        creador_usuario_nombre: 'JESSICA MOVISTAR CASTILLO 1',
        agencia_id: 339,
        direccion_desde: '',
        altura_desde: '',
        direccion_hasta: '',
        altura_hasta: '',
        tipo_cubicacion_id: 2,
        tipo_cubicacion_descripcion: 'Ingeniería',
        codigo_acuerdo: '3300213676',
        cmarco_has_proveedor_id: 6,
        agencia_nombre: 'Región de Valparaíso',
        agencia_region_id: 5,
        agencia_region_nombre: 'Región de Valparaíso',
        agencia_codigo: 'RG5',
        agencia_estado: true,
        contrato_id: 25,
        contrato_marco_nombre: 'UNIFICADO_MOVIL',
        contrato_marco_tipo_id: 1,
        contrato_marco_tipo_nombre: 'Móvil',
        proveedor_id: 10098,
        proveedor_nombre: '2021-2023 Inversiones Terabytes Limitada',
        ot_id: -1,
        ot_nombre: '',
        asignado: 0,
        total: 401249,
        total_tipo_moneda: 'CLP',
      },
      {
        cubicacion_id: 4,
        cubicacion_nombre: 'QQQQQQQQ',
        cubicacion_descripcion: 'pklñm',
        cubicacion_fecha_creacion: null,
        creador_usuario_id: 2,
        creador_username: 'mgestor1',
        creador_usuario_nombre: 'JESSICA MOVISTAR CASTILLO 1',
        agencia_id: 340,
        direccion_desde: '',
        altura_desde: '',
        direccion_hasta: '',
        altura_hasta: '',
        tipo_cubicacion_id: 3,
        tipo_cubicacion_descripcion: 'Full',
        codigo_acuerdo: '3300213680',
        cmarco_has_proveedor_id: 5,
        agencia_nombre: 'Región del Libertador General Bernardo O’Higg',
        agencia_region_id: 6,
        agencia_region_nombre:
          "Región del Libertador General Bernardo O'Higgins",
        agencia_codigo: 'RG6',
        agencia_estado: true,
        contrato_id: 24,
        contrato_marco_nombre: 'UNIFICADO_FIJA',
        contrato_marco_tipo_id: 2,
        contrato_marco_tipo_nombre: 'Fijo',
        proveedor_id: 10098,
        proveedor_nombre: '2021-2023 Inversiones Terabytes Limitada',
        ot_id: -1,
        ot_nombre: '',
        asignado: 0,
        total: 873287,
        total_tipo_moneda: 'CLP',
      },
      {
        cubicacion_id: 5,
        cubicacion_nombre: 'QQWSSAS',
        cubicacion_descripcion: '',
        cubicacion_fecha_creacion: null,
        creador_usuario_id: 2,
        creador_username: 'mgestor1',
        creador_usuario_nombre: 'JESSICA MOVISTAR CASTILLO 1',
        agencia_id: 20,
        direccion_desde: 'a',
        altura_desde: 's',
        direccion_hasta: 's',
        altura_hasta: 's',
        tipo_cubicacion_id: 1,
        tipo_cubicacion_descripcion: 'Construcción',
        codigo_acuerdo: '330000659',
        cmarco_has_proveedor_id: 7,
        agencia_nombre: 'APOQUINDO',
        agencia_region_id: 13,
        agencia_region_nombre: 'Región Metropolitana de Santiago',
        agencia_codigo: '20',
        agencia_estado: true,
        contrato_id: 9,
        contrato_marco_nombre: 'BUCLE',
        contrato_marco_tipo_id: 4,
        contrato_marco_tipo_nombre: 'Bucle',
        proveedor_id: 15,
        proveedor_nombre: 'COBRA CHILE SERVICIOS S.A.',
        ot_id: -1,
        ot_nombre: '',
        asignado: 0,
        total: 0,
        total_tipo_moneda: 'CLP',
      },
      {
        cubicacion_id: 6,
        cubicacion_nombre: 'aAAAS',
        cubicacion_descripcion: '',
        cubicacion_fecha_creacion: null,
        creador_usuario_id: 2,
        creador_username: 'mgestor1',
        creador_usuario_nombre: 'JESSICA MOVISTAR CASTILLO 1',
        agencia_id: 20,
        direccion_desde: 'a',
        altura_desde: 's',
        direccion_hasta: 'd',
        altura_hasta: 'a',
        tipo_cubicacion_id: 1,
        tipo_cubicacion_descripcion: 'Construcción',
        codigo_acuerdo: '330000659',
        cmarco_has_proveedor_id: 7,
        agencia_nombre: 'APOQUINDO',
        agencia_region_id: 13,
        agencia_region_nombre: 'Región Metropolitana de Santiago',
        agencia_codigo: '20',
        agencia_estado: true,
        contrato_id: 9,
        contrato_marco_nombre: 'BUCLE',
        contrato_marco_tipo_id: 4,
        contrato_marco_tipo_nombre: 'Bucle',
        proveedor_id: 15,
        proveedor_nombre: 'COBRA CHILE SERVICIOS S.A.',
        ot_id: -1,
        ot_nombre: '',
        asignado: 0,
        total: 0,
        total_tipo_moneda: 'CLP',
      },
      {
        cubicacion_id: 7,
        cubicacion_nombre: 'DDSDSD',
        cubicacion_descripcion: '',
        cubicacion_fecha_creacion: null,
        creador_usuario_id: 2,
        creador_username: 'mgestor1',
        creador_usuario_nombre: 'JESSICA MOVISTAR CASTILLO 1',
        agencia_id: 20,
        direccion_desde: 'a',
        altura_desde: 'd',
        direccion_hasta: 's',
        altura_hasta: 'a',
        tipo_cubicacion_id: 1,
        tipo_cubicacion_descripcion: 'Construcción',
        codigo_acuerdo: '330000659',
        cmarco_has_proveedor_id: 7,
        agencia_nombre: 'APOQUINDO',
        agencia_region_id: 13,
        agencia_region_nombre: 'Región Metropolitana de Santiago',
        agencia_codigo: '20',
        agencia_estado: true,
        contrato_id: 9,
        contrato_marco_nombre: 'BUCLE',
        contrato_marco_tipo_id: 4,
        contrato_marco_tipo_nombre: 'Bucle',
        proveedor_id: 15,
        proveedor_nombre: 'COBRA CHILE SERVICIOS S.A.',
        ot_id: -1,
        ot_nombre: '',
        asignado: 0,
        total: 0,
        total_tipo_moneda: 'CLP',
      },
      {
        cubicacion_id: 8,
        cubicacion_nombre: 'ddddd',
        cubicacion_descripcion: '',
        cubicacion_fecha_creacion: null,
        creador_usuario_id: 2,
        creador_username: 'mgestor1',
        creador_usuario_nombre: 'JESSICA MOVISTAR CASTILLO 1',
        agencia_id: 20,
        direccion_desde: 'a',
        altura_desde: 'a',
        direccion_hasta: 'a',
        altura_hasta: 'd',
        tipo_cubicacion_id: 1,
        tipo_cubicacion_descripcion: 'Construcción',
        codigo_acuerdo: '330000659',
        cmarco_has_proveedor_id: 7,
        agencia_nombre: 'APOQUINDO',
        agencia_region_id: 13,
        agencia_region_nombre: 'Región Metropolitana de Santiago',
        agencia_codigo: '20',
        agencia_estado: true,
        contrato_id: 9,
        contrato_marco_nombre: 'BUCLE',
        contrato_marco_tipo_id: 4,
        contrato_marco_tipo_nombre: 'Bucle',
        proveedor_id: 15,
        proveedor_nombre: 'COBRA CHILE SERVICIOS S.A.',
        ot_id: -1,
        ot_nombre: '',
        asignado: 0,
        total: 13224,
        total_tipo_moneda: 'CLP',
      },
    ],
  },
};
