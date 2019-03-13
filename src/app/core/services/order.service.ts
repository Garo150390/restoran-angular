import { ReplaySubject} from 'rxjs';
import { DoCheck, Injectable} from '@angular/core';

import { StorageService } from './storage.service';
import { OrderProductsModel } from '../models';

@Injectable()
export class OrderService implements DoCheck {

  static orders: Array<OrderProductsModel> = [];

  private ordersSubject = new ReplaySubject<number>(1);
  public ordersCount = this.ordersSubject.asObservable();

  constructor() {
    if (StorageService.getData('orders')) {
      OrderService.orders = JSON.parse(StorageService.getData('orders'));
    }
  }

  public addToOrders(product: OrderProductsModel): number {
    let exist = false;
    let index: number;
    OrderService.orders.forEach((prod, i) => {
      if (prod.id === product.id) {
        exist = true;
        index = i;
      }
    });
    if (!exist) {
      OrderService.orders.push(product);
      this.ordersSubject.next(OrderService.orders.length);
      StorageService.saveItem('orders', JSON.stringify(OrderService.orders));
      index = OrderService.orders.length - 1;
    }
    return index;
  }

  ngDoCheck(): void {
    this.ordersSubject.next(OrderService.orders.length);
  }

  public changeDetect() {
    StorageService.saveItem('orders', JSON.stringify(OrderService.orders));
    if (!OrderService.orders.length) {
      return this.ordersSubject.next(0);
    }
    this.ordersSubject.next(OrderService.orders.length);
  }
}
