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
var register_service_1 = require("./register.service");
var urlbase_service_1 = require("./urlbase.service");
var UserDetailsService$ = (function (_super) {
    __extends(UserDetailsService$, _super);
    function UserDetailsService$(http, loginService, urlService) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.loginService = loginService;
        _this.urlService = urlService;
        var hasToken = urlService.combineLatest(loginService.filter(function (token) { return token != null; }), function (url, token) {
            var apiUrl = url + 'Account/UserDetails';
            var header = new http_1.Headers();
            header.append('Accept', 'application/json');
            header.append('Content-Type', 'application/json');
            header.append('Authorization', token.token_type + ' ' + token.access_token);
            return new http_1.RequestOptions({
                method: http_1.RequestMethod.Post,
                url: apiUrl,
                headers: header
            });
        }).flatMap(function (requestOpts) { return http.request(new http_1.Request(requestOpts)); });
        var success = hasToken.filter(function (response) { return response.ok; }).map(function (response) { return response.json(); });
        var failure = hasToken.filter(function (response) { return !response.ok; }).map(function (_) { return null; });
        var noToken = urlService.combineLatest(loginService.filter(function (token) { return token == null; }), function (url, token) { return null; });
        _this.source = Rx_1.Observable.merge(success, failure, noToken);
        return _this;
    }
    return UserDetailsService$;
}(Rx_1.Observable));
UserDetailsService$ = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, register_service_1.LoginService$, urlbase_service_1.UrlBaseService$])
], UserDetailsService$);
exports.UserDetailsService$ = UserDetailsService$;
//# sourceMappingURL=account.service.js.map