import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/productservice';
import { appService } from './../../services/mahaliServices/mahali.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert';
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
    catId;
    catName;
    subCatName;
    noData1;
    prodData1 = [];
    subCatName1;
    wholecatId;
    catName1;
    selectedBrnd;
    a;
    b;
    action;
    contriesData;
    selectedBrnd1;
    catId1;
    imgId;
    priceArr = [{
        'price': "Less than 100",
        'value': "0,99"
    },
    {
        'price': "Less than 200",
        'value': "100,199"
    },
    {
        'price': "Less than 300",
        'value': "200,299"
    },
    {
        'price': "Less than 400",
        'value': "300,399"
    },
    {
        'price': "More than 400",
        'value': "400,100000"
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
    //     this.priceArr = [{

    // }]
    constructor(private router: Router, public productService: ProductService, private appService: appService, private route: ActivatedRoute) {
        this.route.queryParams.subscribe(params => {
            if (params.action === "whole") {
                this.action = params.action;
                this.wholeId = params.wholeId;
                this.getWholeProds();
                this.wholeProd = true;
                this.serProd = false;
            } else if (params.action === "search") {
                this.action = params.action;
                this.product = params.product;
                this.search(this.product);
                this.wholeProd = false;
                this.serProd = true;
            } else if (params.action === 'category') {
                this.action = params.action;
                this.catId = params.catId;
                this.catId1 = params.catId;
                this.catName = params.catName;
                this.wholeProd = true;
                this.serProd = false;
                this.getCatProducts('', '');
            } else if (params.action === 'subCategory') {
                this.action = params.action;
                this.subId = params.subId;
                this.catName1 = params.catName;
                this.subCatName = params.subCat || "";
                this.wholeProd = true;
                this.serProd = false;
                this.getSubProducts('', '');
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

    collapse(catId) {
        this.showCategories = !this.showCategories;
    }
    showProduxtDetails(prodId) {
        this.router.navigate(['/productdetails'], { queryParams: { prodId: prodId } });
    }
    products = [];
    skuid;
    prodData = [];
    skid;
    noData = false;
    getCatProducts(id, catName) {
        this.catId = (id === '') ? this.catId : id;
        this.catName1 = (catName === '') ? this.catName : catName;
        this.action === 'category';
        if (this.wholeId === undefined) {
            let params = {
                "country": sessionStorage.country,
                "pin_code": sessionStorage.pinCode === "undefined" ? "null" : sessionStorage.pinCode,
                "area": sessionStorage.Area === "undefined" ? "null" : sessionStorage.Area
            }
            this.appService.productByCatId(this.catId, params).subscribe(res => {
                this.prodData = res.json().products;
                if (this.prodData != undefined) {
                    for (var i = 0; i < this.prodData.length; i++) {
                        for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                            this.prodData[i].selling_price = this.prodData[i].sku_row[0].selling_price;
                            this.prodData[i].actual_price = this.prodData[i].sku_row[0].actual_price;
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


            }, err => {

            })
        } else {
            this.appService.wholeCatProds(this.wholeId, this.catId).subscribe(res => {
                this.prodData = res.json().products;
                if (this.prodData != undefined) {
                    for (var i = 0; i < this.prodData.length; i++) {
                        for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                            this.prodData[i].selling_price = this.prodData[i].sku_row[0].selling_price;
                            this.prodData[i].actual_price = this.prodData[i].sku_row[0].actual_price;
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

        this.subCatName1 = '';
    }
    getCatsByWholeId() {
        this.appService.wholeCatProds(this.wholeId, this.wholecatId).subscribe(res => {

        })
    }
    Images = [];
    skuImages = [];
    image = [];
    getSubProducts(subid, subCatName) {
        this.subId = (subid === '') ? this.subId : subid;
        this.subCatName1 = (subCatName === '') ? this.subCatName : subCatName;
        this.action = "subCategory";
        if (this.wholeId === undefined) {
            let params = {
                "country": sessionStorage.country,
                "pin_code": sessionStorage.pinCode === "undefined" ? "null" : sessionStorage.pinCode,
                "area": sessionStorage.Area === "undefined" ? "null" : sessionStorage.Area
            }
            this.appService.productBySubCatId(this.subId, params).subscribe(res => {
                this.prodData = res.json().products;
                this.catId1 = this.catId === undefined ? this.prodData === undefined ? null : this.prodData[0].category_id : this.catId;

                // this.catId1 = this.catId === undefined ? this.prodData[0] == undefined ? null : this.prodData[0].category_id : this.catId;
                if (this.prodData != undefined) {
                    for (var i = 0; i < this.prodData.length; i++) {
                        for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                            this.prodData[i].selling_price = this.prodData[i].sku_row[0].selling_price;
                            this.prodData[i].actual_price = this.prodData[i].sku_row[0].actual_price;
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
            }, err => {

            })
        } else {
            this.appService.wholeSubCatProds(this.wholeId, this.subId).subscribe(res => {
                this.prodData = res.json().products;
                if (this.prodData != undefined) {
                    for (var i = 0; i < this.prodData.length; i++) {
                        for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                            this.prodData[i].selling_price = this.prodData[i].sku_row[0].selling_price;
                            this.prodData[i].actual_price = this.prodData[i].sku_row[0].actual_price;
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
    }
    changeSize(Id) {
        this.skid = Id;
        for (var i = 0; i < this.prodData.length; i++) {
            for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                if (parseInt(Id) === this.prodData[i].sku_row[j].skid) {
                    this.prodData[i].selling_price = this.prodData[i].sku_row[j].selling_price;
                    this.prodData[i].actual_price = this.prodData[i].sku_row[j].actual_price;
                    this.prodData[i].skid = this.prodData[i].sku_row[i].skid;
                    for (var k = 0; k < this.prodData[i].sku_row[j].sku_images.length; k++) {
                        this.prodData[i].image = this.prodData[i].sku_row[j].sku_images[0].sku_image;
                    }
                }

            }

        }
    }
    getWholeProds() {
        // let params = {
        //     "country": sessionStorage.country,
        //     "pin_code": sessionStorage.pinCode === "undefined" ? "null" : sessionStorage.pinCode,
        //     "area": sessionStorage.Area === "undefined" ? "null" : sessionStorage.Area
        // }
        this.appService.wholeProducts(this.wholeId).subscribe(res => {
            this.prodData = res.json().products;
            for (var i = 0; i < this.prodData.length; i++) {
                for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                    this.prodData[i].selling_price = this.prodData[i].sku_row[0].selling_price;
                    this.prodData[i].actual_price = this.prodData[i].sku_row[0].actual_price;
                    this.prodData[i].skid = this.prodData[i].sku_row[0].skid;
                    this.skid = this.prodData[i].sku_row[0].skid;
                    this.prodData[i].image = this.prodData[i].sku_row[0].sku_images[0].sku_image;
                }

            }
            this.noData = false;
            this.noData1 = false;
            if (res.json().message === "No records Found") {
                this.noData = res.json().message;
            }

        }, err => {

        })
    }
    cartDetails = [];
    cartCount = [];
    addtoCart(Id, skid) {
        var inData = {
            "products": [{
                product_id: Id,
                sku_id: skid
            }],
            "vendor_id": JSON.parse(sessionStorage.getItem('userId')),
            "item_type": "grocery"
        }
        this.appService.addtoCart(inData).subscribe(res => {
            if (res.json().status === 400) {
                swal(res.json().message, "", "error");
            } else {
                this.cartDetails = res.json().selling_price_total;
                this.cartCount = res.json().count;
                swal(res.json().message, "", "success");
            }
        }, err => {

        })
    }
    checkProdQuty(prodId, skuId) {
        this.appService.checkQuty(prodId, skuId, 0).subscribe(res => {
            if (res.json().status === 200) {
                this.addtoCart(prodId, skuId);
            } else {
                swal(res.json().message, "", "error");
                // this.NoStockMsg = res.json().data;
            }
        })
    }
    search(product) {
        this.catName1 = this.subCatName1 = ''
        this.appService.searchProducts(product).subscribe(res => {
            this.prodData = res.json().data;
            if (this.prodData != undefined) {
                for (var i = 0; i < this.prodData.length; i++) {
                    for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                        this.prodData[i].selling_price = this.prodData[i].sku_row[0].selling_price;
                        this.prodData[i].actual_price = this.prodData[i].sku_row[0].actual_price;
                        this.prodData[i].image = this.prodData[i].sku_row[0].sku_images[0].sku_image;
                        this.prodData[i].skid = this.prodData[i].sku_row[0].skid;
                        this.skid = this.prodData[i].sku_row[0].skid;
                    }

                }
                this.noData = false;
                this.noData1 = false;
            }
            if (res.json().status === 400) {
                this.noData1 = true;
            }

        }, err => {

        })
    }
    category = [];
    getCategories() {
        this.appService.getCategories().subscribe(resp => {
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
    subCatData = [];
    subId;
    // showSubCat(Id) {
    // this.subId = Id;
    // this.subCatData=[];
    // this.showSubCats = true;
    // for(var i=0;i<this.category.length;i++){
    // for(var j=0;j<this.category[i].subcategory.length;j++){
    // if(Id===this.category[i].subcategory[j].category_id){
    // this.subCatData.push(this.category[i].subcategory[j]);
    // console.log(this.subCatData);

    // }
    // }
    // }
    // }
    selectedCat = false;
    openSub(index) {
        this.selectedCat !== this.selectedCat;
        this.current = index;
    }
    // toggle(current){
    // this.current = current;
    // alert(this.current);
    // this.current!== this.current;
    // }
    //checkboxes 
    selectBrand(price, value) {
        this.selectedBrnd = price;
        this.a = value.split(',');
        let params = {
            "country": sessionStorage.country,
            "pin_code": sessionStorage.pinCode === "undefined" ? "null" : sessionStorage.pinCode,
            "area": sessionStorage.Area === "undefined" ? "null" : sessionStorage.Area,
            "min": this.a[0],
            "max": this.a[1]

        }
        if (this.action === 'category') {
            this.appService.filterCats(this.catId, params).subscribe(res => {
                this.prodData = res.json().products;
                if (this.prodData != undefined) {
                    for (var i = 0; i < this.prodData.length; i++) {
                        for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                            this.prodData[i].selling_price = this.prodData[i].sku_row[0].selling_price;
                            this.prodData[i].actual_price = this.prodData[i].sku_row[0].actual_price;
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
            this.appService.filtersubCats(this.subId, params).subscribe(res => {
                this.prodData = res.json().products;
                if (this.prodData != undefined) {
                    for (var i = 0; i < this.prodData.length; i++) {
                        for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                            this.prodData[i].selling_price = this.prodData[i].sku_row[0].selling_price;
                            this.prodData[i].actual_price = this.prodData[i].sku_row[0].actual_price;
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
        } else {
            let params = {
                "min": this.a[0],
                "max": this.a[1]
            }
            this.appService.filterWholeProds(this.wholeId, params).subscribe(res => {
                this.prodData = res.json().products;
                if (this.prodData != undefined) {
                    for (var i = 0; i < this.prodData.length; i++) {
                        for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                            this.prodData[i].selling_price = this.prodData[i].sku_row[0].selling_price;
                            this.prodData[i].actual_price = this.prodData[i].sku_row[0].actual_price;
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
            "units": this.b[1]
        }
        if (this.action === 'category') {
            this.appService.sortBySizeCats(this.catId, params).subscribe(res => {
                this.prodData = res.json().vendor_products;
                if (this.prodData != undefined) {
                    for (var i = 0; i < this.prodData.length; i++) {
                        for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                            this.prodData[i].selling_price = this.prodData[i].sku_row[0].selling_price;
                            this.prodData[i].actual_price = this.prodData[i].sku_row[0].actual_price;
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
                            this.prodData[i].selling_price = this.prodData[i].sku_row[0].selling_price;
                            this.prodData[i].actual_price = this.prodData[i].sku_row[0].actual_price;
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
            this.appService.sortBySizeWhole(this.wholeId, params).subscribe(res => {
                this.prodData = res.json().products;
                if (this.prodData != undefined) {
                    for (var i = 0; i < this.prodData.length; i++) {
                        for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                            this.prodData[i].selling_price = this.prodData[i].sku_row[0].selling_price;
                            this.prodData[i].actual_price = this.prodData[i].sku_row[0].actual_price;
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

    }
    ChangeHL(HLtype) {
        let params = {
            "country": sessionStorage.country,
            "pin_code": sessionStorage.pinCode === "undefined" ? "null" : sessionStorage.pinCode,
            "area": sessionStorage.Area === "undefined" ? "null" : sessionStorage.Area,
        }
        if (HLtype === "0") {
            if (this.action === 'category') {
                this.appService.filterCatHtoL(this.catId, params).subscribe(res => {
                    this.prodData = res.json().products;
                    if (this.prodData != undefined) {
                        for (var i = 0; i < this.prodData.length; i++) {
                            for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                                this.prodData[i].selling_price = this.prodData[i].sku_row[0].selling_price;
                                this.prodData[i].actual_price = this.prodData[i].sku_row[0].actual_price;
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
                    this.prodData = res.json().products;
                    if (this.prodData != undefined) {
                        for (var i = 0; i < this.prodData.length; i++) {
                            for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                                this.prodData[i].selling_price = this.prodData[i].sku_row[0].selling_price;
                                this.prodData[i].actual_price = this.prodData[i].sku_row[0].actual_price;
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
            } else {
                this.appService.filterWholeHtoL(this.wholeId, params).subscribe(res => {
                    this.prodData = res.json().products;
                    if (this.prodData != undefined) {
                        for (var i = 0; i < this.prodData.length; i++) {
                            for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                                this.prodData[i].selling_price = this.prodData[i].sku_row[0].selling_price;
                                this.prodData[i].actual_price = this.prodData[i].sku_row[0].actual_price;
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
                    this.prodData = res.json().products;
                    if (this.prodData != undefined) {
                        for (var i = 0; i < this.prodData.length; i++) {
                            for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                                this.prodData[i].selling_price = this.prodData[i].sku_row[0].selling_price;
                                this.prodData[i].actual_price = this.prodData[i].sku_row[0].actual_price;
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
                    this.prodData = res.json().products;
                    if (this.prodData != undefined) {
                        for (var i = 0; i < this.prodData.length; i++) {
                            for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                                this.prodData[i].selling_price = this.prodData[i].sku_row[0].selling_price;
                                this.prodData[i].actual_price = this.prodData[i].sku_row[0].actual_price;
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
            } else {
                this.appService.filterWholeLtoH(this.wholeId, params).subscribe(res => {
                    this.prodData = res.json().products;
                    if (this.prodData != undefined) {
                        for (var i = 0; i < this.prodData.length; i++) {
                            for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                                this.prodData[i].selling_price = this.prodData[i].sku_row[0].selling_price;
                                this.prodData[i].actual_price = this.prodData[i].sku_row[0].actual_price;
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
            if (this.action === 'whole') {
                // getWholeProds() {
                // let params = {
                //     "country": sessionStorage.country,
                //     "pin_code": sessionStorage.pinCode === "undefined" ? "null" : sessionStorage.pinCode,
                //     "area": sessionStorage.Area === "undefined" ? "null" : sessionStorage.Area
                // }
                this.appService.wholeProducts(this.wholeId).subscribe(res => {
                    this.prodData = res.json().products;
                    for (var i = 0; i < this.prodData.length; i++) {
                        for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                            this.prodData[i].selling_price = this.prodData[i].sku_row[0].selling_price;
                            this.prodData[i].actual_price = this.prodData[i].sku_row[0].actual_price;
                            this.prodData[i].skid = this.prodData[i].sku_row[0].skid;
                            this.skid = this.prodData[i].sku_row[0].skid;
                            this.prodData[i].image = this.prodData[i].sku_row[0].sku_images[0].sku_image;
                        }

                    }
                    if (res.json().status === "400") {
                        this.noData = res.json().message;
                    }

                }, err => {

                })
                // }
            } else {
                this.appService.productByCatId(this.catId1, params).subscribe(res => {
                    this.prodData = res.json().products;
                    if (this.prodData != undefined) {
                        for (var i = 0; i < this.prodData.length; i++) {
                            for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                                this.prodData[i].selling_price = this.prodData[i].sku_row[0].selling_price;
                                this.prodData[i].actual_price = this.prodData[i].sku_row[0].actual_price;
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


                }, err => {

                })
            }
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
            "productcountry": country

        }
        if (this.action === "category") {
            this.appService.sortByCountry1(this.catId, params).subscribe(res => {
                this.prodData = res.json().products;
                if (this.prodData != undefined) {
                    for (var i = 0; i < this.prodData.length; i++) {
                        for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                            this.prodData[i].selling_price = this.prodData[i].sku_row[0].selling_price;
                            this.prodData[i].actual_price = this.prodData[i].sku_row[0].actual_price;
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
        } else if (this.action === "subCategory") {
            this.appService.sortByCountry1SubCat(this.subId, params).subscribe(res => {
                this.prodData = res.json().products;
                if (this.prodData != undefined) {
                    for (var i = 0; i < this.prodData.length; i++) {
                        for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                            this.prodData[i].selling_price = this.prodData[i].sku_row[0].selling_price;
                            this.prodData[i].actual_price = this.prodData[i].sku_row[0].actual_price;
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
        } else {
            this.appService.sortByCountry1Whole(this.subId, params).subscribe(res => {
                this.prodData = res.json().products;
                if (this.prodData != undefined) {
                    for (var i = 0; i < this.prodData.length; i++) {
                        for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                            this.prodData[i].selling_price = this.prodData[i].sku_row[0].selling_price;
                            this.prodData[i].actual_price = this.prodData[i].sku_row[0].actual_price;
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

    }
    getBanProducts1() {
        this.appService.getBannerProds(this.imgId).subscribe(res => {
            this.prodData = res.json().result;
            if (this.prodData != undefined) {
                for (var i = 0; i < this.prodData.length; i++) {
                    for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                        this.prodData[i].selling_price = this.prodData[i].sku_row[0].selling_price;
                        this.prodData[i].actual_price = this.prodData[i].sku_row[0].actual_price;
                        this.prodData[i].image = this.prodData[i].sku_row[0].sku_images[0].sku_image;
                        this.prodData[i].skid = this.prodData[i].sku_row[0].skid;
                        this.skid = this.prodData[i].sku_row[0].skid;
                    }

                }
                this.noData = false;
                this.noData1 = false;
            }
            if (res.json().status == 400) {
                this.noData = true;
            }
        })
    }

}