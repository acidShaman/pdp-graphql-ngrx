import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { StoreModule, provideStore } from '@ngrx/store';
import { LoginPage } from './core/components/login-page/login-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
// import { RegisterComponent } from './core/components/register/register.component';
import { EditCategoriesComponent } from './core/components/edit-categories/edit-categories.component';
import { EditProductsComponent } from './core/components/edit-products/edit-products.component';
import { UserDetailsComponent } from './core/components/user-details/user-details.component';
import { LayoutComponent } from './core/components/layout/layout.component';
import { userReducer } from './store/reducers/user.reducer';
import { JwtInterceptor } from './core/helpers';
import { categoryReducer } from './store/reducers/category.reducer';
import { StoreComponent } from './core/components/store/store.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    // RegisterComponent,
    EditCategoriesComponent,
    EditProductsComponent,
    UserDetailsComponent,
    LayoutComponent,
    StoreComponent
  ],
  imports: [
    BrowserModule, 
    ApolloModule, 
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({ 
      user: userReducer,
      categories: categoryReducer
    }),
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideStore({ 
      user: userReducer,
      categories: categoryReducer
    }),
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'http://localhost:3000/graphql',
          }),
        };
      },
      deps: [HttpLink],
    },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
