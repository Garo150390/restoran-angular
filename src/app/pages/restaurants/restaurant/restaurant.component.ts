import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AllRestaurantModel } from '../../../core/models';
import { RestaurantsService } from '../../../core/services/restaurants.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {

  public restaurant: AllRestaurantModel;

  constructor(private router: ActivatedRoute,
              private restaurantsService: RestaurantsService) { }

  ngOnInit() {
    this.router.params
      .subscribe((data) => {
        this.restaurantsService.getRestaurantById(data.id)
          .subscribe((restaurant) => {
            this.restaurant = restaurant;
          }, (err) => {
            console.log(err);
          });
      }, (err) => {
        console.log(err);
      });

  }

}
