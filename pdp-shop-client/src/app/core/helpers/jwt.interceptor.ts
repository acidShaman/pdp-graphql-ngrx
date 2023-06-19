import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, first, flatMap, lastValueFrom, mergeMap } from 'rxjs';
import { UserService } from '../services/user.service';
import { Store } from '@ngrx/store';
import { UserWithToken } from '../models/user';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        private store: Store<{ user: UserWithToken | {} }>) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.select('user').pipe(
            first(),
            mergeMap((user: UserWithToken | {}) => {
              const authReq = !!(user as any).token ? request.clone({
                setHeaders: { Authorization: 'Bearer ' + (user as UserWithToken).token },
              }) : request;
              return next.handle(authReq);
            }),
          );
    }
}