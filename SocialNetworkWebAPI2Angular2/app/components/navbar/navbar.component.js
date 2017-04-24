"use strict";
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
var register_service_1 = require("../../services/register.service");
var account_service_1 = require("../../services/account.service");
var router_1 = require("@angular/router");
var Rx_1 = require("rxjs/Rx");
var friendship_service_1 = require("../../services/friendship.service");
var NavbarComponent = (function () {
    function NavbarComponent(userDetailsService, loginService, router, usersSearch) {
        var _this = this;
        this.userDetailsService = userDetailsService;
        this.loginService = loginService;
        this.router = router;
        this.usersSearch = usersSearch;
        this.ELoginDisplay = ELoginDisplay;
        this.userType$ = new Rx_1.BehaviorSubject(ELoginDisplay.NotLoggedIn);
        userDetailsService.filter(function (user) { return user != null; }).subscribe(function (user) { return _this.userType$.next(ELoginDisplay.Username); });
        userDetailsService.distinctUntilChanged().filter(function (user) { return user == null; }).subscribe(function (user) { return _this.userType$.next(ELoginDisplay.NotLoggedIn); });
        this.searchSubject = new Rx_1.ReplaySubject();
        this.searchSubject.filter(function (req) { return req.length > 2; }).debounceTime(800).distinctUntilChanged().subscribe(usersSearch);
    }
    NavbarComponent.prototype.ngOnInit = function () {
        this.showSuggestions = true;
        this.searchValue = '';
    };
    NavbarComponent.prototype.onLogout = function () {
        this.loginService.complete();
    };
    NavbarComponent.prototype.onKey = function (request) {
        this.searchSubject.next(request);
    };
    NavbarComponent.prototype.onEnter = function (request) {
        this.searchSubject.next(request);
        this.showSuggestions = false;
        this.searchValue = '';
        this.router.navigate(["/search"]);
    };
    return NavbarComponent;
}());
NavbarComponent = __decorate([
    core_1.Component({
        selector: 'navbar',
        templateUrl: 'app/components/navbar/navbar.component.html',
        styleUrls: ['app/components/navbar/navbar.component.css']
    }),
    __metadata("design:paramtypes", [account_service_1.UserDetailsService$, register_service_1.LoginService$, router_1.Router, friendship_service_1.SearchFriendsService$])
], NavbarComponent);
exports.NavbarComponent = NavbarComponent;
var ELoginDisplay;
(function (ELoginDisplay) {
    ELoginDisplay[ELoginDisplay["FullName"] = 0] = "FullName";
    ELoginDisplay[ELoginDisplay["NickName"] = 1] = "NickName";
    ELoginDisplay[ELoginDisplay["Email"] = 2] = "Email";
    ELoginDisplay[ELoginDisplay["Username"] = 3] = "Username";
    ELoginDisplay[ELoginDisplay["NotLoggedIn"] = 4] = "NotLoggedIn";
})(ELoginDisplay || (ELoginDisplay = {}));
//# sourceMappingURL=navbar.component.js.map