import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss']
})
export class InfoModalComponent {

  constructor(public dialogRef: MatDialogRef<InfoModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

}
