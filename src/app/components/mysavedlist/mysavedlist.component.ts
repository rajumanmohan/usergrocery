import { Component, OnInit } from '@angular/core';
import { appService } from './../../services/mahaliServices/mahali.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mysavedlist',
  templateUrl: './mysavedlist.component.html',
  styleUrls: ['./mysavedlist.component.less']
})
export class MysavedlistComponent implements OnInit {

  constructor(public appService: appService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // this.getCategories();
    // this.getCatProducts(this.catId);
    this.VegetablesData();
  }
  category = [];
  prodData = [];
  skuData = [];
  catId;
  // getCategories() {
  //   let params = {
  //     "country": sessionStorage.country,
  //     "pin_code": sessionStorage.pinCode === "undefined" ? "null" : sessionStorage.pinCode,
  //     "area": sessionStorage.Area === "undefined" ? "null" : sessionStorage.Area,
  //   }
  //   this.appService.getCategories(params).subscribe(resp => {
  //     this.category = resp.json().categories;
  //     // this.showSubCat(this.subId);
  //   })
  // }
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
  addtoWish(Id, skId) {
    var inData = {
      "user_id": JSON.parse(sessionStorage.userId),
      "product_id": Id,
      "sku_id": skId,
      "item_type": "grocery"
    }
    this.appService.addToWish(inData).subscribe(res => {
      console.log(res.json());
      swal(res.json().message, "", "success");
      this.getWish();
    }, err => {

    })
  }
  getWish() {
    this.appService.getWish().subscribe(res => {
      console.log(res.json());
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
  showProduxtDetails(prodId) {
    this.router.navigate(['/productdetails'], { queryParams: { prodId: prodId } });
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
}
