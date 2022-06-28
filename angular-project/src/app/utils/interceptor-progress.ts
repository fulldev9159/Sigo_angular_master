import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoadingService } from './service-progress';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private loadingS: LoadingService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loadingS.setLoading(true, request.url);
    return next.handle(request).pipe(
      map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
        if (evt instanceof HttpResponse) {
          this.loadingS.setLoading(false, request.url);
        }
        return evt;
      }),
      catchError(err => {
        this.loadingS.setLoading(false, request.url);
        return throwError(err);
      })
    );
  }
}
