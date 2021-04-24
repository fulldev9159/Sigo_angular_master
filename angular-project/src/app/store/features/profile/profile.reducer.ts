import { createReducer, on } from '@ngrx/store';
import * as ProfileActions from './profile.actions';
import * as Model from './profile.model';

export const ProfileFeatureKey = 'profile';

export interface StateProfile {
  items: Model.Profile[];
  permissions: Model.Permit[];
}

export const initialStateProfile: StateProfile = {
  items: [
    {
      id: 1,
      name: 'Gestor',
      descripcion: 'Perfil que gestiona las Cubicaciones y OTs',
      fecha_creacion: new Date("2021-03-01T03:00:00.000Z"),
      fecha_actualizacion: new Date("2021-03-28T03:00:00.000Z"),
      permissions: [
        {
          id: 1,
          slug: 'OT_LIST',
          nombre_corto: '',
          descripcion: '',
          module: ''
        },
        {
          id: 2,
          slug: 'OT_CREATE',
          nombre_corto: '',
          descripcion: '',
          module: ''
        },
        {
          id: 3,
          slug: 'OT_EDIT',
          nombre_corto: '',
          descripcion: '',
          module: ''
        },
        {
          id: 6,
          slug: 'OT_DELETE',
          nombre_corto: '',
          descripcion: '',
          module: ''
        },
        {
          id: 7,
          slug: 'CUBAGE_LIST',
          nombre_corto: '',
          descripcion: '',
          module: ''
        },
        {
          id: 8,
          slug: 'CUBAGE_CREATE',
          nombre_corto: '',
          descripcion: '',
          module: ''
        },
        {
          id: 11,
          slug: 'CUBAGE_EDIT',
          nombre_corto: '',
          descripcion: '',
          module: ''
        },
      ],
    },
    {
      id: 2,
      name: 'Administrador de contrato',
      descripcion: 'Perfil para quien de parte del proveedor asignado gestione el equipo que ejecutará los trabajos',
      fecha_creacion: new Date("2021-03-01T03:00:00.000Z"),
      fecha_actualizacion: new Date("2021-03-28T03:00:00.000Z"),
      permissions: [
        {
          id: 1,
          slug: 'OT_LIST',
          nombre_corto: '',
          descripcion: '',
          module: ''
        },
        {
          id: 3,
          slug: 'OT_ACCEPT',
          nombre_corto: '',
          descripcion: '',
          module: ''
        },
        {
          id: 4,
          slug: 'OT_REJECT',
          nombre_corto: '',
          descripcion: '',
          module: ''
        },
      ],
    },
  ],
  permissions: []
};

export const reducerProfile = createReducer(
  initialStateProfile,

  on(ProfileActions.getProfile, (state) => state),
  on(ProfileActions.getProfileSuccess, (state, payload) => ({
    ...state,
    items: payload.profile,
  })),
  on(ProfileActions.deleteProfile, (state, payload) => ({
    ...state,
    items: [
      ...state.items.slice(0, payload.profilePosition),
      ...state.items.slice(payload.profilePosition + 1)
    ],
  })),

  on(ProfileActions.getPermissions, (state) => state),
  on(ProfileActions.getPermissionsSuccess, (state, payload) => ({
    ...state,
    permissions: payload.permissions
  })),
);
