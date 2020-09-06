import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SignupRequestPayload } from 'src/app/auth/signup/signup-request-payload';
import { AuthService} from 'src/app/auth/shared/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit,OnDestroy {

  signupSubscription :  Subscription[] =[];
  signupRequestPayload : SignupRequestPayload;
  signUpForm : FormGroup

  constructor(private authService : AuthService) {
    this.signupRequestPayload = {
      username :'',
      password : '',
      email : ''
    }
   }
  ngOnDestroy(): void {
    this.signupSubscription.forEach(subs=>subs.unsubscribe);
  }

  ngOnInit(): void {

    this.signUpForm = new FormGroup({
      username: new FormControl('',Validators.required),
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',Validators.required),
    });
  }

  signup(){
    console.log('in signup');
    
    this.signupRequestPayload.username = this.signUpForm.get('username').value;
    this.signupRequestPayload.password = this.signUpForm.get('password').value;
    this.signupRequestPayload.email = this.signUpForm.get('email').value;

    this.signupSubscription.push(
    this.authService.signup(this.signupRequestPayload).subscribe(data => console.log('data:',data))
    );

  }

}
