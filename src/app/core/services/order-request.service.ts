import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable()
export class OrderRequestService {

  constructor(private http: HttpClient) {
  }

  public createOrder(order): Observable<any> {
    return this.http.post<any>(`${environment.apiEndPoint}/create_order`, order);
  }

}
