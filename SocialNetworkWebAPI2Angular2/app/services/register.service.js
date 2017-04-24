"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
var urlbase_service_1 = require("./urlbase.service");
var LoginService$ = (function (_super) {
    __extends(LoginService$, _super);
    function LoginService$(http, baseUrl) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.baseUrl = baseUrl;
        _this.tokenSubject = new Rx_1.ReplaySubject();
        _this.loginSubject = new Rx_1.Subject();
        var request = _this.loginSubject
            .asObservable()
            .combineLatest(baseUrl, function (login, url) {
            var request = new http_1.RequestOptions;
            var loginAPI = 'Token';
            request.body = new http_1.URLSearchParams();
            request.body.set('grant_type', 'password');
            request.body.set('username', login.username);
            request.body.set('password', login.password);
            request.method = http_1.RequestMethod.Post;
            request.url = url + loginAPI;
            return request;
        }).flatMap(function (requestOpts) { return http.request(new http_1.Request(requestOpts)); });
        var success = request.filter(function (response) { return response.ok; }).map(function (response) { return response.json(); });
        var failure = request.filter(function (response) { return !response.ok; }).map(function (response) { return null; });
        success.merge(failure).subscribe(_this.tokenSubject);
        _this.source = _this.tokenSubject;
        _this.next = function (login) { return _this.loginSubject.next(login); };
        _this.error = function (value) { return _this.tokenSubject.next(null); };
        _this.complete = function () { return _this.tokenSubject.next(null); };
        return _this;
    }
    return LoginService$;
}(Rx_1.Observable));
LoginService$ = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, urlbase_service_1.UrlBaseService$])
], LoginService$);
exports.LoginService$ = LoginService$;
var RegisterService$ = (function (_super) {
    __extends(RegisterService$, _super);
    function RegisterService$(http, baseUrl) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.baseUrl = baseUrl;
        _this.resultSubject = new Rx_1.ReplaySubject();
        _this.registerSubject = new Rx_1.Subject();
        var request = _this.registerSubject
            .asObservable()
            .combineLatest(baseUrl, function (user, url) {
            var request = new http_1.RequestOptions;
            var userAPI = 'Account/Register';
            request.body = new http_1.URLSearchParams();
            request.body.set('userName', user.username);
            request.body.set('password', user.password);
            request.method = http_1.RequestMethod.Post;
            request.url = url + userAPI;
            return request;
        }).flatMap(function (requestOpts) { return http.request(new http_1.Request(requestOpts)); });
        var success = request.filter(function (response) { return response.ok; }).map(function (response) { return true; });
        var failure = request.filter(function (response) { return !response.ok; }).map(function (response) { return false; });
        success.merge(failure).subscribe(_this.resultSubject);
        _this.source = _this.resultSubject;
        _this.next = function (user) { return _this.registerSubject.next(user); };
        _this.error = function (value) { return _this.resultSubject.next(false); };
        _this.complete = function () { return _this.resultSubject.next(null); };
        return _this;
    }
    return RegisterService$;
}(Rx_1.Observable));
RegisterService$ = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, urlbase_service_1.UrlBaseService$])
], RegisterService$);
exports.RegisterService$ = RegisterService$;
//# sourceMappingURL=register.service.js.map