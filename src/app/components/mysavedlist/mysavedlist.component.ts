import { Component, OnInit } from '@angular/core';
import { appService } from './../../services/mahaliServices/mahali.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
declare var jQuery: any;
declare var $: any;
@Component({
  selector: 'app-mysavedlist',
  templateUrl: './mysavedlist.component.html',
  styleUrls: ['./mysavedlist.component.less']
})
export class MysavedlistComponent implements OnInit {

  constructor(public appService: appService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getCategories();
    // this.getCatProducts(this.catId);
    this.VegetablesData();
    this.getWish();
  }
  category = [];
  prodData = [];
  skuData = [];
  catId;
  skid;
  enlargeImg;
  getCategories() {
    let params = {
      "country": sessionStorage.country,
      "pin_code": sessionStorage.pinCode === "undefined" ? "null" : sessionStorage.pinCode,
      "area": sessionStorage.Area === "undefined" ? "null" : sessionStorage.Area,
    }
    this.appService.getCategories(params).subscribe(resp => {
      this.category = resp.json().categories;
      // this.showSubCat(this.subId);
    })
  }
  // getCatProducts(id) {
  //   this.catId = id;
  //   this.skuData = [];
  //   // this.catId = (id === '') ? this.catId : id;
  //   this.appService.productByCatId(id).subscribe(res => {
  //     this.prodData = res.json().products;
  //     for (var i = 0; i < this.prodData.length; i++) {
  //       for (var j = 0; j < this.prodData[i].sku_details.length; j++) {
  //         this.prodData[i].sku_details[j].product_name = this.prodData[i].product_name;
  //         this.skuData.push(this.prodData[i].sku_details[j]);
  //       }
  //     }
  //     if (res.json().message === "No records Found") {
  //       // this.noData = true;
  //     }


  //   }, err => {

  //   })
  // }
  cartDetails = [];
  cartCount = [];

  addtoWish(Id, skId) {
    var inData = {
      "user_id": (sessionStorage.userId),
      "product_id": Id,
      "sku_id": skId,
      "item_type": "grocery"
    }
    this.appService.addToWish(inData).subscribe(res => {
      if (sessionStorage.userId === undefined) {
        swal("Please Login", "", "error");
      } else if (res.json().status === 400) {
        swal(res.json().message, "", "error");
      } else {
        swal(res.json().message, "", "success");
        // this.getWish();
        // this.getProduct();
        // this.allProductsData();
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
  showProduxtDetails(prodId, venId1) {
    alert(prodId)
    this.router.navigate(['/productdetails'], { queryParams: { prodId: prodId, venId1: venId1 } });
  }
  vegetablesData = [];
  VegetablesData() {
    this.skuData = [];
    this.appService.getVegetables().subscribe(res => {
      this.vegetablesData = res.json().data;
      for (var i = 0; i < this.vegetablesData.length; i++) {
        for (var j = 0; j < this.vegetablesData[i].sku_details.length; j++) {
          this.vegetablesData[i].sku_details[j].product_name = this.vegetablesData[i].product_name;
          this.skuData.push(this.vegetablesData[i].sku_details[j]);
        }
      }
    }, err => {
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
        this.wishData.sort(function (a, b) {
          var keyA = new Date(a.created_on),
            keyB = new Date(b.created_on)
          if (keyA < keyB) return - 1;
          if (keyA > keyB) return 1;
          return 0;
        });
        // this.wishData = res.json().vendor_products;
        if (this.wishData != undefined) {
          for (var i = 0; i < this.wishData.length; i++) {
            for (var j = 0; j < this.wishData[i].products.sku_details.length; j++) {
              this.wishData[i].selling_price = this.wishData[i].products.updated_price - this.wishData[i].products.updated_discount;
              this.wishData[i].actual_price = this.wishData[i].products.updated_price;
              this.wishData[i].image = this.wishData[i].products.sku_details[0].sku_images[0].sku_image;
              this.wishData[i].skid = this.wishData[i].products.sku_details[0].skid;
            }

          }
          // this.noData = false;
          // this.noData1 = false;
        }
        if (res.json().message === "No records Found") {
          // this.noData = true;
          // this.noData1 = false;
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
    this.appService.checkQuty(prodId, this.skid, 0, venId, vProdID).subscribe(res => {
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
  open(skid): void {
    for (var i = 0; i < this.wishData.length; i++) {
      for (var j = 0; j < this.wishData[i].products.sku_details.length; j++) {
        if (skid == this.wishData[i].products.sku_details[j].skid) {
          this.enlargeImg = this.wishData[i].products.sku_details[j].sku_images[0].sku_image;
          jQuery("#enlargeImg").modal("show");
        }
      }

    }

  }
}
