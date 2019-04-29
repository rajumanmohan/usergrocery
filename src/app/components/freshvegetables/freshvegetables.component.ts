import { Component, OnInit } from '@angular/core';
import { appService } from './../../services/mahaliServices/mahali.service';
import { ActivatedRoute, NavigationExtras, Router, Params } from '@angular/router';
@Component({
    selector: 'app-freshvegetables',
    templateUrl: './freshvegetables.component.html',
    styleUrls: ['./freshvegetables.component.css']
})
export class FreshvegetablesComponent implements OnInit {
    catName;
    sunCatName;
    showCategories = false;
    constructor(private route: ActivatedRoute, public router: Router, public appService: appService) {
        this.route.queryParams.subscribe(params => {
            if (params.action === 'category') {
                this.catId = params.catId;
                this.catName = params.catName;
                // this.getCatProducts('');
            } else if (params.action === 'subCategory') {
                this.subId = params.subId;
                this.catName = params.catName;
                this.sunCatName = params.subCat || "";
                // this.getSubProducts('');
            }
        })
    }

    catId;
    subId;
    selectedCat;
    showsub: boolean;
    //  showSubCategories:boolean;

    subcatData = [];
    showSubCats = false;
    ngOnInit() {
        this.getCategories();
    }


    prodData = [];
    noData = false;
    getCatProducts(id) {
        this.skuData = [];
        this.catId = (id === '') ? this.catId : id;
        this.appService.productByCatId(this.catId, '').subscribe(res => {
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
            }
            if (res.json().status === 400) {
                this.noData = true;
            }


        }, err => {

        })
    }

    Images = [];
    skuImages = [];
    image = [];
    skid;
    getSubProducts(subid) {
        this.skuData = [];
        this.subId = (subid === '') ? this.subId : subid;
        this.appService.productBySubCatId(this.subId, '').subscribe(res => {
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
            }
            if (res.json().status === 400) {
                this.noData = true;
            }
        }, err => {

        })
    }
    category = [];
    skuData = [];

    cartDetails;
    cartCount;
    showProduxtDetails(prodId) {
        this.router.navigate(['/productdetails'], { queryParams: { prodId: prodId } });
    }

    addtoCart(Id) {
        var inData = {
            "products": [{
                product_id: Id,
                sku_id: this.skid
            }],
            "vendor_id": JSON.parse(sessionStorage.getItem('userId')),
            "item_type": "grocery"
        }
        this.appService.addtoCart(inData).subscribe(res => {
            this.cartDetails = res.json().selling_price_total;
            this.cartCount = res.json().count;
            this.getCart();
            swal(res.json().message, "", "success");
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
    subCatData = [];

    showSubCat(Id) {
        this.subId = Id;
        this.subCatData = [];
        this.showSubCats = true;
        for (var i = 0; i < this.category.length; i++) {
            for (var j = 0; j < this.category[i].subcategory.length; j++) {
                if (Id === this.category[i].subcategory[j].category_id) {
                    this.subCatData.push(this.category[i].subcategory[j]);
                    console.log(this.subCatData);

                }
            }
        }
    }
}
