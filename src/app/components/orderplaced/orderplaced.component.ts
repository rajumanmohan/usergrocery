import { Component, OnInit } from '@angular/core';
import { appService } from './../../services/mahaliServices/mahali.service';
import { ActivatedRoute, NavigationExtras, Router, Params } from '@angular/router';
@Component({
  selector: 'app-orderplaced',
  templateUrl: './orderplaced.component.html',
  styleUrls: ['./orderplaced.component.less']
})
export class OrderplacedComponent implements OnInit {
  ordId;
  ordid
  constructor(private appService: appService, private route: ActivatedRoute, public router: Router) {
    this.route.queryParams.subscribe(params => {
      this.ordId = params.orderId
    })
    this.getOrdSummary();
  }

  ngOnInit() {
    this.getOrdSummary();
  }
  ordSum = [];
  getOrdSummary() {
    this.appService.orderSummary(this.ordId).subscribe(res => {
      this.ordid = res.json().Orders[0].order_id;
      this.ordSum = res.json().Orders[0].delivery_address_id[0];
    }, err => {

    })
  }

}
