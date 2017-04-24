import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Response } from '@angular/http';
import { Observable, Observer, BehaviorSubject } from 'rxjs/Rx';

export class UrlBaseService$ extends Observable<string> implements Observable<string>
{
    baseUrl: BehaviorSubject<string>;

    constructor()
    {
        super();
        this.baseUrl = new BehaviorSubject<string>('http://localhost:3276/API/');
        this.source = this.baseUrl.asObservable();
    }
}