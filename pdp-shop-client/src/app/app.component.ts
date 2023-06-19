import { Component } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { UserRoles, UserWithToken, createUser, getUsers } from './core/models/user';
import { Observable, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { setCurrentUser } from './store/actions/user.actions';
import { CategoryService } from './core/services/category.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    user$: Observable<UserWithToken>;
    rates: any[] = [];
    loading = true;
    error: any;

    constructor(
        private store: Store<{ user: UserWithToken }>,
        private categoryService: CategoryService
    ) {
        this.loadUserFromLocalStorage();
        this.user$ = this.store.select('user');
    }
    
    ngOnInit() {}

    loadUserFromLocalStorage() {
        const item = localStorage.getItem('user');
        const user = item ? JSON.parse(item) : {};
        this.store.dispatch(setCurrentUser(user as never));
        this.categoryService.loadCategories();
    }
}
