import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';

import {StorageService} from '../services/storage.service';

@Injectable()
export class LangInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request = req.clone({
      headers: new HttpHeaders({
        'lang': StorageService.getData('lang'),
      })
    });
    return next.handle(request);
  }
}

/*headers: new HttpHeaders({
        'lang': StorageService.getData('lang'),
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, HEAD, OPTIONS',
        'Access-Control-Allow-Origin': '*'
      })*/
