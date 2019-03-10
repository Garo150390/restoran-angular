import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OrderedProductsComponent } from './ordered-products/ordered-products.component';
import { InfoModalComponent } from './order-modal/info-modal/info-modal.component';
import { OrderRequestService } from '../../core/services/order-request.service';
import { OrderModalComponent } from './order-modal/order-modal.component';
import { ValidateService } from '../../core/services/validate.service';
import { MaterialModule } from '../../shared/material.module';
import { SharedModule } from '../../shared/shared.module';
import { OrderComponent } from './order.component';

@NgModule({
  declarations: [
    OrderModalComponent,
    OrderComponent,
    OrderedProductsComponent,
    InfoModalComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [
    OrderRequestService,
    ValidateService
  ],
  entryComponents: [
    OrderModalComponent,
    InfoModalComponent,
    OrderComponent
  ],
})
export class OrderModule { }
