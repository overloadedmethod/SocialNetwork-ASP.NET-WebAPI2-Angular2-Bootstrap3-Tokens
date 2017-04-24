import { Injectable } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs/Rx';

@Injectable()
export class DatabusService$ extends Observable<IPair> implements Observer<IPair>, Observable<IPair>
{
    public next: (value: IPair) => void;
    public error: (value: IPair) => void;
    public complete: () => void;

    private Bus: Subject<IPair>;

    constructor()
    {
        super();
        this.Bus = new Subject<any>();

        this.next = (value: IPair) => this.Bus.next(value);
        this.error = (value: IPair) => this.Bus.next(null);

        this.source = this.Bus;
    }
}

export interface IPair
{
    key: string;
    value: any;
}
