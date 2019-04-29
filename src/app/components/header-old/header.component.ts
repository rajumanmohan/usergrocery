import { appService } from './../../services/mahaliServices/mahali.service';
import { UseraccountComponent } from './../useraccount/useraccount.component';
import { Component, OnInit, ViewChild, Input, NgZone } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { LoginComponent } from '../../components/login/login.component';
import { Router } from '@angular/router';
import { RegistrationComponent } from '../../components/registration/registration.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { googlemaps } from 'googlemaps';
import swal from 'sweetalert';
// import { } from '@types/googlemaps';
// declare var google: any;
declare var jQuery: any;
declare var $: any;

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
    @Input() cartCount: number;
    @Input() billing: number;
    registerForm: FormGroup;
    loginForm: FormGroup;
    forgotForm: FormGroup;
    submitted = false;
    loginSubmitted = false;
    forgotSubmitted = false;
    category: any;
    product: any;
    loginDetails: any;
    myAccount: boolean = false;
    changePassForm: FormGroup;
    phone: boolean = false;
    showdetails = false;
    selectedCat;
    cartDetails = [];
    cartData: any = []
    showSubCats = false;
    showCartDetail = false;
    showLoginScreen = true;
    showRegistration = true;
    showOpacity = false;
    showLogin = false;
    IsmodelShow = false;
    showCategories = false;
    changePwSubmitted = false;
    subcat = [];
    subCatData = [];
    subId;
    google: any;
    latlocation;
    lanLocation;
    showLocation = false;
    public addrKeys: string[];
    public addr: object;
    position1;
    positionValue1;
    position;
    positionValue;
    city;
    area;
    state;
    city1;
    pin_code;
    pin_code1;
    Area;
    pinCode1;
    country;
    pincodeData = {
        pin_code: ''
    }
    constructor(public dialog: MatDialog, private router: Router, public appService: appService, private formBuilder: FormBuilder, private zone: NgZone) {
        if (sessionStorage.userId === undefined) {
            this.showRegistration = true;
            this.showLoginScreen = true;
            this.myAccount = false;
        } else {
            this.showRegistration = false;
            this.showLoginScreen = false;
            this.myAccount = true;
            this.phone = true;
            this.userMobile = JSON.parse(sessionStorage.getItem('phone'));
            this.userName = (sessionStorage.getItem('userName'));
        }
        // if (sessionStorage.userId === "undefined") {
        //     // this.getCartWithoutLogin();
        // } else {
        this.getCart();
        this.updateGetCart();
        // }
        // if (sessionStorage.type! = 'vendorGrocery') {
        //     sessionStorage.clear();
        // }
        if (!sessionStorage.country) {
            this.showLocation = true;
        }
    }
    item = {
        quantity: 1
    }
    userMobile;
    userName;
    location;
    position2;
    positionValue2;
    setAddress(addrObj) {
        //We are wrapping this in a NgZone to reflect the changes
        //to the object in the DOM.
        this.zone.run(() => {
            this.addr = addrObj;
            this.addrKeys = Object.keys(addrObj);
            this.position1 = addrObj.formatted_address;
            this.positionValue1 = this.position1.split(',');
            // this.city = this.positionValue1[0].trim();
            // localStorage.setItem('city', this.city);
        });
    }
    setAreaAddress(addrObj) {
        //We are wrapping this in a NgZone to reflect the changes
        //to the object in the DOM.
        this.zone.run(() => {
            this.addr = addrObj;
            this.addrKeys = Object.keys(addrObj);
            this.position2 = addrObj.formatted_address;
            this.positionValue2 = this.position2.split(',');
            this.pin_code = addrObj.postal_code;
            this.country = addrObj.country;
            this.area = addrObj.locality === undefined ? addrObj.admin_area_l1 === undefined ? addrObj.formatted_address : addrObj.admin_area_l1 : addrObj.locality;
            console.log(addrObj);
        });
    }
    submitLocation() {
        this.city = this.position2;
        this.showLocation = false;
        sessionStorage.removeItem("pinCode");
        sessionStorage.setItem("pinCode", this.pin_code);
        sessionStorage.removeItem('city');
        sessionStorage.setItem('city', this.position2);
        this.Area = sessionStorage.city;
        sessionStorage.removeItem("country");
        sessionStorage.setItem('country', this.country);
        sessionStorage.removeItem("Area");
        sessionStorage.setItem('Area', this.area);
        location.reload();
        // sessionStorage.removeItem("pinCode");
        // sessionStorage.setItem("pinCode", this.pin_code)
    }
    ngOnInit() {
        if (sessionStorage.token === undefined) {
            this.showRegistration = true;
            this.showLoginScreen = true;
            this.myAccount = false;
        } else {
            this.showRegistration = false;
            this.showLoginScreen = false;
            this.myAccount = true;
            this.phone = true;
            this.userMobile = JSON.parse(sessionStorage.getItem('phone'));
            this.userName = (sessionStorage.getItem('userName'));
        }
        this.registerForm = this.formBuilder.group({
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            email: ['', Validators.required],
            mobile_number: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            // bussiness_latitude: 16.398956,
            // bussiness_longitude: 78.637009
        });
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
        this.forgotForm = this.formBuilder.group({
            mob_number: ['', [Validators.required]],
        });
        this.changePassForm = this.formBuilder.group({
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
        this.getCategories();
        // this.getProduct();
        if (sessionStorage.userId != undefined) {
            this.updateGetCart();
        }
        this.getCart();
        this.Area = sessionStorage.city;


    }

    showLoginPop() {
        this.showLogin = true;
    }
    showCartItems() {
        this.showCartDetail = !this.showCartDetail;
    }
    showProduxtDetails() {
        this.router.navigate(['/productdetails'], { queryParams: { order: 'popular' } });
    }
    showAddress() {
        this.router.navigate(['/address'], { queryParams: { order: 'popular' } });
    }
    showProbyCat(catId, action, catName) {
        this.showSubCats = false;
        this.showCategories = false;
        this.showOpacity = false;
        // this.selectedCat = index;
        this.router.navigate(['/products'], { queryParams: { catId: catId, action: action, catName: catName } });
        $("#itemdesc").modal("hide");
    }
    showProbySubCat(SubCatId, action, catName, subCat) {
        this.showSubCats = false;
        this.showCategories = false;
        this.showOpacity = false;
        this.router.navigate(['/products'], { queryParams: { subId: SubCatId, action: action, catName: catName, subCat: subCat } });
        $("#itemdesc").modal("hide");
    }
    signOut() {
        // sessionStorage.removeItem('token');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('phone');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('userName');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('session');
        this.showRegistration = true;
        this.showLoginScreen = true;
        this.myAccount = false;
        this.phone = false;
        sessionStorage.clear();
        this.router.navigate(["/"]);
        this.getCart();
        this.ngOnInit();
        location.reload();
    }
    get f() { return this.registerForm.controls; }
    registration(form: FormGroup) {
        this.submitted = true;
        if (this.registerForm.invalid) {
            return;
        }
        this.appService.registration(this.registerForm.value).subscribe(resp => {
            // this.users = resp.json();
            if (resp.json().status === 200) {
                swal(resp.json().message, "", "success");
                jQuery("#signupmodal").modal("hide");
                // this.showRegistration = false;
                sessionStorage.setItem('userId', (resp.json().id));
                // this.myAccount = true
                // this.showOpacity = false;
                // this.onCloseCancel();
                this.router.navigate(['/address']);
            }
            else if (resp.json().status === 400) {
                swal(resp.json().message, "", "error");
                // jQuery("#signupmodal").modal("hide");
            }
        })

    }
    get f1() { return this.loginForm.controls; }
    login() {
        this.loginSubmitted = true;

        if (this.loginForm.invalid) {
            return;
        }
        this.appService.login(this.loginForm.value).subscribe(resp => {
            if (resp.json().status === 200) {
                sessionStorage.setItem("role", resp.json().role)
                if (sessionStorage.role === "vendor") {
                    swal(resp.json().message, "", "success");
                    jQuery("#loginmodal").modal("hide");
                    this.IsmodelShow = true;

                    sessionStorage.setItem('token', (resp.json().token));
                    this.showRegistration = false;
                    this.showLoginScreen = false;
                    this.showLogin = false;
                    this.myAccount = true;
                    this.appService.loginDetailsbyEmail(this.loginForm.value.email).subscribe(response => {
                        sessionStorage.setItem('phone', JSON.stringify(response.json().data[0].mobile_number));
                        sessionStorage.setItem('email', (response.json().data[0].email));
                        sessionStorage.setItem('userId', (response.json().data[0].id));
                        sessionStorage.setItem('userName', (response.json().data[0].first_name) + " " + (response.json().data[0].last_name));
                        // sessionStorage.setItem('pincode', response.json().data[0].bussiness_pincode);
                        this.loginDetails = response.json().data[0];
                        this.router.navigate(['/']);
                        this.phone = true;
                        this.ngOnInit();
                        // window.location.reload();
                    })
                }
            }
            else if (resp.json().status === 404 || resp.json().status === 400 || resp.json().status === 401) {
                swal(resp.json().message, "", "error");
                this.router.navigate(['/address']);
                jQuery("#loginmodal").modal("hide");
                jQuery("#signupmodal").modal("hide");
                sessionStorage.setItem('userId', (resp.json().id));
            }
        })
    }
    getCategories() {
        this.appService.getCategories().subscribe(resp => {
            this.category = resp.json().categories;
            // this.showSubCat(this.subId);
        })
    }

    showSubCat(Id) {
        this.subId = Id;
        this.subCatData = [];
        this.showSubCats = true;
        for (var i = 0; i < this.category.length; i++) {
            for (var j = 0; j < this.category[i].subcategory.length; j++) {
                if (Id === this.category[i].subcategory[j].category_id) {
                    this.category[i].subcategory[j].cat_name = this.category[i].category_name;
                    this.subCatData.push(this.category[i].subcategory[j]);
                }
            }
        }
    }
    // getProduct() {
    //     var inData = {
    //         "country": sessionStorage.country,
    //         "pin_code": sessionStorage.pinCode === "undefined" ? "null" : sessionStorage.pinCode,
    //         "area": sessionStorage.Area === "undefined" ? "null" : sessionStorage.Area
    //     }
    //     this.appService.getProduct(inData).subscribe(resp => {
    //         this.product = resp.json().products;
    //     });
    // }

    get f2() { return this.forgotForm.controls; }
    forgot() {
        this.forgotSubmitted = true;
        if (this.forgotForm.invalid) {
            return;
        }
        var inData = {
            mobile_number: this.forgotForm.value.mob_number
        }
        this.appService.forgotPassword(inData).subscribe(resp => {
            if (resp.json().status === 200) {
                jQuery("#forgotpass").modal("hide");
                swal(resp.json().message, "", "success");
                jQuery("#otpScreen").modal("show");
                sessionStorage.setItem('mobile_number', (this.forgotForm.value.mob_number));
            } else {
                swal(resp.json().message, "", "error");
            }


        }, err => {
            swal(err.json().message, "", "error");
        })
    }
    otpNumber;
    otpScreen() {
        var data = {
            'otp': this.otpNumber,
            'mobile_number': sessionStorage.mobile_number
        }
        this.appService.otpVerify(data).subscribe(resp => {
            if (resp.json().status === 200) {
                swal(resp.json().message, "", "success");
                jQuery("#otpScreen").modal("hide");
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
                jQuery("#changepwd").modal("show");

            } else {
                swal(resp.json().message, "", "error");
            }
        })
        // jQuery("#otpScreen").modal("hide");
        // $('body').removeClass('modal-open');
        // $('.modal-backdrop').remove();
        // jQuery("#changepwd").modal("show");

    }
    get f4() { return this.changePassForm.controls; }
    ChangePw() {
        this.changePwSubmitted = true;

        if (this.changePassForm.invalid) {
            return;
        }
        this.changePassForm.value.mobile_number = sessionStorage.mobile_number;
        this.appService.changePwForgot(this.changePassForm.value).subscribe(resp => {
            if (resp.json().status === 200) {
                swal(resp.json().message, "", "success");
                jQuery("#changepwd").modal("hide");
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
            } else {
                swal(resp.json().message, "", "error");
            }
        }, err => {

        })
    }
    lat;
    long;
    // getLocation(){
    //     if(navigator.geolocation){
    //         navigator.geolocation.getCurrentPosition(position => {
    //             this.lat=position.coords.latitude;
    //             this.long=position.coords.longitude;
    //             var latlng = { lat: this.lat, lng:this.long };

    //            let geocoder = new google.maps.Geocoder();
    //          geocoder.geocode(  {'location':latlng}, (results, status) => {
    //          if (status == google.maps.GeocoderStatus.OK) {
    //          let result = results[0];
    //          let rsltAdrComponent = result.address_components;
    //          let resultLength = rsltAdrComponent.length;
    //          if (result != null) {
    //          } else {
    //          window.alert('Geocoder failed due to: ' + status);
    //          }
    //          }
    //          });
    //          });     
    //        };
    // }
    updateGetCart() {
        var inData = {
            vender_id: sessionStorage.userId
        }
        this.appService.updateGetCart(inData).subscribe(res => {
            console.log(res.json().message);
            this.getCart();
        })
    }



    getCart() {
        var inData = sessionStorage.getItem('userId');
        this.appService.getCart(inData).subscribe(res => {
            // if (res.json().count === 0) {
            //     this.cartCount = res.json().count;
            //     this.billing = 0;
            //     return;
            // } else {
            // if (sessionStorage.userId != undefined) {
            this.cartData = res.json().cart_details;
            this.cartData.sort(function (a, b) {
                var keyA = new Date(a.added_on),
                    keyB = new Date(b.added_on)
                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
                return 0;
            });
            if (this.cartData.length != "undefined") {
                for (var i = 0; i < this.cartData.length; i++) {
                    this.cartData[i].products.skuValue = this.cartData[i].products.sku_details[0].size;
                    this.cartData[i].products.skid = this.cartData[i].products.sku_details[0].skid;
                    this.cartData[i].products.selling_price = this.cartData[i].products.sku_details[0].selling_price;
                    this.cartData[i].products.offer_price = this.cartData[i].products.sku_details[0].offer_price;
                    this.cartData[i].prodName = this.cartData[i].products.product_name;
                    this.cartData[i].products.img = this.cartData[i].products.sku_details[0].sku_images[0].sku_image;
                }
                this.cartCount = res.json().count;
                this.billing = res.json().selling_Price_bill;
            }
            // }

            // }


        }, err => {

        })
    }
    viewCart() {
        if (sessionStorage.userId === undefined) {
            jQuery("#loginmodal").modal("show");
        } else {
            this.router.navigate(["/mycart"]);
        }
    }



    // getCartWithoutLogin() {
    //     this.appService.getCartWithoutLogin().subscribe(res => {
    //         this.cartData = res.json().cart_details;
    //         if (this.cartData.length != "undefined") {
    //             for (var i = 0; i < this.cartData.length; i++) {
    //                 this.cartData[i].products.skuValue = this.cartData[i].products.sku_details[0].size;
    //                 this.cartData[i].products.skid = this.cartData[i].products.sku_details[0].skid;
    //                 this.cartData[i].products.selling_price = this.cartData[i].products.sku_details[0].selling_price;
    //                 this.cartData[i].prodName = this.cartData[i].products.product_name;
    //                 this.cartData[i].products.img = this.cartData[i].products.sku_details[0].sku_images[0].sku_image;
    //             }
    //             this.cartCount = res.json().count;
    //             this.billing = res.json().selling_Price_bill;
    //         }
    //     })
    // }
    delCart(cartId) {
        var inData = cartId;
        this.appService.delCart(inData).subscribe(res => {
            swal(res.json().message, "", "success");
            this.getCart();
        }, err => {

        })
    }
    search(product, action) {
        // this.appService.searchProducts(product).subscribe(res=> {
        if (product!) {
            swal("Required field is missing", "", "warning");
        } else {
            this.router.navigate(['/products'], { queryParams: { product: product, action: action } });

        }// },err=> {

        // })    
    }

    hidesub() {
        this.showCategories = !this.showCategories;
        this.showOpacity = true;
        this.showSubCats = false;
    }
    //modify cart
    itemIncrease(cartId) {
        for (var i = 0; i < this.cartData.length; i++) {
            if (this.cartData[i].cart_id === cartId) {
                this.cartData[i].quantity = this.cartData[i].quantity + 1;
                this.modifyCart(this.cartData[i].quantity, cartId);
                // this.getCart();
                // this.checkProdQuty(cartId, prodId, skuId)
                return;
            }
        }
    }

    itemDecrease(cartId) {
        for (var i = 0; i < this.cartData.length; i++) {
            if (this.cartData[i].cart_id === cartId) {
                if (this.cartData[i].quantity === 1) {
                    this.delCart(cartId);
                    return;
                } else {
                    this.cartData[i].quantity = this.cartData[i].quantity - 1;
                    this.modifyCart(this.cartData[i].quantity, cartId);
                }
                // this.getCart();
                return;
            }
        }

    }

    modifyCart(quantity, cartId) {
        var params = {
            "quantity": quantity
        }

        this.appService.modifyCart(params, cartId).subscribe(resp => {
            if (resp.json().status === 200) {
                // swal(resp.json().message, "", "success");
                jQuery("#signupmodal").modal("hide");
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
                this.getCart();
                // this.showRegistration = false;
                // localStorage.setItem('userId', (resp.json().reg_id));
                // this.myAccount = true
                // this.showOpacity = false;
                // this.onCloseCancel();
                // this.router.navigate(['/address']);
            }
        }, err => {

        })
    }
    checkProdQuty(cartId, prodId, skuId, quantity) {
        this.appService.checkQuty(prodId, skuId, quantity).subscribe(res => {
            if (res.json().status === 200) {
                this.itemIncrease(cartId);
            } else {
                swal(res.json().message, "", "error");
            }
        })
    }
    geoLocation() {
        // if (navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(position => {
            this.latlocation = position.coords.latitude;
            this.lanLocation = position.coords.longitude;
            var latlng = { lat: this.latlocation, lng: this.lanLocation };
            let geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'location': latlng }, (results, status) => {
                if (status == google.maps.GeocoderStatus.OK) {
                    let result = results[0];
                    console.log(result);
                    this.position = result.address_components[0].short_name;
                    this.positionValue = this.position.split('-');
                    this.area = result.address_components[2].long_name;;
                    this.city1 = result.address_components[4].long_name;
                    this.state = result.address_components[7].long_name;
                    this.city = this.position2 === undefined ? this.city1 + " " + this.state : this.position2;
                    this.country = result.address_components[8].long_name;
                    // sessionStorage.setItem('country', this.country);
                    // sessionStorage.setItem('Area', this.area);
                    // sessionStorage.setItem('city', this.city);
                    this.pinCode1 = result.address_components[9].long_name;
                    this.pin_code1 = this.pin_code === undefined ? result.address_components[9].long_name : this.pin_code;
                    // sessionStorage.setItem("pinCode", this.pin_code);
                    sessionStorage.setItem('country', this.country);
                    sessionStorage.setItem('Area', this.area);
                    sessionStorage.setItem('city', this.city);
                    sessionStorage.setItem("pinCode", this.pinCode1);
                    this.Area = sessionStorage.city;
                }
            });
        });
        this.showLocation = false;
    }
    getGeoLocation() {
        sessionStorage.removeItem('city');
        sessionStorage.removeItem("pinCode");
        sessionStorage.removeItem("Area");
        sessionStorage.removeItem("country");
        sessionStorage.setItem('country', this.country);
        sessionStorage.setItem('Area', this.area);
        sessionStorage.setItem('city', this.city);
        sessionStorage.setItem("pinCode", this.pinCode1);
        this.Area = sessionStorage.city;
        this.geoLocation();
        // location.reload();
    }
    showLocation1() {
        this.showLocation = true;
    }
    hideLocation() {
        this.showLocation = false;
    }
}
