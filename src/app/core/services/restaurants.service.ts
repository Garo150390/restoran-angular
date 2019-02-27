import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { RestaurantsModel } from '../models';

@Injectable()
export class RestaurantsService {

  constructor(private http: HttpClient) {
  }

  public getRestaurants(): Observable<Array<RestaurantsModel>> {
    return this.http.get<Array<RestaurantsModel>>(`${environment.apiEndPoint}restaurants.json`);
  }

  public getRestaurantById(id): Observable<RestaurantsModel> {
    return this.http.get<RestaurantsModel>(`${environment.apiEndPoint}/restaurants/${id}`)
      .pipe(
        map(res => {
          res.avatar = `${environment.apiEndPoint}/${res.avatar}`;
          return res;
        })
      );
  }

}
