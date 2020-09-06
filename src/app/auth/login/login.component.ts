import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginRequestPayload } from './login-request-payload';
import { AuthService } from '../shared/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginRequestPayload: LoginRequestPayload
  loginForm: FormGroup;
  registerSuccessMessage: string = ''
  isError: boolean
  subscription: Subscription[] = []

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute,
    private router: Router, private toastr: ToastrService) {
    this.loginRequestPayload = {
      username: '',
      password: ''

    }
  }
  ngOnDestroy(): void {
    this.subscription.forEach(subs => subs.unsubscribe())
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })

    this.activatedRoute.queryParams.subscribe(
      params => {
        if (params.registered !== undefined && params.registered === 'true') {
          this.toastr.success('SignUp Successful !')
          this.registerSuccessMessage = 'Please Check your inbox for activation of your account before login!'
        }
      })
  }

  login() {
    this.loginRequestPayload.username = this.loginForm.get('username').value;
    this.loginRequestPayload.password = this.loginForm.get('password').value;

    this.subscription.push(
      this.authService.login(this.loginRequestPayload)
        .subscribe(
          data => {
            if (data) {
              this.isError = false;
              this.router.navigateByUrl('/')
              this.toastr.success('Login Successful !')
            }
            else {
              this.isError = true
            }
          }))
  }

}
