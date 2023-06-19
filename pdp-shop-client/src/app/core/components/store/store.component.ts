import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Category } from '../../models/category';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent {
  categories: Category[] = [];
  constructor(
    private store: Store<{ categories: Category[]}>
  ) {
    this.store.select('categories').subscribe(categories => {
      this.categories = categories;
    })
  }

  ngOnInit() {}
}
