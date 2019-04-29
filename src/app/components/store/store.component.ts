import { Component, OnInit } from '@angular/core';
import { appService } from './../../services/mahaliServices/mahali.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
    selector: 'app-store',
    templateUrl: './store.component.html',
    styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
    wholeId;
    constructor(private appService: appService, private route: ActivatedRoute, private router: Router) {
        this.route.queryParams.subscribe(params => {
            this.wholeId = params.wholeId;
        });
    }

    ngOnInit() {
        this.getWholeById();
    }
    wholeData = [];
    shopId;
    getWholeById() {
        this.appService.getWholesellerById(this.wholeId).subscribe(res => {
            this.wholeData = res.json().data[0];
            this.shopId = res.json().data[0].id;
            sessionStorage.setItem('wholeSellerId', this.shopId);
        }, err => {

        })
    }
    shopNow(whole) {
        // this.appService.getWholesellerById(this.wholeId).subscribe(res => {
        //     this.wholeData = res.json().data[0];
        // }, err => {

        // })
        this.router.navigate(['/products'], { queryParams: { wholeId: this.shopId, action: whole } });
    }
}