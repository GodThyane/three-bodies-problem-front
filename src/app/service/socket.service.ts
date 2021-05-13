import {EventEmitter, Injectable} from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {io, Socket} from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: Socket;

  outEven: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    this.socket = io(environment.url);
    this.onNewMessage();
  }

  // EMITTER
  sendMessage(msg: string, body: any) {
    this.socket.emit(msg, {body});
  }

  // HANDLER
  onNewMessage() {
    this.socket.on('event', res => this.outEven.emit(res));
  }
}


