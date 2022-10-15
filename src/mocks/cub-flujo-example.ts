import {
  DetallesServicioTipoAgenciaContratoProveedor,
  DetallesUnidadObraServicio,
  Response,
  ServicioAgenciaContratoProveedor,
  TipoServicioContrato,
  UnidadObraServicio,
} from '@model';

// CONTRATO BUCLE
// AGENCIA APOQUINDO
// PROVEEDOR COBRA CHILE

//  ====  ACTIVIDAD MATRIZ ====
// DATA TIPO SERVICIO
export const tipoServicioBucleApoqCobraMatrizMOCK200OK: Response<{
  items: TipoServicioContrato[];
}> = {
  status: { code: 0, desc: 'OK' },
  data: {
    items: [
      { id: 5, descripcion: 'CABLES' },
      { id: 4, descripcion: 'LINEAS' },
    ],
  },
};
// ******** ACTIVIDAD MATRIZ - TIPO SERVICIO LINEAS ******
// DATA SERVICIOS LINEAS
export const serviciosBucleApoqCobraMatrizLineasMOCK200OK: Response<{
  items: ServicioAgenciaContratoProveedor[];
}> = {
  status: { code: 0, desc: 'OK' },
  data: {
    items: [
      {
        id: 141,
        codigo: 'J101',
        descripcion: 'INSTALAR CABLE EN CANALIZACION GRUPOS A Y B',
        puntos_baremos: 0.12,
        requiere_evidencia: false,
        unidad_id: 2,
        numero_producto: 'J101',
        unidad_codigo: 'MT',
        unidad_desripcion: 'Metros',
      },
    ],
  },
};
// SERVICIO J101
// DATA UNIDADES OBRAS SERVICIO
export const unidadObrasBucleApoqCobraMatrizLineasJ101MOCK200OK: Response<{
  items: UnidadObraServicio[];
}> = {
  status: { code: 0, desc: '' },
  data: {
    items: [
      {
        id: 753,
        actividad_id: 9,
        servicio_cod: 'J101',
        unidad_obra_cod: 'C048',
        clave: 'C 012',
        model_servicio_cod: {
          id: 141,
          tipo_servicio_id: 4,
          unidad_id: 2,
          descripcion: 'INSTALAR CABLE EN CANALIZACION GRUPOS A Y B',
          codigo: 'J101',
          estado: true,
          es_pack_basico: false,
          cantidad_default: 1,
          codigo_alcance: 'C-000',
          puntos_baremos: 0.12,
          fecha_inicio: '2021-01-01T00:00:00Z',
          fecha_fin: '2027-04-01T17:19:25.995Z',
          requiere_evidencia: false,
        },
        model_unidad_obra_cod: {
          codigo: 'C048',
          descripcion: 'CABLE 900-26 SUB',
          unidad_id: 2,
        },
        model_actividad_id: { id: 9, codigo: 'M', descripcion: 'MATRIZ' },
      },
      {
        id: 758,
        actividad_id: 9,
        servicio_cod: 'J101',
        unidad_obra_cod: 'C105',
        clave: 'C 012',
        model_servicio_cod: {
          id: 141,
          tipo_servicio_id: 4,
          unidad_id: 2,
          descripcion: 'INSTALAR CABLE EN CANALIZACION GRUPOS A Y B',
          codigo: 'J101',
          estado: true,
          es_pack_basico: false,
          cantidad_default: 1,
          codigo_alcance: 'C-000',
          puntos_baremos: 0.12,
          fecha_inicio: '2021-01-01T00:00:00Z',
          fecha_fin: '2027-04-01T17:19:25.995Z',
          requiere_evidencia: false,
        },
        model_unidad_obra_cod: {
          codigo: 'C105',
          descripcion: 'CABLE PS           600-26 SUB.',
          unidad_id: 2,
        },
        model_actividad_id: { id: 9, codigo: 'M', descripcion: 'MATRIZ' },
      },
      {
        id: 793,
        actividad_id: 9,
        servicio_cod: 'J101',
        unidad_obra_cod: 'C870',
        clave: 'C 012',
        model_servicio_cod: {
          id: 141,
          tipo_servicio_id: 4,
          unidad_id: 2,
          descripcion: 'INSTALAR CABLE EN CANALIZACION GRUPOS A Y B',
          codigo: 'J101',
          estado: true,
          es_pack_basico: false,
          cantidad_default: 1,
          codigo_alcance: 'C-000',
          puntos_baremos: 0.12,
          fecha_inicio: '2021-01-01T00:00:00Z',
          fecha_fin: '2027-04-01T17:19:25.995Z',
          requiere_evidencia: false,
        },
        model_unidad_obra_cod: {
          codigo: 'C870',
          descripcion: 'CABLE PS 1212-26 SUB.',
          unidad_id: 2,
        },
        model_actividad_id: { id: 9, codigo: 'M', descripcion: 'MATRIZ' },
      },
      {
        id: 795,
        actividad_id: 9,
        servicio_cod: 'J101',
        unidad_obra_cod: 'C881',
        clave: 'C 012',
        model_servicio_cod: {
          id: 141,
          tipo_servicio_id: 4,
          unidad_id: 2,
          descripcion: 'INSTALAR CABLE EN CANALIZACION GRUPOS A Y B',
          codigo: 'J101',
          estado: true,
          es_pack_basico: false,
          cantidad_default: 1,
          codigo_alcance: 'C-000',
          puntos_baremos: 0.12,
          fecha_inicio: '2021-01-01T00:00:00Z',
          fecha_fin: '2027-04-01T17:19:25.995Z',
          requiere_evidencia: false,
        },
        model_unidad_obra_cod: {
          codigo: 'C881',
          descripcion: 'CABLE FS          1212-24 SUB.',
          unidad_id: 2,
        },
        model_actividad_id: { id: 9, codigo: 'M', descripcion: 'MATRIZ' },
      },
      {
        id: 796,
        actividad_id: 9,
        servicio_cod: 'J101',
        unidad_obra_cod: 'C926',
        clave: 'C 012',
        model_servicio_cod: {
          id: 141,
          tipo_servicio_id: 4,
          unidad_id: 2,
          descripcion: 'INSTALAR CABLE EN CANALIZACION GRUPOS A Y B',
          codigo: 'J101',
          estado: true,
          es_pack_basico: false,
          cantidad_default: 1,
          codigo_alcance: 'C-000',
          puntos_baremos: 0.12,
          fecha_inicio: '2021-01-01T00:00:00Z',
          fecha_fin: '2027-04-01T17:19:25.995Z',
          requiere_evidencia: false,
        },
        model_unidad_obra_cod: {
          codigo: 'C926',
          descripcion: 'CABLE 1800-26 PS',
          unidad_id: 2,
        },
        model_actividad_id: { id: 9, codigo: 'M', descripcion: 'MATRIZ' },
      },
    ],
  },
};

// DETALLES SERVICIO J101
export const detallesServicioBucleApoqCobraMatrizLineasJ101MOCKOK: Response<{
  items: DetallesServicioTipoAgenciaContratoProveedor[];
}> = {
  status: { code: 0, desc: 'OK' },
  data: {
    items: [
      {
        servicio_id: 141,
        servicio_codigo: 'J101',
        servicio_nombre: 'INSTALAR CABLE EN CANALIZACION GRUPOS A Y B',
        servicio_tipo: 4,
        tipo_servicio_descripcion: 'LINEAS',
        servicio_unidad_id: 2,
        servicio_unidad_codigo: 'MT',
        servicio_unidad_descripcion: 'Metros',
        servicio_baremos: 0.12,
        precio_proveedor: 3930,
        servicio_tipo_moneda_id: 2,
        servicio_tipo_moneda_codigo: 'CLP',
        actividad_id: '9',
        actividad_descripcion: 'MATRIZ',
        servicio_precio_final: 471.59999999999997,
        servicio_precio_final_clp: 471.59999999999997,
        numero_producto: 'J101',
      },
    ],
  },
};

// DETALLES UNIDAD OBRA C048
export const detalleUnidadObraBucleApoqCobraMatrizLineasJ101_C048: Response<DetallesUnidadObraServicio> =
  {
    status: { code: 0, desc: 'OK' },
    data: {
      uo_precio_total_clp: 0,
      uo_codigo: 'C048',
      uo_nombre: 'CABLE 900-26 SUB',
      uo_unidad_id: 2,
      uo_unidad_codigo: 'MT',
      uo_unidad_descripcion: 'Metros',
      material_arr: [
        {
          material_cantidad: 1,
          material_codigo: '620045',
          material_nombre: 'CABLE PS 900-26 WG AISL. P.S.',
          material_unidad_id: 2,
          material_unidad_codigo: 'MT',
          material_unidad_descripcion: 'Metros',
          material_valor: 24.21,
          material_tipo_moneda_id: 1,
          material_origen: 'TELEFONICA',
          material_precio: 24.21,
          material_precio_clp: 19368,
        },
      ],
    },
  };

// DETALLES UNIDAD OBRA C926
export const detalleUnidadObraBucleApoqCobraMatrizLineasJ101_C926: Response<DetallesUnidadObraServicio> =
  {
    status: { code: 0, desc: 'OK' },
    data: {
      uo_precio_total_clp: 0,
      uo_codigo: 'C926',
      uo_nombre: 'CABLE 1800-26 PS',
      uo_unidad_id: 2,
      uo_unidad_codigo: 'MT',
      uo_unidad_descripcion: 'Metros',
      material_arr: [
        {
          material_cantidad: 1,
          material_codigo: '040278',
          material_nombre: 'CABLE 1800P. C.26AWG AISL. PS',
          material_unidad_id: 2,
          material_unidad_codigo: 'MT',
          material_unidad_descripcion: 'Metros',
          material_valor: 46.47,
          material_tipo_moneda_id: 1,
          material_origen: 'TELEFONICA',
          material_precio: 46.47,
          material_precio_clp: 37176,
        },
      ],
    },
  };

// DETALLES UNIDAD OBRA C881
export const detalleUnidadObraBucleApoqCobraMatrizLineasJ101_C881: Response<DetallesUnidadObraServicio> =
  {
    status: { code: 0, desc: 'OK' },
    data: {
      uo_precio_total_clp: 0,
      uo_codigo: 'C881',
      uo_nombre: 'CABLE FS          1212-24 SUB.',
      uo_unidad_id: 2,
      uo_unidad_codigo: 'MT',
      uo_unidad_descripcion: 'Metros',
      material_arr: [
        {
          material_cantidad: 1,
          material_codigo: '040314',
          material_nombre: 'CABLE 1200P. C.24AWG AISL. PS',
          material_unidad_id: 2,
          material_unidad_codigo: 'MT',
          material_unidad_descripcion: 'Metros',
          material_valor: 48.44,
          material_tipo_moneda_id: 1,
          material_origen: 'TELEFONICA',
          material_precio: 48.44,
          material_precio_clp: 38752,
        },
      ],
    },
  };

// ******** ACTIVIDAD MATRIZ - TIPO SERVICIO CABLES ******
// DATA SERVICIOS LINEAS
export const serviciosBucleApoqCobraMatrizCablesMOCK200OK: Response<{
  items: ServicioAgenciaContratoProveedor[];
}> = {
  status: { code: 0, desc: 'OK' },
  data: {
    items: [
      {
        id: 191,
        codigo: 'J451',
        descripcion: 'EMPALME DE UN PAR (CON CONECTOR INDIVIDUAL O DERIVADO)',
        puntos_baremos: 0.04,
        requiere_evidencia: false,
        unidad_id: 4,
        numero_producto: 'J451',
        unidad_codigo: 'CU',
        unidad_desripcion: 'Cada Uno',
      },
      {
        id: 196,
        codigo: 'J456',
        descripcion: 'PREPARAR EXTREMOS DE CABLES GRUPO A (HASTA 300 PRS)',
        puntos_baremos: 1.09,
        requiere_evidencia: false,
        unidad_id: 4,
        numero_producto: 'J456',
        unidad_codigo: 'CU',
        unidad_desripcion: 'Cada Uno',
      },
    ],
  },
};

// SERVICIO J451
// DATA UNIDADES OBRAS SERVICIO
export const unidadObrasBucleApoqCobraMatrizCablesJ451MOCK200OK: Response<{
  items: UnidadObraServicio[];
}> = {
  status: { code: 0, desc: '' },
  data: {
    items: [
      {
        id: 2055,
        actividad_id: 9,
        servicio_cod: 'J451',
        unidad_obra_cod: 'D012',
        clave: 'C 012',
        model_servicio_cod: {
          id: 191,
          tipo_servicio_id: 5,
          unidad_id: 4,
          descripcion: 'EMPALME DE UN PAR (CON CONECTOR INDIVIDUAL O DERIVADO)',
          codigo: 'J451',
          estado: true,
          es_pack_basico: false,
          cantidad_default: 1,
          codigo_alcance: 'C-000',
          puntos_baremos: 0.04,
          fecha_inicio: '2021-01-01T00:00:00Z',
          fecha_fin: '2027-04-01T17:19:25.995Z',
          requiere_evidencia: false,
        },
        model_unidad_obra_cod: {
          codigo: 'D012',
          descripcion: 'CONECTOR AMARILLO    CAL.24-19',
          unidad_id: 4,
        },
        model_actividad_id: { id: 9, codigo: 'M', descripcion: 'MATRIZ' },
      },
      {
        id: 2056,
        actividad_id: 9,
        servicio_cod: 'J451',
        unidad_obra_cod: 'D013',
        clave: 'C 012',
        model_servicio_cod: {
          id: 191,
          tipo_servicio_id: 5,
          unidad_id: 4,
          descripcion: 'EMPALME DE UN PAR (CON CONECTOR INDIVIDUAL O DERIVADO)',
          codigo: 'J451',
          estado: true,
          es_pack_basico: false,
          cantidad_default: 1,
          codigo_alcance: 'C-000',
          puntos_baremos: 0.04,
          fecha_inicio: '2021-01-01T00:00:00Z',
          fecha_fin: '2027-04-01T17:19:25.995Z',
          requiere_evidencia: false,
        },
        model_unidad_obra_cod: {
          codigo: 'D013',
          descripcion: 'CONECTOR ROJO        CAL.24-19',
          unidad_id: 4,
        },
        model_actividad_id: { id: 9, codigo: 'M', descripcion: 'MATRIZ' },
      },
    ],
  },
};

// DETALLES SERVICIO J451
export const detallesServicioBucleApoqCobraMatrizCablesJ451MOCKOK: Response<{
  items: DetallesServicioTipoAgenciaContratoProveedor[];
}> = {
  status: { code: 0, desc: 'OK' },
  data: {
    items: [
      {
        servicio_id: 191,
        servicio_codigo: 'J451',
        servicio_nombre:
          'EMPALME DE UN PAR (CON CONECTOR INDIVIDUAL O DERIVADO)',
        servicio_tipo: 5,
        tipo_servicio_descripcion: 'CABLES',
        servicio_unidad_id: 4,
        servicio_unidad_codigo: 'CU',
        servicio_unidad_descripcion: 'Cada Uno',
        servicio_baremos: 0.04,
        precio_proveedor: 4508,
        servicio_tipo_moneda_id: 2,
        servicio_tipo_moneda_codigo: 'CLP',
        actividad_id: '9',
        actividad_descripcion: 'MATRIZ',
        servicio_precio_final: 180.32,
        servicio_precio_final_clp: 180.32,
        numero_producto: 'J451',
      },
    ],
  },
};

// DETALLES UNIDAD OBRA D013
export const detalleUnidadObraBucleApoqCobraMatrizCablesJ451_D013: Response<DetallesUnidadObraServicio> =
  {
    status: { code: 0, desc: 'OK' },
    data: {
      uo_precio_total_clp: 56.8,
      uo_codigo: 'D013',
      uo_nombre: 'CONECTOR ROJO CAL.24-19',
      uo_unidad_id: 4,
      uo_unidad_codigo: 'CU',
      uo_unidad_descripcion: 'Cada Uno',
      material_arr: [
        {
          material_cantidad: 1,
          material_codigo: '044281',
          material_nombre: 'CONECTOR ROJO CAL.24/19',
          material_unidad_id: 4,
          material_unidad_codigo: 'CU',
          material_unidad_descripcion: 'Cada Uno',
          material_valor: 0.071,
          material_tipo_moneda_id: 1,
          material_origen: 'PROVEEDOR',
          material_precio: 0.071,
          material_precio_clp: 56.8,
        },
      ],
    },
  };

// DETALLES UNIDAD OBRA D012
export const detalleUnidadObraBucleApoqCobraMatrizCablesJ451_D012: Response<DetallesUnidadObraServicio> =
  {
    status: { code: 0, desc: 'OK' },
    data: {
      uo_precio_total_clp: 0,
      uo_codigo: 'D012',
      uo_nombre: 'CONECTOR AMARILLO    CAL.24-19',
      uo_unidad_id: 4,
      uo_unidad_codigo: 'CU',
      uo_unidad_descripcion: 'Cada Uno',
      material_arr: [
        {
          material_cantidad: 1,
          material_codigo: '044279',
          material_nombre: 'CONECTOR UNIVERSAL AMARILLO C/GRASA SILICONA',
          material_unidad_id: 4,
          material_unidad_codigo: 'CU',
          material_unidad_descripcion: 'Cada Uno',
          material_valor: 0.07,
          material_tipo_moneda_id: 1,
          material_origen: 'TELEFONICA',
          material_precio: 0.07,
          material_precio_clp: 56.00000000000001,
        },
      ],
    },
  };

// SERVICIO J456
// DATA UNIDADES OBRAS SERVICIO
export const unidadObrasBucleApoqCobraMatrizCablesJ456MOCK200OK: Response<{
  items: UnidadObraServicio[];
}> = {
  status: { code: 0, desc: '' },
  data: {
    items: [
      {
        id: 2071,
        actividad_id: 9,
        servicio_cod: 'J456',
        unidad_obra_cod: 'D006',
        clave: 'C 012',
        model_servicio_cod: {
          id: 196,
          tipo_servicio_id: 5,
          unidad_id: 4,
          descripcion: 'PREPARAR EXTREMOS DE CABLES GRUPO A (HASTA 300 PRS)',
          codigo: 'J456',
          estado: true,
          es_pack_basico: false,
          cantidad_default: 1,
          codigo_alcance: 'C-000',
          puntos_baremos: 1.09,
          fecha_inicio: '2021-01-01T00:00:00Z',
          fecha_fin: '2027-04-01T17:19:25.995Z',
          requiere_evidencia: false,
        },
        model_unidad_obra_cod: {
          codigo: 'D006',
          descripcion: 'CABLE MTA-E    600-24 (FORMAS)',
          unidad_id: 2,
        },
        model_actividad_id: { id: 9, codigo: 'M', descripcion: 'MATRIZ' },
      },
      {
        id: 2078,
        actividad_id: 9,
        servicio_cod: 'J456',
        unidad_obra_cod: 'D238',
        clave: 'C 012',
        model_servicio_cod: {
          id: 196,
          tipo_servicio_id: 5,
          unidad_id: 4,
          descripcion: 'PREPARAR EXTREMOS DE CABLES GRUPO A (HASTA 300 PRS)',
          codigo: 'J456',
          estado: true,
          es_pack_basico: false,
          cantidad_default: 1,
          codigo_alcance: 'C-000',
          puntos_baremos: 1.09,
          fecha_inicio: '2021-01-01T00:00:00Z',
          fecha_fin: '2027-04-01T17:19:25.995Z',
          requiere_evidencia: false,
        },
        model_unidad_obra_cod: {
          codigo: 'D238',
          descripcion: 'REGLETA CONEX.10/2 QDF-1 MONDR',
          unidad_id: 4,
        },
        model_actividad_id: { id: 9, codigo: 'M', descripcion: 'MATRIZ' },
      },
      {
        id: 2079,
        actividad_id: 9,
        servicio_cod: 'J456',
        unidad_obra_cod: 'D239',
        clave: 'C 012',
        model_servicio_cod: {
          id: 196,
          tipo_servicio_id: 5,
          unidad_id: 4,
          descripcion: 'PREPARAR EXTREMOS DE CABLES GRUPO A (HASTA 300 PRS)',
          codigo: 'J456',
          estado: true,
          es_pack_basico: false,
          cantidad_default: 1,
          codigo_alcance: 'C-000',
          puntos_baremos: 1.09,
          fecha_inicio: '2021-01-01T00:00:00Z',
          fecha_fin: '2027-04-01T17:19:25.995Z',
          requiere_evidencia: false,
        },
        model_unidad_obra_cod: {
          codigo: 'D239',
          descripcion: 'REGLETA CORTE.10/2 QDF-E1 MOND',
          unidad_id: 4,
        },
        model_actividad_id: { id: 9, codigo: 'M', descripcion: 'MATRIZ' },
      },
      {
        id: 2080,
        actividad_id: 9,
        servicio_cod: 'J456',
        unidad_obra_cod: 'D240',
        clave: 'C 012',
        model_servicio_cod: {
          id: 196,
          tipo_servicio_id: 5,
          unidad_id: 4,
          descripcion: 'PREPARAR EXTREMOS DE CABLES GRUPO A (HASTA 300 PRS)',
          codigo: 'J456',
          estado: true,
          es_pack_basico: false,
          cantidad_default: 1,
          codigo_alcance: 'C-000',
          puntos_baremos: 1.09,
          fecha_inicio: '2021-01-01T00:00:00Z',
          fecha_fin: '2027-04-01T17:19:25.995Z',
          requiere_evidencia: false,
        },
        model_unidad_obra_cod: {
          codigo: 'D240',
          descripcion: 'MODULO PROT.GAS. QDF MONDRAGON',
          unidad_id: 4,
        },
        model_actividad_id: { id: 9, codigo: 'M', descripcion: 'MATRIZ' },
      },
      {
        id: 2081,
        actividad_id: 9,
        servicio_cod: 'J456',
        unidad_obra_cod: 'D241',
        clave: 'C 012',
        model_servicio_cod: {
          id: 196,
          tipo_servicio_id: 5,
          unidad_id: 4,
          descripcion: 'PREPARAR EXTREMOS DE CABLES GRUPO A (HASTA 300 PRS)',
          codigo: 'J456',
          estado: true,
          es_pack_basico: false,
          cantidad_default: 1,
          codigo_alcance: 'C-000',
          puntos_baremos: 1.09,
          fecha_inicio: '2021-01-01T00:00:00Z',
          fecha_fin: '2027-04-01T17:19:25.995Z',
          requiere_evidencia: false,
        },
        model_unidad_obra_cod: {
          codigo: 'D241',
          descripcion: 'BLOCK PROT.100/P QDF MONDRAGON',
          unidad_id: 4,
        },
        model_actividad_id: { id: 9, codigo: 'M', descripcion: 'MATRIZ' },
      },
    ],
  },
};

// DETALLES UNIDAD OBRA D241
export const detalleUnidadObraBucleApoqCobraMatrizCablesJ456_D241: Response<DetallesUnidadObraServicio> =
  {
    status: { code: 0, desc: 'OK' },
    data: {
      uo_precio_total_clp: 57200.64,
      uo_codigo: 'D241',
      uo_nombre: 'BLOCK PROT.100/P QDF MONDRAGON',
      uo_unidad_id: 4,
      uo_unidad_codigo: 'CU',
      uo_unidad_descripcion: 'Cada Uno',
      material_arr: [
        {
          material_cantidad: 1,
          material_codigo: '045267',
          material_nombre: 'BLOCK PROTECCION 100/P. QDF - MONDRAGON',
          material_unidad_id: 4,
          material_unidad_codigo: 'CU',
          material_unidad_descripcion: 'Cada Uno',
          material_valor: 71.5008,
          material_tipo_moneda_id: 1,
          material_origen: 'PROVEEDOR',
          material_precio: 71.5008,
          material_precio_clp: 57200.64,
        },
      ],
    },
  };
// DETALLES UNIDAD OBRA D240
export const detalleUnidadObraBucleApoqCobraMatrizCablesJ456_D240: Response<DetallesUnidadObraServicio> =
  {
    status: { code: 0, desc: 'OK' },
    data: {
      uo_precio_total_clp: 3200,
      uo_codigo: 'D240',
      uo_nombre: 'MODULO PROT.GAS. QDF MONDRAGON',
      uo_unidad_id: 4,
      uo_unidad_codigo: 'CU',
      uo_unidad_descripcion: 'Cada Uno',
      material_arr: [
        {
          material_cantidad: 1,
          material_codigo: '072847',
          material_nombre: 'MODULO PROT.GAS QDF 5C23 ORE-MONDRAGON',
          material_unidad_id: 4,
          material_unidad_codigo: 'CU',
          material_unidad_descripcion: 'Cada Uno',
          material_valor: 4,
          material_tipo_moneda_id: 1,
          material_origen: 'PROVEEDOR',
          material_precio: 4,
          material_precio_clp: 3200,
        },
      ],
    },
  };

//  ====  ACTIVIDAD FTTX ====
// DATA TIPO SERVICIO
export const tipoServicioBucleApoqCobraFTTXMOCK200OK: Response<{
  items: TipoServicioContrato[];
}> = {
  status: { code: 0, desc: 'OK' },
  data: {
    items: [
      { id: 2, descripcion: 'FIBRA OPTICA' },
      { id: 4, descripcion: 'LINEAS' },
      { id: 6, descripcion: 'PROYECTOS' },
    ],
  },
};

// ******** ACTIVIDAD FTTX - TIPO SERVICIO PROYECTOS ******
// DATA SERVICIOS PROYECTOS
export const serviciosBucleApoqCobraFTTXProyectosMOCK200OK: Response<{
  items: ServicioAgenciaContratoProveedor[];
}> = {
  status: { code: 0, desc: 'OK' },
  data: {
    items: [
      {
        id: 29,
        codigo: 'D080',
        descripcion:
          'DISEÑO DE RED PARA PROYECTOS DEL TIPO BROWNFIELD (CADA UIP)',
        puntos_baremos: 0.45,
        requiere_evidencia: false,
        unidad_id: 4,
        numero_producto: 'D080',
        unidad_codigo: 'CU',
        unidad_desripcion: 'Cada Uno',
      },
      {
        id: 30,
        codigo: 'D081',
        descripcion:
          'DISEÑO DE RED PARA PROYECTOS DEL TIPO GREENFIELD (CADA UIP)',
        puntos_baremos: 0.45,
        requiere_evidencia: false,
        unidad_id: 4,
        numero_producto: 'D081',
        unidad_codigo: 'CU',
        unidad_desripcion: 'Cada Uno',
      },
      {
        id: 31,
        codigo: 'D082',
        descripcion:
          'DISEÑO EN RED DE FO GPON (FTTX) BROWNFIELD (POR UIP). SOLO DISEÑO',
        puntos_baremos: 0.18,
        requiere_evidencia: false,
        unidad_id: 4,
        numero_producto: 'D082',
        unidad_codigo: 'CU',
        unidad_desripcion: 'Cada Uno',
      },
      {
        id: 32,
        codigo: 'D083',
        descripcion:
          'DISEÑO EN RED DE FO GPON (FTTX) BROWNFIELD (POR UIP). LEVANTAMIENTO DE INFORMACION',
        puntos_baremos: 0.09,
        requiere_evidencia: false,
        unidad_id: 4,
        numero_producto: 'D083',
        unidad_codigo: 'CU',
        unidad_desripcion: 'Cada Uno',
      },
      {
        id: 33,
        codigo: 'D084',
        descripcion:
          'DISEÑO EN RED DE FO GPON (FTTX) BROWNFIELD (POR UIP). ACT. SISTEMAS DE INVENTARIO',
        puntos_baremos: 0.18,
        requiere_evidencia: false,
        unidad_id: 4,
        numero_producto: 'D084',
        unidad_codigo: 'CU',
        unidad_desripcion: 'Cada Uno',
      },
      {
        id: 41,
        codigo: 'D094',
        descripcion:
          'PERMISO PARA IMPLEMENTAR PROYECTOS EN RED DE FO GPON (FTTX) BROWNFIELD. DEL TIPO VERTICAL',
        puntos_baremos: 4,
        requiere_evidencia: false,
        unidad_id: 4,
        numero_producto: 'D094',
        unidad_codigo: 'CU',
        unidad_desripcion: 'Cada Uno',
      },
    ],
  },
};

// SERVICIO D080
// DATA UNIDADES OBRAS SERVICIO
export const unidadObrasBucleApoqCobraFTTXProyectosD080MOCK200OK: Response<{
  items: UnidadObraServicio[];
}> = {
  status: { code: 0, desc: '' },
  data: {
    items: [
      {
        id: 23,
        actividad_id: 13,
        servicio_cod: 'D080',
        unidad_obra_cod: '0',
        clave: '00000',
        model_servicio_cod: {
          id: 29,
          tipo_servicio_id: 6,
          unidad_id: 4,
          descripcion:
            'DISEÑO DE RED PARA PROYECTOS DEL TIPO BROWNFIELD (CADA UIP)',
          codigo: 'D080',
          estado: true,
          es_pack_basico: false,
          cantidad_default: 1,
          codigo_alcance: 'C-000',
          puntos_baremos: 0.45,
          fecha_inicio: '2021-01-01T00:00:00Z',
          fecha_fin: '2027-04-01T17:19:25.995Z',
          requiere_evidencia: false,
        },
        model_unidad_obra_cod: {
          codigo: '0',
          descripcion: 'SIN UO',
          unidad_id: 19,
        },
        model_actividad_id: { id: 13, codigo: 'T', descripcion: 'FTTX' },
      },
    ],
  },
};

// DETALLES SERVICIO D080
export const detallesServicioBucleApoqCobraFTTXProyectosD080MOCKOK: Response<{
  items: DetallesServicioTipoAgenciaContratoProveedor[];
}> = {
  status: { code: 0, desc: 'OK' },
  data: {
    items: [
      {
        servicio_id: 29,
        servicio_codigo: 'D080',
        servicio_nombre:
          'DISEÑO DE RED PARA PROYECTOS DEL TIPO BROWNFIELD (CADA UIP)',
        servicio_tipo: 6,
        tipo_servicio_descripcion: 'PROYECTOS',
        servicio_unidad_id: 4,
        servicio_unidad_codigo: 'CU',
        servicio_unidad_descripcion: 'Cada Uno',
        servicio_baremos: 0.45,
        precio_proveedor: 3300,
        servicio_tipo_moneda_id: 2,
        servicio_tipo_moneda_codigo: 'CLP',
        actividad_id: '13',
        actividad_descripcion: 'FTTX',
        servicio_precio_final: 1485,
        servicio_precio_final_clp: 1485,
        numero_producto: 'D080',
      },
    ],
  },
};

// DETALLES UNIDAD OBRA 0
export const detalleUnidadObraBucleApoqCobraFTTXProyectosD080_0: Response<DetallesUnidadObraServicio> =
  {
    status: { code: 0, desc: 'OK' },
    data: {
      uo_precio_total_clp: 0,
      uo_codigo: '0',
      uo_nombre: 'SIN UO',
      uo_unidad_id: 19,
      uo_unidad_codigo: 'NN',
      uo_unidad_descripcion: 'SIN',
      material_arr: [
        {
          material_cantidad: 0,
          material_codigo: '0',
          material_nombre: 'SIN MATERIAL',
          material_unidad_id: 19,
          material_unidad_codigo: 'NN',
          material_unidad_descripcion: 'SIN',
          material_valor: 0,
          material_tipo_moneda_id: 2,
          material_origen: 'TELEFONICA',
          material_precio: 0,
          material_precio_clp: 0,
        },
      ],
    },
  };
