import {EventEmitter, Injectable} from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {io, Socket} from 'socket.io-client';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {


  constructor(private http: HttpClient) {
  }

  // EMITTER
  sendMessage(msg: string, body: any): Observable<any> {
    return this.http.post<any>(`${environment.url}${msg}`, body)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}


