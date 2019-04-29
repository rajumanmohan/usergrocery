import { appService } from './../../services/mahaliServices/mahali.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
    // name;
    // email;
    // message;

    contactForm: FormGroup;
    submitted = false;
    constructor(private appService: appService, private formBuilder: FormBuilder) { }

    ngOnInit() {
        
        this.contactForm = this.formBuilder.group({
            Name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            message: ['', Validators.required]
        });
    }
    get f() { return this.contactForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.contactForm.invalid) {
            return;
        }

        this.appService.contactUs(this.contactForm.value).subscribe(resp => {
            if (resp.json().status === 200) {
                swal(resp.json().message, '', 'success');
            }
            else {
                swal("something went wrong", '', 'error');
            }
        })
    }


}
