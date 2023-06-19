import { Injectable } from '@angular/core';
import { LoginDTO, LoginSuccessDTO, LOGIN, User, UserWithToken, CreateUserDTO, createUser } from '../models/user';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from '@apollo/client/core';
import { Observable, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { setCurrentUser } from 'src/app/store/actions/user.actions';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    currentUser: UserWithToken | undefined;
    constructor(private apollo: Apollo, private store: Store) { }

    login(credentials: LoginDTO): Observable<UserWithToken | undefined> {
        return this.apollo
            .watchQuery({
                query: LOGIN,
                variables: {
                    login: credentials
                }
            })
            .valueChanges.pipe(map((result: ApolloQueryResult<unknown>) => {
                if (!(result as any)?.data?.login) return undefined;
                const user = (result as any).data!.login as UserWithToken;
                localStorage.setItem('user', JSON.stringify(user));
                this.store.dispatch(setCurrentUser(user as never));
                return this.currentUser;
            }));
    }

    createUser(user: CreateUserDTO): Observable<UserWithToken | undefined> {
        return this.apollo
            .mutate({
                mutation: createUser,
                variables: {
                    user
                }
            }).pipe(map((result: any) => {
                if (!(result as any)?.data?.login) return undefined;
                const user = (result as any).data!.login as UserWithToken;
                return user;
            }));
    }
}
