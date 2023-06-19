import { Injectable } from '@angular/core';
import { Category, getAllCategories } from '../models/category';
import { Apollo } from 'apollo-angular';
import { Observable, first, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { setCategories } from 'src/app/store/actions/category.actions';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    categories$: Observable<Category[]>
    constructor(
        private apollo: Apollo,
        private store: Store<{ categories: Category[] }>
    ) {
        this.categories$ = this.store.select('categories');
    }

    get categoriesObservable(): Observable<Category[]> {
        return this.categories$;
    }

    loadCategories() {
        this.apollo
            .watchQuery({
                query: getAllCategories
            })
            .valueChanges.pipe(first()).subscribe((result: any) => {
                if (!(result as any)?.data?.allCategories?.length) return;
                const categories = result.data!.allCategories;
                console.log(categories);
                this.store.dispatch(setCategories({categories}));
            })
    }
}
