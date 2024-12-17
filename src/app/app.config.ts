import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideErcaspay } from '../../projects/ercaspay-angular/src/public-api';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideErcaspay(
      'ECRS-TEST-SK9suJneFkk1o8gBaUmOHCBIt9jRWN88QbaKAvoBRu',
      'ECRS-TEST-AK6a1Gpbdjs0Hcn0nmvRKoRb5xG28vJBJoU7Y1k6Hr'
    ),
    provideHttpClient(),
  ],
};
