import {
  Component,
  DoCheck,
} from '@angular/core';

import {OrderService} from '../../core/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements DoCheck {

  public productsCount: number = OrderService.orders.length;

  constructor() {
  }

  ngDoCheck(): void {
    if (!OrderService.orders.length) {
      this.productsCount = 0;
    }
  }

}
