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
var router_1 = require("@angular/router");
var Rx_1 = require("rxjs/Rx");
var chat_service_1 = require("../../services/chat.service");
var databus_service_1 = require("../../services/databus.service");
var PrivatechatComponent = (function () {
    function PrivatechatComponent(route, messages, databus, sendMessage) {
        this.route = route;
        this.messages = messages;
        this.databus = databus;
        this.sendMessage = sendMessage;
        this.chatter = new Rx_1.Subject();
    }
    PrivatechatComponent.prototype.ngOnInit = function () {
        var _this = this;
        var req = this.databus
            .filter(function (m) { return m.key == 'IChatter'; })
            .map(function (m) { return m.value; })
            .map(function (m) { return ({ fromMessageNum: m.lastRead - Math.min(m.lastRead, 20), pullFrom: m.name }); });
        req.subscribe(function (m) { return _this.status = m; });
        req.subscribe(this.chatter);
        this.chatter.repeat().combineLatest(Rx_1.Observable.timer(500), function (req, _) { return req; }).subscribe(this.messages);
        this.messages.subscribe(function (m) { return console.log(JSON.stringify(m)); });
        this.newMessage = "";
    };
    PrivatechatComponent.prototype.onSendMessage = function (message) {
        var _this = this;
        this.sendMessage.next({ reciever: this.status.pullFrom, text: message });
        this.sendMessage.filter(function (res) { return res; }).subscribe(function (_) {
            _this.newMessage = "";
            ++_this.status.fromMessageNum;
            _this.chatter.next(_this.status);
        });
    };
    return PrivatechatComponent;
}());
PrivatechatComponent = __decorate([
    core_1.Component({
        selector: 'privatechat',
        templateUrl: 'app/components/privatechat/privatechat.component.html',
        styleUrls: ['app/components/privatechat/privatechat.component.css']
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, chat_service_1.RecieveMessageService$, databus_service_1.DatabusService$, chat_service_1.SendMessageService$])
], PrivatechatComponent);
exports.PrivatechatComponent = PrivatechatComponent;
//# sourceMappingURL=privatechat.component.js.map