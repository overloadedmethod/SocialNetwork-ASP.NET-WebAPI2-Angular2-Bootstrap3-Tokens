import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecieveChannelsStatus$, IChannelStatus } from '../../../services/chat.service';
import { DatabusService$, IPair } from '../../../services/databus.service';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

@Component({
    selector: 'chatslist',
    templateUrl: 'app/components/shared/chatlist/chatslist.component.html',
    styleUrls: ['app/components/shared/chatlist/chatslist.component.css']
})

export class ChatslistComponent implements OnInit {

    Chatters: Observable<IChatter[]>;

    constructor(private listService: RecieveChannelsStatus$, private router: Router, private databus: DatabusService$) {
        this.Chatters = listService.map(list => list.map(chatter => <IChatter>{
            name: chatter.sender
            , isOnline: chatter.seenLastTime ? ((Date.now() - chatter.seenLastTime.getTime()) / (1000 * 60)) < 30 : false
            , messages: chatter.messages
            , lastRead: chatter.lastMessageRead
        }));

        Observable.timer(2000).subscribe(listService);
        listService.next();
    }

    ngOnInit() {

    }

    onChatClick(chatter: IChatter) {
        this.databus.next(<IPair>{ key: 'IChatter', value: chatter });
        this.router.navigate(['/privatechat']);
    }
}

export interface IChatter {
    name: string;
    isOnline: boolean;
    messages: number;
    lastRead: number;
}