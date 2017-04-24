import { Component, OnInit } from '@angular/core';
//import { UserDetailsService$, IUserDetails } from '../../services/account.service';
import { ChatslistComponent, IChatter } from '../shared/chatlist/chatslist.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs/Rx';
import { IRequestMessages, ISendMessage, IRecieveMessage, RecieveMessageService$, SendMessageService$ } from '../../services/chat.service';
import { DatabusService$ } from '../../services/databus.service';


@Component({
    selector: 'privatechat',
    templateUrl: 'app/components/privatechat/privatechat.component.html',
    styleUrls: ['app/components/privatechat/privatechat.component.css']
})

export class PrivatechatComponent implements OnInit {

    private chatter: Subject<IRequestMessages>;
    private status: IRequestMessages;
    private newMessage: string;


    constructor(private route: ActivatedRoute, private messages: RecieveMessageService$, private databus: DatabusService$, private sendMessage: SendMessageService$) {
        this.chatter = new Subject<IRequestMessages>();
    }

    ngOnInit() {
        let req = this.databus
            .filter(m => m.key == 'IChatter')
            .map(m => <IChatter>m.value)
            .map(m => <IRequestMessages>{ fromMessageNum: m.lastRead - Math.min(m.lastRead, 20), pullFrom: m.name });


        req.subscribe(m => this.status = m);

        req.subscribe(this.chatter);

        this.chatter.repeat().combineLatest(Observable.timer(500), (req, _) => req).subscribe(this.messages);

        this.messages.subscribe(m => console.log(JSON.stringify(m)));

        this.newMessage = "";
    }

    onSendMessage(message: string) {
        this.sendMessage.next(<ISendMessage>{ reciever: this.status.pullFrom, text : message });

        this.sendMessage.filter(res => res).subscribe(_ =>
        {
            this.newMessage = "";
            ++this.status.fromMessageNum;
            this.chatter.next(this.status);
        });

    }
}
