import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideStore, provideState } from '@ngrx/store';
import { AppComponent } from './app/app.component';
import { userReducer } from './app/store/reducers/user.reducer';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
