import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatSelectModule
} from '@angular/material';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatInputModule,
    MatListModule
  ],
})
export class MaterialModule { }
