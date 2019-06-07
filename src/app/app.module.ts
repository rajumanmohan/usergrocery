import { BrowserModule } from '@angular/platform-browser';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { appService } from './services/mahaliServices/mahali.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { ImageZoomModule } from 'angular2-image-zoom';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { MyDatePickerModule } from 'mydatepicker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GooglePlacesDirective } from './directives/google-places.directive';
import { MatRadioModule } from '@angular/material';

//components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { ProductsComponent } from './components/products/products.component';
import { MycartComponent } from './components/mycart/mycart.component';
import { ItemsComponent } from './components/items/items.component';
import { ContactComponent } from './components/contact/contact.component';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import { OrderplacedComponent } from './components/orderplaced/orderplaced.component';
import { UseraccountComponent } from './components/useraccount/useraccount.component';
import { MysavedlistComponent } from './components/mysavedlist/mysavedlist.component';
import { PromocodesComponent } from './components/promocodes/promocodes.component';

// directive
import { NumberOnlyDirective } from './directives/number';
import { AlphabetsOnly, EmailOnly } from './directives/number';
import { AlphaNumericOnly } from './directives/number';
import swal from 'sweetalert';
import { SafePipeModule } from 'safe-pipe';
import { StaticComponent } from './components/static/static.component'
// import { SocialLoginModule } from 'angularx-social-login';
// import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider } from 'angularx-social-login';
import {
    SocialLoginModule,
    AuthServiceConfig,
    GoogleLoginProvider,
    FacebookLoginProvider,
} from "angular5-social-login";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
// import { DateTimePickerComponent } from './date-time-picker/date-time-picker.component';
// const config = new AuthServiceConfig([
//     {
//         id: GoogleLoginProvider.PROVIDER_ID,
//         provider: new GoogleLoginProvider('AIzaSyABEH47hs67lPiHiStOt2pPCBLzgESmKqU.apps.googleusercontent.com')
//     },
//     {
//         id: FacebookLoginProvider.PROVIDER_ID,
//         provider: new FacebookLoginProvider('561602290896109')
//     },
//     // {
//     //   id: LinkedInLoginProvider.PROVIDER_ID,
//     //   provider: new LinkedInLoginProvider("78iqy5cu2e1fgr")
//     // }
// ]);
// const config = new AuthServiceConfig([
//     {
//         id: GoogleLoginProvider.PROVIDER_ID,
//         provider: new GoogleLoginProvider('135880028313-fova8mdgo74qont06ogd5aarfe12f2bm.apps.googleusercontent.com')
//     },
//     {
//         id: FacebookLoginProvider.PROVIDER_ID,
//         provider: new FacebookLoginProvider('561602290896109')
//     },
//     // {
//     //   id: LinkedInLoginProvider.PROVIDER_ID,
//     //   provider: new LinkedInLoginProvider("78iqy5cu2e1fgr")
//     // }
// ]);
export function getAuthServiceConfigs() {
    let config = new AuthServiceConfig(
        [
            {
                id: FacebookLoginProvider.PROVIDER_ID,
                provider: new FacebookLoginProvider("322467725136854")
            },
            {
                id: GoogleLoginProvider.PROVIDER_ID,
                provider: new GoogleLoginProvider("399771236213-39ssksv8p64f2ahp7jqk7h0bdk6qlurj.apps.googleusercontent.com")//local 4200
                // provider: new GoogleLoginProvider("1049449910121-o94ih63qrnluqlfmnqsbuapnml83ffs0.apps.googleusercontent.com")//server 

            },
        ]
    );
    return config;
}
// export function provideConfig() {
//     return config;
// }
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent,
        FooterComponent,
        AboutusComponent,
        ContactComponent,
        LoginComponent,
        RegistrationComponent,
        ProductdetailsComponent,
        MycartComponent,
        ProductsComponent,
        ItemsComponent,
        OrderplacedComponent,
        UseraccountComponent,
        MysavedlistComponent,
        PromocodesComponent,
        NumberOnlyDirective,
        AlphabetsOnly,
        EmailOnly,
        GooglePlacesDirective,
        AlphaNumericOnly,
        StaticComponent

    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        MatDialogModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        Ng2SearchPipeModule,
        HttpModule,
        NgxPaginationModule,
        ImageZoomModule,
        Ng2OrderModule,
        MyDatePickerModule,
        NgbModule,
        SafePipeModule,
        MatRadioModule,
        SocialLoginModule,
        // DateTimePickerComponent,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        MDBBootstrapModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        RouterModule.forRoot([
            { path: '', component: HomeComponent },
            { path: 'aboutUs', component: AboutusComponent },
            { path: 'productdetails', component: ProductdetailsComponent, data: { some_data: 'some value' } },
            {
                path: 'products',
                component: ProductsComponent,
            },
            {
                path: 'Mycart',
                component: MycartComponent,
            },
            {
                path: 'Orderplaced',
                component: OrderplacedComponent,
            },
            {
                path: 'Products',
                component: ProductsComponent,
            },
            // { path: 'myaccount', component: UseraccountComponent, data: [{ page: 'profile' }] },
            // { path: 'wishlistAccount', component: UseraccountComponent, data: [{ page: 'wishlist' }] },
            // { path: 'myorders', component: UseraccountComponent, data: [{ page: 'orders' }] },
            // { path: 'notifications', component: UseraccountComponent, data: [{ page: 'notifications' }] },
            // { path: 'mysavedlist', component: MysavedlistComponent, data: [{ page: 'Mysavedlist' }] },
            // { path: 'aboutus', component: AboutusComponent, data: [{ page: 'Aboutus' }] }
            { path: 'myaccount', component: UseraccountComponent, data: [{ page: 'profile' }] },
            { path: 'wishlistAccount', component: UseraccountComponent, data: [{ page: 'wishlist' }] },
            { path: 'myorders', component: UseraccountComponent, data: [{ page: 'orders' }] },
            { path: 'changePw', component: UseraccountComponent, data: [{ page: 'changePw' }] },
            { path: 'mysavedlist', component: MysavedlistComponent, data: [{ page: 'Mysavedlist' }] },
            { path: 'aboutus', component: AboutusComponent, data: [{ page: 'Aboutus' }] },
            { path: 'addProduct', component: UseraccountComponent, data: [{ page: 'addProduct' }] },
            { path: 'myProduct', component: UseraccountComponent, data: [{ page: 'myproduct' }] },
            { path: 'deliveryAddr', component: UseraccountComponent, data: [{ page: 'deliveryAddr' }] },
            { path: 'contact', component: ContactComponent, data: [{ page: 'contact' }] },
            { path: 'staticData', component: StaticComponent, data: [{ page: 'staticData' }] },
            { path: 'blog', component: StaticComponent, data: [{ page: 'blog' }] },
            { path: 'sellers', component: StaticComponent, data: [{ page: 'sellers' }] },
            { path: 'terms', component: StaticComponent, data: [{ page: 'terms' }] },
            { path: 'privacy', component: StaticComponent, data: [{ page: 'privacy' }] },
            { path: 'news', component: StaticComponent, data: [{ page: 'news' }] },
            { path: 'newProducts', component: HomeComponent, data: [{ page: 'newProducts' }] },

        ], { useHash: true })
    ],
    schemas: [NO_ERRORS_SCHEMA],
    providers: [appService, {
        provide: AuthServiceConfig,
        useFactory: getAuthServiceConfigs
    }],
    // providers: [appService],
    bootstrap: [AppComponent],
    entryComponents: [LoginComponent, RegistrationComponent, ItemsComponent, PromocodesComponent],
    exports: [BrowserModule, TranslateModule]
})
export class AppModule {
    constructor() {
        if (sessionStorage.session === undefined || sessionStorage.session === '' || sessionStorage.session === null) {
            this.randomkey = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            sessionStorage.setItem('session', this.randomkey)
        }

    }
    randomkey;
}
