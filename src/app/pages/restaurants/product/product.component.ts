import { Component, OnInit } from '@angular/core';

import { StorageService } from '../../../core/services/storage.service';
import { ProductsModel } from '../../../core/models';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public product: ProductsModel;

  constructor() { }

  ngOnInit() {
    this.product = JSON.parse(StorageService.getData('product'));
  }

}
