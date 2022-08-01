import { PerfilesUsuario, Response } from '@model';
import { createAction, props } from '@ngrx/store';

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
