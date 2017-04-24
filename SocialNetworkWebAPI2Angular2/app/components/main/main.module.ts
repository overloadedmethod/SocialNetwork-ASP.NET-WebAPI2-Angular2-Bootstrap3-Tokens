/// <reference path="../shared/chatlist/chatslist.component.ts" />
/// <reference path="../shared/chatlist/chatslist.component.ts" />
//Core
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

//3rd Party
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { PaginationModule } from 'ng2-bootstrap';


//Components
import { MainComponent } from './main.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { IdentityComponent } from '../identity/identity.component';
import { SearchComponent } from '../search/search.component';
import { UserDetailsComponent } from '../userdetails/userdetails.component';
import { ChatslistComponent } from '../shared/chatlist/chatslist.component';
import { PrivatechatComponent } from '../privatechat/privatechat.component';


//Services
import { RegisterService$, LoginService$ } from '../../services/register.service';
import { UrlBaseService$ } from '../../services/urlbase.service';
import { UserDetailsService$ } from '../../services/account.service';
import { RecieveMessageService$, RecieveChannelsStatus$, SendMessageService$ } from '../../services/chat.service';
import { SearchFriendsService$, AddFriendsService$ } from '../../services/friendship.service';
import { DatabusService$ } from '../../services/databus.service';


const appRoutes: Routes = [
    {
        path: '',
        component: IdentityComponent,
    },
    {
        path: 'search',
        component: SearchComponent,
    },
    {
        path: 'identity',
        component: IdentityComponent,
    },
    {
        path: 'userdetails',
        component: UserDetailsComponent
    },
    {
        path: 'privatechat',
        component: PrivatechatComponent
    }
];


@NgModule({
    imports: [
        BrowserModule
        , Ng2BootstrapModule
        , PaginationModule.forRoot()
        , ReactiveFormsModule
        , HttpModule
        , RouterModule
        , RouterModule.forRoot(appRoutes)
    ],
    declarations: [MainComponent, NavbarComponent, IdentityComponent, SearchComponent, UserDetailsComponent, ChatslistComponent, PrivatechatComponent],//
    providers: [LoginService$, RegisterService$, RecieveChannelsStatus$, RecieveMessageService$, UrlBaseService$, UserDetailsService$, SearchFriendsService$, DatabusService$, SendMessageService$, AddFriendsService$],
    bootstrap: [MainComponent]
})
export class MainModule { }