
import { UseraccountComponent } from './../useraccount/useraccount.component';
import { Component, OnInit, ViewChild, Input, NgZone } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { LoginComponent } from '../../components/login/login.component';
import { Router, NavigationExtras } from '@angular/router';
import { RegistrationComponent } from '../../components/registration/registration.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { appService } from './../../services/mahaliServices/mahali.service';
declare var jQuery: any;
declare var $: any;
import { googlemaps } from 'googlemaps';
// import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider } from 'angularx-social-login';
import swal from 'sweetalert';
// import { AuthService } from 'angularx-social-login';
// import { SocialUser } from 'angularx-social-login';
import {
    AuthService,
    SocialUser,
    FacebookLoginProvider,
    GoogleLoginProvider
} from 'angular5-social-login';
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
    forgotForm1: FormGroup;
    otpForm: FormGroup;
    changePassForm: FormGroup;
    submitted = false;
    // loginSubmitted = false;
    forgotSubmitted = false;
    forgotSubmitted1 = false;
    mobile_number;
    category: any;
    product: any;
    loginDetails: any;
    myAccount: boolean = false;
    phone: boolean = false;
    showdetails = false;
    google: any;
    showSubCats = false;
    showCartDetail = false;
    showLoginScreen = true;
    showRegistration = true;
    showOpacity = false;
    showLogin = false;
    IsmodelShow = false;
    showCategories = false;
    changePwSubmitted = false;
    showLocation;
    subcat = [];
    position2;
    positionValue2;
    pin_code;
    country;
    productsData = [];
    productArr = [];
    Area;
    selLogin;
    email_errors = false;
    public addrKeys: string[];
    public addr: object;
    public postal_code: object;
    user: SocialUser;
    public authorized: boolean = false;

    constructor(public dialog: MatDialog, private router: Router, private formBuilder: FormBuilder, public appService: appService, private zone: NgZone, private socialAuthService: AuthService) {
        if (sessionStorage.userId === undefined) {
            this.showRegistration = true;
            this.showLoginScreen = true;
            this.myAccount = false;
        } else {
            this.showRegistration = false;
            this.showLoginScreen = false;
            this.myAccount = true;
            this.phone = true;
            this.userMobile = (sessionStorage.getItem('phone'));
            this.userName = (sessionStorage.getItem('userName'));
            this.getCart();
        }
        this.Area = sessionStorage.city;
        if (!sessionStorage.country) {
            this.showLocation = true;
        }
        this.getCart();
    }
    public socialSignIn(socialPlatform: string) {

        let socialPlatformProvider;
        if (socialPlatform == "facebook") {
            socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
        } else if (socialPlatform == "google") {
            socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
        }

        this.socialAuthService.signIn(socialPlatformProvider).then(
            (userData) => {
                console.log(socialPlatform + " sign in data : ", userData);
                this.user = userData;
                // Now sign-in with userData        
                if (userData != null) {
                    this.authorized = true;
                    this.user = userData;
                    var inData = {
                        email: this.user.email,
                        id: this.user.id,
                        idToken: this.user.idToken,
                        image: this.user.image,
                        name: this.user.name,
                        first_name: this.user.name,
                        provider: this.user.provider,
                        token: this.user.token
                    }
                    this.appService.socialLogin(inData).subscribe(res => {
                        res.json().id ? sessionStorage.setItem('userId', (res.json().id)) : ''
                        swal(res.json().message, "", "success");
                        if (res.json().id != '' || undefined) {
                            this.appService.getDetailsById().subscribe(response => {
                                console.log(response.json());
                                sessionStorage.setItem('phone', (response.json().data[0].mobile_number));
                                sessionStorage.setItem('email', (response.json().data[0].email));
                                sessionStorage.setItem('userId', (response.json().data[0].reg_id));
                                sessionStorage.setItem('userName', (response.json().data[0].first_name) + " " + (response.json().data[0].last_name));
                                this.loginDetails = response.json().data[0];
                                this.showRegistration = false;
                                this.showLoginScreen = false;
                                this.myAccount = true;
                                jQuery("#loginmodal").modal("hide");
                                $('body').removeClass('modal-open');
                                $('.modal-backdrop').remove();
                                this.ngOnInit()
                            })
                        }
                        if (res.json().status == 400) {
                            swal(res.json().message, "", "error");
                        }

                    })
                }
            }
        );

    }

    public signOut() {
        this.socialAuthService.signOut();
        this.authorized = false;
    }
    item = {
        quantity: 1
    }
    userMobile;
    userName;
    location;
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
        if (this.addr) {
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
        } else {
            swal("Please choose location", "", "warning");
            // this.showLocation = false;
        }

        // sessionStorage.removeItem("pinCode");
        // sessionStorage.setItem("pinCode", this.pin_code)
    }
    ngOnInit() {
        if (sessionStorage.userId === undefined) {
            this.showRegistration = true;
            this.showLoginScreen = true;
            this.myAccount = false;
        } else {
            this.showRegistration = false;
            this.showLoginScreen = false;
            this.myAccount = true;
            this.phone = true;
            this.userMobile = (sessionStorage.getItem('phone'));
            this.userName = (sessionStorage.getItem('userName'));
        }
        // this.authService.authState.subscribe((user) => {
        //     this.user = user;
        //     console.log(user);
        // });
        // if ((sessionStorage.token)! === undefined) {
        //     this.showRegistration = false;
        //     this.showLoginScreen = false;
        //     this.myAccount = true;
        // }
        // if(navigator.geolocation){
        //     navigator.geolocation.getCurrentPosition(position => {
        //         this.lat=position.coords.latitude;
        //         this.long=position.coords.longitude;

        //         var latlng = { lat: this.lat, lng:this.long };

        //        let geocoder = new google.maps.Geocoder();
        //      geocoder.geocode(  {'location':latlng}, (results, status) => {
        //      if (status == google.maps.GeocoderStatus.OK) {
        //      let result = results[0];
        //      let rsltAdrComponent = result.address_components;
        //      let resultLength = rsltAdrComponent.length;
        //      if (result != null) {
        //      } else {
        //      window.alert('Geocoder failed due to: ' + status);
        //      }
        //      }
        //      });
        //      });     
        //    };


        // if (navigator.geolocation) {
        //     navigator.geolocation.getCurrentPosition(position => {
        //         this.location = position.coords;
        //     });
        // }
        this.registerForm = this.formBuilder.group({
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            mobile_number: [''],
            password: ['', [Validators.required, Validators.minLength(6)]],
            retype_password: ['', [Validators.required, Validators.minLength(6)]],
            // latitude: 16.398956,
            // longitude: 78.637009
        });
        // this.loginForm = this.formBuilder.group({
        //     email: ['', [Validators.required, Validators.email]],
        //     mobile_number: ['', [Validators.required, Validators.minLength(8)]],
        //     password: ['', [Validators.required, Validators.minLength(6)]]
        // });
        this.loginForm = this.formBuilder.group({
            email: [''],
            mobile_number: [''],
            password: ['']
        });
        this.forgotForm = this.formBuilder.group({
            mob_number: ['', [Validators.required, Validators.minLength(8)]],
        });
        this.forgotForm1 = this.formBuilder.group({
            email_id: ['', [Validators.required]],
        });
        this.otpForm = this.formBuilder.group({
            otp_number: ['', [Validators.required]],
        });
        this.changePassForm = this.formBuilder.group({
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
        this.getCategories();
        this.getProduct();
        if (sessionStorage.userId != undefined) {
            this.updateGetCart();
        }
        this.getCart();
        // if (!sessionStorage.country) {
        //     this.geoLocation();
        // }
        this.Area = sessionStorage.city;
        this.selLogin = 1;
    }
    // signInWithGoogle(): void {
    //     this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(x => console.log(x));
    // }
    // signInWithFB(): void {
    //     this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(x => console.log(x));
    // }

    radioChange(selLogin) {
        this.selLogin = selLogin.value || 1;
    }
    // showLogin() {
    //     const dialogConfig = new MatDialogConfig();
    //     dialogConfig.disableClose = true;
    //     dialogConfig.autoFocus = true;
    //     this.dialog.open(LoginComponent, dialogConfig);
    // }


    // showRegistration() {
    //     const dialogConfig = new MatDialogConfig();
    //     dialogConfig.disableClose = true;
    //     dialogConfig.autoFocus = true;
    //     this.dialog.open(RegistrationComponent, dialogConfig);

    // }
    showLoginPop() {
        this.showLogin = true;
    }
    showCartItems() {
        this.showCartDetail = !this.showCartDetail;
    }
    itemIncrease(cartId) {
        for (var i = 0; i < this.cartData.length; i++) {
            if (this.cartData[i].cart_id === cartId) {
                this.cartData[i].quantity = this.cartData[i].quantity + 1;
                this.modifyCart(this.cartData[i].quantity, cartId);
                // this.getCart();
                return;
            }
        }
    }
    checkProdQuty(cartId, prodId, skuId, quantity, venId, venproId) {
        this.appService.checkQuty(prodId, skuId, quantity, venId, venproId).subscribe(res => {
            if (res.json().status === 200) {
                this.itemIncrease(cartId);
            } else {
                swal(res.json().message, "", "error");
            }
        })
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

    //modify cart
    updateGetCart() {
        var inData = {
            user_id: sessionStorage.userId
        }
        this.appService.updateGetCart(inData).subscribe(res => {
            console.log(res.json().message);
            this.getCart();
        })
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
                // sessionStorage.setItem('userId', (resp.json().reg_id));
                // this.myAccount = true
                // this.showOpacity = false;
                // this.onCloseCancel();
                // this.router.navigate(['/address']);
            }
        }, err => {

        })
    }



    showProduxtDetails(prodId, venId1) {
        this.router.navigate(['/productdetails'], { queryParams: { prodId: prodId, venId1: venId1 } });
        jQuery("#itemdesc").modal("hide");
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    }
    showAddress() {
        this.router.navigate(['/address'], { queryParams: { order: 'popular' } });
    }
    subCatData = [];
    subId;
    showSubCat(Id) {
        this.subId = Id;
        this.subCatData = [];
        this.productArr= [];
        this.showSubCats = true;
        for (var i = 0; i < this.category.length; i++) {
            for (var j = 0; j < this.category[i].subcategory.length; j++) {
                if (Id === this.category[i].subcategory[j].category_id) {
                    this.category[i].subcategory[j].cat_name = this.category[i].category_name;
                    this.subCatData.push(this.category[i].subcategory[j]);
                }
                for (var k = 0; k < this.category[i].subcategory[j].products.length; k++) {
                    if (Id == this.category[i].subcategory[j].category_id) {
                        this.productsData = this.category[i].subcategory[j].products[k];
                        this.productArr.push(this.productsData);
                    }
                }
            }
            
        }
    }
    showProds(Id) {
        this.subId = Id;
        this.showSubCats = true;
        this.productArr = [];
        for (var i = 0; i < this.category.length; i++) {
            for (var j = 0; j < this.category[i].subcategory.length; j++) {
                // if (Id === this.category[i].subcategory[j].category_id) {
                //     this.category[i].subcategory[j].cat_name = this.category[i].category_name;
                //     this.subCatData.push(this.category[i].subcategory[j]);
                // }
                for (var k = 0; k < this.category[i].subcategory[j].products.length; k++) {
                    if (Id === JSON.parse(this.category[i].subcategory[j].products[k].subcategory_id)) {
                        this.productsData = this.category[i].subcategory[j].products[k];
                        this.productArr.push(this.productsData);
                    }
                }

            }
        }
    }
    showProbyCat(catId, action, catName) {
        this.showSubCats = false;
        this.router.navigate(['/products'], { queryParams: { catId: catId, action: action, catName: catName } });
        jQuery("#itemdesc").modal("hide");
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    }
    showProbySubCat(SubCatId, action, catName, subCat) {
        this.showSubCats = false;
        this.router.navigate(['/products'], { queryParams: { subId: SubCatId, action: action, catName: catName, subCat: subCat } });
        jQuery("#itemdesc").modal("hide");
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    }
    signOut1() {
        // sessionStorage.removeItem('token');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('phone');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('userName');
        sessionStorage.removeItem('session');
        this.router.navigate(["/"]);
        if (this.router.navigate(["/"])) {
            location.reload();
        }
        this.showRegistration = true;
        this.showLoginScreen = true;
        this.myAccount = false;
        this.phone = false;
        // sessionStorage.clear();
        this.getCart();
        // location.reload();
    }
    get f() { return this.registerForm.controls; }
    registration(form: FormGroup) {
        this.submitted = true;
        if (this.registerForm.invalid) {
            return;
        }
        if (this.registerForm.value.password != this.registerForm.value.retype_password) {
            swal("Password doesn't matched", "", "warning");
            // return;
        } else {
            this.appService.registration(this.registerForm.value).subscribe(resp => {
                if (resp.json().status === 200) {
                    swal(resp.json().message, "", "success");
                    jQuery("#signupmodal").modal("hide");
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                    // this.showRegistration = false;
                    resp.json().data[0].reg_id ? sessionStorage.setItem('userId', (resp.json().data[0].reg_id)) : '';
                    if (resp.json().data[0].reg_id != '' || undefined) {
                        this.appService.getDetailsById().subscribe(response => {
                            console.log(response.json());
                            sessionStorage.setItem('phone', (response.json().data[0].mobile_number));
                            sessionStorage.setItem('email', (response.json().data[0].email));
                            sessionStorage.setItem('userId', (response.json().data[0].reg_id));
                            sessionStorage.setItem('userName', (response.json().data[0].first_name) + " " + (response.json().data[0].last_name));
                            this.loginDetails = response.json().data[0];
                            this.phone = true;
                            this.showRegistration = false;
                            this.showLoginScreen = false;
                            this.myAccount = true;
                            this.ngOnInit()
                        })
                    }

                } else if (resp.json().status == 400) {
                    swal(resp.json().message, "", "error");
                    // jQuery("#signupmodal").modal("hide");
                }
            }, err => {

            })
        }



    }
    get f1() { return this.loginForm.controls; }
    login() {
        if (this.selLogin == 1) {
            delete this.loginForm.value.mobile_number;
            if (this.loginForm.value.email == '') {
                swal("Required Fields are missing", "", "error");
            }
        } else {
            delete this.loginForm.value.email
            if (this.loginForm.value.mobile_number == '') {
                swal("Required Fields are missing", "", "error");
            }
        }
        // this.loginSubmitted = true;

        // if (this.loginForm.invalid) {
        //     return;
        // }

        this.appService.login(this.loginForm.value).subscribe(resp => {
            if (resp.json().status === 200) {
                sessionStorage.setItem("role", resp.json().role);
                if (sessionStorage.role === "user") {
                    swal(resp.json().message, "", "success");
                    // sessionStorage.setItem('token', JSON.stringify(resp.json().token));
                    jQuery("#loginmodal").modal("hide");
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                    this.showRegistration = false;
                    this.showLoginScreen = false;
                    this.myAccount = true;
                    sessionStorage.setItem('userId', (resp.json().id));
                    if (this.loginForm.value.email != undefined) {
                        this.appService.loginDetailsbyEmail(this.loginForm.value.email).subscribe(response => {
                            console.log(response.json());
                            sessionStorage.setItem('phone', (response.json().data[0].mobile_number));
                            sessionStorage.setItem('email', (response.json().data[0].email));
                            sessionStorage.setItem('userId', (response.json().data[0].reg_id));
                            sessionStorage.setItem('userName', (response.json().data[0].first_name) + " " + (response.json().data[0].last_name));
                            this.loginDetails = response.json().data[0];
                            this.phone = true;
                            this.ngOnInit();

                        })
                    } else {
                        this.appService.getDetailsById().subscribe(response => {
                            console.log(response.json());
                            sessionStorage.setItem('phone', (response.json().data[0].mobile_number));
                            sessionStorage.setItem('email', (response.json().data[0].email));
                            sessionStorage.setItem('userId', (response.json().data[0].reg_id));
                            sessionStorage.setItem('userName', (response.json().data[0].first_name) + " " + (response.json().data[0].last_name));
                            this.loginDetails = response.json().data[0];
                            this.phone = true;
                            this.ngOnInit();

                        })
                    }

                } else {
                    // sessionStorage.removeItem('email');
                    // sessionStorage.removeItem('phone');
                    // sessionStorage.removeItem('userId');
                    // sessionStorage.removeItem('userName');
                }

            }
            else if (resp.json().status === 404 || resp.json().status === 400) {
                swal(resp.json().message, "", "error");
            }
        }, err => {

        })

    }
    getCategories() {
        var params = {
            "country": sessionStorage.country,
            "pin_code": sessionStorage.pinCode === "undefined" ? "null" : sessionStorage.pinCode,
            "area": sessionStorage.Area === "undefined" ? "null" : sessionStorage.Area
        }
        this.appService.getCategories(params).subscribe(resp => {
            this.category = resp.json().categories;
            // this.showSubCat(this.subId);
        })
    }

    getProduct() {

    }

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
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
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
    get f3() { return this.forgotForm1.controls; }
    forgot1() {
        this.forgotSubmitted1 = true;
        if (this.forgotForm1.invalid) {
            return;
        }
        var inData = {
            email: this.forgotForm1.value.email_id
        }
        this.appService.forgotwithEmail(inData).subscribe(resp => {
            if (resp.json().status === 200) {
                jQuery("#forgotpass").modal("hide");
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
                swal(resp.json().message, "", "success");
                jQuery("#otpScreen").modal("show");
                sessionStorage.setItem('mobile_number', (resp.json().mobile_number));
            } else {
                swal(resp.json().message, "", "error");
            }

        }, err => {
            swal(err.json().message, "", "error");
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

    cartDetails = [];
    cartData = [];

    getCart() {
        var inData = sessionStorage.getItem('userId');
        this.appService.getCart(inData).subscribe(res => {
            // if (res.json().count === 0) {
            //     this.cartCount = res.json().count;
            //     this.billing = 0;
            //     return;
            // } else {
            this.cartData = res.json().cart_details;
            this.cartData.sort(function (a, b) {
                var keyA = new Date(a.added_on),
                    keyB = new Date(b.added_on)
                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
                return 0;
            });
            for (var i = 0; i < this.cartData.length; i++) {
                this.cartData[i].prodName = this.cartData[i].products.product_name;
                for (var j = 0; j < this.cartData[i].products.sku_details.length; j++) {
                    this.cartData[i].products.skuValue = this.cartData[i].products.sku_details[0].size;
                    this.cartData[i].products.skid = this.cartData[i].products.sku_details[0].skid;
                    this.cartData[i].products.selling_price = this.cartData[i].price;
                    this.cartData[i].products.offer_price = this.cartData[i].products.sku_details[0].offer_price;
                    this.cartData[i].products.img = this.cartData[i].products.sku_details[j].sku_images[0].sku_image;
                }
            }
            this.cartCount = res.json().count;
            this.billing = res.json().selling_Price_bill;
            // }
        }, err => {

        })
    }
    delCart(cartId) {
        var inData = cartId;
        this.appService.delCart(inData).subscribe(res => {
            swal(res.json().message, "", "success");
            this.getCart();
        }, err => {

        })
    }
    search(product, action) {
        if (product === undefined || "") {
            swal("Please enter field", "", "warning");
        } else {
            this.router.navigate(['/products'], { queryParams: { product: product, action: action } });
        }
    }
    // updateCart() {
    //     var inData =
    //         this.appService.updateCart().subscribe(res => {

    //         }, err => {

    //         })
    // }

    hidesub() {
        this.showCategories = !this.showCategories;
        this.showOpacity = true;
        this.showSubCats = false;
    }
    viewCart() {
        if (sessionStorage.userId === undefined) {
            jQuery("#loginmodal").modal("show");
        } else {
            this.router.navigate(["/Mycart"]);
        }
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
    latlocation;
    lanLocation;
    position;
    positionValue;
    area;
    city;
    city1;
    state;
    pinCode1;
    pin_code1;
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
        this.showLocation = false;
    }
    showLocation1() {
        this.showLocation = true;
    }
    hideLocation() {
        this.showLocation = false;
    }
}
