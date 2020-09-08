import { Component, OnInit } from '@angular/core';

import {PostModel} from 'src/app/shared/post-model';
import {PostService} from 'src/app/shared/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts$ : Array<PostModel> =[]

  constructor(private postServie:PostService) { 
    this.postServie.getAllPosts().subscribe(
      post=> {
        this.posts$ = post
      })
  }

  ngOnInit(): void {
  }

}
