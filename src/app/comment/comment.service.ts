import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommentPayload } from './comment-payload';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  host: string = environment.apiUrl
  constructor(private httpClient: HttpClient) { }

  getAllCommentsForPost(postId: number): Observable<Array<CommentPayload>> {
    return this.httpClient.get<Array<CommentPayload>>(`${this.host}/comments/by-post/${postId}`)
  }

  postComment(commentPayload: CommentPayload): Observable<CommentPayload> {
    return this.httpClient.post<CommentPayload>(`${this.host}/comments/`, commentPayload);
  }

  getAllCommentsByUser(name: string) {
    return this.httpClient.get<CommentPayload[]>(`${this.host}/comments/by-user/${name}`);
  }

}
