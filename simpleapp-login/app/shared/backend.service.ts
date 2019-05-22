import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class User {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private baseUrl = 'http://ace67781.ngrok.io';
  private loginUri = `${this.baseUrl}/login`;

  constructor(private http: HttpClient) {}

  login(user: User): Observable<any> {
    const body = new FormData();
    body.append('username', user.username);
    body.append('password', user.password);

    return this.http.post(this.loginUri, body);
  }
}
