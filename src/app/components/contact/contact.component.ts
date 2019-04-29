import { appService } from './../../services/mahaliServices/mahali.service';
import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
    name;
    email;
    message;
    constructor(private appService: appService) { }

    ngOnInit() {
    }
    contactUs() {
        var data = {
            "name": this.name,
            "email": this.email,
            "Message": this.message
        }

        this.appService.contactUs(data).subscribe(resp => {
            if (resp.json().status === 200) {
                swal(resp.json().message, '', 'success');
                this.name = '';
                this.email = '';
                this.message = ''
            }
            else {
                swal("something went wrong", '', 'error');
            }
        })
    }

}
