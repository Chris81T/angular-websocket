import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";

@Injectable()
export class WebsocketService {

  constructor() { }

  public createWebsocket() : Subject<MessageEvent> {
    let socket = new WebSocket('wss://echo.websocket.org');
    let observable = Observable.create((observer: Observer<MessageEvent>) => {
      
      socket.onmessage = observer.next.bind(observer);
      socket.onerror = observer.error.bind(observer);
      socket.onclose = observer.complete.bind(observer);

      return socket.close.bind(socket);
    });

    let observer = {
      next: (messageObject: Object) => {
        if (socket.readyState === WebSocket.OPEN) {
          let stringifiedMessage = JSON.stringify(messageObject);
          console.log('send over socket: stringifiedMessage = ', stringifiedMessage);
          socket.send(stringifiedMessage);
        }
      }
    }

    return Subject.create(observer, observable);
  }

}
