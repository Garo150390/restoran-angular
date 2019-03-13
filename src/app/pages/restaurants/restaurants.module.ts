import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { NgModule } from '@angular/core';
import { LightboxModule } from 'ngx-lightbox';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProductsCardComponent } from './menu/products-card/products-card.component';
import { ProdutFormComponent } from './product/product-form/produt-form.component';
import {
  TableBadgeComponent
} from './reservation/make-reservation-form/table-badge/table-badge.component';
import {
  MakeReservationFormComponent
} from './reservation/make-reservation-form/make-reservation-form.component';
import { ReservationService } from '../../core/services/reservation.service';
import { ReservationComponent } from './reservation/reservation.component';
import { RestaurantsRoutingModule } from './restaurants-routing.module';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { ValidateService } from '../../core/services/validate.service';
import {
  ReservationModalComponent
} from './reservation/reservation-modal/reservation-modal.component';
import { InfoModalComponent } from './reservation/reservation-modal/info-modal/info-modal.component';
import { MenuService } from '../../core/services/menu.service';
import { ProductComponent } from './product/product.component';
import { MaterialModule } from '../../shared/material.module';
import { SharedModule } from '../../shared/shared.module';
import { MenuComponent } from './menu/menu.component';


@NgModule({
  declarations: [
    RestaurantComponent,
    MenuComponent,
    ProductsCardComponent,
    ReservationComponent,
    ReservationModalComponent,
    MakeReservationFormComponent,
    TableBadgeComponent,
    InfoModalComponent,
    ProductComponent,
    ProdutFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RestaurantsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    LightboxModule,

  ],
  providers: [
    MenuService,
    ReservationService,
    ValidateService
  ],
  entryComponents: [
    ReservationModalComponent,
    MakeReservationFormComponent,
    InfoModalComponent
  ],
})
export class RestaurantsModule { }
