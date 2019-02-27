import { NgModule } from '@angular/core';
import { LightboxModule } from 'ngx-lightbox';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MakeReservationFormComponent } from './reservation/make-reservation-form/make-reservation-form.component';
import { TableBadgeComponent } from './reservation/make-reservation-form/table-badge/table-badge.component';
import { ReservationModalComponent } from './reservation/reservation-modal/reservation-modal.component';
import { InfoModalComponent } from './reservation/reservation-modal/info-modal/info-modal.component';
import { ReservationService } from '../../core/services/reservation.service';
import { ReservationComponent } from './reservation/reservation.component';
import { RestaurantsRoutingModule } from './restaurants-routing.module';
import { ProductsComponent } from './menu/products/products.component';
import { ValidateService } from '../../core/services/validate.service';
import { RestaurantComponent } from './restauran/restaurant.component';
import { MenuService } from '../../core/services/menu.service';
import { SharedModule } from '../../shared/shared.module';
import { MenuComponent } from './menu/menu.component';
import { MaterialModule } from './material.module';


@NgModule({
  declarations: [
    RestaurantComponent,
    MenuComponent,
    ProductsComponent,
    ReservationComponent,
    ReservationModalComponent,
    MakeReservationFormComponent,
    TableBadgeComponent,
    InfoModalComponent
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
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
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
