import { Injectable } from '@angular/core';
import { Http, Headers, Response, Request, RequestOptions, RequestMethod } from '@angular/http';
import { Observable, Observer, ReplaySubject } from 'rxjs/Rx';
import { LoginService$ } from './register.service';
import { UrlBaseService$ } from './urlbase.service';

@Injectable()
export class UserDetailsService$ extends Observable<IUserDetails> implements Observable<IUserDetails>
{

    constructor(private http: Http, private loginService: LoginService$, private urlService: UrlBaseService$) {
        super();

        let hasToken = urlService.combineLatest(loginService.filter(token => token != null), (url, token) => {
            let apiUrl = url + 'Account/UserDetails';
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
        }).flatMap(requestOpts => http.request(new Request(requestOpts)));

        let success = hasToken.filter(response => response.ok).map(response => response.json());
        let failure = hasToken.filter(response => !response.ok).map(_ => null);
        let noToken = urlService.combineLatest(loginService.filter(token => token == null), (url, token) => null);

        this.source = Observable.merge(success, failure, noToken);
    }
}

export interface IUserDetails {
    username: string;
    name: string;
}
