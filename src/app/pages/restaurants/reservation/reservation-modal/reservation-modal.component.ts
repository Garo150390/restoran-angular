import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';

import { ReservationService } from '../../../../core/services/reservation.service';
import { ValidateService } from '../../../../core/services/validate.service';
import { ValidatorHelper } from '../../../../core/helpers/validator.helper';
import { InfoModalComponent } from './info-modal/info-modal.component';

@Component({
  selector: 'app-reservation-modal',
  templateUrl: './reservation-modal.component.html',
  styleUrls: ['./reservation-modal.component.scss']
})
export class ReservationModalComponent implements OnInit {

  public name: FormControl;
  public surname: FormControl;
  public email: FormControl;
  public phone: FormControl;
  public occasions: FormControl;
  public message: FormControl;
  public reservationForms: FormGroup;
  public spinner = false;
  public celebrations = [
    {value: 'birthday', name: 'Birthday'},
    {value: 'anniversary', name: 'Anniversary'},
    {value: 'date-night', name: 'Date night'},
    {value: 'business-meal', name: 'Business meal'},
    {value: 'celebration', name: 'Celebration'},
  ];

  constructor(private reservationService: ReservationService,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<ReservationModalComponent>,
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
    this.surname = new FormControl('', [
      Validators.pattern(ValidatorHelper.nameRegEx)
    ]);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern(ValidatorHelper.emailRegEx),
    ]);
    this.phone = new FormControl('', [
      Validators.required,
      Validators.pattern(ValidatorHelper.phoneRegex),
    ]);
    this.message = new FormControl('');
    this.occasions = new FormControl(null);
  }

  private createForm(): void {
    this.reservationForms = new FormGroup({
      'name': this.name,
      'surname': this.surname,
      'email': this.email,
      'phone': this.phone,
      'occasions': this.occasions,
      'message': this.message,
    });
  }

  public submitReservationForm() {
    if (this.reservationForms.invalid) {
      ValidateService.validateAllFormFields(this.reservationForms);
    } else {
      const orderedData = ReservationService.request;
      const req = this.reservationForms.getRawValue();
      ReservationService.request = {
        ...orderedData,
        ...req,
      };
      console.log(ReservationService.request);
      this.reservationService.bookingTable(ReservationService.request)
        .subscribe((data) => {
          this.dialogRef.close('sax lav e');
          this.dialog.open(InfoModalComponent, {
            width: '550px',
            data: {success: true, data}
          });
          this.spinner = false;
        }, (err: HttpErrorResponse) => {
          console.log(err);
          const error = err.error.errors;
          for (const key in error) {
            if (error.hasOwnProperty(key) && this[key]) {
              this[key].setErrors({'incorrect': error[key][0] || error[key]});
              console.log(this[key]);
            }
          }
          this.spinner = false;
        });
    }
  }
}
