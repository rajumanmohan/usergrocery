import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { appService } from './../../services/mahaliServices/mahali.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert';
@Component({
  selector: 'app-useraccount',
  templateUrl: './useraccount.component.html',
  styleUrls: ['./useraccount.component.less']
})
export class UseraccountComponent implements OnInit {
  addressForm: FormGroup;
  full_name_errors = false;
  mobile_number_errors = false;
  house_no_errors = false;
  city_error = false;
  state_errors = false;
  landmark_errors = false;
  pincode_errors = false;
  resetForm: FormGroup;
  submitted = false;
  p: number = 1;
  // addressForm: FormGroup,
  // productForm: FormGroup
  constructor(
    private route: ActivatedRoute, private appService: appService, private formBuilder: FormBuilder, private router: Router

  ) {
    this.page = this.route.snapshot.data[0]['page'];
    if (this.page === 'profile') {
      this.showProfile = true;
      this.getProfile();
    } else if (this.page === 'wishlist') {
      this.showWishlist = true;
    } else if (this.page === 'orders') {
      this.showMyOrders = true;
      this.getOrders();
    } else if (this.page === 'notifications') {
      alert('hay');
      this.showNotifications = true;
      this.notifications();
    } else if (this.page === 'offerzone') {
      this.showOfferZone = true;
    } else if (this.page === 'changePw') {
      this.showChangePassword = true;
    } else if (this.page === 'deliveryAddr') {
      this.showDeliveryAddress = true;
      this.getAdd();

    }

  }
  // item = {
  //   quantity: 1
  // }
  typeval;
  ngOnInit() {
    this.getAdd();
    this.getProfile();
    this.addressForm = this.formBuilder.group({
      // address_type:this.typeval,
      full_name: [''],
      mobile_number: [''],
      house_no: [''],
      city: [''],
      state: [''],
      landmark: [''],
      pin_code: ['']

    });
    this.resetForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      new_password: ['', [Validators.required, Validators.minLength(6)]],
      retype_password: ['', [Validators.required, Validators.minLength(6)]],
      user_id: sessionStorage.userId
    });
    this.VegetablesData();
    this.fruitsData();
    this.breadData();
    this.getOrders();
  }

  page;
  showNotifications = false;
  showOrderDetails = false;
  showMyOrders = false;
  showChangePassword = false;
  showWishlist = false;
  showAddAddress = false;
  showDeliveryAddress = false;
  editUserProfile = false;
  showProfile = false;
  showOfferZone = false;
  showEditAddress = false;

  profile() {
    this.showNotifications = false;
    this.showOrderDetails = false;
    this.showMyOrders = false;
    this.showChangePassword = false;
    this.showWishlist = false;
    this.showAddAddress = false;
    this.showDeliveryAddress = false;
    this.editUserProfile = false;
    this.showProfile = true;
    this.showOfferZone = false;
    this.showEditAddress = false;
    this.getProfile();
  }

  editProfile() {
    this.showNotifications = false;
    this.showOrderDetails = false;
    this.showMyOrders = false;
    this.showChangePassword = false;
    this.showWishlist = false;
    this.showAddAddress = false;
    this.showDeliveryAddress = false;
    this.editUserProfile = true;
    this.showProfile = false;
    this.showOfferZone = false;
    this.showEditAddress = false;
  }

  deliveryAddress() {
    this.showNotifications = false;
    this.showOrderDetails = false;
    this.showMyOrders = false;
    this.showChangePassword = false;
    this.showWishlist = false;
    this.showAddAddress = false;
    this.showDeliveryAddress = true;
    this.editUserProfile = false;
    this.showProfile = false;
    this.showOfferZone = false;
    this.showEditAddress = false;
    this.getAdd();
  }
  addAddress() {
    this.showNotifications = false;
    this.showOrderDetails = false;
    this.showMyOrders = false;
    this.showChangePassword = false;
    this.showWishlist = false;
    this.showAddAddress = true;
    this.showDeliveryAddress = false;
    this.editUserProfile = false;
    this.showProfile = false;
    this.showOfferZone = false;
    this.showEditAddress = false;
  }

  wishList() {
    this.showNotifications = false;
    this.showOrderDetails = false;
    this.showMyOrders = false;
    this.showChangePassword = false;
    this.showWishlist = true;
    this.showAddAddress = false;
    this.showDeliveryAddress = false;
    this.editUserProfile = false;
    this.showProfile = false;
    this.showOfferZone = false;
    this.showEditAddress = false;
    this.getWish();
  }

  changePassword() {
    this.showNotifications = false;
    this.showOrderDetails = false;
    this.showMyOrders = false;
    this.showChangePassword = true;
    this.showWishlist = false;
    this.showAddAddress = false;
    this.showDeliveryAddress = false;
    this.editUserProfile = false;
    this.showProfile = false;
    this.showOfferZone = false;
    this.showEditAddress = false;
  }

  myOrder() {
    this.showNotifications = false;
    this.showOrderDetails = false;
    this.showMyOrders = true;
    this.showChangePassword = false;
    this.showWishlist = false;
    this.showAddAddress = false;
    this.showDeliveryAddress = false;
    this.editUserProfile = false;
    this.showProfile = false;
    this.showOfferZone = false;
    this.showEditAddress = false;
  }

  notifications() {
    alert('hi');
    this.showNotifications = true;
    this.showOrderDetails = false;
    this.showMyOrders = false;
    this.showChangePassword = false;
    this.showWishlist = false;
    this.showAddAddress = false;
    this.showDeliveryAddress = false;
    this.editUserProfile = false;
    this.showProfile = false;
    this.showOfferZone = false;
    this.showEditAddress = false;
    this.appService.getNotifications1().subscribe(res => {
      console.log(res.json())
    })
  }

  showBukedOrderDetails(ordId) {
    this.showNotifications = false;
    this.showOrderDetails = true;
    this.showMyOrders = false;
    this.showChangePassword = false;
    this.showWishlist = false;
    this.showAddAddress = false;
    this.showDeliveryAddress = false;
    this.editUserProfile = false;
    this.showProfile = false;
    this.showOfferZone = false;
    this.showEditAddress = false;
    this.ordDetails(ordId);
  }
  ordId;
  ordData = [];
  orderDet = [];
  count;
  ordAdd = [];
  ordDetails(ordId) {
    this.ordId = ordId;
    this.appService.orderById(ordId).subscribe(resp => {
      this.ordData = resp.json().Order.products;
      for (var i = 0; i < this.ordData.length; i++) {
        this.ordData[i].size = this.ordData[i].sku_details[0].size;
        this.ordData[i].selling_price = this.ordData[i].sku_details[0].selling_price;
      }
      this.orderDet = resp.json().Order.details[0];
      this.count = resp.json().Order.total_selling_price;
      this.ordAdd = resp.json().Order.delivery_address[0];

    })
  }

  offerZone() {
    this.showNotifications = false;
    this.showOrderDetails = false;
    this.showMyOrders = false;
    this.showChangePassword = false;
    this.showWishlist = false;
    this.showAddAddress = false;
    this.showDeliveryAddress = false;
    this.editUserProfile = false;
    this.showProfile = false;
    this.showOfferZone = true;
    this.showEditAddress = false;
  }
  showEditAdd(addId) {
    this.showNotifications = false;
    this.showOrderDetails = false;
    this.showMyOrders = false;
    this.showChangePassword = false;
    this.showWishlist = false;
    this.showAddAddress = false;
    this.showDeliveryAddress = false;
    this.editUserProfile = false;
    this.showProfile = false;
    this.showOfferZone = false;
    this.showEditAddress = false;
    this.showEditAddress = true;
    this.editAdd(addId);
  }
  profileData = {
    first_name: '',
    email: '',
    mobile_number: '',
    area: '',
    city: '',
  }
  editAddData = {
    full_name: '',
    mobile_number: '',
    house_no: '',
    landmark: '',
    city: '',
    state: '',
    pin_code: '',

  };
  email;
  orders = [];
  getOrders() {
    this.appService.getPlaceOrder().subscribe(res => {
      this.orders = res.json().Orders;
    }, err => {

    })
  }
  getProfile() {
    this.email = (sessionStorage.email);
    this.appService.loginDetailsbyEmail(this.email).subscribe(response => {
      this.profileData = response.json().data[0];
      sessionStorage.removeItem('userName');
      sessionStorage.setItem('userName', (response.json().data[0].first_name) + " " + (response.json().data[0].last_name));
    })
  }
  updateProfile() {
    var inDate = {
      first_name: this.profileData.first_name,
      email: this.profileData.email,
      mobile_number: this.profileData.mobile_number,
      area: this.profileData.area,
      city: this.profileData.city
      // bussiness_name: this.profileData.bussiness_name

    }
    this.appService.updateProfile(inDate).subscribe(response => {
      swal(response.json().message, "", "success");
      this.ngOnInit();
      this.getProfile();
      this.cancel();
    })
  }
  wishData = [];
  wishListData = [];
  wishArr = [];
  getWish() {
    this.wishArr = [];
    this.appService.getWish().subscribe(res => {
      if (res.json().message === "Success") {
        this.wishData = res.json().wishlist;
        for (var i = 0; i < this.wishData.length; i++) {
          this.wishData[i].sku_details.wishlist_id = this.wishData[i].wishlist_id;
          this.wishData[i].sku_details.product_name = this.wishData[i].product_details[0].product_name;
          this.wishData[i].sku_details.product_id = this.wishData[i].product_id;
          this.wishData[i].sku_details.skid = this.wishData[i].sku_details.skid;
          this.wishData[i].sku_details.product_image = this.wishData[i].product_details[0].product_image;
          this.wishData[i].sku_details.quantity = this.wishData[i].quantity;
          this.wishArr.push(this.wishData[i].sku_details);
        }
      }
      this.wishArr.sort(function (a, b) {
        var keyA = new Date(a.created_on),
          keyB = new Date(b.created_on)
        if (keyA < keyB) return - 1;
        if (keyA > keyB) return 1;
        return 0;
      });

    }, err => {

    })
  }
  get f1() { return this.addressForm.controls; }

  saveAddress() {
    this.addressForm.value.address_type = this.typeval;
    if (this.addressForm.value.full_name === '') {
      this.full_name_errors = true;
      return;
    }
    else if (this.addressForm.value.mobile_number === '') {
      this.mobile_number_errors = true;
      this.full_name_errors = false;
      return;
    }
    else if (this.addressForm.value.house_no === '') {
      this.house_no_errors = true;
      this.mobile_number_errors = false;
      this.full_name_errors = false;
      return;
    }
    else if (this.addressForm.value.landmark === '') {
      this.landmark_errors = true;
      this.house_no_errors = false;
      this.mobile_number_errors = false;
      this.full_name_errors = false;
      return;
    }
    else if (this.addressForm.value.city === '') {
      this.city_error = true;
      this.landmark_errors = false;
      this.house_no_errors = false;
      this.mobile_number_errors = false;
      this.full_name_errors = false;
      return;
    }
    else if (this.addressForm.value.state === '') {
      this.state_errors = true;
      this.city_error = false;
      this.landmark_errors = false;
      this.house_no_errors = false;
      this.mobile_number_errors = false;
      this.full_name_errors = false;
      return;
    }

    else if (this.addressForm.value.pin_code === '') {
      this.pincode_errors = true;
      this.state_errors = false;
      this.city_error = false;
      this.landmark_errors = false;
      this.house_no_errors = false;
      this.mobile_number_errors = false;
      this.full_name_errors = false;
      return;
    }
    this.appService.addaddress(this.addressForm.value).subscribe(res => {
      this.addressForm.reset();
      swal(res.json().message, "", "success");
      this.pincode_errors = false;
      this.getAdd();
      this.cancelAdd();
    })
  }
  getAddData = [];
  getAdd() {
    this.appService.getAddress().subscribe(res => {
      this.getAddData = res.json().delivery_address;

    })
  }
  get f() { return this.resetForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.resetForm.invalid) {
      return;
    } else if (this.resetForm.value.retype_password != this.resetForm.value.new_password) {
      swal("Passwords doesn't matched", "", "warning");
      return;
    }
    this.appService.changePwd(this.resetForm.value).subscribe(resp => {
      if (resp.json().status === 200) {
        swal(resp.json().message, "", "success");
        this.router.navigate(['/'])
      } else {
        swal(resp.json().message, "", "error");
      }


    }, err => {
      swal(err.json().message, "", "error");
    })


  }
  UpdateAdd(addId) {
    var indata = {
      "full_name": this.editAddData.full_name,
      "mobile_number": this.editAddData.mobile_number,
      "house_no": this.editAddData.house_no,
      "city": this.editAddData.city,
      "state": this.editAddData.state,
      "landmark": this.editAddData.landmark,
      "pin_code": this.editAddData.pin_code,
      "address_type": this.typeval
    }
    this.appService.updateAddData(indata, addId).subscribe(resp => {
      swal(resp.json().message, "", "success");
      this.getAdd();
      this.cancelAdd();
    }, err => {

    })
  }
  editAdd(addId) {
    this.appService.getAdd(addId).subscribe(resp => {
      this.editAddData = resp.json().delivery_address[0];
    }, err => {

    })
  }
  delAdd(delId) {
    this.appService.delAddress(delId).subscribe(res => {
      swal(res.json().message, "", "success");
      this.getAdd();
    })
  }
  seleOpt;
  addId;
  seleAddOptn(index, addId) {
    this.seleOpt = index;
    // this.editDel = true;
    this.addId = addId;
  }
  cancelAdd() {
    this.showDeliveryAddress = true;
    // this.editAccount = false;
    this.showAddAddress = false;
    this.showEditAddress = false;
  }
  cancel() {
    this.showProfile = true;
    this.editUserProfile = false;
    this.getProfile();
  }
  cancelChange() {
    this.showProfile = true;
    this.showChangePassword = false;
  }
  Type(type) {
    this.typeval = type;
  }


  delWish(wishId) {
    this.appService.delWishList(wishId).subscribe(res => {
      if (res.json().message === "Success") {
        this.getWish();
        swal(res.json().message, "", "success");
      }

    })
  }
  cartDetails = [];
  cartCount = [];
  addtoCart(Id, skId) {
    var inData = {
      "products": [{
        product_id: Id,
        sku_id: skId
      }],
      "user_id": JSON.parse(sessionStorage.getItem('userId')),
      "item_type": "grocery"
    }
    this.appService.addtoCart(inData).subscribe(res => {
      if (res.json().status === 400) {
        swal(res.json().message, "", "error");
      } else {
        this.cartDetails = res.json().selling_price_total;
        this.cartCount = res.json().count;
        this.getCart();
        swal(res.json().message, "", "success");
      }

    }, err => {

    })
  }
  billing;
  getCart() {
    var inData = sessionStorage.getItem('userId');
    this.appService.getCart(inData).subscribe(res => {
      this.cartDetails = res.json().cart_details;
      this.cartCount = res.json().count;
      this.billing = res.json().selling_Price_bill;
    }, err => {

    })
  }
  itemIncrease(wishId) {
    for (var i = 0; i < this.wishData.length; i++) {
      if (this.wishData[i].wishlist_id === wishId) {
        this.wishData[i].quantity = this.wishData[i].quantity + 1;
        this.modifyWish(this.wishData[i].quantity, wishId);
        this.getWish();
        return;
      }
    }
  }

  itemDecrease(wishId) {
    for (var i = 0; i < this.wishData.length; i++) {
      if (this.wishData[i].wishlist_id === wishId) {
        if (this.wishData[i].quantity === 1) {
          this.delWish(wishId);
          return;
        } else {
          this.wishData[i].quantity = this.wishData[i].quantity - 1;
          this.modifyWish(this.wishData[i].quantity, wishId);
          this.getWish();
        }
        return;
      }
    }

  }
  vegArr = [];
  vegetablesData = [];
  VegetablesData() {
    this.vegArr = [];
    this.fruitArr = [];
    this.breadArr = [];
    this.appService.getVegetables().subscribe(res => {
      this.vegetablesData = res.json().data;
      for (var i = 0; i < this.vegetablesData.length; i++) {
        for (var j = 0; j < this.vegetablesData[i].sku_details.length; j++) {
          this.vegetablesData[i].sku_details[j].product_name = this.vegetablesData[i].product_name;
          this.vegArr.push(this.vegetablesData[i].sku_details[j]);
        }
      }
    }, err => {
    })
  }
  fruitsData1 = [];
  fruitArr = [];
  fruitsData() {
    this.vegArr = [];
    this.fruitArr = [];
    this.breadArr = [];
    this.appService.getFruits().subscribe(res => {
      this.fruitsData1 = res.json().data;
      for (var i = 0; i < this.fruitsData1.length; i++) {
        for (var j = 0; j < this.fruitsData1[i].sku_details.length; j++) {
          this.fruitsData1[i].sku_details[j].product_name = this.fruitsData1[i].product_name;
          this.fruitArr.push(this.fruitsData1[i].sku_details[j]);
        }
      }
    }, err => {
    })
  }
  breadData1 = [];
  breadArr = [];
  breadData() {
    this.vegArr = [];
    this.fruitArr = [];
    this.breadArr = [];
    this.appService.getBread().subscribe(res => {
      this.breadData1 = res.json().data;
      for (var i = 0; i < this.breadData1.length; i++) {
        for (var j = 0; j < this.breadData1[i].sku_details.length; j++) {
          this.breadData1[i].sku_details[j].product_name = this.breadData1[i].product_name;
          this.breadArr.push(this.breadData1[i].sku_details[j]);
        }
      }
    }, err => {
    })
  }
  showProduxtDetails(prodId) {
    this.router.navigate(['/productdetails'], { queryParams: { prodId: prodId } });
  }
  modifyWish(quantity, wishId) {
    var params = {
      "quantity": quantity
    }

    this.appService.modifyWish(params, wishId).subscribe(resp => {
      if (resp.json().status === 200) {
        swal(resp.json().message, "", "success");
        this.getWish();
        // jQuery("#signupmodal").modal("hide");
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
}
