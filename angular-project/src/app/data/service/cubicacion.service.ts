import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';
import {
  CubicacionWithLpu,
  ResponseGetCubicaciones,
  ResponseGetLpus,
  RequestEditCubicacion,
  ResponseEditCubicacion,
  Cubicacion,
  StatusResponse,
  AutoSuggestItem,
  ResponseAutoSuggest,
  ResponseDetalleCubicacion,
  DetalleCubicacion,
  ResponseDeleteCubicacion,
  Response,
  ResponseItems,
  Agencias4Cub,
  Proveedores4Cub,
  Carrito,
  RequestGetDatosServicio4Cub,
  RequestGetDatosUnidadObra4Cub,
  RequestGetServicios4Cub,
  RequestGetUnidadObra4Cub,
  RespDataActividad4Cub,
  RespDataGetDatosServicio4Cub,
  RespDataGetDatosUnidadObra4Cub,
  RespDataGetServicios4Cub,
  RespDataGetUnidadObra4Cub,
  RespDataTipoCubicacion4Cub,
  RespDataTipoServicioEspecialidad4Cub,
  DataRespCreateCubicacion,
  DataRespEditCubicacion,
  DatosUnidadObra4Cub,
  RequestCreateCubicacion,
  RequestDeleteDetallesCubicacion,
  RespDataGetDetalleCubs,
} from '@data';
@Injectable({
  providedIn: 'root',
})
export class CubicacionService {
  apiUrl = '';
  constructor(@Inject('environment') environment, private http: HttpClient) {
    this.apiUrl = environment.api || 'http://localhost:4040';
  }
  getAllCubs(): Observable<ResponseItems<Cubicacion[]>> {
    return this.http.post<ResponseItems<Cubicacion[]>>(
      `${this.apiUrl}/cubicacion/table_cubicaciones/get`,
      {}
    );
  }

  getDetalleCub(
    cubicacion_id: number
  ): Observable<Response<RespDataGetDetalleCubs>> {
    return this.http.post<Response<RespDataGetDetalleCubs>>(
      `${this.apiUrl}/cubicacion/detalle/get`,
      { cubicacion_id }
    );
  }

  getAgencia4Cub(
    contrato_id: number
  ): Observable<ResponseItems<Agencias4Cub[]>> {
    return this.http.post<ResponseItems<Agencias4Cub[]>>(
      `${this.apiUrl}/cubicacion/agencias_from_contrato/get`,
      { contrato_id }
    );
  }

  getProveedores4Cub(
    agencia_id: number,
    contrato_id: number
  ): Observable<ResponseItems<Proveedores4Cub[]>> {
    return this.http.post<ResponseItems<Proveedores4Cub[]>>(
      `${this.apiUrl}/cubicacion/proveedores_from_agencia_contrato/get`,
      { agencia_id, contrato_id }
    );
  }

  getTipoCubicacion(): Observable<Response<RespDataTipoCubicacion4Cub>> {
    return this.http.post<Response<RespDataTipoCubicacion4Cub>>(
      `${this.apiUrl}/configuration/tipo_cubicacion/getall`,
      {}
    );
  }

  getActividades4Cub(): Observable<Response<RespDataActividad4Cub>> {
    return this.http.post<Response<RespDataActividad4Cub>>(
      `${this.apiUrl}/configuration/actividad/getall`,
      {}
    );
  }

  getTipoServicioEspecialidad4Cub(
    actividad_id: number,
    contrato_marco_id: number
  ): Observable<Response<RespDataTipoServicioEspecialidad4Cub>> {
    return this.http.post<Response<RespDataTipoServicioEspecialidad4Cub>>(
      `${this.apiUrl}/cubicacion/tipo_servicio/get`,
      { actividad_id, contrato_marco_id }
    );
  }

  getServicios4Cub(
    request: RequestGetServicios4Cub
  ): Observable<Response<RespDataGetServicios4Cub>> {
    return this.http.post<Response<RespDataGetServicios4Cub>>(
      `${this.apiUrl}/cubicacion/combo_servicios/get`,
      request
    );
  }

  getUnidadObra4Cub(
    request: RequestGetUnidadObra4Cub
  ): Observable<Response<RespDataGetUnidadObra4Cub>> {
    return this.http.post<Response<RespDataGetUnidadObra4Cub>>(
      `${this.apiUrl}/cubicacion/unidades_obra_from_servicio/get`,
      request
    );
  }

  getDatosServicio4Cub(
    request_servicio: RequestGetDatosServicio4Cub,
    request_uo: RequestGetDatosUnidadObra4Cub
  ): Observable<Carrito> {
    return this.http
      .post<Response<RespDataGetDatosServicio4Cub>>(
        `${this.apiUrl}/cubicacion/datos_servicio/get`,
        request_servicio
      )
      .pipe(
        concatMap(datosServicio => {
          return this.http
            .post<Response<RespDataGetDatosUnidadObra4Cub>>(
              `${this.apiUrl}/cubicacion/datos_unidad_obra_material/get`,
              request_uo
            )
            .pipe(
              map(datosUO => {
                const uos: DatosUnidadObra4Cub[] = [];
                uos.push({
                  ...datosUO.data,
                });
                const carrito: Carrito = {
                  ...datosServicio.data.items[0],
                  unidades_obras: uos,
                };
                return carrito;
              })
            );
        })
      );
  }

  getDatosUnidadObra4Cub(
    request: RequestGetDatosUnidadObra4Cub
  ): Observable<Response<RespDataGetDatosUnidadObra4Cub>> {
    return this.http.post<Response<RespDataGetDatosUnidadObra4Cub>>(
      `${this.apiUrl}/cubicacion/datos_unidad_obra_material/get`,
      request
    );
  }

  createCubicacion(
    request: RequestCreateCubicacion
  ): Observable<Response<DataRespCreateCubicacion>> {
    return this.http.post<Response<DataRespCreateCubicacion>>(
      `${this.apiUrl}/cubicacion/cubicacion/save`,
      request
    );
  }

  editCubicacion(
    request: RequestEditCubicacion
  ): Observable<Response<DataRespEditCubicacion>> {
    return this.http.post<Response<DataRespEditCubicacion>>(
      `${this.apiUrl}/cubicacion/cubicacion/save`,
      request
    );
  }

  deleteCubicacion(cubicacion_id: number): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.apiUrl}/cubicacion/cubicacion/delete`,
      { cubicacion_id }
    );
  }

  deleteServicioUOCarrito(
    request: RequestDeleteDetallesCubicacion
  ): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.apiUrl}/cubicacion/detalles_cubicacion/delete`,
      request
    );
  }

  //   ///

  getAutosuggestNameCubicacion(
    filtro: string,
    cantidad: number
  ): Observable<{
    autosuggests: AutoSuggestItem[];
    status: any;
  }> {
    return this.http
      .post<ResponseAutoSuggest>(
        `${this.apiUrl}/cubicacion/autosuggest/nombre`,
        {
          filtro,
          cantidad,
        }
      )
      .pipe(
        map(res => {
          return {
            autosuggests: res.data.items
              ? res.data.items.map((x, i) => ({
                  id: +i + 1,
                  name: x,
                }))
              : [],
            status: {
              description: res.status.description,
              responseCode: res.status.responseCode,
            },
          };
        })
      );
  }

  getCubicaciones(): Observable<{
    cubs: Cubicacion[];
    status: any;
  }> {
    return this.http
      .post<ResponseGetCubicaciones>(`${this.apiUrl}/cubicacion/get`, {})
      .pipe(
        map(res => {
          return {
            cubs: res.data.items,
            status: {
              description: res.status.description,
              responseCode: res.status.responseCode,
            },
          };
        })
      );
  }

  getDetalleCubicacion(cubicacion_id: number): Observable<{
    detallecubicacion: DetalleCubicacion[];
    status: any;
  }> {
    return this.http
      .post<ResponseDetalleCubicacion>(
        `${this.apiUrl}/cubicacion/detalle/get`,
        {
          cubicacion_id,
        }
      )
      .pipe(
        map(res => {
          return {
            detallecubicacion: res.data.items,
            status: {
              description: res.status.description,
              responseCode: res.status.responseCode,
            },
          };
        })
      );
  }

  // getCubicacion(cubicacion_id: number): Observable<CubicacionWithLpu> {
  //   return this.http
  //     .post<ResponseGetCubicaciones>(`${this.apiUrl}/cubicacion/get`, {})
  //     .pipe(
  //       concatMap((cubsRes: ResponseGetCubicaciones) => {
  //         const cubFound = cubsRes.data.items.find(
  //           cub => cub.id === cubicacion_id
  //         );
  //         if (cubFound) {
  //           return this.http
  //             .post<ResponseGetLpus>(`${this.apiUrl}/cubicacion/detalle/get`, {
  //               cubicacion_id,
  //             })
  //             .pipe(
  //               map((lpusRes: ResponseGetLpus) => {
  //                 const lpus = lpusRes.data.items;

  //                 const cubicacion: CubicacionWithLpu = {
  //                   ...cubFound,
  //                   lpus,
  //                 };

  //                 return cubicacion;
  //               })
  //             );
  //         }

  //         return throwError(new Error(`no cubages found`));
  //       })
  //     );
  // }

  // createCubicacion(
  //   cubicacion: any
  // ): Observable<{ response: any; status: any }> {
  //   return this.http
  //     .post<ResponseEditCubicacion>(
  //       `${this.apiUrl}/cubicacion/create`,
  //       cubicacion
  //     )
  //     .pipe(
  //       map(res => {
  //         return {
  //           response: res.data.id,
  //           status: {
  //             description: res.status.description,
  //             responseCode: res.status.responseCode,
  //           },
  //         };
  //       })
  //     );
  // }

  updateCubicacion(
    request: RequestEditCubicacion
  ): Observable<{ cub_id: number; status: any }> {
    return this.http
      .post<ResponseEditCubicacion>(`${this.apiUrl}/cubicacion/edit`, request)
      .pipe(
        map(res => {
          return {
            cub_id: res.data.id,
            status: {
              description: res.status.description,
              responseCode: res.status.responseCode,
            },
          };
        })
      );
  }

  // deleteOT(cubicacion_id: number): Observable<{ cub_id: number; status: any }> {
  //   return this.http
  //     .post<ResponseDeleteCubicacion>(`${this.apiUrl}/cubicacion/delete`, {
  //       cubicacion_id,
  //     })
  //     .pipe(
  //       map(res => {
  //         return {
  //           cub_id: res.data.id,
  //           status: {
  //             description: res.status.description,
  //             responseCode: res.status.responseCode,
  //           },
  //         };
  //       })
  //     );
  // }
}
