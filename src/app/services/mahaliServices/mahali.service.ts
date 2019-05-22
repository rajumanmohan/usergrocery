import { AppSettings } from './../constants/constants';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()

export class appService {
    product: any;
    user_id;
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
        this.user_id = sessionStorage.getItem('userId');
        return this.http.post(AppSettings.changePwdUrl + "/" + this.user_id, params, { headers: headers });
    }
    token;
    forgotPassword(params) {
        const headers = new Headers({
            'Content-Type': "application/JSON",
            // 'x-access-token': (sessionStorage.token),
        });
        return this.http.post(AppSettings.forgotPw, params, { headers: headers });
    }
    getCategories(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON", });
        return this.http.post(AppSettings.categoriesUrl, params, { headers: headers });
    }
    getSubCat(catId) {
        const headers = new Headers({ 'Content-Type': "application/x-www-form-urlencoded" });
        return this.http.get(AppSettings.subCatUrl + '/' + catId, { headers: headers });
    }
    getProduct() {
        const headers = new Headers({ 'Content-Type': "application/x-www-form-urlencoded" });
        // this.user_id = sessionStorage.userId;
        return this.http.get(AppSettings.productUrl, { headers: headers })
    }
    loginDetailsbyEmail(formValaues) {
        const headers = new Headers({ 'Content-Type': "application/x-www-form-urlencoded" });
        return this.http.get(AppSettings.loginDetailsUrl + formValaues, { headers: headers })
    }
    getWholeSellers() {
        const headers = new Headers({ 'Content-Type': "application/x-www-form-urlencoded" });
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
            // 'token': (sessionStorage.token),
        });
        this.vendor_id = sessionStorage.getItem('userId');
        return this.http.put(AppSettings.updateProfile + "/" + this.vendor_id, params, { headers: headers })
    }
    getBanners() {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.getBanners, { headers: headers });
    }
    getBrands() {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.getBrands, { headers: headers });
    }
    getProductById(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        this.vendor_id = sessionStorage.getItem('userId');
        return this.http.get(AppSettings.ProductById + "/" + params + "/" + this.vendor_id, { headers: headers });
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
        this.user_id = sessionStorage.getItem('userId');
        return this.http.get(AppSettings.getAddress + "/" + this.user_id, { headers: headers });
    }
    delAddress(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.delete(AppSettings.delAddress + "/" + params, { headers: headers });
    }
    setDelAdd(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        this.user_id = sessionStorage.getItem('userId');
        return this.http.put(AppSettings.setDelAdd + "/" + this.user_id + "/" + params, { headers: headers });
    }
    paymentType() {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.paymentType, { headers: headers });
    }
    palceOrder(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
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
    productByCatId(params, params1) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.productByCatId + "/" + params, params1, { headers: headers });
    }
    productBySubCatId(params, params1) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.productBySubCatId + "/" + params, params1, { headers: headers });
    }
    searchProducts(params, par) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.searchProducts + "/" + params, par, { headers: headers });
    }
    wholeProducts(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.wholeProducts + "/" + params, { headers: headers });
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
    update(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        this.vendor_id = sessionStorage.userId;
        return this.http.put(AppSettings.updateProd, params, { headers: headers });
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
    updateCart(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        this.vendor_id = sessionStorage.userId;
        return this.http.put(AppSettings.updateCart + "/" + params, { headers: headers });
    }
    addToWish(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.addWish, params, { headers: headers });
    }
    getWish() {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        this.user_id = sessionStorage.userId;
        return this.http.get(AppSettings.getWish + "/" + this.user_id, { headers: headers });
    }
    getVouchers() {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.getVouchers, { headers: headers });
    }
    applyVoucher(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.applyVoucher, params, { headers: headers });
    }
    delWishList(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        this.user_id = sessionStorage.userId;
        return this.http.delete(AppSettings.delWish + "/" + this.user_id + "/" + params, { headers: headers });
    }
    getSlots() {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        this.user_id = sessionStorage.userId;
        return this.http.get(AppSettings.getSlots + "/" + this.user_id, { headers: headers });
    }
    modifyCart(params, cartId) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.put(AppSettings.modifyCart + '/' + cartId, params, { headers: headers });
    }
    getAllProducts(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.getAllProducts, params, { headers: headers });
    }
    getVegetables() {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.getVegetables, { headers: headers });
    }
    getFruits() {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.getFruits, { headers: headers });
    }
    getTea() {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.getTea, { headers: headers });
    }
    getBread() {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.getBread, { headers: headers });
    }
    getJuice() {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.getJuice, { headers: headers });
    }
    getBeaty() {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.getBeaty, { headers: headers });
    }
    modifyWish(params, cartId) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        this.user_id = sessionStorage.userId
        return this.http.put(AppSettings.modifyWish + "/" + this.user_id + '/' + cartId, params, { headers: headers });
    }
    changePwForgot(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.changeForgot, params, { headers: headers });
    }
    otpVerify(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.otpUrl, params, { headers: headers });
    }
    getFooter(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.getFooter, params, { headers: headers });
    }
    getVendors(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.getVendors, params, { headers: headers });
    }
    getuserCats() {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.getuserCats, { headers: headers });
    }
    getVendorProds(venId, params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.getVendorProds + "/" + venId, params, { headers: headers });
    }
    updateGetCart(params) {
        const headers = new Headers({
            'Content-Type': "application/JSON",
            'session_id': (sessionStorage.session),
        });
        return this.http.put(AppSettings.updategetCart, params, { headers: headers });
    }
    filterCats(catId, params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.fiterCatProds + "/" + catId, params, { headers: headers });
    }
    filtersubCats(subId, params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.fitersubCatProds + "/" + subId, params, { headers: headers });
    }
    fiterVenProds(subId, params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.fiterVenProds + "/" + subId, params, { headers: headers });
    }
    filterCatHtoL(catId, params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.filterCatHtoL + "/" + catId, params, { headers: headers });
    }
    filterSubCatHtoL(subId, params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.filterSubCatHtoL + "/" + subId, params, { headers: headers });
    }
    filterVenHtoL(venId, params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.filterVenHtoL + "/" + venId, params, { headers: headers });
    }
    filterCatLtoH(catId, params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.filterCatLtoH + "/" + catId, params, { headers: headers });
    }
    filterSubCatLtoH(subId, params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.filterSubCatLtoH + "/" + subId, params, { headers: headers });
    }
    filterWholeLtoH(venId, params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.filterVendorLtoH + "/" + venId, params, { headers: headers });
    }
    sortByCountry1(catId, params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.sortByCountry + "/" + catId, params, { headers: headers });
    }
    sortByCountry1SubCat(subId, params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.sortByCountrySubcat + "/" + subId, params, { headers: headers });
    }
    sortByCountryVenId(subId, params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.sortByCountryVenId + "/" + subId, params, { headers: headers });
    }
    getAllCountries() {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.getAllCountries, { headers: headers });
    }
    sortBySizeCats(catId, params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.sortBySizeCats + "/" + catId, params, { headers: headers });
    }
    sortBySizeSubCats(subId, params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.sortBySizeSubCats + "/" + subId, params, { headers: headers });
    }
    sortBySizeVendor(venId, params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.sortBySizeVendor + "/" + venId, params, { headers: headers });
    }
    getBannerProds(ImgId, params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.getBannerProds + "/" + ImgId, params, { headers: headers });
    }
    checkQuty(proId, skuId, qnt, venId, vProdID) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.checkQuty + "/" + vProdID + "/" + qnt, { headers: headers });
    }
    getBrandCats() {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.getBrandCats, { headers: headers });
    }
    getDetailsById() {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        this.user_id = sessionStorage.userId;
        return this.http.get(AppSettings.getDetailsById + "/" + this.user_id, { headers: headers });
    }
    socialLogin(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        // this.user_id = sessionStorage.userId;
        return this.http.post(AppSettings.socialLogin, params, { headers: headers });
    }
    forgotwithEmail(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        // this.user_id = sessionStorage.userId;
        return this.http.post(AppSettings.forgotwithEmail, params, { headers: headers });
    }
    getNotifications1() {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        this.user_id = sessionStorage.userId;
        return this.http.get(AppSettings.getNotifications + "/" + this.user_id + "/" + "grocery", { headers: headers });
    }
    getoffersGro(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        // this.user_id = sessionStorage.userId;
        return this.http.post(AppSettings.getoffersGro, params, { headers: headers });
    }
}
