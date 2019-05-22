import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsData } from '../../services/productsdata';
import { ProductService } from '../../services/productservice';
import { appService } from './../../services/mahaliServices/mahali.service';
declare var jQuery: any;
declare var $: any;
@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.less']
})

export class ProductdetailsComponent implements OnInit {
  product: ProductsData;
  constructor(private route: ActivatedRoute, public productService: ProductService, private appService: appService) {
    this.route.queryParams.subscribe(params => {
      this.prodId = params.prodId;
      this.venId1 = params.venId1;
    });
  }
  cartData = [];
  sub;
  prodId;
  selling_price;
  image;
  size;
  quantity;
  venId1;
  vendor_product_id;
  updated_discount;
  venId;
  discount;
  discountPer;
  wish_list;
  cart_id;
  cat_id1;
  ngOnInit() {
    this.product = this.productService.product;
    this.sub = this.route
      .data
      .subscribe(v => console.log(v));
    this.getProductById();
    this.getCart();
    this.getWish();
  }

  starList: boolean[] = [true, true, true, true, true];       // create a list which contains status of 5 stars
  rating: number;
  //Create a function which receives the value counting of stars click, 
  //and according to that value we do change the value of that star in list.
  setStar(data: any) {
    this.rating = data + 1;
    for (var i = 0; i <= 4; i++) {
      if (i <= data) {
        this.starList[i] = false;
      }
      else {
        this.starList[i] = true;
      }
    }
  }
  prodData = [];
  prodsData = [];
  skid;
  prodName;
  description;
  prodImages = [];
  prodbyIdData;
  category_name;
  sub_category_name;
  // getProductById() {

  //   this.appService.getProductById(this.prodId).subscribe(res => {
  //     this.prodId = res.json().products.product_id;
  //     this.prodbyIdData = res.json().products;
  //     this.category_name = this.prodbyIdData.category_name;
  //     this.sub_category_name = this.prodbyIdData.sub_category_name;
  //     this.prodsData = res.json().products.sku_row;
  //     for (var j = 0; j < this.prodsData.length; j++) {
  //       for (var k = 0; k < this.prodsData[j].images.length; k++) {
  //         this.prodImages.push(this.prodsData[j].images[k]);
  //       }
  //     }
  //     this.prodData = res.json().products.sku_row;
  //     this.offer_price = this.prodData[0].offer_price;
  //     this.actual_price = this.prodData[0].actual_price;
  //     this.product_image = this.prodData[0].image;
  //     this.skid = this.prodData[0].skid;
  //     this.prodName = res.json().products.product_name;
  //     this.description = this.prodData[0].description;

  //   }, err => {

  //   })
  // }
  getProductById() {
    this.getWish();
    this.skuData = [];
    this.appService.getProductById(this.prodId).subscribe(res => {
      this.prodId = res.json().product_id;
      this.prodsData = res.json().vendor_products;
      // var uniq = {}
      // var arrFiltered = []
      // if (this.prodsData.length > 0) {
      //   arrFiltered = this.prodsData.filter(obj => !uniq[obj.product_id] && (uniq[obj.product_id] = true));
      // } else {
      //   arrFiltered = [];
      // }
      // this.prodsData = arrFiltered;
      for (var i = 0; i < this.prodsData.length; i++) {
        this.prodId = this.prodsData[0].product_id;
        this.prodName = this.prodsData[0].product_name;
        this.category_name = this.prodsData[0].category_name;
        this.vendor_product_id = this.prodsData[0].vendor_product_id;
        this.discount = this.prodsData[0].discount;
        this.wish_list = this.prodsData[0].wish_list;
        this.quantity = this.prodsData[0].quantity;
        this.cat_id1 = this.prodsData[0].category_id;
        // this.updated_discount = this.prodsData[0].category_name.vendor_product_id.updated_discount
        this.sub_category_name = this.prodsData[0].sub_category_name;
        for (var j = 0; j < this.prodsData[i].sku_row.length; j++) {
          this.offer_price = this.prodsData[i].sku_row[0].offer_price;
          this.actual_price = this.prodsData[0].price;
          this.selling_price = this.prodsData[0].price - (this.prodsData[0].discount);
          this.product_image = this.prodsData[i].sku_row[0].sku_images[0].sku_image;
          this.discountPer = this.prodsData[i].sku_row[0].Discount_percentage;
          this.skid = this.prodsData[0].sku_row[0].skid;
          this.image = this.prodsData[i].sku_row[0].sku_images[0].sku_image;
          this.size = this.prodsData[0].sku_row[0].size;
          this.description = this.prodsData[i].sku_row[0].description;
          this.venId = this.prodsData[0].vendor_id;
          this.skuData.push(this.prodsData[0].sku_row[j]);
          for (var k = 0; k < this.prodsData[i].sku_row[j].sku_images.length; k++) {
            this.prodImages.push(this.prodsData[i].sku_row[j].sku_images[k]);
            console.log(this.prodImages);
          }
        }
      }
      let params = {
        "country": sessionStorage.country,
        "pin_code": sessionStorage.pinCode === "undefined" ? "null" : sessionStorage.pinCode,
        "area": sessionStorage.Area === "undefined" ? "null" : sessionStorage.Area,
        "user_id": sessionStorage.userId
      }
      this.appService.productByCatId(this.cat_id1, params).subscribe(res => {
        this.prodData = res.json().vendor_products;
        if (this.prodData != undefined) {
          for (var i = 0; i < this.prodData.length; i++) {
            for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
              this.prodData[i].selling_price = this.prodData[i].updated_price - this.prodData[i].updated_discount;
              this.prodData[i].actual_price = this.prodData[i].updated_price;
              this.prodData[i].image = this.prodData[i].sku_row[0].sku_images[0].sku_image;
              this.prodData[i].skid = this.prodData[i].sku_row[0].skid;
              this.skid = this.prodData[i].sku_row[0].skid;
            }

          }
          // this.noData = false;
          // this.noData1 = false;
        }
        if (res.json().message === "No records Found") {
          // this.noData = true;
          // this.noData1 = false;
        }
      }, err => {

      })

    }, err => {

    })
  }
  showBigImage(image) {
    this.product_image = image;
  }
  skuData = [];
  offer_price = [];
  actual_price;
  product_image;
  changeSize(Id) {
    this.skid = Id;
    for (var i = 0; i < this.prodsData.length; i++) {
      for (var j = 0; j < this.prodsData[i].sku_row.length; j++) {
        if (parseInt(Id) === this.prodsData[i].sku_row[j].skid) {
          this.selling_price = this.prodsData[i].updated_price;
          this.actual_price = this.prodsData[i].sku_row[j].actual_price;
          this.skid = this.prodsData[i].sku_row[j].skid;
          this.description = this.prodsData[i].sku_row[j].description;
          for (var k = 0; k < this.prodsData[i].sku_row[j].sku_images.length; k++) {
            this.product_image = this.prodsData[i].sku_row[j].sku_images[0].sku_image;
          }
        }

      }

    }
  }
  cartDetails;
  cartCount;
  billing;
  getCart() {
    var inData = sessionStorage.getItem('userId');
    this.appService.getCart(inData).subscribe(res => {
      this.cartDetails = res.json().cart_details;
      this.cartCount = res.json().count;
      this.billing = res.json().selling_Price_bill;
      for (var i = 0; i < this.cartDetails.length; i++) {
        if (this.prodId === this.cartDetails[i].product_id) {
          this.cart_id = this.cartDetails[i].cart_id;
        }
      }

    }, err => {

    })
  }
  addtoCart(id, skuId, price, venId, vProdID, udisc) {
    var inData = {
      "products": [{
        product_id: id,
        sku_id: skuId
      }],
      "user_id": JSON.parse(sessionStorage.getItem('userId')),
      "item_type": "grocery",
      "price": price,
      "vendor_product_id": vProdID,
      "updated_discount": udisc,
      "vendorid_as_owner": venId,

    }
    this.appService.addtoCart(inData).subscribe(res => {
      if (res.json().status === 400) {
        swal(res.json().message, "", "error");
      } else {
        this.getCart();
        swal(res.json().message, "", "success");
      }

    }, err => {

    })
  }
  checkProdQuty(prodId, skuId, price, venId, vProdID, udisc) {
    this.appService.checkQuty(prodId, skuId, 0, venId, vProdID).subscribe(res => {
      if (res.json().status === 200) {
        this.addtoCart(prodId, skuId, price, venId, vProdID, udisc);
      }
      else {
        swal(res.json().message, "", "error");
        // this.NoStockMsg = res.json().data;
      }
      // this.addtoCart(prodId);
    })
  }
  addtoWish() {
    var inData = {
      "user_id": (sessionStorage.userId),
      "product_id": this.prodId,
      "sku_id": this.skid,
      "item_type": "grocery"
    }
    this.appService.addToWish(inData).subscribe(res => {
      if (sessionStorage.userId === undefined) {
        swal("Please Login", "", "error");
      } else if (res.json().status === 400) {
        swal(res.json().message, "", "error");
      } else {
        swal(res.json().message, "", "success");
        this.getWish();
      }
    }, err => {

    })
  }
  getWish() {
    this.appService.getWish().subscribe(res => {
      console.log(res.json());
    }, err => {

    })
  }
  itemIncrease() {
    for (var i = 0; i < this.cartDetails.length; i++) {
      if (this.cartDetails[i].cart_id === this.cart_id) {
        this.cartDetails[i].quantity = this.cartDetails[i].quantity + 1;
        this.modifyCart(this.cartDetails[i].quantity, this.cart_id);
        // this.getCart();
        return;
      }
    }
  }

  itemDecrease() {
    for (var i = 0; i < this.cartDetails.length; i++) {
      if (this.cartDetails[i].cart_id === this.cart_id) {
        if (this.cartDetails[i].quantity === 1) {
          this.delCart(this.cart_id);
          return;
        } else {
          this.cartDetails[i].quantity = this.cartDetails[i].quantity - 1;
          this.modifyCart(this.cartDetails[i].quantity, this.cart_id);
        }
        // this.getCart();
        return;
      }
    }

  }

  //modify cart

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
  delCart(cartId) {
    var inData = cartId;
    this.appService.delCart(inData).subscribe(res => {
      swal(res.json().message, "", "success");
      this.getCart();
    }, err => {

    })
  }
  // getCatProducts() {
  //   let params = {
  //     "country": sessionStorage.country,
  //     "pin_code": sessionStorage.pinCode === "undefined" ? "null" : sessionStorage.pinCode,
  //     "area": sessionStorage.Area === "undefined" ? "null" : sessionStorage.Area,
  //     "user_id": sessionStorage.userId
  //   }
  //   this.appService.productByCatId(this.cat_id1, params).subscribe(res => {
  //     this.prodData = res.json().vendor_products;
  //     if (this.prodData != undefined) {
  //       for (var i = 0; i < this.prodData.length; i++) {
  //         for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
  //           this.prodData[i].selling_price = this.prodData[i].updated_price - this.prodData[i].updated_discount;
  //           this.prodData[i].actual_price = this.prodData[i].updated_price;
  //           this.prodData[i].image = this.prodData[i].sku_row[0].sku_images[0].sku_image;
  //           this.prodData[i].skid = this.prodData[i].sku_row[0].skid;
  //           this.skid = this.prodData[i].sku_row[0].skid;
  //         }

  //       }
  //       // this.noData = false;
  //       // this.noData1 = false;
  //     }
  //     if (res.json().message === "No records Found") {
  //       // this.noData = true;
  //       // this.noData1 = false;
  //     }
  //   }, err => {

  //   })
  // }
}
