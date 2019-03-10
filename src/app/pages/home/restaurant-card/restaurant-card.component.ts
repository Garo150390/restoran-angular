import { Component, Input } from '@angular/core';
import { RestaurantModel } from '../../../core/models';

@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.scss']
})
export class RestaurantCardComponent {

  @Input()
  public restaurant: RestaurantModel;

  constructor() { }
}
