import { Injectable } from '@angular/core';
import { Http, Headers, Response, Request, RequestOptions, RequestMethod, URLSearchParams } from '@angular/http';
import { Observable, Observer, ReplaySubject, Subject } from 'rxjs/Rx';
import { UrlBaseService$ } from './urlbase.service';

@Injectable()
export class LoginService$ extends Observable<IToken> implements Observer<ILoginRegisterUser>, Observable<IToken>
{
    public next: (value: ILoginRegisterUser) => void;
    public error: (value: ILoginRegisterUser) => void;
    public complete: () => void;

    private tokenSubject: ReplaySubject<IToken>;
    private loginSubject: Subject<ILoginRegisterUser>;

    constructor(private http: Http, private baseUrl: UrlBaseService$) {
        super();

        this.tokenSubject = new ReplaySubject<IToken>();
        this.loginSubject = new Subject<ILoginRegisterUser>();

        let request = this.loginSubject
            .asObservable()
            .combineLatest(baseUrl, (login, url) => {
                var request = new RequestOptions;
                let loginAPI = 'Token';
                request.body = new URLSearchParams();
                request.body.set('grant_type', 'password');
                request.body.set('username', login.username);
                request.body.set('password', login.password);
                request.method = RequestMethod.Post;
                request.url = url + loginAPI;
                return request;
            }).flatMap(requestOpts => http.request(new Request(requestOpts)));

        let success = request.filter(response => response.ok).map(response => response.json());
        let failure = request.filter(response => !response.ok).map(response => null);

        success.merge(failure).subscribe(this.tokenSubject);

        this.source = this.tokenSubject;

        this.next = (login: ILoginRegisterUser) => this.loginSubject.next(login);
        this.error = (value: ILoginRegisterUser) => this.tokenSubject.next(null);
        this.complete = () => this.tokenSubject.next(null);
    }
}

@Injectable()
export class RegisterService$ extends Observable<boolean> implements Observer<ILoginRegisterUser>, Observable<boolean>
{
    public next: (value: ILoginRegisterUser) => void;
    public error: (value: ILoginRegisterUser) => void;
    public complete: () => void;

    private resultSubject: ReplaySubject<boolean>;
    private registerSubject: Subject<ILoginRegisterUser>;

    constructor(private http: Http, private baseUrl: UrlBaseService$) {
        super();

        this.resultSubject = new ReplaySubject<boolean>();
        this.registerSubject = new Subject<ILoginRegisterUser>();

        let request = this.registerSubject
            .asObservable()
            .combineLatest(baseUrl, (user, url) => {
                var request = new RequestOptions;
                let userAPI = 'Account/Register';
                request.body = new URLSearchParams();
                request.body.set('userName', user.username);
                request.body.set('password', user.password);
                request.method = RequestMethod.Post;
                request.url = url + userAPI;
                return request;
            }).flatMap(requestOpts => http.request(new Request(requestOpts)));

        let success = request.filter(response => response.ok).map(response => true);
        let failure = request.filter(response => !response.ok).map(response => false);

        success.merge(failure).subscribe(this.resultSubject);

        this.source = this.resultSubject;

        this.next = (user: ILoginRegisterUser) => this.registerSubject.next(user);
        this.error = (value: ILoginRegisterUser) => this.resultSubject.next(false);
        this.complete = () => this.resultSubject.next(null);
    }
}

export interface ILoginRegisterUser {
    username: string;
    password: string;
}

export interface IToken
{
    access_token: string;
    token_type: string;
    expires_in: number;
}