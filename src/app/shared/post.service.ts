import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostModel } from './post-model';
import { environment } from 'src/environments/environment';

import { CreatePostPayload } from '../post/create-post/create-post.payload';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  public host: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getAllPosts(): Observable<Array<PostModel>> {
    return this.httpClient.get<Array<PostModel>>(`${this.host}/posts`)
  }

  createPost(createPostPayload: CreatePostPayload) :Observable<any> {
    return this.httpClient.post(`${this.host}/posts`, createPostPayload)
  }

  getPost(id: number): Observable<PostModel> {
    return this.httpClient.get<PostModel>(`${this.host}/posts/${id}`);
  }

  getAllPostsByUser(name: string): Observable<PostModel[]> {
    return this.httpClient.get<PostModel[]>(`${this.host}/posts/by-user/${name}`);
  }
}
