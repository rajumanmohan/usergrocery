import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { ItemsComponent } from '../../components/items/items.component';
import { PromocodesComponent } from '../../components/promocodes/promocodes.component';
import { appService } from './../../services/mahaliServices/mahali.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert';
@Component({
    selector: 'app-mycart',
    templateUrl: './mycart.component.html',
    styleUrls: ['./mycart.component.less']
})
export class MycartComponent implements OnInit {
    addressForm: FormGroup;
    submitted = false;
    showCartItems = true;
    showDeliveryAddress = false;
    showAddresses = true;
    showPaymentMethode = false;
    showDeliveryType = false;
    addresses = false;
    fruits = [];
    sortData = [];
    shipment2: boolean;
    meridian = true;
    showDate = true;
    showTime = true;
    skid;
    disDate;
    disTime;
    time = { hour: 13, minute: 30 };
    constructor(public dialog: MatDialog, public appService: appService, private router: Router, private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.addressForm = this.formBuilder.group({
            full_name: ['', Validators.required],
            mobile_number: ['', Validators.required],
            house_no: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            landmark: ['', Validators.required],
            pin_code: ['', Validators.required],
            // address_type: this.type
        });
        this.getCart();
        this.getVouchers();
        this.getAdd();
        this.getSlots();
        this.paymentOptions();
        this.fruits = [
            {
                cart_id: 1,
                prodName: "Fresh Vegetables"
            },
            {
                cart_id: 6,
                prodName: "one Vegetables"
            },
            {
                cart_id: 3,
                prodName: "two Vegetables"
            }
        ];
        this.sortData = this.fruits.sort();
        console.log(this.sortData);
        this.disDate = new Date();
        this.disTime = new Date().getTime()
    }
    onDateChanged(date) {
        // alert(date)
    }
    Date() {
        this.showDate = true;
        this.showTime = false;
    }
    Time() {
        this.showTime = true;
        this.showDate = false;
    }
    get f() { return this.addressForm.controls; }

    saveAddress() {
        this.addressForm.value.address_type = this.type;
        this.submitted = true;
        if (this.addressForm.invalid) {
            return;
        }
        this.appService.addaddress(this.addressForm.value).subscribe(res => {
            this.getAdd();
            this.showAddresses = true;
            this.addresses = false;

        })
        // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
    }
    toggleMeridian() {
        this.meridian = !this.meridian;
    }


    // saveAddress() {
    //     var inData = {
    //         "full_name": this.addData.full_name,
    //         "mobile_number": this.addData.mobile_number,
    //         "house_no": this.addData.house_no,
    //         "city": this.addData.city,
    //         "state": this.addData.state,
    //         "landmark": this.addData.landmark,
    //         "pin_code": this.addData.pin_code,
    //         "address_type": this.type,

    //     }
    //     this.appService.addaddress(inData).subscribe(res => {
    //         this.getAdd();
    //         this.showAddresses = true;
    //         this.addresses = false;

    //     })

    // }

    showCart() {
        this.showCartItems = !this.showCartItems;
        this.showDeliveryAddress = false;
        this.showPaymentMethode = false;
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
    checkProdQuty(cartId, prodId, skuId, qunt, venId, venprodId) {
        this.appService.checkQuty(prodId, skuId, qunt, venId, venprodId).subscribe(res => {
            if (res.json().status === 200) {
                this.itemIncrease(cartId);
            } else {
                swal(res.json().message, "", "error");
            }
        })
    }

    //modify cart

    modifyCart(quantity, cartId) {
        var params = {
            "quantity": quantity
        }

        this.appService.modifyCart(params, cartId).subscribe(resp => {
            if (resp.json().status === 200) {
                // swal(resp.json().message, "", "success");
                // jQuery("#signupmodal").modal("hide");
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


    //show addrss
    showAddress() {
        this.showCartItems = false;
        this.showDeliveryAddress = !this.showDeliveryAddress;
        this.showPaymentMethode = false;
        this.addresses = false;
        this.showAddresses = true;
        this.showDeliveryType = false;
        window.scrollTo(0, 0);
    }
    addData = {
        full_name: "",
        mobile_number: "",
        house_no: "",
        city: "",
        state: "",
        landmark: "",
        pin_code: "",
        address_type: "",
        vendor_id: 44


    }
    //add address
    addAddress() {
        this.addresses = true;
        this.showAddresses = false;
    }

    type;
    Type(type) {
        this.type = type;
    }
    //save address


    //showPayment
    showPayment() {
        this.showPaymentMethode = !this.showPaymentMethode;
        this.showCartItems = false;
        this.showAddresses = false;
        this.showDeliveryAddress = false;
        window.scrollTo(0, 0);
    }
    payOptions = [];
    paymentOptions() {
        this.appService.paymentType().subscribe(res => {
            this.payOptions = res.json().options;
        }, err => {

        })
    }
    seleOpt;
    payId;
    selePayOptn(index, Id) {
        this.seleOpt = index;
        this.payId = Id;
    }

    // show shipment type
    shipmentType(addId) {
        this.addresses = false;
        this.showAddresses = false;
        this.showDeliveryType = true;
        this.addId = addId;
        this.selectAdd(this.addId);
    }
    selectAdd(id) {
        this.appService.setDelAdd(this.addId).subscribe(res => {
            swal("Selected successfully", "", "success");
            this.getAdd();
            this.getSlots();
        })
    }
    cartData = [];
    cartCount;
    billing;
    skuData = [];
    skuArr = [];
    offer_price;
    changeData(prodId) {
        this.getCart();
        for (var i = 0; i < this.cartData.length; i++) {
            // for(var j = 0;j<this.cartData[i].products;j++){
            for (var k = 0; k < this.cartData[i].products.sku_details.length; k++) {
                if (parseInt(prodId) === this.cartData[i].products.sku_details[k].skid) {
                    this.skuData = this.cartData[i].products.sku_details[k];
                    this.offer_price = this.cartData[i].products.sku_details[k].offer_price;
                }
            }
        }
    }
    getAddData = [];
    testData = [];
    getAdd() {
        this.appService.getAddress().subscribe(res => {
            this.getAddData = res.json().delivery_address;
        }, err => {

        })
    };
    cartArr = [];
    getCart() {
        var inData = sessionStorage.getItem('userId');
        this.appService.getCart(inData).subscribe(res => {
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
                    this.cartData[i].skuValue = this.cartData[i].products.sku_details[0].size;
                    this.cartData[i].skuValue = this.cartData[i].products.sku_details[0].size;
                    this.cartData[i].skid = this.cartData[i].products.sku_details[0].skid;
                    this.cartData[i].selling_price = this.cartData[i].price;
                    this.cartData[i].actual_price = parseInt(this.cartData[i].price) + parseInt(this.cartData[i].updated_discount);
                    this.cartData[i].offer_price = this.cartData[i].products.sku_details[0].offer_price;
                    this.cartData[i].img = this.cartData[i].products.sku_details[j].sku_images[0].sku_image;
                    // this.cartArr.push(this.cartData[i].products);
                }
            }
            // this.cartArr.sort(function (a, b) {
            //     var keyA = a.product_name,
            //         keyB = b.product_name;
            //     // Compare the 2 dates
            //     if (keyA < keyB) return -1;
            //     if (keyA > keyB) return 1;
            //     return 0;
            // });
            // console.log(this.cartArr);
            this.cartCount = res.json().count;
            this.billing = res.json().selling_Price_bill;
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
    voucherData = [];
    getVouchers() {
        this.appService.getVouchers().subscribe(res => {
            if (res.json().message === "success") {
                this.voucherData = res.json().data;
            }

        }, err => {

        })
    }
    applyVoucher(vouCode) {
        var inData = {
            vocherCode: vouCode,
            amount: this.billing
        }
        this.appService.applyVoucher(inData).subscribe(res => {
            if (res.json().status === 200) {
                console.log(res.json());
                swal(res.json().message, "", "success");
            }
            if (res.json().status === 400) {
                swal(res.json().message, "", "error");
            }
        }, err => {
            swal(err.json().message, "", "error");
        });
    }
    selAdd;
    slotData;
    delSlots;
    getSlots() {
        this.appService.getSlots().subscribe(res => {
            if (res.json().status === 200) {
                this.selAdd = res.json().delivery_address[0];
                this.slotData = res.json();
                this.delSlots = res.json().delivery_slots;
                this.slotId = res.json().delivery_slots[0].id;
            }

        }, err => {
            swal(err.json().message, "", "error");
        });
    }
    proceed() {
        this.addresses = false;
        this.showAddresses = false;
        this.showDeliveryType = false;
        this.showPaymentMethode = true;
        this.showDeliveryAddress = false;
    }
    changeSlot(slot) {
        this.slotId = slot;
    }
    checkout() {
        this.showCartItems = false;
        this.showDeliveryAddress = true;
    }
    //items popup
    showItems() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        this.dialog.open(ItemsComponent, dialogConfig);

    }
    showPromos() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        this.dialog.open(PromocodesComponent, dialogConfig);

    }
    ordData;
    addId;
    slotId;
    orderPlace() {
        if (sessionStorage.userId === undefined) {
            swal('Please Login', '', 'warning');
            return;
        } else if (this.payId != 3) {
            swal("Please select Cash on Delivery", "", "warning");
            return
        } else {
            var inData = {
                "delivery_address_id": this.addId,
                "billing_amount": this.billing,
                "payment_type": this.payId,
                "user_id": sessionStorage.getItem('userId'),
                "item_type": "grocery",
                "delivery_slot_id": this.slotId
            }
            this.appService.palceOrder(inData).subscribe(res => {
                if (res.json().message === "Success") {
                    this.ordData = res.json().Order[0].order_id;
                    swal(res.json().message, "", "success");
                    this.router.navigate(['/Orderplaced'], { queryParams: { orderId: this.ordData } });
                } else {
                    swal("Please Login", "", "warning");
                }

            }, err => {

            })
        }

    }
    changeSize(Id) {
        this.skid = Id;
        for (var i = 0; i < this.cartData.length; i++) {
            for (var j = 0; j < this.cartData[i].sku_row.length; j++) {
                if (parseInt(Id) === this.cartData[i].sku_row[j].skid) {
                    this.cartData[i].selling_price = this.cartData[i].price;
                    this.cartData[i].actual_price = this.cartData[i].sku_row[j].actual_price;
                    this.cartData[i].skid = this.cartData[i].sku_row[i].skid;
                    for (var k = 0; k < this.cartData[i].sku_row[j].sku_images.length; k++) {
                        this.cartData[i].image = this.cartData[i].sku_row[j].sku_images[0].sku_image;
                    }
                }

            }

        }
    }
    addtoWish(prodId, skId) {
        var inData = {
            "user_id": JSON.parse(sessionStorage.userId),
            "product_id": prodId,
            "sku_id": skId,
            "item_type": "grocery"
        }
        this.appService.addToWish(inData).subscribe(res => {
            if (res.json().status === 400) {
                swal(res.json().message, "", "error");
            } else {
                swal(res.json().message, "", "success");
                // this.getWish();
            }
            // this.getWish();
        }, err => {

        })
    }
    // dateTime() {
    //     this.shipment2 = true;
    // }
}
