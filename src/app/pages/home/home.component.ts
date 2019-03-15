import { Component, OnInit } from '@angular/core';

import { RestaurantsService } from '../../core/services/restaurants.service';
import { RestaurantModel } from '../../core/models';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public restaurantsList: Array<RestaurantModel>;
  public error: HttpErrorResponse;

  constructor(private restaurantsService: RestaurantsService) {
  }

  ngOnInit() {
    this.restaurantsService.getRestaurants()
      .subscribe((data) => {
        this.restaurantsList = data;
      },
        (error: HttpErrorResponse) => {
          this.error = error;
        }
      );
  }

}

