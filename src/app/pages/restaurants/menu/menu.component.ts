import { trigger, style, animate, transition } from '@angular/animations';
import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';

import { ProductsModel } from '../../../core/models';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({transform: 'scale(0.5)', opacity: 0}),
        animate('.75s ease-out',
          style({transform: 'scale(1)', opacity: 1})
        )
      ]),
      transition(':leave', [
        style({transform: 'scale(1)', opacity: 1, height: '*'}),
        animate('.75s ease-out',
          style({transform: 'scale(0.5)', opacity: 0})
        )
      ]),
    ]),
  ]
})
export class MenuComponent implements OnChanges, AfterViewInit {

  @Input()
  public products: Array<ProductsModel>;
  public productList: Array<ProductsModel>;
  public categories: Array<ProductsModel> = [];

  @ViewChild('filters')
  private filters;
  private childrens;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.products) {
      this.productList = this.products.filter(product => {
        if (product.parent_id === 0) {
          this.categories.push(product);
          return false;
        }
        return true;
      });
    }
  }

  ngAfterViewInit(): void {
    this.childrens = this.filters.nativeElement.children;
  }

  public changeMenu(elem) {
    for (let i = 0; i < this.childrens.length; i += 1) {
      this.childrens[i].classList.remove('active');
    }
    elem.classList.add('active');
    if (elem.dataset.filter === '*') {
      return this.productList = this.products.filter(product => product.parent_id !== 0);
    }
    this.productList = this.products.filter((product) => {
      return product.parent_id === parseInt(elem.dataset.filter, 10);
    });
  }

}
