import { Input, Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PaginationModule } from 'ng2-bootstrap';
import { RecieveMessageService$, IRequestMessages, IRecieveMessage } from '../../services/chat.service';
import { ISearchUser, SearchFriendsService$, AddFriendsService$ } from '../../services/friendship.service';
import { ChatslistComponent } from '../shared/chatlist/chatslist.component';

@Component({
    selector: 'search',
    templateUrl: 'app/components/search/search.component.html',
    styleUrls: ['app/components/search/search.component.css']
})

export class SearchComponent implements OnInit {

    constructor(private recieveMessageService: RecieveMessageService$, private searchResult: SearchFriendsService$, private addFriendService: AddFriendsService$) {

    }

    ngOnInit() {
        
    }

    addFriend(friend: ISearchUser)
    {
        this.addFriendService.next(friend.username);
    }
}