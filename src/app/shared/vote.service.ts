import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VotePayload } from './vote-button/vote-payload';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  host: string = environment.apiUrl
  constructor(private httpClient: HttpClient) { }

  vote(votePayload: VotePayload): Observable<any> {
    return this.httpClient.post(`${this.host}/votes`, votePayload)
  }
}
