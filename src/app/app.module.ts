import { appService } from './services/mahaliServices/mahali.service';
import { BrowserModule } from '@angular/platform-browser';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgModule, NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; //importing the module
import { ImageZoomModule } from 'angular2-image-zoom';
import swal from 'sweetalert';
import { SafePipeModule } from 'safe-pipe';
import { ExcelService } from './services/constants/excel.service';


import { Ng2CarouselamosModule } from 'ng2-carouselamos';


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
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import { OrderplacedComponent } from './components/orderplaced/orderplaced.component';
import { UseraccountComponent } from './components/useraccount/useraccount.component';
import { MysavedlistComponent } from './components/mysavedlist/mysavedlist.component';
import { PromocodesComponent } from './components/promocodes/promocodes.component';
import { ContactComponent } from './components/contact/contact.component';
import { StoreComponent } from './components/store/store.component';
import { AddressComponent } from './components/address/address.component';
import { FreshvegetablesComponent } from './components/freshvegetables/freshvegetables.component';

import { ReactiveFormsModule } from '@angular/forms';

// directive
import { NumberOnlyDirective } from './directives/number';
import { AlphabetsOnly, EmailOnly } from './directives/number';
import { AlphaNumericOnly } from './directives/number';
import { StaticComponent } from './components/static/static.component';
import { GooglePlacesDirective } from './directives/google-places.directive';


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
        ContactComponent,
        StoreComponent,
        AddressComponent,
        FreshvegetablesComponent,
        NumberOnlyDirective,
        AlphabetsOnly,
        EmailOnly,
        AlphaNumericOnly,
        StaticComponent,
        GooglePlacesDirective

    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        MatDialogModule,
        HttpModule,
        FormsModule,
        ImageZoomModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MDBBootstrapModule.forRoot(),
        Ng2CarouselamosModule,
        SafePipeModule,
        Ng2SearchPipeModule,
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
            { path: 'store', component: StoreComponent },
            { path: 'address', component: AddressComponent },
            { path: 'freshvegetables', component: FreshvegetablesComponent },
            { path: 'productdetails', component: ProductdetailsComponent, data: { some_data: 'some value' } },
            {
                path: 'products',
                component: ProductsComponent,
            },
            {
                path: 'contact',
                component: ContactComponent,
            },
            {
                path: 'mycart',
                component: MycartComponent,
            },
            {
                path: 'Orderplaced',
                component: OrderplacedComponent,
            },
            { path: 'myaccount', component: UseraccountComponent, data: [{ page: 'profile' }] },
            { path: 'wishlistAccount', component: UseraccountComponent, data: [{ page: 'wishlist' }] },
            { path: 'myorders', component: UseraccountComponent, data: [{ page: 'orders' }] },
            { path: 'notifications', component: UseraccountComponent, data: [{ page: 'notifications' }] },
            { path: 'mysavedlist', component: MysavedlistComponent, data: [{ page: 'Mysavedlist' }] },
            { path: 'aboutus', component: AboutusComponent, data: [{ page: 'Aboutus' }] },
            { path: 'addProduct', component: UseraccountComponent, data: [{ page: 'profiles' }] },
            { path: 'myProduct', component: UseraccountComponent, data: [{ page: 'myproduct' }] },
            { path: 'accountData', component: UseraccountComponent, data: [{ page: 'accountData' }] },
            { path: 'blog', component: StaticComponent, data: [{ page: 'blog' }] },
            { path: 'sellers', component: StaticComponent, data: [{ page: 'sellers' }] },
            { path: 'terms', component: StaticComponent, data: [{ page: 'terms' }] },
            { path: 'privacy', component: StaticComponent, data: [{ page: 'privacy' }] },
            { path: 'news', component: StaticComponent, data: [{ page: 'news' }] },
        ], { useHash: true })
    ],
    schemas: [NO_ERRORS_SCHEMA],
    providers: [appService, ExcelService],
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
