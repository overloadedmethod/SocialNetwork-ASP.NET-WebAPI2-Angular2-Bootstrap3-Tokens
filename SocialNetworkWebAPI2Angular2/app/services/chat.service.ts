import { Injectable } from '@angular/core';
import { Observable, Observer, ReplaySubject } from 'rxjs/Rx';
import { LoginService$ } from './register.service';
import { UrlBaseService$ } from './urlbase.service';
import { Http, Headers, Response, Request, RequestOptions, RequestMethod } from '@angular/http';

@Injectable()
export class RecieveMessageService$ extends Observable<IRecieveMessage[]> implements Observer<IRequestMessages>, Observable<IRecieveMessage[]>
{
    public next: (value: IRequestMessages) => void;
    public error: (value: IRequestMessages) => void;
    public complete: () => void;

    private SendSubject: ReplaySubject<IRequestMessages>;

    constructor(private http: Http, private loginService: LoginService$, private urlService: UrlBaseService$)
    {
        super();

        this.SendSubject = new ReplaySubject<IRequestMessages>();

        let request = urlService.combineLatest(loginService.filter(token => token != null), (url, token) => {
            let apiUrl = url + 'Chat/GetMessagesFrom';
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
        })

        let requestResult = request.repeat().combineLatest(this.SendSubject, (opts, req) =>
        {
            opts.body = JSON.stringify(req);
                return opts;
        }).flatMap(requestOpts => http.request(new Request(requestOpts)));

        let success = requestResult.filter(response => response.ok).map(response => response.json());

        this.source = success;

        this.next = (value: IRequestMessages) => this.SendSubject.next(value);
    }

}

@Injectable()
export class RecieveChannelsStatus$ extends Observable<IChannelStatus[]> implements Observer<any>, Observable<IChannelStatus[]>
{
    public next: () => void;
    public error: (value: any) => void;
    public complete: () => void;

    private SendSubject: ReplaySubject<any>;

    constructor(private http: Http, private loginService: LoginService$, private urlService: UrlBaseService$) {
        super();

        this.SendSubject = new ReplaySubject<any>();

        let request = urlService.combineLatest(loginService.filter(token => token != null), (url, token) => {
            let apiUrl = url + 'Chat/GetPrivateChatsStatuses';
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
        })

        let requestResult = request.repeat().combineLatest(this.SendSubject, (opts, req) => {
            return opts;
        }).flatMap(requestOpts => http.request(new Request(requestOpts)));

        let success = requestResult.filter(response => response.ok).map(response => response.json());

        let fail = urlService.combineLatest(loginService.filter(token => token == null));

        this.source = success.merge(fail);

        this.next = () => this.SendSubject.next(null);
    }
}

@Injectable()
export class SendMessageService$ extends Observable<boolean> implements Observer<ISendMessage>, Observable<boolean>
{
    public next: (value: ISendMessage) => void;
    public error: (value: ISendMessage) => void;
    public complete: () => void;

    private RecieveSubject: ReplaySubject<boolean>;
    private SendSubject: ReplaySubject<ISendMessage>;

    constructor(private http: Http, private loginService: LoginService$, private urlService: UrlBaseService$)
    {
        super();

        this.RecieveSubject = new ReplaySubject<boolean>();
        this.SendSubject = new ReplaySubject<ISendMessage>();

        let request = urlService.combineLatest(loginService.filter(token => token != null), (url, token) => {
            let apiUrl = url + 'Chat/SendMessage';
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
        })

        let requestResult = request.repeat().combineLatest(this.SendSubject, (opts, req) => {
            opts.body = JSON.stringify(req);
            return opts;
        }).flatMap(requestOpts => http.request(new Request(requestOpts)));

        this.source = requestResult.map(response => response.ok).merge(this.RecieveSubject);

        this.next = (value: ISendMessage) => this.SendSubject.next(value);
        this.error = (value: ISendMessage) => this.RecieveSubject.next(false);

    }
}


export interface IRecieveMessage
{
    text: string;
    sender: string;
    number: number;
}

export interface ISendMessage
{
    reciever: string;
    text: string;
}

export interface IRequestMessages
{
    pullFrom: string;
    fromMessageNum: number;
}

export interface IChannelStatus
{
    sender: string;
    lastMessageRead: number;
    messages: number;
    seenLastTime: Date;
}