import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {OrderProductsModel, ProductsModel} from '../../../../core/models';
import {StorageService} from '../../../../core/services/storage.service';
import {OrderService} from '../../../../core/services/order.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProdutFormComponent implements OnInit, OnDestroy {

  @Input()
  private product: ProductsModel;
  public count = 1;
  private orders: Array<OrderProductsModel> = OrderService.orders;
  private orderIndex: number;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    if (this.orders.length) {
      this.orders.forEach((product, i) => {
          if (product.id === this.product.id) {
            this.count = product.count;
            this.orderIndex = i;
          }
      });
    }
  }

  public addToOrder() {
    if (this.orderIndex) {
      return this.orderIndex;
    }
    const prod: OrderProductsModel = {
      id: this.product.id,
      title: this.product.name,
      count: 1,
      price: parseInt(this.product.price, 10),
      img: this.product.avatar
    };
    this.orderIndex = this.orderService.addToOrders(prod);
  }

  public addCount() {
    this.count += 1;
  }

  public reduceCount() {
    if (this.count > 1) {
      this.count -= 1;
    }
  }

  ngOnDestroy(): void {
    if (this.orderIndex >= 0) {
      this.orders[this.orderIndex].count = this.count;
      StorageService.saveItem( 'orders', JSON.stringify(this.orders));
    }
  }

}
