import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { SubredditModel } from './subreddit-response';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SubredditService {

  host : string = environment.apiUrl

  constructor(private httpClient : HttpClient) { }

  getAllSubreddits():Observable<Array<SubredditModel>>
  {        
    return this.httpClient.get<Array<SubredditModel>>(`${this.host}/subreddit`);
  }

  createSubreddit(subreddit:SubredditModel)
  {
    return this.httpClient.post(`${this.host}/subreddit`,subreddit);
  }

}
