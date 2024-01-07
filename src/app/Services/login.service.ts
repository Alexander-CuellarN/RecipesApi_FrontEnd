import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserCredential } from '../interfaces/user-credential';
import { User, usersResponse } from '../interfaces/user'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private client: HttpClient) {
  }

  login(userCrendential: UserCredential): Observable<usersResponse> {
    let { endpoint } = environment;
    return this.client.post<usersResponse>(`${endpoint}Usuario/Login`, userCrendential);
  }

  signIn(User: User): Observable<usersResponse>{
    let { endpoint } = environment;
    return this.client.post<usersResponse>(`${endpoint}Usuario`, User);
  }
}
