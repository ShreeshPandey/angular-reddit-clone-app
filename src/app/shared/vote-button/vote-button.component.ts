import { Component, OnInit, Input } from '@angular/core';
import { PostModel } from 'src/app/shared/post-model';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { VoteService } from 'src/app/shared/vote.service';
import { PostService } from '../post.service';
import { ToastrService } from 'ngx-toastr';
import { VotePayload } from './vote-payload';
import { VoteType } from './vote-type.enum';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {

  @Input() post: PostModel
  votePayload: VotePayload
  faArrowUp = faArrowUp
  faArrowDown = faArrowDown
  upvoteColor: string
  downvoteColor: string
  isLoggedIn: boolean

  constructor(private voteService: VoteService, private authService: AuthService,
    private postService: PostService, private toastr: ToastrService,private router :Router) {
    this.votePayload = {
      voteType: undefined,
      postId: undefined
    }

    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data)

  }

  ngOnInit(): void {
  }

  upvotePost() {

    this.votePayload.voteType = VoteType.UPVOTE;
    this.vote();
    this.downvoteColor = '';
  }

  downvotePost() {
    this.votePayload.voteType = VoteType.DOWNVOTE;
    this.vote();
    this.upvoteColor = '';
  }

  private vote() {
    this.votePayload.postId = this.post.id;
    this.voteService.vote(this.votePayload).subscribe(
      () => {
        this.updateVoteDetails();
      },
      error => {
        this.toastr.error(error.error.message)
      });
  }

  private updateVoteDetails() {    
    this.postService.getPost(this.post.id).subscribe(
      post => {
        this.post =post
        this.router.navigateByUrl('').then(()=>window.location.reload()); 
      });
    
  }
  
}
