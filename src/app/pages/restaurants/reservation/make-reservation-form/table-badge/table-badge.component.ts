import { MatDialog } from '@angular/material';
import { Component, Input } from '@angular/core';

import { ReservationService } from '../../../../../core/services/reservation.service';
import { ReservationModalComponent } from '../../reservation-modal/reservation-modal.component';

@Component({
  selector: 'app-table-badge',
  templateUrl: './table-badge.component.html',
  styleUrls: ['./table-badge.component.scss']
})
export class TableBadgeComponent {

  @Input()
  public time: any;

  constructor(private dialog: MatDialog) { }

  public selectTable(): void {
    ReservationService.request.lunch_start = this.time.startTime;
    ReservationService.request.lunch_end = this.time.endTime;
    this.dialog.open(ReservationModalComponent, {
      width: '550px',
      data: {}
    });
  }

}
