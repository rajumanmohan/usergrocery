import { HeaderComponent } from './../header/header.component';
import { appService } from './../../services/mahaliServices/mahali.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { RegistrationComponent } from '../../components/registration/registration.component';
// import { ViewChild } from '@angular/core';
import { forwardRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
    // email: any
    // password: any;
    loginForm: FormGroup;
    submitted = false;
    // @ViewChild(HeaderComponent) headerCmp: HeaderComponent;

    // @ViewChild(forwardRef(() => HeaderComponent))
    // private headerCmp: HeaderComponent;

    // @ViewChild(HeaderComponent) headerCmp: HeaderComponent;

    constructor(public thisDialogRef: MatDialogRef<LoginComponent>,
        public dialog: MatDialog,
        private appService: appService,
        private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.showLogin = true;
        this.showFrgtPswrd = false;
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
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
    get f() { return this.loginForm.controls; }
    onSubmit() {
        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }
        this.appService.login(this.loginForm.value).subscribe(resp => {
            if (resp.json().status === 200) {
                swal(resp.json().message, "", "success");
                this.onCloseCancel();
                // sessionStorage.setItem('token', (resp.json().token));
                this.appService.loginDetailsbyEmail(this.loginForm.value).subscribe(response => {

                })
            }
            else if (resp.json().status === 404 || resp.json().status === 400) {
                swal(resp.json().message, "", "error");
            }
        })
    }

    // login() {
    //     var data = {
    //         email: this.email,
    //         password: this.password
    //     }
    //     this.appService.login(data).subscribe(resp => {
    //         if (resp.json().status === 200) {
    //             swal(resp.json().message, "", "success");
    //             sessionStorage.setItem('token', JSON.stringify(resp.json().token));
    //         }
    //         else if (resp.json().status === 404 || resp.json().status === 400) {
    //             swal(resp.json().message, "", "error");
    //         }
    //     })
    // }
    // changePwd() {
    //     var data = {
    //         email: this.email,
    //         password: this.password
    //     }
    //     this.appService.changePwd(data).subscribe(resp => {

    //     },
    //         error => {
    //             if (error.json().status === 404 || error.json().status === 400) {
    //                 swal(error.json().message, " ", "error");
    //             }
    //         })
    // }
}
