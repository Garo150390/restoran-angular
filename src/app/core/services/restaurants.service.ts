import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import { environment } from '../../../environments/environment';
import {AllRestaurantModel, RestaurantModel, RestaurantsDataModel, SingleRestaurantDataModel} from '../models';

@Injectable()
export class RestaurantsService {

  constructor(private http: HttpClient) {
  }

  public getRestaurants(): Observable<Array<RestaurantModel>> {
    const params = new HttpParams().set('limit', '10').set('offset', '0');
    return this.http.get<RestaurantsDataModel>(`${environment.apiEndPoint}/restaurant`, { params })
      .pipe(
        map( restaurantData => restaurantData.data),
        map(restaurants => {
          restaurants.map(restaurant => {
            restaurant.avatar = `${environment.imagePath}${restaurant.avatar}`;
            return restaurant;
          });
          return restaurants;
        })
      );
  }

  public getRestaurantById(id): Observable<AllRestaurantModel> {
    return this.http.get<SingleRestaurantDataModel>(`${environment.apiEndPoint}/restaurant/${id}`)
      .pipe(
        map( restaurantData => restaurantData.data),
        map(restaurant => {
          restaurant.avatar = `${environment.imagePath}${restaurant.avatar}`;
          restaurant.products.map(product => {
            product.avatar = `${environment.imagePath}${product.avatar}`;
            return product;
          });
          return restaurant;
        })
      );
  }

}
