import { Lightbox, LightboxConfig } from 'ngx-lightbox';
import { Component, Input, OnInit } from '@angular/core';

import { OrderProductsModel, ProductsModel } from '../../../../core/models';
import { StorageService } from '../../../../core/services/storage.service';
import { OrderService } from '../../../../core/services/order.service';

@Component({
  selector: 'app-products-card',
  templateUrl: './products-card.component.html',
  styleUrls: ['./products-card.component.scss']
})
export class ProductsCardComponent implements OnInit {

  @Input()
  public product: ProductsModel;

  private album: Array<any> = [];

  constructor(private orderService: OrderService,
              private lightbox: Lightbox, private lightBoxConfig: LightboxConfig) {
    lightBoxConfig.centerVertically = true;
    lightBoxConfig.fitImageInViewPort = false;
  }

  ngOnInit() {
  }

  public addToOrder(product: ProductsModel) {
    const prod: OrderProductsModel = {
      id: product.id,
      title: product.name_en,
      count: 1,
      price: parseInt(product.price, 10),
      img: product.avatar
    };
    this.orderService.addToOrders(prod);
  }

  public open() {
    this.album[0] = { src: this.product.avatar };
    this.lightbox.open(this.album, 0);
  }

  public addToStorage(product: ProductsModel): void {
    console.log(product.id);
    if (StorageService.getData('product')) {
      StorageService.clearItem('product');
    }
    StorageService.saveItem('product', JSON.stringify(product));
  }

}
