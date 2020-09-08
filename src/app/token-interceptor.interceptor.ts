import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';

import { AuthService } from 'src/app/auth/shared/auth.service';
import { LoginResponse } from './auth/login/login-response';
import { switchMap, filter, take, catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

  isTokenRefreshing = false;
  refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.url.indexOf('refresh') !== -1 || request.url.indexOf('login') !== -1
|| (request.url.indexOf('/api/posts/') !== -1 && request.method.indexOf('GET') !== -1)
|| (request.url.indexOf('/api/subreddit') !== -1 && request.method.indexOf('GET') !== -1)) {
return next.handle(request);
}

    const jwtToken = this.authService.getJwtToken();

    if (jwtToken) {
      return next.handle(this.addToken(request, jwtToken))
        .pipe(catchError(error => {
          if (error instanceof HttpErrorResponse && error.status === 403) {
            return this.handleAuthErrors(request, next);
          }
          else {
            return throwError(error);
          }
        }));
    }

    return next.handle(request);
  }

  private handleAuthErrors(req: HttpRequest<any>, next: HttpHandler)
    : Observable<HttpEvent<any>> {
    if (!this.isTokenRefreshing) {
      this.isTokenRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((refreshTokenResponse: LoginResponse) => {
          this.isTokenRefreshing = false;
          this.refreshTokenSubject
            .next(refreshTokenResponse.authenticationToken);
          return next.handle(this.addToken(req,
            refreshTokenResponse.authenticationToken));
        })
      )
    } else {
      return this.refreshTokenSubject.pipe(
        filter(result => result !== null),
        take(1),
        switchMap((res) => {
          return next.handle(this.addToken(req,
            this.authService.getJwtToken()))
        })
      );
    }
  }

  addToken(req: HttpRequest<any>, jwtToken: any) {
    return req.clone({
      headers: req.headers.set('Authorization',
        'Bearer ' + jwtToken)
    });
  }
}
