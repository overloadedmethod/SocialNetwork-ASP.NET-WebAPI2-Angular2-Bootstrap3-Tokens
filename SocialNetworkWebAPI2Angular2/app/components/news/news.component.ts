import { Component, OnInit } from '@angular/core';
import { LoginService$, IToken } from '../../services/register.service';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

@Component({
    selector: 'news',
    templateUrl: 'app/news.component.html',
    styleUrls: ['app/news.component.css']
})

export class NewsComponent implements OnInit {

    constructor(private loginService: LoginService$) {
    }

    ngOnInit() {

    }
}