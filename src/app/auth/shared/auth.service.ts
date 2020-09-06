import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { environment } from '../../../environments/environment'
import { SignupRequestPayload } from '../signup/signup-request-payload'
import { LoginRequestPayload } from '../login/login-request-payload'
import {LoginResponse} from '../login/login-response'
import { Observable, from } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  public host :string = environment.apiUrl;

  constructor(private httpClient:HttpClient,private localStorage:LocalStorageService) { }

  signup(signupRequestPayload :SignupRequestPayload ) :Observable<any> {
    console.log('signup payload:',signupRequestPayload);
    console.log('host:',this.host);

    return this.httpClient.post(`${this.host}/auth/signup`,signupRequestPayload,{responseType:'text'});
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {

    return this.httpClient.post<LoginResponse>(`${this.host}/auth/login`, loginRequestPayload)
      .pipe(map(data => {
        this.localStorage.store('authenticationToken', data.authenticationToken);
        this.localStorage.store('username', data.username);
        this.localStorage.store('refreshToken', data.refreshToken);
        this.localStorage.store('expiresAt', data.expiresAt);
        return true;
      }));
  }

}
