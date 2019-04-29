import { Component, OnInit } from '@angular/core';
import { appService } from './../../services/mahaliServices/mahali.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-address',
    templateUrl: './address.component.html',
    styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
    bussinessForm: FormGroup;
    StationaryForm: FormGroup;
    bankForm: FormGroup;
    bussiness_first_name_errors = false;
    bussiness_last_name_errors = false;
    mobile_number_errors = false;
    bussiness_email_errors = false;
    bussiness_name_errors = false;
    business_address_errors = false;
    business_country_errors = false;
    business_area_errors = false;
    business_city_errors = false;
    submitted = false;
    vat_number_errors = false;
    cr_number_errors = false;
    account_holder_name_errors = false;
    account_number_errors = false;
    bank_name_errors = false;
    ifsc_code_errors = false;
    bank_area_errors = false;
    bank_city_errors = false;
    bank_branch_errors = false;
    pin_code_errors = false;
    showBusinessDetails = true;
    showStationaryData: boolean = false;
    showBankDetails: boolean = false;
    showAdd: boolean = false;
    retpeaccount_number_errors = false;
    constructor(public appService: appService, private router: Router, private formBuilder: FormBuilder) { }
    //     "first_name":"JyothiN",
    //     "last_name":"sri ",
    // "account_holder_name": "",
    //     "account_number": "0123456789456",
    //     "mobile_number": 8500539819,
    //     "password": "sadssad",
    //     "email": "srijth863.ip@gmail.com",
    //     "bank_name": "versatile",
    //     "ifsc_code": "IFSCCODE000",
    //     "bank_area": "MAdhapur",
    //     "bank_city": "Hyderabad",
    //     "bank_branch": "NRi branch",
    //     "role": "Grocery",
    //     “business_mobile_number”:””
    //     "bussiness_name": "",
    //      "business_address": "",
    //       "business_country": "",
    //       "business_area": "",
    //       "business_city": "",
    //             "business_latitude": "",
    //             "business_longitude": "",
    //   "vat_number": "",
    //             "cr_number": "",
    //     "status": "open"

    ngOnInit() {
        this.bussinessForm = this.formBuilder.group({
            bussiness_first_name: [''],
            bussiness_last_name: [''],
            mobile_number: [''],
            bussiness_email: [''],
            bussiness_name: [''],
            bussiness_address: [''],
            bussiness_country: [''],
            bussiness_area: [''],
            bussiness_city: [''],
            bussiness_pincode: [''],
        });
        this.StationaryForm = this.formBuilder.group({
            vat_number: [''],
            cr_number: ['']
        });
        this.bankForm = this.formBuilder.group({
            account_holder_name: [''],
            account_number: [''],
            retype_account_number: [''],
            bank_name: [''],
            ifsc_code: [''],
            // bank_area: [''],
            // bank_city: [''],
            bank_branch: [''],
        });

    }

    // business form
    get f() { return this.bussinessForm.controls; }

    businessDetails() {
        if (this.bussinessForm.value.bussiness_first_name === '') {
            this.bussiness_first_name_errors = true;
            return;
        } else if (this.bussinessForm.value.bussiness_last_name === '') {
            this.bussiness_first_name_errors = false;
            this.bussiness_last_name_errors = true;
            return;
        }
        else if (this.bussinessForm.value.mobile_number === '') {
            this.bussiness_first_name_errors = false;
            this.bussiness_last_name_errors = false;
            this.mobile_number_errors = true;
            return;
        } else if (this.bussinessForm.value.bussiness_email === '') {
            this.bussiness_first_name_errors = false;
            this.bussiness_last_name_errors = false;
            this.mobile_number_errors = false;
            this.bussiness_email_errors = true;
            return;
        } else if (this.bussinessForm.value.bussiness_name === '') {
            this.bussiness_first_name_errors = false;
            this.bussiness_last_name_errors = false;
            this.mobile_number_errors = false;
            this.bussiness_email_errors = false;
            this.bussiness_name_errors = true;
            return;
        } else if (this.bussinessForm.value.bussiness_address === '') {
            this.bussiness_first_name_errors = false;
            this.bussiness_last_name_errors = false;
            this.mobile_number_errors = false;
            this.bussiness_email_errors = false;
            this.bussiness_name_errors = false;
            this.business_address_errors = true;
            return;
        } else if (this.bussinessForm.value.bussiness_area === '') {
            this.bussiness_first_name_errors = false;
            this.bussiness_last_name_errors = false;
            this.mobile_number_errors = false;
            this.bussiness_email_errors = false;
            this.bussiness_name_errors = false;
            this.business_address_errors = false;
            this.business_area_errors = true;
            return;
        } else if (this.bussinessForm.value.bussiness_city === '') {
            this.bussiness_first_name_errors = false;
            this.bussiness_last_name_errors = false;
            this.mobile_number_errors = false;
            this.bussiness_email_errors = false;
            this.bussiness_name_errors = false;
            this.business_address_errors = false;
            this.business_area_errors = false;
            this.business_city_errors = true;
            return;
        } else if (this.bussinessForm.value.bussiness_country === '') {
            this.bussiness_first_name_errors = false;
            this.bussiness_last_name_errors = false;
            this.mobile_number_errors = false;
            this.bussiness_email_errors = false;
            this.bussiness_name_errors = false;
            this.business_address_errors = false;
            this.business_area_errors = false;
            this.business_city_errors = false;
            this.business_country_errors = true;
            return;
        } else if (this.bussinessForm.value.bussiness_pincode === '') {
            this.bussiness_first_name_errors = false;
            this.bussiness_last_name_errors = false;
            this.mobile_number_errors = false;
            this.bussiness_email_errors = false;
            this.bussiness_name_errors = false;
            this.business_address_errors = false;
            this.business_area_errors = false;
            this.business_city_errors = false;
            this.business_country_errors = false;
            this.pin_code_errors = true;
            return;
        }
        // else if (this.bussinessForm.value.business_address === '') {
        //     this.bussiness_first_name_errors = false;
        //     this.bussiness_last_name_errors = false;
        //     this.mobile_number_errors = false;
        //     this.bussiness_email_errors = false;
        //     this.bussiness_name_errors = false;
        //     this.business_address_errors = true;
        //     return;
        // } else if (this.bussinessForm.value.business_area === '') {
        //     this.bussiness_first_name_errors = false;
        //     this.bussiness_last_name_errors = false;
        //     this.mobile_number_errors = false;
        //     this.bussiness_email_errors = false;
        //     this.bussiness_name_errors = false;
        //     this.business_address_errors = false;
        //     this.business_area_errors = true;
        //     return;
        // } else if (this.bussinessForm.value.business_city === '') {
        //     this.bussiness_first_name_errors = false;
        //     this.bussiness_last_name_errors = false;
        //     this.mobile_number_errors = false;
        //     this.bussiness_email_errors = false;
        //     this.bussiness_name_errors = false;
        //     this.business_address_errors = false;
        //     this.business_area_errors = false;
        //     this.business_city_errors = true;
        //     return;
        // } else if (this.bussinessForm.value.business_country === '') {
        //     this.bussiness_first_name_errors = false;
        //     this.bussiness_last_name_errors = false;
        //     this.mobile_number_errors = false;
        //     this.bussiness_email_errors = false;
        //     this.bussiness_name_errors = false;
        //     this.business_address_errors = false;
        //     this.business_area_errors = false;
        //     this.business_city_errors = false;
        //     this.business_country_errors = true;
        //     return;
        // } else if (this.bussinessForm.value.business_pincode === '') {
        //     this.bussiness_first_name_errors = false;
        //     this.bussiness_last_name_errors = false;
        //     this.mobile_number_errors = false;
        //     this.bussiness_email_errors = false;
        //     this.bussiness_name_errors = false;
        //     this.business_address_errors = false;
        //     this.business_country_errors = false;
        //     this.business_area_errors = false;
        //     this.business_city_errors = false;
        //     this.pin_code_errors = true;
        //     return;
        // }


        // stop here if form is invalid
        // if (this.bussinessForm.invalid) {
        //     return;
        // }
        this.appService.businessDetails(this.bussinessForm.value).subscribe(res => {
            if (res.json().status === 200) {
                swal(res.json().message, "", "success");
                this.bussinessForm.reset();
                this.showStationary();
            } else {
                swal(res.json().message, "", "error");
            }

        }, err => {

        })

    }

    // stationary form
    get f1() { return this.StationaryForm.controls; }

    tax() {
        if (this.StationaryForm.value.vat_number === '') {
            this.vat_number_errors = true;
            return;
        } else if (this.StationaryForm.value.cr_number === '') {
            this.vat_number_errors = false;
            this.cr_number_errors = true;
            return;
        }


        // stop here if form is invalid
        // if (this.StationaryForm.invalid) {
        //     return;
        // }
        this.appService.taxDetails(this.StationaryForm.value).subscribe(res => {
            if (res.json().status === 200) {
                swal(res.json().message, "", "success");
                this.StationaryForm.reset();
                this.showBank();
            } else {
                swal(res.json().message, "", "error");
            }
        }, err => {

        })
    }

    // bank Details form

    get f2() { return this.bankForm.controls; }

    bankDeatails() {
        if (this.bankForm.value.account_holder_name === '') {
            this.account_holder_name_errors = true;
            return;
        }
        else if (this.bankForm.value.account_number === '') {
            this.account_holder_name_errors = false;
            this.account_number_errors = true;
            return;
        } else if (this.bankForm.value.retype_account_number === '') {
            this.account_holder_name_errors = false;
            this.account_number_errors = false;
            this.retpeaccount_number_errors = true;
            return;
        }
        else if (this.bankForm.value.bank_name === '') {
            this.account_holder_name_errors = false;
            this.account_number_errors = false;
            this.bank_name_errors = true;
            this.retpeaccount_number_errors = false;
            return;
        } else if (this.bankForm.value.ifsc_code === '') {
            this.account_holder_name_errors = false;
            this.account_number_errors = false;
            this.bank_name_errors = false;
            this.ifsc_code_errors = true;
            this.retpeaccount_number_errors = false;
            return;
        } else if (this.bankForm.value.bank_area === '') {
            this.account_holder_name_errors = false;
            this.account_number_errors = false;
            this.bank_name_errors = false;
            this.ifsc_code_errors = false;
            this.bank_area_errors = true;
            this.retpeaccount_number_errors = false;
            return;
        } else if (this.bankForm.value.bank_city === '') {
            this.account_holder_name_errors = false;
            this.account_number_errors = false;
            this.bank_name_errors = false;
            this.ifsc_code_errors = false;
            this.bank_area_errors = false;
            this.bank_city_errors = true;
            this.retpeaccount_number_errors = false;
            return;
        } else if (this.bankForm.value.bank_branch === '') {
            this.account_holder_name_errors = false;
            this.account_number_errors = false;
            this.bank_name_errors = false;
            this.ifsc_code_errors = false;
            this.bank_area_errors = false;
            this.bank_city_errors = false;
            this.bank_branch_errors = true;
            this.retpeaccount_number_errors = false;
            return;
        } else if ((this.bankForm.value.account_number) != (this.bankForm.value.retype_account_number)) {
            this.account_holder_name_errors = false;
            this.account_number_errors = false;
            this.bank_name_errors = false;
            this.ifsc_code_errors = false;
            this.bank_area_errors = false;
            this.bank_city_errors = false;
            this.bank_branch_errors = false;
            this.retpeaccount_number_errors = false;
            swal("Account numbers not matched", "", "warning");
            return;
        }



        // stop here if form is invalid
        // if (this.bankForm.invalid) {
        //     return;
        // }
        // if (this.bankData.account_number == this.bankData.retype_acc) {
        // this.bankForm.reset();
        this.appService.bankDetails(this.bankForm.value).subscribe(res => {
            if (res.json().status === 200) {
                swal(res.json().message, "", "success");
                this.bankForm.reset();
                this.router.navigate(['/']);
            } else {
                swal(res.json().error, "", "error");
            }
        }, err => {

        })
        // }
        //  else {
        //     swal("Account number missmatch", "", "error");
        // }

    }



    showBusiness() {
        this.showBusinessDetails = true;
        this.showStationaryData = false;
        this.showBankDetails = false;
        this.showAdd = false;
    }

    showStationary() {
        this.showBusinessDetails = false;
        this.showStationaryData = true;
        this.showBankDetails = false;
        this.showAdd = false;

    }

    showBank() {
        this.showBusinessDetails = false;
        this.showStationaryData = false;
        this.showBankDetails = true;
        this.showAdd = false;
    }

    addProd() {
        this.showBusinessDetails = false;
        this.showStationaryData = false;
        this.showBankDetails = false;
        this.showAdd = true;
    }
    businessData = {
        first_name: '',
        last_name: '',
        mobile_number: '',
        email: '',
        bussiness_name: '',
        business_address: '',
        business_country: '',
        business_area: '',
        business_city: ''
    }
    taxData = {
        vat_number: '',
        cr_number: ''

    }
    bankData = {
        account_holder_name: "",
        account_number: "",
        retype_acc: "",
        bank_name: "",
        ifsc_code: "",
        bank_area: "",
        bank_city: "",
        bank_branch: "",
    }

}
