import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';
import {
  Cubicacion,
  Response,
  ResponseItems,
  Agencias4Cub,
  Proveedores4Cub,
  Carrito,
  RequestEditCubicacion,
  RequestGetDatosServicio4Cub,
  RequestGetDatosUnidadObra4Cub,
  RequestGetServicios4Cub,
  RequestGetUnidadObra4Cub,
  Actividad4Cub,
  DetallesServicio4Cub,
  DetallesUnidadObra4Cub,
  Servicios4Cub,
  UnidadObra4Cub,
  TipoCubicacion4Cub,
  TipoServicioEspecialidad4Cub,
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

  getTipoCubicacion(): Observable<ResponseItems<TipoCubicacion4Cub[]>> {
    return this.http.post<ResponseItems<TipoCubicacion4Cub[]>>(
      `${this.apiUrl}/configuration/tipo_cubicacion/getall`,
      {}
    );
  }

  getActividades4Cub(): Observable<ResponseItems<Actividad4Cub[]>> {
    return this.http.post<ResponseItems<Actividad4Cub[]>>(
      `${this.apiUrl}/configuration/actividad/getall`,
      {}
    );
  }

  getTipoServicioEspecialidad4Cub(
    actividad_id: number,
    contrato_marco_id: number
  ): Observable<ResponseItems<TipoServicioEspecialidad4Cub[]>> {
    return this.http.post<ResponseItems<TipoServicioEspecialidad4Cub[]>>(
      `${this.apiUrl}/cubicacion/tipo_servicio/get`,
      { actividad_id, contrato_marco_id }
    );
  }

  getServicios4Cub(
    request: RequestGetServicios4Cub
  ): Observable<ResponseItems<Servicios4Cub[]>> {
    return this.http.post<ResponseItems<Servicios4Cub[]>>(
      `${this.apiUrl}/cubicacion/combo_servicios/get`,
      request
    );
  }

  getUnidadObra4Cub(
    request: RequestGetUnidadObra4Cub
  ): Observable<ResponseItems<UnidadObra4Cub[]>> {
    return this.http.post<ResponseItems<UnidadObra4Cub[]>>(
      `${this.apiUrl}/cubicacion/unidades_obra_from_servicio/get`,
      request
    );
  }

  getDatosServicio4Cub(
    request_servicio: RequestGetDatosServicio4Cub,
    request_uo: RequestGetDatosUnidadObra4Cub
  ): Observable<Carrito> {
    return this.http
      .post<ResponseItems<DetallesServicio4Cub[]>>(
        `${this.apiUrl}/cubicacion/datos_servicio/get`,
        request_servicio
      )
      .pipe(
        concatMap(datosServicio => {
          return this.http
            .post<Response<DetallesUnidadObra4Cub>>(
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
  ): Observable<Response<DetallesUnidadObra4Cub>> {
    return this.http.post<Response<DetallesUnidadObra4Cub>>(
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
}
