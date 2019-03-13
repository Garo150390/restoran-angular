import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';

import { environment } from '../../../environments/environment';


@Injectable()
export class ReservationService {

  public static request: any = {};

  constructor(private http: HttpClient) { }

  public checkFreeTable(query): Observable<any> {
    const params = new HttpParams().set('check', 'true');
    return this.http.get<any>(`${environment.jsonDB}tables.json`, { params });
  }

  public bookingTable(query): Observable<any> {
    return this.http.post<any>(`${environment.apiEndPoint}/order`, query);
  }
}
