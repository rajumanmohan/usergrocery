import { appService } from './../../services/mahaliServices/mahali.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ProductsData } from '../../services/productsdata';
import { ProductService } from '../../services/productservice';
// import { } from 'googlemaps';
// import { RouterModule, Routes } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

    product = [];
    constructor(private router: Router, public productService: ProductService, private appService: appService) { }
    showAllProducts = true;
    showVegetablesScreen = false;
    showFruitScreen = false;
    showTeaScreen = false;
    showBreadScreen = false;
    showJuiceScreen = false;
    bannerData = [];
    mainBannerData = [];
    noData;
    noData1;
    NoStockMsg;
    showVegetables() {
        this.showVegetablesScreen = true;
        this.showAllProducts = false;
        this.showFruitScreen = false;
        this.showTeaScreen = false;
        this.showBreadScreen = false;
        this.showJuiceScreen = false;
    }
    showFruits() {
        this.showVegetablesScreen = false;
        this.showAllProducts = false;
        this.showFruitScreen = true;
        this.showTeaScreen = false;
        this.showBreadScreen = false;
        this.showJuiceScreen = false;
    }
    showTea() {
        this.showVegetablesScreen = false;
        this.showAllProducts = false;
        this.showFruitScreen = false;
        this.showTeaScreen = true;
        this.showBreadScreen = false;
        this.showJuiceScreen = false;
    }
    showBread() {
        this.showVegetablesScreen = false;
        this.showAllProducts = false;
        this.showFruitScreen = false;
        this.showTeaScreen = false;
        this.showBreadScreen = true;
        this.showJuiceScreen = false;
    }
    showJuices() {
        this.showVegetablesScreen = false;
        this.showAllProducts = false;
        this.showFruitScreen = false;
        this.showTeaScreen = false;
        this.showBreadScreen = false;
        this.showJuiceScreen = true;
    }
    ngOnInit() {
        // this.productService.product = this.product;
        this.getWholeSellers();
        this.getProduct();
        this.getBanners();
        // this.getGeoLocation(address)
        this.getCart();


    }
    lat;
    long;
    // if(navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(position => {
    //         this.lat = position.coords.latitude;
    //         this.long = position.coords.longitude;
    //         var latlng = { lat: this.lat, lng: this.long };

    //         let geocoder = new google.maps.Geocoder();
    //         geocoder.geocode({ 'location': latlng }, (results, status) => {
    //             if (status == google.maps.GeocoderStatus.OK) {
    //                 let result = results[0];
    //                 let rsltAdrComponent = result.address_components;
    //                 let resultLength = rsltAdrComponent.length;
    //                 if (result != null) {
    //                 } else {
    //                     window.alert('Geocoder failed due to: ' + status);
    //                 }
    //             }
    //         });
    //     });
    // };
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


    showProduxtDetails(prodId) {
        this.router.navigate(['/productdetails'], { queryParams: { prodId: prodId } });
    }

    showStore(wholeId) {
        this.router.navigate(['/store'], { queryParams: { wholeId: wholeId } });
    }
    wholeData = [];
    getWholeSellers() {
        // if (sessionStorage.userId === undefined) {
        //     this.appService.getWholeSellers().subscribe(resp => {
        //         this.wholeData = resp.json().data;

        //     })
        // } else {
        let params = {
            "country": sessionStorage.country,
            "pin_code": sessionStorage.pinCode === "undefined" ? "null" : sessionStorage.pinCode,
            "area": sessionStorage.Area === "undefined" ? "null" : sessionStorage.Area
        }
        this.appService.wholeByLoc(params).subscribe(resp => {
            this.wholeData = resp.json().data;
            // if (this.wholeData.length != undefined) {
            //     this.wholeData = resp.json().data;
            // }
            if (resp.json().status === 400) {
                this.noData1 = true;
            } else {
                this.wholeData = resp.json().data;
                this.noData1 = false;

            }

        })
        // }

    }
    skuId;
    getProduct() {
        let Data = {
            "country": sessionStorage.country,
            "pin_code": sessionStorage.pinCode === "undefined" ? "null" : sessionStorage.pinCode,
            "area": sessionStorage.Area === "undefined" ? "null" : sessionStorage.Area
        }
        this.appService.getProduct(Data).subscribe(resp => {
            this.product = resp.json().products;
            if (resp.json().status === 400) {
                this.noData = true;
            } else {
                this.product = resp.json().products;
                console.log(this.product);
                this.noData = false;

            }
        });
    }
    addtoCart(Id, skId, price, wholeId) {
        // if (sessionStorage.userId === undefined) {
        //     swal('Please Login', '', 'warning');
        //     return;
        // }
        var inData = {
            "products": [{
                product_id: Id,
                sku_id: skId
            }],
            "vendor_id": (sessionStorage.getItem('userId')),
            "item_type": "grocery",
            "price": price,
            "wholesaler_id": wholeId
        }
        this.appService.addtoCart(inData).subscribe(res => {
            if (res.json().status === 400) {
                swal(res.json().message, "", "error");
            } else {
                this.cartDetails = res.json().selling_price_total;
                this.cartValue = res.json().count;
                this.getCart();
                swal(res.json().message, "", "success");


            }
        }, err => {

        })
    }
    checkProdQuty(prodId, skuId, price, wholeId) {
        this.appService.checkQuty(prodId, skuId, 0).subscribe(res => {
            if (res.json().status === 200) {
                this.addtoCart(prodId, skuId, price, wholeId);
            } else {
                swal(res.json().message, "", "error");
                this.NoStockMsg = res.json().data;
            }
        })
    }
    mainData = [];
    getBanners() {
        this.appService.getBanners().subscribe(res => {
            this.bannerData = res.json().result;
            for (var i = 0; i < this.bannerData.length; i++) {
                if (this.bannerData[i].banner_position === 'Main Banners') {
                    this.mainBannerData = this.bannerData[i].banner_details;
                }
            }
        }, err => {

        })
    }
    cartDetails;
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
    getBanProds(imgId) {
        this.router.navigate(['/products'], { queryParams: { imgId: imgId, action: 'banner' } });
    }

}


