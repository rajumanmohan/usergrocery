import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ProductService } from './services/productservice';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProductService]
})
export class AppComponent {
  title = 'app';
  time = { hour: 13, minute: 30 };
  meridian = true;


  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');

  }
  ngOnInit() {

  }



}
