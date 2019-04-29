import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { RegistrationComponent } from '../../components/registration/registration.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor(public thisDialogRef: MatDialogRef<LoginComponent>, public dialog: MatDialog, ) { }

  ngOnInit() {
    this.showLogin = true;
    this.showFrgtPswrd = false;
  }

  showLogin: boolean;
  showFrgtPswrd: boolean;
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }

  showRegistration() {
    this.onCloseCancel();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(RegistrationComponent, dialogConfig);

  }

  showforgotPasswrdScreen() {
    this.showLogin = false;
    this.showFrgtPswrd = true;
  }

}
