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
var Rx_1 = require("rxjs/Rx");
var register_service_1 = require("./register.service");
var urlbase_service_1 = require("./urlbase.service");
var http_1 = require("@angular/http");
var RecieveMessageService$ = (function (_super) {
    __extends(RecieveMessageService$, _super);
    function RecieveMessageService$(http, loginService, urlService) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.loginService = loginService;
        _this.urlService = urlService;
        _this.SendSubject = new Rx_1.ReplaySubject();
        var request = urlService.combineLatest(loginService.filter(function (token) { return token != null; }), function (url, token) {
            var apiUrl = url + 'Chat/GetMessagesFrom';
            var header = new http_1.Headers();
            header.append('Accept', 'application/json');
            header.append('Content-Type', 'application/json');
            header.append('Authorization', token.token_type + ' ' + token.access_token);
            return new http_1.RequestOptions({
                method: http_1.RequestMethod.Post,
                url: apiUrl,
                headers: header
            });
        });
        var requestResult = request.repeat().combineLatest(_this.SendSubject, function (opts, req) {
            opts.body = JSON.stringify(req);
            return opts;
        }).flatMap(function (requestOpts) { return http.request(new http_1.Request(requestOpts)); });
        var success = requestResult.filter(function (response) { return response.ok; }).map(function (response) { return response.json(); });
        _this.source = success;
        _this.next = function (value) { return _this.SendSubject.next(value); };
        return _this;
    }
    return RecieveMessageService$;
}(Rx_1.Observable));
RecieveMessageService$ = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, register_service_1.LoginService$, urlbase_service_1.UrlBaseService$])
], RecieveMessageService$);
exports.RecieveMessageService$ = RecieveMessageService$;
var RecieveChannelsStatus$ = (function (_super) {
    __extends(RecieveChannelsStatus$, _super);
    function RecieveChannelsStatus$(http, loginService, urlService) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.loginService = loginService;
        _this.urlService = urlService;
        _this.SendSubject = new Rx_1.ReplaySubject();
        var request = urlService.combineLatest(loginService.filter(function (token) { return token != null; }), function (url, token) {
            var apiUrl = url + 'Chat/GetPrivateChatsStatuses';
            var header = new http_1.Headers();
            header.append('Accept', 'application/json');
            header.append('Content-Type', 'application/json');
            header.append('Authorization', token.token_type + ' ' + token.access_token);
            return new http_1.RequestOptions({
                method: http_1.RequestMethod.Post,
                url: apiUrl,
                headers: header
            });
        });
        var requestResult = request.repeat().combineLatest(_this.SendSubject, function (opts, req) {
            return opts;
        }).flatMap(function (requestOpts) { return http.request(new http_1.Request(requestOpts)); });
        var success = requestResult.filter(function (response) { return response.ok; }).map(function (response) { return response.json(); });
        var fail = urlService.combineLatest(loginService.filter(function (token) { return token == null; }));
        _this.source = success.merge(fail);
        _this.next = function () { return _this.SendSubject.next(null); };
        return _this;
    }
    return RecieveChannelsStatus$;
}(Rx_1.Observable));
RecieveChannelsStatus$ = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, register_service_1.LoginService$, urlbase_service_1.UrlBaseService$])
], RecieveChannelsStatus$);
exports.RecieveChannelsStatus$ = RecieveChannelsStatus$;
var SendMessageService$ = (function (_super) {
    __extends(SendMessageService$, _super);
    function SendMessageService$(http, loginService, urlService) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.loginService = loginService;
        _this.urlService = urlService;
        _this.RecieveSubject = new Rx_1.ReplaySubject();
        _this.SendSubject = new Rx_1.ReplaySubject();
        var request = urlService.combineLatest(loginService.filter(function (token) { return token != null; }), function (url, token) {
            var apiUrl = url + 'Chat/SendMessage';
            var header = new http_1.Headers();
            header.append('Accept', 'application/json');
            header.append('Content-Type', 'application/json');
            header.append('Authorization', token.token_type + ' ' + token.access_token);
            return new http_1.RequestOptions({
                method: http_1.RequestMethod.Post,
                url: apiUrl,
                headers: header
            });
        });
        var requestResult = request.repeat().combineLatest(_this.SendSubject, function (opts, req) {
            opts.body = JSON.stringify(req);
            return opts;
        }).flatMap(function (requestOpts) { return http.request(new http_1.Request(requestOpts)); });
        _this.source = requestResult.map(function (response) { return response.ok; }).merge(_this.RecieveSubject);
        _this.next = function (value) { return _this.SendSubject.next(value); };
        _this.error = function (value) { return _this.RecieveSubject.next(false); };
        return _this;
    }
    return SendMessageService$;
}(Rx_1.Observable));
SendMessageService$ = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, register_service_1.LoginService$, urlbase_service_1.UrlBaseService$])
], SendMessageService$);
exports.SendMessageService$ = SendMessageService$;
//# sourceMappingURL=chat.service.js.map