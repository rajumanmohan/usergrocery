import { Component, OnInit } from '@angular/core';
import { appService } from './../../services/mahaliServices/mahali.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-static',
  templateUrl: './static.component.html',
  styleUrls: ['./static.component.css']
})
export class StaticComponent implements OnInit {
  getFooterData: any;
  page;
  key;
  constructor(private appService: appService, private route: ActivatedRoute, private router: Router
  ) {
    this.page = this.route.snapshot.data[0]['page'];
    if (this.page === "blog") {
      this.key = "Our blog";
    } else if (this.page === "sellers") {
      this.key = "Top sellers";
    }
    else if (this.page === "terms") {
      this.key = "Terms & Conditions";
    } else if (this.page === "privacy") {
      this.key = "Privacy policy";
    } else {
      this.key = "News letter";
    }
  }

  ngOnInit() {
    this.getPrivacy();
  }
  getPrivacy() {
    var inData =
    {
      "key": this.key
    }

    this.appService.getFooter(inData).subscribe(resp => {
      // this.aboutusData = resp.json().data[0].description;
      // this.decodeData = atob(this.aboutusData);
      // this.ckeditorContent = this.decodeData;
      // this.title = resp.json().data[0].type;
      // this.aboutusId = resp.json().data[0].id;
      this.getFooterData = atob(resp.json().data[0].description);
    })
  }

}