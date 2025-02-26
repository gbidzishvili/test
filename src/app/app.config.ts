import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { UserEffects } from './state/users/user.effects';
// import { userReducer } from './state/users/reducers/user.reducer';
// import { paginationReducer } from './state/users/reducers/pagination.reducers';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { reducers } from './state/reducers.index';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideStore(reducers),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects([UserEffects]),
    provideHttpClient(withFetch()),
  ],
};
