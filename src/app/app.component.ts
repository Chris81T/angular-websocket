import { Component, OnInit } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { WebsocketService } from "app/websocket.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'webapp';

  private socket: Subject<any>;
  private message: string = 'NO MESSAGE RECEIVED';

  constructor(websocketService: WebsocketService) {
    this.socket = websocketService.createWebsocket();
  }

  ngOnInit(): void {
    console.log('NG INIT ON APP COMP...');
    this.socket.subscribe(message => this.message = message.data);
  }

  pokeMessage(): void {
    console.log('POKE MESSAGE...');
    this.socket.next('PING PONG at ' + new Date());
  }
  
}
