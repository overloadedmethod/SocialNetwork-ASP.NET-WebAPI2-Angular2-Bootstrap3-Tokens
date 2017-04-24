"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/// <reference path="../shared/chatlist/chatslist.component.ts" />
/// <reference path="../shared/chatlist/chatslist.component.ts" />
//Core
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
//3rd Party
var ng2_bootstrap_1 = require("ng2-bootstrap");
var ng2_bootstrap_2 = require("ng2-bootstrap");
//Components
var main_component_1 = require("./main.component");
var navbar_component_1 = require("../navbar/navbar.component");
var identity_component_1 = require("../identity/identity.component");
var search_component_1 = require("../search/search.component");
var userdetails_component_1 = require("../userdetails/userdetails.component");
var chatslist_component_1 = require("../shared/chatlist/chatslist.component");
var privatechat_component_1 = require("../privatechat/privatechat.component");
//Services
var register_service_1 = require("../../services/register.service");
var urlbase_service_1 = require("../../services/urlbase.service");
var account_service_1 = require("../../services/account.service");
var chat_service_1 = require("../../services/chat.service");
var friendship_service_1 = require("../../services/friendship.service");
var databus_service_1 = require("../../services/databus.service");
var appRoutes = [
    {
        path: '',
        component: identity_component_1.IdentityComponent,
    },
    {
        path: 'search',
        component: search_component_1.SearchComponent,
    },
    {
        path: 'identity',
        component: identity_component_1.IdentityComponent,
    },
    {
        path: 'userdetails',
        component: userdetails_component_1.UserDetailsComponent
    },
    {
        path: 'privatechat',
        component: privatechat_component_1.PrivatechatComponent
    }
];
var MainModule = (function () {
    function MainModule() {
    }
    return MainModule;
}());
MainModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            ng2_bootstrap_1.Ng2BootstrapModule,
            ng2_bootstrap_2.PaginationModule.forRoot(),
            forms_1.ReactiveFormsModule,
            http_1.HttpModule,
            router_1.RouterModule,
            router_1.RouterModule.forRoot(appRoutes)
        ],
        declarations: [main_component_1.MainComponent, navbar_component_1.NavbarComponent, identity_component_1.IdentityComponent, search_component_1.SearchComponent, userdetails_component_1.UserDetailsComponent, chatslist_component_1.ChatslistComponent, privatechat_component_1.PrivatechatComponent],
        providers: [register_service_1.LoginService$, register_service_1.RegisterService$, chat_service_1.RecieveChannelsStatus$, chat_service_1.RecieveMessageService$, urlbase_service_1.UrlBaseService$, account_service_1.UserDetailsService$, friendship_service_1.SearchFriendsService$, databus_service_1.DatabusService$, chat_service_1.SendMessageService$, friendship_service_1.AddFriendsService$],
        bootstrap: [main_component_1.MainComponent]
    })
], MainModule);
exports.MainModule = MainModule;
//# sourceMappingURL=main.module.js.map