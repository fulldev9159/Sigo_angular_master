import { Accion, PerfilesUsuario, Response } from '@model';
import { createAction, props } from '@ngrx/store';

// GET PERFILES USUARIO
export const getPerfilesUsuario = createAction(
  '[PERFIL] POST getPerfilesUsuario',
  props<{ usuario_id: number }>()
);

export const getPerfilesUsuarioSuccess = createAction(
  '[PERFIL] POST getPerfilesUsuario Success',
  props<{ response: Response<{ perfiles: PerfilesUsuario[] }> }>()
);

export const getPerfilesUsuarioError = createAction(
  '[PERFIL] POST getPerfilesUsuario Error',
  props<{ error: any }>()
);

// GET PERMISOS PERFIL USUARIO
export const getPermisosPerfilUsuario = createAction(
  '[PERFIL] POST getPermisosPerfilUsuario'
);

export const getPermisosPerfilUsuarioSuccess = createAction(
  '[PERFIL] POST getPermisosPerfilUsuario Success',
  props<{ response: Response<{ permisos: Accion[] }> }>()
);

export const getPermisosPerfilUsuarioError = createAction(
  '[PERFIL] POST getPermisosPerfilUsuario Error',
  props<{ error: any }>()
);
