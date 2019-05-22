import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ProductsData } from '../../services/productsdata';
import { ProductService } from '../../services/productservice';
import { appService } from './../../services/mahaliServices/mahali.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert';
declare var jQuery: any;
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  bannerData = [];
  offerBan = [];
  dummyBan = [];
  cartCount;
  vendorData = [];
  shoCatData = [];
  catProds = []
  skid;
  btnType;
  page;
  noVen;
  brandsData1 = [];
  brandsData2;
  // allProductsData = [];
  noData;
  noData1;
  product: ProductsData = {
    name: "Utpal Kumar Das"
  };
  constructor(private router: Router, public productService: ProductService, private appService: appService, private route: ActivatedRoute) {
    // this.page = this.route.snapshot.data[0]['page'];
    // if (this.page === "newProducts") {
    //   this.showAllProductsScreen = true;
    //   this.showAllProducts();
    // }
  }
  showAllProductsScreen = true;
  showAllProdsForCat = false;
  showAllProducts() {
    this.btnType = "All";
    this.showAllProductsScreen = true;
    this.showAllProdsForCat = false;
    this.allProductsData();
  }
  ngOnInit() {
    // this.VegetablesData();
    this.productService.product = this.product;
    this.getDummy();
    this.getBanners();
    this.getBrands();
    this.allProductsData();
    this.getVendors();
    this.getuserCats();
    this.btnType = "All";
  }
  showProduxtDetails(prodId, venId1) {
    this.router.navigate(['/productdetails'], { queryParams: { prodId: prodId, venId1: venId1 } });
  }
  skuId;
  getProduct() {
    this.appService.getProduct().subscribe(resp => {
      this.product = resp.json().products;
      console.log(this.product);
    });
  }
  cartDetails = [];
  cartValue;
  billing;
  getCart() {
    var inData = sessionStorage.getItem('userId');
    this.appService.getCart(inData).subscribe(res => {
      this.cartDetails = res.json().cart_details;
      this.cartValue = res.json().count;
      this.billing = res.json().selling_Price_bill;
    }, err => {

    })
  }
  addtoCart(Id, skId, price, venId, vProdID, udisc) {
    // if (sessionStorage.userId === undefined) {
    //   swal('Please Login', '', 'warning');
    //   return;
    // }
    var inData = {
      "products": [{
        product_id: Id,
        sku_id: skId
      }],
      "user_id": JSON.parse(sessionStorage.getItem('userId')),
      "item_type": "grocery",
      "price": price,
      "vendorid_as_owner": venId,
      "vendor_product_id": vProdID,
      "updated_discount": udisc
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
  checkProdQuty(prodId, skuId, price, venId, vProdID, udisc) {
    this.appService.checkQuty(prodId, skuId, 0, venId, vProdID).subscribe(res => {
      if (res.json().status === 200) {
        this.addtoCart(prodId, skuId, price, venId, vProdID, udisc);
      }
      else {
        swal(res.json().message, "", "error");
        // this.NoStockMsg = res.json().data;
      }
      // this.addtoCart(prodId, skuId, price, venId, vProdID, udisc);

    })
  }
  mainData = [];
  bannerArr = [];
  mainBannerData = [];
  getBanners() {
    this.appService.getBrandCats().subscribe(res => {
      this.mainData = res.json().result;
      for (var i = 0; i < this.mainData.length; i++) {
        if (this.mainData[i].banner_position === 'Main Banners') {
          this.mainBannerData = this.mainData[i].banner_details;
        }
      }
    }, err => {

    })
  }
  brandsData = [];
  getBrands() {
    this.appService.getBrandCats().subscribe(res => {
      this.mainData = res.json().result;
      for (var i = 0; i < this.mainData.length; i++) {
        if (this.mainData[i].banner_position === 'Brand Categories') {
          this.brandsData = this.mainData[i].banner_details;
        }
      }
    }, err => {

    })
  }
  getDummy() {
    this.appService.getBrandCats().subscribe(res => {
      this.mainData = res.json().result;
      for (var i = 0; i < this.mainData.length; i++) {
        if (this.mainData[i].banner_position === 'UserGrocery Dummy Banner') {
          this.brandsData1 = this.mainData[i].banner_details[0].website_banner;
          this.brandsData2 = this.mainData[i].banner_details[1].website_banner;

        }
      }
    }, err => {

    })
  }
  // banners
  // get all products
  allproductsData = [];
  allArr = [];
  allProductsData() {
    this.showAllProductsScreen = true;
    this.showAllProdsForCat = false;
    this.noData = false;
    let params = {
      "country": sessionStorage.country,
      "pin_code": sessionStorage.pinCode === "undefined" ? "null" : sessionStorage.pinCode,
      "area": sessionStorage.Area === "undefined" ? "null" : sessionStorage.Area,
      "user_id": sessionStorage.userId
    }
    this.appService.getAllProducts(params).subscribe(res => {
      this.allproductsData = res.json().vendor_products;
      if (this.allproductsData != undefined) {
        for (var i = 0; i < this.allproductsData.length; i++) {
          for (var j = 0; j < this.allproductsData[i].sku_row.length; j++) {
            this.allproductsData[i].selling_price = this.allproductsData[i].updated_price - this.allproductsData[i].updated_discount;
            this.allproductsData[i].actual_price = this.allproductsData[i].updated_price;
            this.allproductsData[i].image = this.allproductsData[i].sku_row[0].sku_images[0].sku_image;
            this.allproductsData[i].skid = this.allproductsData[i].sku_row[0].skid;
            this.skid = this.allproductsData[i].sku_row[0].skid;
          }
        }
        this.noData = false;
      }
      if (res.json().status === 400) {
        this.noData = true;
      }

    }, err => {
    })
  }
  changeSize(Id) {
    this.skid = Id;
    for (var i = 0; i < this.allproductsData.length; i++) {
      for (var j = 0; j < this.allproductsData[i].sku_row.length; j++) {
        if (parseInt(Id) === this.allproductsData[i].sku_row[j].skid) {
          this.allproductsData[i].selling_price = this.allproductsData[i].sku_row[j].selling_price;
          this.allproductsData[i].actual_price = this.allproductsData[i].sku_row[j].actual_price;
          this.allproductsData[i].skid = this.allproductsData[i].sku_row[i].skid;
          for (var k = 0; k < this.allproductsData[i].sku_row[j].sku_images.length; k++) {
            this.allproductsData[i].image = this.allproductsData[i].sku_row[j].sku_images[0].sku_image;
          }
        }

      }

    }
  }

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
        this.getWish();
        this.getProduct();
        this.allProductsData();
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
  enlargeImg;
  open(skid): void {
    for (var i = 0; i < this.allproductsData.length; i++) {
      for (var j = 0; j < this.allproductsData[i].sku_row.length; j++) {
        if (skid === this.allproductsData[i].sku_row[j].skid) {
          this.enlargeImg = this.allproductsData[i].sku_row[j].sku_images[0].sku_image;
          jQuery("#enlargeImg").modal("show");
        }
      }

    }
    for (var i = 0; i < this.allproductsData.length; i++) {
      for (var j = 0; j < this.allproductsData[i].sku_row.length; j++) {
        if (skid === this.allproductsData[i].sku_row[j].skid) {
          this.enlargeImg = this.allproductsData[i].sku_row[j].sku_images[0].sku_image;
          jQuery("#enlargeImg").modal("show");
        }
      }

    }

  }
  getVendors() {
    let params = {
      "country": sessionStorage.country,
      "pin_code": sessionStorage.pinCode === "undefined" ? "null" : sessionStorage.pinCode,
      "area": sessionStorage.Area === "undefined" ? "null" : sessionStorage.Area,
      "user_id": sessionStorage.userId
    }
    this.appService.getVendors(params).subscribe(res => {
      this.vendorData = res.json().data;
      this.noVen = false;
      if (res.json().message === "No records Found") {
        this.noVen = true;
      }
    })
  }
  getuserCats() {
    this.appService.getuserCats().subscribe(res => {
      this.shoCatData = res.json().categories;
    })
  }
  showUserProds(catId, catName) {
    this.showAllProductsScreen = false;
    this.showAllProdsForCat = true;
    this.btnType = catName;
    let params = {
      "country": sessionStorage.country,
      "pin_code": sessionStorage.pinCode === "undefined" ? "null" : sessionStorage.pinCode,
      "area": sessionStorage.Area === "undefined" ? "null" : sessionStorage.Area,
      "user_id": sessionStorage.userId
    }
    this.appService.productByCatId(catId, params).subscribe(res => {
      this.allProductsData = res.json().vendor_products;
      if (this.allProductsData != undefined) {
        for (var i = 0; i < this.allProductsData.length; i++) {
          for (var j = 0; j < this.allProductsData[i].sku_row.length; j++) {
            this.allProductsData[i].selling_price = this.allProductsData[i].sku_row[0].selling_price;
            this.allProductsData[i].actual_price = this.allProductsData[i].sku_row[0].actual_price;
            this.allProductsData[i].image = this.allProductsData[i].sku_row[0].sku_images[0].sku_image;
            this.allProductsData[i].skid = this.allProductsData[i].sku_row[0].skid;
            this.skid = this.allProductsData[i].sku_row[0].skid;
          }

        }
        this.noData = false;
        this.noData1 = false;
      }
      if (res.json().status === 400) {
        this.noData = false;
        this.noData1 = true;

      }

    }, err => {

    })
  }
  viewVendorProds(venId) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        vanId: venId,
        action: "vendorProds"
      }
    }
    this.router.navigate(['products'], navigationExtras)
  }
  getBanProds(imgId) {
    this.router.navigate(['/products'], { queryParams: { imgId: imgId, action: 'banner' } });
  }
}






