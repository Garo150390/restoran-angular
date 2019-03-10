import { MatDialog } from '@angular/material';
import {
  Component,
  DoCheck,
  OnInit,
} from '@angular/core';

import { OrderModalComponent } from '../order-modal/order-modal.component';
import { StorageService } from '../../../core/services/storage.service';
import { OrderService } from '../../../core/services/order.service';
import { OrderProductsModel } from '../../../core/models';

@Component({
  selector: 'app-ordered-products',
  templateUrl: './ordered-products.component.html',
  styleUrls: ['./ordered-products.component.scss']
})
export class OrderedProductsComponent implements OnInit, DoCheck {

  public products: Array<OrderProductsModel> = OrderService.orders;

  public price: number;

  constructor(private orderService: OrderService,
              public dialog: MatDialog) { }

  ngOnInit() {
    if (this.products.length) {
      this.totalPrice();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(OrderModalComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        OrderService.orders = [];
        this.orderService.changeDetect();
      }
    });
  }

  private totalPrice() {
    const price = this.products.map((x) => {
      return x.price * x.count;
    });
    this.price = price.reduce((x, y) => {
      return x + y;
    });
  }

  public addCount(index) {
    this.products[index].count += 1;
    this.price += this.products[index].price;
  }

  public reduceCount(index) {
    if (this.products[index].count > 1) {
      this.products[index].count -= 1;
      this.price -= this.products[index].price;
    }
  }

  public deleteProduct(index) {
    this.products.splice(index, 1);
    if (this.products.length) {
      this.totalPrice();
    }
    this.orderService.changeDetect();
  }

  ngDoCheck(): void {
    StorageService.saveItem('orders', JSON.stringify(this.products));
  }

}
