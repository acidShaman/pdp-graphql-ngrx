import { Injectable } from '@angular/core';
import { Router, CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { UserService } from '../services/user.service';
import { Store } from '@ngrx/store';
import { Observable, catchError, filter, first, lastValueFrom, mergeMap, of, switchMap, take, tap } from 'rxjs';
import { UserWithToken } from '../models/user';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    token: string | undefined;
    constructor(
        private router: Router,
        private store: Store<{ user: UserWithToken | {} }>) {
        this.store.select('user').subscribe(user => {
            this.token = (user as any)?.token ?? undefined;
        });
    }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.token) {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
        } else {
            return true;
        }
    }
}