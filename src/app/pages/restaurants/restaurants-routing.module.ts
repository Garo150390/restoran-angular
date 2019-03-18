import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestaurantComponent } from './restaurant/restaurant.component';
import { ProductComponent } from './product/product.component';
import {LocalizeRouterModule} from 'localize-router';

const routes: Routes = [
  {
    path: '',
    component: RestaurantComponent
  },
  {
    path: 'products/:id',
    component: ProductComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    LocalizeRouterModule.forChild(routes)
  ],
  exports: [RouterModule, LocalizeRouterModule]
})
export class RestaurantsRoutingModule { }
