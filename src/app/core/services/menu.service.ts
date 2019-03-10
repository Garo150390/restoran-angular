import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ProductsModel } from '../models';
import { environment } from '../../../environments/environment';

@Injectable()
export class MenuService {

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<Array<ProductsModel>> {
    return this.http.get<Array<ProductsModel>>(`${environment.jsonDB}products.json`);
  }
}
