import { Injectable } from '@angular/core';
import { Http, Headers, Response, Request, RequestOptions, RequestMethod } from '@angular/http';
import { Observable, Observer, ReplaySubject } from 'rxjs/Rx';
import { LoginService$ } from './register.service';
import { UrlBaseService$ } from './urlbase.service';

@Injectable()
export class SearchFriendsService$ extends Observable<ISearchUser[]> implements Observer<string>, Observable<ISearchUser[]>
{
    public next: (value: string) => void;
    public error: (value: string) => void;
    public complete: () => void;

    private RecieveSubject: ReplaySubject<ISearchUser[]>;
    private SendSubject: ReplaySubject<string>;

    constructor(private http: Http, private loginService: LoginService$, private urlService: UrlBaseService$)
    {
        super();

        this.RecieveSubject = new ReplaySubject<ISearchUser[]>();
        this.SendSubject = new ReplaySubject<string>();

        let request = urlService.combineLatest(loginService.filter(token => token != null), (url, token) => {
            let apiUrl = url + 'Friends/LookFor';
            var header: Headers = new Headers();
            header.append('Accept', 'application/json');
            header.append('Content-Type', 'application/json');
            header.append('Authorization', token.token_type + ' ' + token.access_token);
            return new RequestOptions(
                {
                    method: RequestMethod.Post,
                    url: apiUrl,
                    headers: header
                });
        });

        let requestResult = request.repeat().combineLatest(this.SendSubject, (opts, req) => {
            opts.body = JSON.stringify({ name: req });
            return opts;
        }).flatMap(requestOpts => http.request(new Request(requestOpts)));

        let success = requestResult.filter(response => response.ok).map(response => response.json());

        this.source = success;

        this.next = (value: string) => this.SendSubject.next(value);
    }
}


@Injectable()
export class AddFriendsService$ extends Observable<boolean> implements Observer<string>, Observable<boolean>
{
    public next: (value: string) => void;
    public error: (value: string) => void;
    public complete: () => void;

    private RecieveSubject: ReplaySubject<boolean>;
    private SendSubject: ReplaySubject<string>;

    constructor(private http: Http, private loginService: LoginService$, private urlService: UrlBaseService$) {
        super();

        this.RecieveSubject = new ReplaySubject<boolean>();
        this.SendSubject = new ReplaySubject<string>();

        let request = urlService.combineLatest(loginService.filter(token => token != null), (url, token) => {
            let apiUrl = url + 'Friends/AddToFriends';
            var header: Headers = new Headers();
            header.append('Accept', 'application/json');
            header.append('Content-Type', 'application/json');
            header.append('Authorization', token.token_type + ' ' + token.access_token);
            return new RequestOptions(
                {
                    method: RequestMethod.Post,
                    url: apiUrl,
                    headers: header
                });
        });

        let requestResult = request.repeat().combineLatest(this.SendSubject, (opts, req) => {
            opts.body = JSON.stringify({ username: req });
            return opts;
        }).flatMap(requestOpts => http.request(new Request(requestOpts)));

        this.source = requestResult.filter(response => response.ok);
        this.next = (value: string) => this.SendSubject.next(value);
    }
}


export interface ISearchUser
{
    username: string;
    name: string
    isFriend: string;
    isFollowed: string;
    lastSeen: Date;
}