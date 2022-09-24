import { DetalleOT, Response } from '@model';

export let DetalleOTBucleMOCK200ok: Response<DetalleOT> = {
  status: { code: 0, desc: 'OK' },
  data: {
    ot: {
      id: 1,
      proyecto_id: null,
      propietario_usuario_id: 2,
      responsable_proxy_id: 2,
      tipo_estado_ot_id: 1,
      tipo_etapa_ot_id: 7,
      sce_session: 'SCE-SESSION-DUMMY',
      flg_quiebre: false,
      aceptacion_inicial_id: 1,
      created_at: null,
      nombre: 'OT Test Bucle Cypress',
      cubicacion_id: 7,
      observaciones: '',
      fecha_inicio: null,
      fecha_fin: null,
      tipo_sustento: 'CAPEX',
      es_sustento_provisorio: false,
      pmo_codigo: 25,
      id_opex: null,
      lp: 'CHI100',
      cuenta_sap: null,
      pep2: 'P-0077-22-2002-05106-021',
      ceco: null,
      carta_adjudicacion: null,
      fecha_adjudicacion: null,
      numero_pedido: null,
      materia: null,
      plan_id: null,
      sitio_plan_id: null,
      oficina_central_id: 278,
      solicitante_id: 11,
      direccion: 'aa',
      altura: 'bbb',
      piso: 'ccc',
      departamento: 'ddd',
      comuna_id: 334,
      tipo_red_id: 3,
      tipo_trabajo_id: 8,
      tiene_boleta_garantia: false,
      tiene_permisos: false,
      area_negocio: 'NORMAL',
      nombre_proyectista: 'Andoria algoritmo',
      model_comuna_id: {
        id: 334,
        region_id: 13,
        codigo: 13402,
        nombre: 'Buin',
      },
      model_cubicacion_id: {
        id: 7,
        nombre: 'Cubicacion Bucle Cypress Editada',
        descripcion: 'Una cubicación para realizar pruebas cypress',
        direccion_desde: 'direccion editada',
        altura_desde: 'direccion editada',
        direccion_hasta: 'direccion editada',
        altura_hasta: 'direccion editada',
        tipo_cubicacion_id: 3,
        contrato_id: 9,
        proveedor_id: 15,
        codigo_acuerdo: '330000659',
        cmarco_has_proveedor_id: 7,
        agencia_id: 20,
        usuario_creador_id: 2,
        costo: 2967819.9999999995,
        created_at: null,
        updated_at: null,
        model_contrato_id: {
          id: 9,
          nombre: 'BUCLE',
          fecha_inicio: null,
          fecha_fin: null,
          estado: true,
          tipo_contrato_id: 4,
          costo_max: 5000000000,
          tipo_moneda_id: 2,
          tipo_pago: 'TOTAL',
          aprob_jerarq_inic: true,
          validacion_operaciones: true,
          tiene_encuesta: false,
          model_tipo_contrato_id: { id: 4, nombre: 'Bucle' },
        },
      },
      model_oficina_central_id: {
        id: 278,
        descripcion: 'S.FCO LAS CONDES',
        agencia_id: 20,
        idafac: '0189',
      },
      model_propietario_usuario_id: {
        id: 2,
        username: 'mgestor1',
        guia_subgrupo_id: 4,
        delegated_auth: true,
        password: null,
        rut: '1173606344',
        nombres: 'JESSICA MOVISTAR',
        apellidos: 'CASTILLO 1',
        celular: '5696263509644',
        estado: true,
        proveedor_id: 1,
        area_id: 1,
        email: 'jessica.castillo@telefonica.com',
        firma_archivo_id: null,
        eliminable: true,
        created_at: null,
        updated_at: null,
      },
      model_responsable_proxy_id: {
        id: 2,
        usuario_orig: 2,
        usuario_id: 2,
        perfil_id: 8,
        superior_proxy_id: 1024,
        created_at: null,
        updated_at: null,
        model_usuario_id: {
          id: 2,
          username: 'mgestor1',
          guia_subgrupo_id: 4,
          delegated_auth: true,
          password: null,
          rut: '1173606344',
          nombres: 'JESSICA MOVISTAR',
          apellidos: 'CASTILLO 1',
          celular: '5696263509644',
          estado: true,
          proveedor_id: 1,
          area_id: 1,
          email: 'jessica.castillo@telefonica.com',
          firma_archivo_id: null,
          eliminable: true,
          created_at: null,
          updated_at: null,
        },
      },
      model_solicitante_id: { id: 11, descripcion: 'ATC' },
      model_tipo_estado_ot_id: {
        id: 1,
        slug: 'OT_ST_ABIERTA',
        nombre: 'Abierta',
      },
      model_tipo_etapa_ot_id: {
        id: 7,
        slug: 'OT_ET_EJECUCION_TRABAJOS',
        nombre: 'En Ejecución de Trabajos',
      },
      model_tipo_red_id: { id: 3, descripcion: 'ATP', estado: true },
      model_tipo_trabajo_id: {
        id: 8,
        codigo: 'FOE',
        descripcion: 'FO Empresa',
        estado: true,
        tipo_cubicacion_id: 3,
      },
      model_aceptacion_inicial_id: {
        id: 1,
        ot_id: 1,
        supervisor_usuario_id: 1024,
        jefe_area_usuario_id: 17,
        supervisor_aceptacion_estado: 'ACEPTADO',
        jefe_area_aceptacion_estado: 'ACEPTADO',
        supervisor_aceptacion_fecha: null,
        jefe_area_aceptacion_fecha: null,
        causas_rechazo_id: null,
        observacion: null,
      },
    },
    pdf_inicial: {
      concepto: 'PDF_INICIAL_OT',
      categoria_id: 8,
      categoria_nombre: 'Documento PDF',
      extension: '.pdf',
      nombre_original: '11663985215778529.pdf',
      size: 41327,
      human_size: '41.3 kB',
      url: '/files/repositorio_archivos/download/1pxP98muOBpvkaC9',
      created_at: null,
    },
    numeros_interno: [],
    usuarios_involucrados: [
      {
        id: 1,
        ot_id: 1,
        proxy_id: 1028,
        concepto: 'ADM_CONTRATO',
        model_proxy_id: {
          id: 1028,
          usuario_orig: 1027,
          usuario_id: 1027,
          perfil_id: 2,
          superior_proxy_id: null,
          created_at: null,
          updated_at: null,
          model_usuario_id: {
            id: 1027,
            username: 'ccadmincontrato1',
            guia_subgrupo_id: 5,
            delegated_auth: true,
            password: null,
            rut: '12312312312',
            nombres: 'Luk COBRA CHILE',
            apellidos: 'Antonella',
            celular: '22222222222',
            estado: true,
            proveedor_id: 15,
            area_id: 1,
            email: 'asdasdas@asdasd.com',
            firma_archivo_id: null,
            eliminable: true,
            created_at: null,
            updated_at: null,
          },
        },
      },
      {
        id: 2,
        ot_id: 1,
        proxy_id: 1029,
        concepto: 'SUPERVISOR_DE_TRABAJOS',
        model_proxy_id: {
          id: 1029,
          usuario_orig: 1028,
          usuario_id: 1028,
          perfil_id: 4,
          superior_proxy_id: 1027,
          created_at: null,
          updated_at: null,
          model_usuario_id: {
            id: 1028,
            username: 'cctrabajador1',
            guia_subgrupo_id: 5,
            delegated_auth: true,
            password: null,
            rut: '12312312312',
            nombres: 'Ana COBRA CHILE',
            apellidos: 'Antonella',
            celular: '22222222222',
            estado: true,
            proveedor_id: 15,
            area_id: 1,
            email: 'asdasdas@asdasd.com',
            firma_archivo_id: null,
            eliminable: true,
            created_at: null,
            updated_at: null,
          },
        },
      },
    ],
  },
};
