import { Component, OnInit } from '@angular/core';
import { LoginService$, IToken } from '../../services/register.service';
import { UserDetailsService$, IUserDetails } from '../../services/account.service';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs/Rx';
import { SearchFriendsService$ } from '../../services/friendship.service';
import {  } from 'ng2-bootstrap';

@Component({
    selector: 'navbar',
    templateUrl: 'app/components/navbar/navbar.component.html',
    styleUrls: ['app/components/navbar/navbar.component.css']
})

export class NavbarComponent implements OnInit {

    userType$: BehaviorSubject<ELoginDisplay>;
    ELoginDisplay = ELoginDisplay;
    searchSubject: ReplaySubject<string>;
    showSuggestions: boolean;
    searchValue: string;

    constructor(private userDetailsService: UserDetailsService$, private loginService: LoginService$, private router: Router, private usersSearch: SearchFriendsService$) {

        this.userType$ = new BehaviorSubject(ELoginDisplay.NotLoggedIn);

        userDetailsService.filter(user => user != null).subscribe(user => this.userType$.next(ELoginDisplay.Username));
        userDetailsService.distinctUntilChanged().filter(user => user == null).subscribe(user => this.userType$.next(ELoginDisplay.NotLoggedIn));
        this.searchSubject = new ReplaySubject<string>();

        this.searchSubject.filter(req => req.length > 2).debounceTime(800).distinctUntilChanged().subscribe(usersSearch);
    }

    ngOnInit() {
        this.showSuggestions = true;
        this.searchValue = '';
    }

    onLogout(): void
    {
        this.loginService.complete();
    }

    onKey(request: string)
    {
        this.searchSubject.next(request);
    }

    onEnter(request: string)
    {
        this.searchSubject.next(request);
        this.showSuggestions = false;
        this.searchValue = '';
        this.router.navigate(["/search"]);

        
    }
}

enum ELoginDisplay
{
    FullName,
    NickName,
    Email,
    Username,
    NotLoggedIn
}