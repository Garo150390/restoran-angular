import { ReplaySubject} from 'rxjs';
import { DoCheck, Injectable} from '@angular/core';

import { StorageService } from './storage.service';
import { OrderProductsModel } from '../models';

@Injectable()
export class OrderService implements DoCheck {

  static orders: Array<OrderProductsModel> = [];

  public shmbl: any = [];

  private ordersSubject = new ReplaySubject<number>(1);
  public ordersCount = this.ordersSubject.asObservable();

  constructor() {
    if (StorageService.getData('orders')) {
      OrderService.orders = JSON.parse(StorageService.getData('orders'));
    }
  }

  public addToOrders(product: OrderProductsModel) {
    let exist = false;
    OrderService.orders.forEach((prod) => {
      if (prod.id === product.id) {
        exist = true;
      }
    });
    if (!exist) {
      OrderService.orders.push(product);
      this.ordersSubject.next(OrderService.orders.length);
      StorageService.saveItem('orders', JSON.stringify(OrderService.orders));
      // JSON.parse(StorageService.getData(product.id.toString()));
    }
  }

  ngDoCheck(): void {
    console.log('poxvav');
    this.ordersSubject.next(OrderService.orders.length);
  }

  public changeDetect() {
    StorageService.saveItem('orders', JSON.stringify(OrderService.orders));
    if (!OrderService.orders.length) {
      return this.ordersSubject.next(0);
    }
    console.log(OrderService.orders.length);
    this.ordersSubject.next(OrderService.orders.length);
  }
}
