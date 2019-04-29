import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { LoginComponent } from '../../components/login/login.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less']
})
export class RegistrationComponent implements OnInit {

  constructor(public thisDialogRef: MatDialogRef<RegistrationComponent>, public dialog: MatDialog) { }

  ngOnInit() {
  }

  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }

  showLogin() {
    this.onCloseCancel();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(LoginComponent, dialogConfig);

  }

}
