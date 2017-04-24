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
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var register_service_1 = require("../../services/register.service");
var IdentityComponent = (function () {
    function IdentityComponent(registerService, loginService, router) {
        var _this = this;
        this.registerService = registerService;
        this.loginService = loginService;
        this.router = router;
        this.loginService.filter(function (token) { return token != null; }).subscribe(function (_) { return _this.router.navigate(["/privatechat"]); });
        this.loginService.filter(function (token) { return token == null; }).subscribe(function (_) { return _this.router.navigate(["/identity"]); });
    }
    IdentityComponent.prototype.ngOnInit = function () {
        this.login = new forms_1.FormGroup({
            username: new forms_1.FormControl('', [forms_1.Validators.minLength(3), forms_1.Validators.maxLength(50)]),
            password: new forms_1.FormControl('', [forms_1.Validators.minLength(6), forms_1.Validators.maxLength(100)])
        });
        this.register = new forms_1.FormGroup({
            username: new forms_1.FormControl('', [forms_1.Validators.minLength(3), forms_1.Validators.maxLength(50)]),
            password: new forms_1.FormControl('', [forms_1.Validators.minLength(6), forms_1.Validators.maxLength(100)]),
            passwordConfirm: new forms_1.FormControl('', [forms_1.Validators.minLength(6), forms_1.Validators.maxLength(100)])
        }, this.passwordMatchValidator);
    };
    IdentityComponent.prototype.onLogin = function () {
        this.loginService.next(this.login.value);
    };
    IdentityComponent.prototype.onRegister = function () {
        var _this = this;
        this.registerService.next(this.register.value);
        this.registerService.filter(function (r) { return r.valueOf(); }).subscribe(function (_) { return _this.loginService.next(_this.register.value); });
    };
    IdentityComponent.prototype.passwordMatchValidator = function (g) {
        return g.get('password').value === g.get('passwordConfirm').value
            ? null : { 'mismatch': true };
    };
    return IdentityComponent;
}());
IdentityComponent = __decorate([
    core_1.Component({
        selector: 'identity',
        templateUrl: 'app/components/identity/identity.component.html',
        styleUrls: ['app/components/identity/identity.component.css']
    }),
    __metadata("design:paramtypes", [register_service_1.RegisterService$, register_service_1.LoginService$, router_1.Router])
], IdentityComponent);
exports.IdentityComponent = IdentityComponent;
//# sourceMappingURL=identity.component.js.map