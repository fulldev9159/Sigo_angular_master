import { Response, Login, PerfilesUsuario, Accion } from '@model';

export let LoginMock200OK: Response<Login> = {
  status: { code: 0, desc: 'OK' },
  data: {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTg5NzcxNDQsImlzcyI6InNpZ28iLCJuYmYiOjE2NTg5NzM1NDQsInNpZ29fcHJveHlfaWQiOi0xLCJzaWdvX3VzZXJfaWQiOjIsInNpZ29fcGVyZmlsX2lkIjotMX0.P59Wb-rm-bSS-Wc4geOchYlzAfZQZH0Hvqu_O292-dk',
    usuario_id: 2,
    usuario_nombre: 'JESSICA MOVISTAR CASTILLO 1',
  },
};

export let PerfilUserMock200OK: Response<{ perfiles: PerfilesUsuario[] }> = {
  status: { code: 0, desc: 'OK' },
  data: {
    perfiles: [
      {
        id: 2,
        usuario_orig: 2,
        usuario_id: 2,
        perfil_id: 8,
        superior_proxy_id: 1034,
        created_at: null,
        updated_at: null,
        perfil_propio: true,
        model_usuario_orig: {
          id: 2,
          username: 'mgestor1',
          rut: '1173606344',
          nombres: 'Gestor Jessica',
          apellidos: 'Castillo',
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
        model_usuario_id: {
          id: 2,
          username: 'mgestor1',
          rut: '1173606344',
          nombres: 'Gestor Jessica',
          apellidos: 'Castillo',
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
        model_perfil_id: {
          id: 8,
          nombre: 'Gestor/JP',
          descripcion: 'Gestor de proyectos de telefónica',
          eliminable: true,
          created_at: null,
          updated_at: null,
          rol_id: 2,
          model_rol_id: {
            id: 2,
            slug: 'GESTOR',
            nombre: 'Gestor/JP (Telefónica)',
            jerarquia: '6,7',
          },
        },
        model_superior_proxy_id: {
          id: 1034,
          usuario_orig: 1024,
          usuario_id: 1024,
          perfil_id: 9,
          superior_proxy_id: 17,
          created_at: null,
          updated_at: null,
          model_usuario_id: {
            id: 1024,
            username: 'msupervisor1',
            rut: '12312312312',
            nombres: 'Supervisor Josefa',
            apellidos: 'Antonella',
            celular: '22222222222',
            estado: true,
            proveedor_id: 1,
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

export let PerfilUserMock200OKEmpty: Response<{ perfiles: PerfilesUsuario[] }> =
  {
    status: { code: 0, desc: 'OK' },
    data: {
      perfiles: [],
    },
  };

export let LoginRefreshMock200OK: Response<{ token: string }> = {
  status: { code: 0, desc: 'OK' },
  data: {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTk1NDg5OTYsImlzcyI6InNpZ28iLCJuYmYiOjE2NTk1NDUzOTYsInNpZ29fcHJveHlfaWQiOjIsInNpZ29fdXNlcl9pZCI6Miwic2lnb19wZXJmaWxfaWQiOjh9.PBSB2fmv55Jq7GLp5R1ETQLtRjQWQKXpyGfKKbpQGLA',
  },
};

export let getPermisosPerfileUsuarioMOCK200OK: Response<{
  permisos: Accion[];
}> = {
  status: { code: 0, desc: 'OK' },
  data: {
    permisos: [
      {
        id: 1,
        slug: 'OT_LISTAR',
        nombre_corto: 'Listar',
        descripcion: 'Poder visualizar OT',
      },
      {
        id: 2,
        slug: 'OT_CREAR',
        nombre_corto: 'Crear',
        descripcion: 'Poder crear una nueva OT',
      },
      {
        id: 3,
        slug: 'OT_EDITAR',
        nombre_corto: 'Editar',
        descripcion: 'Poder editar una OT',
      },
      {
        id: 4,
        slug: 'OT_ELIMINAR',
        nombre_corto: 'Eliminar',
        descripcion: 'Poder eliminar una OT',
      },
      {
        id: 5,
        slug: 'OT_ANULAR',
        nombre_corto: 'Anular',
        descripcion: 'Poder anular una OT',
      },
      {
        id: 11,
        slug: 'OT_AUTORIZAR_SERV_ADIC',
        nombre_corto: 'Autorizar servicios adicionales',
        descripcion:
          'Poder aceptar o rechazar los servicios adicionales de una OT',
      },
      {
        id: 15,
        slug: 'OT_REGISTRAR_LIBRO_OBRAS',
        nombre_corto: 'Registrar en libro de obras',
        descripcion:
          'Poder registrar actividades en el libro de obras de una OT',
      },
      {
        id: 16,
        slug: 'CUBICACION_LISTAR',
        nombre_corto: 'Listar',
        descripcion: 'Poder listar una cubicación',
      },
      {
        id: 17,
        slug: 'CUBICACION_CREAR',
        nombre_corto: 'Crear',
        descripcion: 'Poder crear una cubicación',
      },
      {
        id: 19,
        slug: 'CUBICACION_EDITAR',
        nombre_corto: 'Editar',
        descripcion: 'Poder editar una cubicación',
      },
      {
        id: 21,
        slug: 'CUBICACION_COPIAR',
        nombre_corto: 'Copiar',
        descripcion: 'Poder copiar una cubicación',
      },
      {
        id: 26,
        slug: 'OT_LISTAR_POR_AREA',
        nombre_corto: 'Listar OTs del Area',
        descripcion: 'Poder listar todas las OTs del área del usuario',
      },
      {
        id: 28,
        slug: 'OT_VER_VALOR_SERV',
        nombre_corto: 'Ver valores de servicio',
        descripcion: 'Poder ver valores de los servicios de una cubicación',
      },
      {
        id: 32,
        slug: 'OT_GENERAR_ACTA',
        nombre_corto: 'Generar Acta',
        descripcion: 'Poder generar acta',
      },
      {
        id: 33,
        slug: 'OT_VALIDAR_ACTA',
        nombre_corto: 'Validar Acta',
        descripcion: 'Poder validar acta',
      },
      {
        id: 34,
        slug: 'OT_CERRAR',
        nombre_corto: 'Cerrar OT',
        descripcion: 'Poder cerrar una OT',
      },
      {
        id: 37,
        slug: 'OT_CONFIRMAR_RECHAZO_OBRAS',
        nombre_corto: 'Confirmar Rechazo Obras',
        descripcion: 'Poder confirmar rechazo de obras',
      },
      {
        id: 38,
        slug: 'OT_SOLICITAR_PAGO',
        nombre_corto: 'Solicitar Pago',
        descripcion: 'Poder solicitar un pago',
      },
      {
        id: 43,
        slug: 'OT_QUEBRAR',
        nombre_corto: 'Quebrar o reanudar una OT',
        descripcion: 'Poder quebrar o reanudar una OT',
      },
      {
        id: 44,
        slug: 'OT_CAMBIAR_SUSTENTO_FINANCIERO',
        nombre_corto: 'Cambiar el Sustento Financiero de una OT',
        descripcion: 'Poder cambiar el sustento financiero de una OT',
      },
      {
        id: 45,
        slug: 'OT_CAMBIAR_ORIGEN_MATERIAL',
        nombre_corto: 'Cambiar el Origen de un Material de la OT',
        descripcion: 'Poder cambiar el origen de un material de la OT',
      },
    ],
  },
};
