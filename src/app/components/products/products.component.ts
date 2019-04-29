import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/productservice';
import { appService } from './../../services/mahaliServices/mahali.service';
import { ActivatedRoute } from '@angular/router';
declare var jQuery: any;
declare var $: any;
@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.less']
})
export class ProductsComponent implements OnInit {
    current;
    wholeId;
    product;
    serProd = false;
    wholeProd = false;
    showSubCats = false;
    showVendorProds = false;
    noData: boolean;
    noData1: boolean;
    catName;
    subCat;
    subId;
    skid;
    catName1;
    subCatName1;
    vendorId;
    action;
    catId1;
    vendorProdsData = [];
    selectedBrnd;
    selectedBrnd1;
    contriesData = [];
    imgId;
    b;
    // nodata = false;
    // noData;
    subCatData = [];
    a;
    priceArr = [{
        'price': "Less than 100",
        'value': "0,100"
    },
    {
        'price': "Less than 200",
        'value': "101,200"
    },
    {
        'price': "Less than 300",
        'value': "201,300"
    },
    {
        'price': "Less than 400",
        'value': "301,400"
    },
    {
        'price': "Less than 500",
        'value': "401,100000"
    },
    ];
    priceArr1 = [{
        'price': "100 to 500gms",
        'value': "100,500 gms"
    },
    {
        'price': "501 to 700 gms",
        'value': "501,700 gms"
    },
    {
        'price': "701 to 999kg",
        'value': "701,999 kg"
    },
    {
        'price': "1 to 5kg",
        'value': "1,5 kg"
    },
    {
        'price': "6 to 10kg",
        'value': "6,10 kg"
    },
    {
        'price': "1 to 100lts",
        'value': "1,100 lts"
    },
    {
        'price': "101 to 1000lts",
        'value': "101,1000 lts"
    },
    ];
    constructor(private router: Router, public productService: ProductService, private appService: appService, private route: ActivatedRoute) {
        this.route.queryParams.subscribe(params => {
            if (params.action === "whole") {
                this.action = params.action;
                this.wholeId = params.wholeId;
                this.getWholeProds();
                this.wholeProd = true;
                this.serProd = false;
                this.showVendorProds = false;
            } else if (params.action === "search") {
                this.action = params.action;
                this.product = params.product;
                this.search(this.product);
                this.wholeProd = false;
                this.serProd = true;
                this.showVendorProds = false;
            } else if (params.action === "category") {
                this.catId = params.catId;
                this.catId1 = params.catId;
                this.action = params.action;
                this.catName = params.catName;
                this.getCatProducts('', '');
                this.wholeProd = false;
                this.serProd = true;
                this.showVendorProds = false;
            } else if (params.action === 'subCategory') {
                this.catName1 = params.catName;
                this.action = params.action;
                this.subCat = params.subCat;
                this.wholeProd = false;
                this.serProd = true;
                this.subId = params.subId;
                this.showVendorProds = false;
                this.getSubProducts('', '');
            } else if (params.action === 'vendorProds') {
                this.wholeProd = false;
                this.action = params.action;;
                this.serProd = false;
                this.vendorId = params.vanId;
                this.showVendorProds = true;
                this.vendorProds();
            } else {
                this.imgId = params.imgId
                this.wholeProd = false;
                this.serProd = true;
                this.getBanProducts1();
            }
        });
    }

    ngOnInit() {
        this.getCategories();
        this.getAllCountries();
    }
    showCategories = false;
    skuData = [];

    collapse(catId) {
        this.showCategories = !this.showCategories;
        //     this.subCatData = [];
        //     for(var i=0;i<this.category.length;i++){
        // for(var j=0;j<this.category[i].subcategory.length;j++){
        //   if(catId ===this.category[i].subcategory[j].category_id ){
        //     this.subCatData.push(this.category[i].subcategory[j]);
        //           console.log(this.subCatData);
        //     this.showCategories = !this.showCategories;
        //     this.showSubCat(this.subId);
        //   }
        // }
        //     }



    }
    showProduxtDetails(prodId, venId1) {
        this.router.navigate(['/productdetails'], { queryParams: { prodId: prodId, venId1: venId1 } });
    }
    products = [];
    skuid;
    getWholeProds() {
        this.skuData = [];
        this.appService.wholeProducts(this.wholeId).subscribe(res => {
            this.products = res.json().products;
            for (var i = 0; i < this.products.length; i++) {
                for (var j = 0; j < this.products[i].sku_details.length; j++) {
                    this.products[i].sku_details[j].product_name = this.products[i].product_name;
                    this.skuData.push(this.products[i].sku_details[j]);
                }
            }
        }, err => {

        })
    }
    changeSize(Id) {
        this.skid = Id;
        for (var i = 0; i < this.prodData.length; i++) {
            for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                if (parseInt(Id) === this.prodData[i].sku_row[j].skid) {
                    this.prodData[i].selling_price = this.prodData[i].updated_price - this.prodData[i].updated_discount;
                    this.prodData[i].actual_price = this.prodData[i].updated_price;
                    this.prodData[i].skid = this.prodData[i].sku_row[i].skid;
                    for (var k = 0; k < this.prodData[i].sku_row[j].sku_images.length; k++) {
                        this.prodData[i].image = this.prodData[i].sku_row[j].sku_images[0].sku_image;
                    }
                }

            }

        }
    }
    cartDetails = [];
    cartCount = [];
    addtoCart(Id, skId, price, venId, vProdID, udisc) {
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
        this.appService.checkQuty(prodId, skuId, 0, venId).subscribe(res => {
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
    addtoWish(Id, skId) {
        var inData = {
            "user_id": JSON.parse(sessionStorage.userId),
            "product_id": Id,
            "sku_id": skId,
            "item_type": "grocery"
        }
        this.appService.addToWish(inData).subscribe(res => {
            if (sessionStorage.userId === undefined) {
                swal("Please Login", "", "error");
            } else if (res.json().status === 400) {
                swal(res.json().wishlist, "", "error");
            } else {


                console.log(res.json());
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
    serProducts: any;
    search(product) {
        this.skuData = [];
        this.catName1 = this.subCatName1 = '';
        this.appService.searchProducts(product).subscribe(res => {
            this.prodData = res.json().data;
            // if (this.serProducts == "No products found with your search") {
            //     this.noData = true;
            // } else {
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
                this.noData = false;
                this.noData1 = false;
                this.product = '' || null;
            }
            if (res.json().status === 400) {
                this.noData = true;
            }


        }, err => {

        })
    }
    category = [];
    getCategories() {
        let params = {
            "country": sessionStorage.country,
            "pin_code": sessionStorage.pinCode === "undefined" ? "null" : sessionStorage.pinCode,
            "area": sessionStorage.Area === "undefined" ? "null" : sessionStorage.Area,
        }
        this.subCatData = [];
        this.appService.getCategories(params).subscribe(resp => {
            this.category = resp.json().categories;
            // this.showSubCat(this.subId);
            for (var i = 0; i < this.category.length; i++) {
                for (var j = 0; j < this.category[i].subcategory.length; j++) {
                    this.subCatData.push(this.category[i].subcategory[j]);
                    console.log(this.subCatData);
                }
            }
        })
    }
    subCategory = [];
    showsubCat(index, id) {
        this.subCategory = [];
        this.selectedCat = index;
        this.showCategories = true;

        for (var i = 0; i < this.subCatData.length; i++) {
            if (id === this.subCatData[i].category_id) {
                this.subCategory.push(this.subCatData[i]);
            }
        }
    }
    closesubSubCat() {
        this.showCategories = false;
        // this.showSubCategories = false;
    }
    selectedCat = false;
    skuDataDrp = [];
    openSub(index) {
        this.selectedCat !== this.selectedCat;
        this.current = index;
    }

    skuArr = [];
    prodData = [];
    getSubProducts(subid, subCatName) {
        this.skuData = [];
        this.skuDataDrp = [];
        this.action = "subCategory";
        this.subId = (subid === '') ? this.subId : subid;
        this.subCatName1 = (subCatName === '') ? this.subCat : subCatName;
        let params = {
            "country": sessionStorage.country,
            "pin_code": sessionStorage.pinCode === "undefined" ? "null" : sessionStorage.pinCode,
            "area": sessionStorage.Area === "undefined" ? "null" : sessionStorage.Area,
            "user_id": sessionStorage.userId
        }
        this.appService.productBySubCatId(this.subId, params).subscribe(res => {
            this.prodData = res.json().vendor_products;
            this.catId1 = this.catId === undefined ? this.prodData === undefined ? null : this.prodData[0].category_id : this.catId;
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
                this.noData = false;
                this.noData1 = false;
            }
            if (res.json().message === "No records Found") {
                this.noData = true;
            }

        }, err => {

        })
    }
    catId;
    Images = []
    getCatProducts(id, catName) {
        this.skuData = [];
        this.catId = (id === '') ? this.catId : id;
        this.catName1 = (catName === '') ? this.catName : catName;
        this.action = "category";
        let params = {
            "country": sessionStorage.country,
            "pin_code": sessionStorage.pinCode === "undefined" ? "null" : sessionStorage.pinCode,
            "area": sessionStorage.Area === "undefined" ? "null" : sessionStorage.Area,
            "user_id": sessionStorage.userId
        }
        this.appService.productByCatId(this.catId, params).subscribe(res => {
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
                this.noData = false;
                this.noData1 = false;
            }
            if (res.json().message === "No records Found") {
                this.noData = true;
                this.noData1 = false;
            }
        }, err => {

        })
        this.subCatName1 = '';
    }
    enlargeImg;
    openNew(skid): void {
        for (var i = 0; i < this.prodData.length; i++) {
            for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                if (skid === this.prodData[i].sku_row[j].skid) {
                    this.enlargeImg = this.prodData[i].sku_row[j].sku_images[0].sku_image;
                    jQuery("#enlargeImg").modal("show");
                }
            }

        }
    }
    vendorProds() {
        let params = {
            "country": sessionStorage.country,
            "pin_code": sessionStorage.pinCode === "undefined" ? "null" : sessionStorage.pinCode,
            "area": sessionStorage.Area === "undefined" ? "null" : sessionStorage.Area,
            "user_id": sessionStorage.userId
        }
        this.appService.getVendorProds(this.vendorId, params).subscribe(res => {
            if (res.json().message === "No records Found") {
                this.noData1 = true;
                this.noData = false;
            } else {
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
                    this.noData1 = false;
                    this.noData = false;
                }
            }

        })
    }
    selectBrand(price, value) {
        this.selectedBrnd = price;
        this.a = value.split(',');
        let params = {
            "country": sessionStorage.country,
            "pin_code": sessionStorage.pinCode === "undefined" ? "null" : sessionStorage.pinCode,
            "area": sessionStorage.Area === "undefined" ? "null" : sessionStorage.Area,
            "min": this.a[0],
            "max": this.a[1],
            "user_id": sessionStorage.userId

        }
        if (this.action === 'category') {
            this.appService.filterCats(this.catId, params).subscribe(res => {
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
                    this.noData = false;
                    this.noData1 = false;
                }
                if (res.json().message == "No records Found") {
                    this.noData = true;
                }
            })
        } else if (this.action === 'subCategory') {
            this.appService.filtersubCats(this.subId, params).subscribe(res => {
                this.prodData = res.json().products;
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
                    this.noData = false;
                    this.noData1 = false;
                }
                if (res.json().status === 400) {
                    this.noData = true;
                }
            })
        }
        else {
            this.appService.fiterVenProds(this.vendorId, params).subscribe(res => {
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
                    this.noData = false;
                    this.noData1 = false;
                }
                if (res.json().message === "No records Found") {
                    this.noData = true;
                }
            })
        }

    }
    selectBrand1(price, value) {
        this.selectedBrnd1 = price;
        this.a = value.split(',');
        this.b = value.split(' ')
        let params = {
            "country": sessionStorage.country,
            "pin_code": sessionStorage.pinCode === "undefined" ? "null" : sessionStorage.pinCode,
            "area": sessionStorage.Area === "undefined" ? "null" : sessionStorage.Area,
            "minsize": this.a[0],
            "maxsize": this.a[1].split(' ')[0],
            "units": this.b[1],
            "user_id": sessionStorage.userId
        }
        if (this.action === 'category') {
            this.appService.sortBySizeCats(this.catId, params).subscribe(res => {
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
                    this.noData = false;
                    this.noData1 = false;
                }
                if (res.json().message == "No records Found") {
                    this.noData = true;
                }
            })
        } else if (this.action === 'subCategory') {
            this.appService.sortBySizeSubCats(this.subId, params).subscribe(res => {
                this.prodData = res.json().products;
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
                    this.noData = false;
                    this.noData1 = false;
                }
                if (res.json().message === "No records Found") {
                    this.noData = true;
                }
            })
        }
        else {
            this.appService.sortBySizeVendor(this.vendorId, params).subscribe(res => {
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
                    this.noData = false;
                    this.noData1 = false;
                }
                if (res.json().message === "No records Found") {
                    this.noData = true;
                }
            })
        }

    }
    ChangeHL(HLtype) {
        let params = {
            "country": sessionStorage.country,
            "pin_code": sessionStorage.pinCode === "undefined" ? "null" : sessionStorage.pinCode,
            "area": sessionStorage.Area === "undefined" ? "null" : sessionStorage.Area,
            "user_id": sessionStorage.userId
        }
        if (HLtype === "0") {
            if (this.action === 'category') {
                this.appService.filterCatHtoL(this.catId, params).subscribe(res => {
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
                        this.noData = false;
                        this.noData1 = false;
                    }
                    if (res.json().status === 400) {
                        this.noData = true;
                    }
                })
            } else if (this.action === 'subCategory') {
                this.appService.filterCatHtoL(this.subId, params).subscribe(res => {
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
                        this.noData = false;
                        this.noData1 = false;
                    }
                    if (res.json().status === 400) {
                        this.noData = true;
                    }
                })
            }
            else {
                this.appService.filterVenHtoL(this.vendorId, params).subscribe(res => {
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
                        this.noData = false;
                        this.noData1 = false;
                    }
                    if (res.json().status === 400) {
                        this.noData = true;
                    }
                })
            }
        } else if (HLtype === "1") {
            if (this.action === 'category') {
                this.appService.filterCatLtoH(this.catId, params).subscribe(res => {
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
                        this.noData = false;
                        this.noData1 = false;
                    }
                    if (res.json().status === 400) {
                        this.noData = true;
                    }
                })
            } else if (this.action === 'subCategory') {
                this.appService.filterSubCatLtoH(this.subId, params).subscribe(res => {
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
                        this.noData = false;
                        this.noData1 = false;
                    }
                    if (res.json().status === 400) {
                        this.noData = true;
                    }
                })
            }
            else {
                this.appService.filterWholeLtoH(this.vendorId, params).subscribe(res => {
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
                        this.noData = false;
                        this.noData1 = false;
                    }
                    if (res.json().status === 400) {
                        this.noData = true;
                    }
                })
            }
        } else {
            this.appService.productByCatId(this.catId1, params).subscribe(res => {
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
                    this.noData = false;
                    this.noData1 = false;
                }
                if (res.json().message === "No records Found") {
                    this.noData = true;
                    this.noData1 = false;
                }
            }, err => {

            })
        }
    }
    getAllCountries() {
        this.appService.getAllCountries().subscribe(res => {
            this.contriesData = res.json().brands;
        })
    }
    changeCountry(country) {
        let params = {
            "country": sessionStorage.country,
            "pin_code": sessionStorage.pinCode === "undefined" ? "null" : sessionStorage.pinCode,
            "area": sessionStorage.Area === "undefined" ? "null" : sessionStorage.Area,
            "productcountry": country,
            "user_id": sessionStorage.userId
        }
        if (this.action === "category") {
            this.appService.sortByCountry1(this.catId, params).subscribe(res => {
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
                    this.noData = false;
                    this.noData1 = false;
                }
                if (res.json().message == "No records Found") {
                    this.noData = true;
                }
            })
        } else if (this.action === "subCategory") {
            this.appService.sortByCountry1SubCat(this.subId, params).subscribe(res => {
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
                    this.noData = false;
                    this.noData1 = false;
                }
                if (res.json().message === "No records Found") {
                    this.noData = true;
                }
            })
        } else {
            this.appService.sortByCountryVenId(this.vendorId, params).subscribe(res => {
                this.prodData = res.json().products;
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
                    this.noData = false;
                    this.noData1 = false;
                }
                if (res.json().message === "No records Found") {
                    this.noData = true;
                }
            })
        }

    }
    getBanProducts1() {
        let params = {
            "country": sessionStorage.country,
            "pin_code": sessionStorage.pinCode === "undefined" ? "null" : sessionStorage.pinCode,
            "area": sessionStorage.Area === "undefined" ? "null" : sessionStorage.Area,
            "user_id": sessionStorage.userId
        }
        this.appService.getBannerProds(this.imgId, params).subscribe(res => {
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
                this.noData = false;
                this.noData1 = false;
            }
            if (res.json().message == "No records Found") {
                this.noData = true;
            }
        })
    }
}
