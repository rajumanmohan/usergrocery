import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { appService } from './../../services/mahaliServices/mahali.service';
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.less']
})
export class ItemsComponent implements OnInit {

  constructor(public thisDialogRef: MatDialogRef<ItemsComponent>, public dialog: MatDialog, public appService: appService) { }
  cartData = [];
  cartArr = [];
  cartCount;
  billing;
  ngOnInit() {
    this.getCart();
  }
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
          this.cartData[i].products.skuValue = this.cartData[i].products.sku_details[0].size;
          this.cartData[i].products.skuValue = this.cartData[i].products.sku_details[0].size;
          this.cartData[i].products.skid = this.cartData[i].products.sku_details[0].skid;
          this.cartData[i].products.selling_price = this.cartData[i].price;
          this.cartData[i].products.offer_price = this.cartData[i].products.sku_details[0].offer_price;
          this.cartData[i].products.actual_price = parseInt(this.cartData[i].price) + parseInt(this.cartData[i].updated_discount);
          this.cartData[i].products.img = this.cartData[i].products.sku_details[j].sku_images[0].sku_image;
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
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }
}
