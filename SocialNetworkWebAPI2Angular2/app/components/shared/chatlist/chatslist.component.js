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
var chat_service_1 = require("../../../services/chat.service");
var databus_service_1 = require("../../../services/databus.service");
var Rx_1 = require("rxjs/Rx");
var ChatslistComponent = (function () {
    function ChatslistComponent(listService, router, databus) {
        this.listService = listService;
        this.router = router;
        this.databus = databus;
        this.Chatters = listService.map(function (list) { return list.map(function (chatter) { return ({
            name: chatter.sender,
            isOnline: chatter.seenLastTime ? ((Date.now() - chatter.seenLastTime.getTime()) / (1000 * 60)) < 30 : false,
            messages: chatter.messages,
            lastRead: chatter.lastMessageRead
        }); }); });
        Rx_1.Observable.timer(2000).subscribe(listService);
        listService.next();
    }
    ChatslistComponent.prototype.ngOnInit = function () {
    };
    ChatslistComponent.prototype.onChatClick = function (chatter) {
        this.databus.next({ key: 'IChatter', value: chatter });
        this.router.navigate(['/privatechat']);
    };
    return ChatslistComponent;
}());
ChatslistComponent = __decorate([
    core_1.Component({
        selector: 'chatslist',
        templateUrl: 'app/components/shared/chatlist/chatslist.component.html',
        styleUrls: ['app/components/shared/chatlist/chatslist.component.css']
    }),
    __metadata("design:paramtypes", [chat_service_1.RecieveChannelsStatus$, router_1.Router, databus_service_1.DatabusService$])
], ChatslistComponent);
exports.ChatslistComponent = ChatslistComponent;
//# sourceMappingURL=chatslist.component.js.map