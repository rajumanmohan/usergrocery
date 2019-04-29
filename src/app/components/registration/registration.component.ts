
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { LoginComponent } from '../../components/login/login.component';
import { appService } from './../../services/mahaliServices/mahali.service';
import swal from 'sweetalert';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.less']
})
export class RegistrationComponent implements OnInit {
    registerForm: FormGroup;
    submitted = false;
    users: any;
    firstName;
    lastName;
    email;
    mobile_number;
    password;
    constructor(public thisDialogRef: MatDialogRef<RegistrationComponent>,
        public dialog: MatDialog,
        private appService: appService,
        private formBuilder: FormBuilder
    ) {
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            mobile_number: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
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
    get f() { return this.registerForm.controls; }
    onSubmit() {
        this.submitted = true;
        if (this.registerForm.invalid) {
            return;
        }
        this.appService.registration(this.registerForm.value).subscribe(resp => {
            this.users = resp.json();
            if (resp.json().status === 200) {
                swal(resp.json().message, "", "success");
                this.onCloseCancel();
            }
        })

    }
    // registration() {
    //     var data = {
    //         "first_name": this.firstName,
    //         "last_name": this.lastName,
    //         "email": this.email,
    //         "mobile_number": this.mobile_number,
    //         "password": this.password
    //     }
    //     this.appService.registration(data).subscribe(resp => {
    //         this.users = resp.json();
    //         if (resp.json().status === 200) {
    //             swal("Registration successfully", "", "success");
    //         }
    //     })
    // }
}
