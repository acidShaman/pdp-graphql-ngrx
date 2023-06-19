import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './core/components/login-page/login-page.component';
// import { RegisterComponent } from './core/components/register/register.component';
import { AppComponent } from './app.component';
import { EditCategoriesComponent } from './core/components/edit-categories/edit-categories.component';
import { EditProductsComponent } from './core/components/edit-products/edit-products.component';
import { UserDetailsComponent } from './core/components/user-details/user-details.component';
import { LayoutComponent } from './core/components/layout/layout.component';
import { AuthGuard } from './core/helpers';
import { StoreComponent } from './core/components/store/store.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: '**', redirectTo: 'store' },
      { path: 'login', component: LoginPage },
      { path: 'store', component: StoreComponent },
    ]
  },
  { path: 'account', canActivate: [AuthGuard], component: UserDetailsComponent, },
  { path: 'admin/categories', canActivate: [AuthGuard], component: EditCategoriesComponent, },
  { path: 'admin/products', canActivate: [AuthGuard], component: EditProductsComponent, },
  { path: '**', redirectTo: 'store' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
