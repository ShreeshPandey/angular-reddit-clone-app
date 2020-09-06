import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostModel } from './post-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  public host :string = environment.apiUrl;
  
  constructor(private httpClient : HttpClient) { }

  getAllPosts() : Observable<Array<PostModel>> 
  {
    return this.httpClient.get<Array<PostModel>>(`${this.host}/posts`)
  }
}
