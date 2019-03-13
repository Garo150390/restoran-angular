import {
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';

import { OrderRequestService } from '../../../core/services/order-request.service';
import { ValidateService } from '../../../core/services/validate.service';
import { ValidatorHelper } from '../../../core/helpers/validator.helper';
import { StorageService } from '../../../core/services/storage.service';
import { InfoModalComponent } from './info-modal/info-modal.component';
import { OrderService } from '../../../core/services/order.service';


@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.scss']
})
export class OrderModalComponent implements OnInit {

  @Output()
  public clearOrders: EventEmitter<boolean> = new EventEmitter();

  public orderForms: FormGroup;
  public name: FormControl;
  public phone: FormControl;
  public address: FormControl;
  public spinner = false;
  public pay: boolean;

  constructor(public dialog: MatDialog,
              public dialogRef: MatDialogRef<OrderModalComponent>,
              private orderRequestService: OrderRequestService,
              @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  private createFormControls(): void {
    this.name = new FormControl('', [
      Validators.required,
      Validators.pattern(ValidatorHelper.nameRegEx)
    ]);
    this.phone = new FormControl('', [
      Validators.required,
      Validators.pattern(ValidatorHelper.phoneRegex)
    ]);
    this.address = new FormControl('', []);
  }

  private createForm(): void {
    this.orderForms = new FormGroup({
      'name': this.name,
      'phone': this.phone,
      'address': this.address,
    });
  }

  public checked(data: boolean) {
    this.pay = data;
  }

  public sendOrderForms() {
    this.spinner = true;
    if (this.orderForms.invalid) {
      ValidateService.validateAllFormFields(this.orderForms);
      this.spinner = false;
    } else {
      const ordersData = OrderService.orders;
      const products = ordersData.map((prod) => {
        const {id: menu_id, count, price} = prod;
        const total = price * count;
        return {menu_id, total, count};
      });
      const delivery_total_price = products.map((prod) => {
        return prod.total;
      }).reduce((x, y) => {
        return x + y;
      });
      const order = {...this.orderForms.getRawValue(), products, total: delivery_total_price};
      this.orderRequestService.createOrder(order)
        .subscribe((data) => {
          this.spinner = false;
          this.dialogRef.close('success');
          this.dialog.open(InfoModalComponent, {
            width: '550px',
            data: { success: true, data }
          });
          StorageService.clearItem('orders');
          OrderService.orders = [];
        }, (err: HttpErrorResponse) => {
          const error = err.error.errors;
          console.log(err);
          const validationError = ValidateService.markAsIncorrect(error, this);
          this.spinner = false;
          if (!validationError) {
            this.dialogRef.close('error');
            this.dialog.open(InfoModalComponent, {
              width: '550px',
              data: { err }
            });
          }
        });
    }
  }

}
