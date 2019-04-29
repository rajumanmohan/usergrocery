import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
@Component({
  selector: 'app-promocodes',
  templateUrl: './promocodes.component.html',
  styleUrls: ['./promocodes.component.less']
})
export class PromocodesComponent implements OnInit {

  constructor(public thisDialogRef: MatDialogRef<PromocodesComponent>, public dialog: MatDialog, ) { }

  ngOnInit() {
  }
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }
}
