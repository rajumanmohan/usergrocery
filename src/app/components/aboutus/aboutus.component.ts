import { Component, OnInit } from '@angular/core';
import { appService } from './../../services/mahaliServices/mahali.service';

@Component({
    selector: 'app-aboutus',
    templateUrl: './aboutus.component.html',
    styleUrls: ['./aboutus.component.less']
})
export class AboutusComponent implements OnInit {
    aboutusData: any;
    decodeData: any;
    ckeditorContent = [];
    title;
    aboutusId;
    constructor(private appService: appService) { }

    ngOnInit() {
        this.getAbout();
    }
    getAbout() {
        var inData =
        {
            "key": "About us"
        }

        this.appService.getFooter(inData).subscribe(resp => {
            // this.aboutusData = resp.json().data[0].description;
            // this.decodeData = atob(this.aboutusData);
            // this.ckeditorContent = this.decodeData;
            // this.title = resp.json().data[0].type;
            // this.aboutusId = resp.json().data[0].id;
            this.aboutusData = atob(resp.json().data[0].description);
        })
    }


}
