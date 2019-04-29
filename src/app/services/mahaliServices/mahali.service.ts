import { AppSettings } from './../constants/constants';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class appService {
    product: any;
    constructor(private http: Http) { }
    registration(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.registrationUrl, params, { headers: headers });
    }
    login(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.loginUrl, params, { headers: headers });
    }
    changePwd(params) {
        const headers = new Headers({
            'Content-Type': "application/JSON",
            // 'x-access-token': (sessionStorage.token),
        });
        return this.http.post(AppSettings.changePwdUrl, params, { headers: headers });
    }
    token;
    forgotPassword(params) {
        const headers = new Headers({
            'Content-Type': "application/JSON",
            // 'x-access-token': (sessionStorage.token),
        });
        return this.http.post(AppSettings.forgotPw, params, { headers: headers });
    }
    getCategories() {
        const headers = new Headers({ 'Content-Type': "application/x-www-form-urlencoded" });
        return this.http.get(AppSettings.categoriesUrl, { headers: headers });
    }
    getSubCat(catId) {
        const headers = new Headers({ 'Content-Type': "application/x-www-form-urlencoded" });
        return this.http.get(AppSettings.subCatUrl + '/' + catId, { headers: headers });
    }
    getProduct(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.productUrl, params, { headers: headers })
    }
    loginDetailsbyEmail(formValaues) {
        const headers = new Headers({ 'Content-Type': "application/x-www-form-urlencoded" });
        return this.http.get(AppSettings.loginDetailsUrl + formValaues, { headers: headers })
    }
    getWholeSellers() {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.getWholeSellersUrl, { headers: headers })
    }
    addtoCart(params) {
        const headers = new Headers({
            'Content-Type': "application/JSON",
            'session_id': (sessionStorage.session),
        });

        return this.http.post(AppSettings.addToCart, params, { headers: headers });
    }
    getCart(params) {
        const headers = new Headers({
            'Content-Type': "application/JSON",
            'session_id': sessionStorage.userId === undefined ? (sessionStorage.session) : ""
        });
        return this.http.get(AppSettings.getCart + "/" + params, { headers: headers });
    }
    updateProfile(params) {
        const headers = new Headers({
            'Content-Type': "application/JSON",
            // 'x-access-token': (sessionStorage.token),
        });
        this.vendor_id = sessionStorage.getItem('userId');
        return this.http.put(AppSettings.updateProfile + "/" + this.vendor_id, params, { headers: headers })
    }
    getBanners() {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.getBanners, { headers: headers });
    }
    getProductById(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.ProductById + "/" + params, { headers: headers });
    }
    getWholesellerById(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.wholesellerById + "/" + params, { headers: headers });
    }
    vendor_id
    delCart(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        this.vendor_id = sessionStorage.getItem('userId');
        return this.http.delete(AppSettings.delCart + "/" + this.vendor_id + "/" + params, { headers: headers });
    }
    addaddress(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        this.vendor_id = sessionStorage.getItem('userId');
        return this.http.post(AppSettings.addaddress + "/" + this.vendor_id, params, { headers: headers });
    }
    getAddress() {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        this.vendor_id = sessionStorage.getItem('userId');
        return this.http.get(AppSettings.getAddress + "/" + this.vendor_id, { headers: headers });
    }
    delAddress(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.delete(AppSettings.delAddress + "/" + params, { headers: headers });
    }
    setDelAdd(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        this.vendor_id = sessionStorage.getItem('userId');
        return this.http.put(AppSettings.setDelAdd + "/" + this.vendor_id + "/" + params, { headers: headers });
    }
    paymentType() {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.paymentType, { headers: headers });
    }
    palceOrder(params) {
        const headers = new Headers({
            'Content-Type': "application/JSON",
            // 'x-access-token': (sessionStorage.token),
        });
        return this.http.post(AppSettings.palceOrder, params, { headers: headers });
    }
    getPlaceOrder() {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        this.vendor_id = sessionStorage.getItem('userId');
        return this.http.get(AppSettings.getPlaceOrd + "/" + this.vendor_id, { headers: headers });
    }
    orderSummary(ordId) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.orderSummary + "/" + ordId, { headers: headers });
    }
    productByCatId(prodId, params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        // this.pinCode = sessionStorage.pinCode;
        return this.http.post(AppSettings.productByCatId + "/" + prodId, params, { headers: headers });
    }
    productBySubCatId(subId, params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.productBySubCatId + "/" + subId, params, { headers: headers });
    }
    businessDetails(params) {
        this.vendor_id = sessionStorage.userId;
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.put(AppSettings.businessDetails + "/" + this.vendor_id, params, { headers: headers });
    }
    taxDetails(params) {
        this.vendor_id = sessionStorage.userId;
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.put(AppSettings.taxDetails + "/" + this.vendor_id, params, { headers: headers });
    }
    bankDetails(parmas) {
        this.vendor_id = sessionStorage.userId;
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.put(AppSettings.bankDetails + "/" + this.vendor_id, parmas, { headers: headers });
    }
    getAccDetails() {
        this.vendor_id = sessionStorage.userId;
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.getAccDetails + "/" + this.vendor_id, { headers: headers });
    }
    updateAcc(params) {
        this.vendor_id = sessionStorage.userId;
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.put(AppSettings.updateAcc + "/" + this.vendor_id, params, { headers: headers });
    }
    searchProducts(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.searchProducts + "/" + params, { headers: headers });
    }
    wholeProducts(wholeId) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.wholeProducts + "/" + wholeId, { headers: headers });
    }
    orderById(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.ordById + "/" + params, { headers: headers });
    }
    reqOrder(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        this.vendor_id = sessionStorage.userId;
        return this.http.get(AppSettings.reqProducts + "/" + this.vendor_id + "/" + params, { headers: headers });
    }
    update(params, venId) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        this.vendor_id = sessionStorage.userId;
        return this.http.put(AppSettings.updateProd + "/" + venId, params, { headers: headers });
    }
    contactUs(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.contactUsUrl, params, { headers: headers });
    }
    getAdd(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        // this.vendor_id = sessionStorage.userId;
        return this.http.get(AppSettings.getAddbyId + "/" + params, { headers: headers });
    }
    updateAddData(params, addId) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        this.vendor_id = sessionStorage.userId;
        return this.http.put(AppSettings.updateAddress + "/" + this.vendor_id + "/" + addId, params, { headers: headers });
    }
    getAddedData() {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        this.vendor_id = sessionStorage.userId;
        return this.http.get(AppSettings.getAddedData + "/" + this.vendor_id, { headers: headers });
    }
    delProd(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.delete(AppSettings.delProd + "/" + params, { headers: headers });
    }
    getFooter(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.getFooter, params, { headers: headers });
    }
    delMyProd(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.delete(AppSettings.deleteMyProd + "/" + params, { headers: headers });
    }
    getUserOrders() {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.getUserOrders, { headers: headers });
    }
    reqAdmin(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.requestAdmin, params, { headers: headers });
    }
    updateUsrOrd(cartId, params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.put(AppSettings.updateUserOrd + "/" + cartId, params, { headers: headers });
    }
    otpVerify(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.otpUrl, params, { headers: headers });
    }
    changePwForgot(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.changeForgot, params, { headers: headers });
    }
    getCartWithoutLogin() {
        const headers = new Headers({
            'Content-Type': "application/JSON",
            'session_id': (sessionStorage.session),
        });
        return this.http.get(AppSettings.getCartWithoutLogin, { headers: headers });
    }
    updateGetCart(params) {
        const headers = new Headers({
            'Content-Type': "application/JSON",
            'session_id': (sessionStorage.session),
        });
        return this.http.put(AppSettings.updategetCart, params, { headers: headers });
    }
    modifyCart(params, cartId) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.put(AppSettings.modifyCart + '/' + cartId, params, { headers: headers });
    }
    wholeCatProds(wholeId, catId) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.wholeCatProds + '/' + wholeId + "/" + catId, { headers: headers });
    }
    wholeSubCatProds(wholeId, subId) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.wholeCatProds + '/' + wholeId + "/" + subId, { headers: headers });
    }
    pinCode;
    wholeByLoc(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        // this.pinCode = sessionStorage.pinCode;
        return this.http.post(AppSettings.wholeByLoc, params, { headers: headers });
    }
    filterCats(catId, params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.fiterCatProds + "/" + catId, params, { headers: headers });
    }
    filtersubCats(subId, params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.fitersubCatProds + "/" + subId, params, { headers: headers });
    }
    filterWholeProds(wholeId, params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.fiterWholeProds + "/" + wholeId, params, { headers: headers });
    }
    filterCatHtoL(catId, params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.filterCatHtoL + "/" + catId, params, { headers: headers });
    }
    filterSubCatHtoL(subId, params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.filterSubCatHtoL + "/" + subId, params, { headers: headers });
    }
    filterWholeHtoL(whoId, params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.filterWholeHtoL + "/" + whoId, params, { headers: headers });
    }
    filterCatLtoH(catId, params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.filterCatLtoH + "/" + catId, params, { headers: headers });
    }
    filterSubCatLtoH(subId, params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.filterSubCatLtoH + "/" + subId, params, { headers: headers });
    }
    filterWholeLtoH(whoId, params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.filterWholeHtoL + "/" + whoId, params, { headers: headers });
    }
    getAllCountries() {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.getAllCountries, { headers: headers });
    }
    sortByCountry1(catId, params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.sortByCountry + "/" + catId, params, { headers: headers });
    }
    sortByCountry1SubCat(subId, params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.sortByCountrySubcat + "/" + subId, params, { headers: headers });
    }
    sortByCountry1Whole(wholeId, params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.sortByCountryWhole + "/" + wholeId, params, { headers: headers });
    }
    sortBySizeSubCats(subId, params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.sortBySizeSubCats + "/" + subId, params, { headers: headers });
    }
    sortBySizeCats(catId, params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.sortBySizeCats + "/" + catId, params, { headers: headers });
    }
    sortBySizeWhole(wholeId, params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.sortBySizeCats + "/" + wholeId, params, { headers: headers });
    }
    getUserOrdByVenId() {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        this.vendor_id = sessionStorage.userId;
        return this.http.get(AppSettings.getUserOrdByVenId + "/" + this.vendor_id, { headers: headers });
    }
    orderDetByVenId(ordId) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        this.vendor_id = sessionStorage.userId;
        return this.http.get(AppSettings.orderDetByVenId + "/" + ordId + "/" + this.vendor_id, { headers: headers });
    }
    getBannerProds(ImgId) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.getBannerProds + "/" + ImgId, { headers: headers });
    }
    checkQuty(proId, skuId, qnt) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.checkQuty + "/" + proId + "/" + skuId + "/" + qnt, { headers: headers });
    }

}


