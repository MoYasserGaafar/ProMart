import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';

import { headersInterceptor } from './core/interceptors/headers.interceptor';
import { catchErrorInterceptor } from './core/interceptors/catch-error.interceptor';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

//Configure ngx-translate using app.config to load translation files from assets/i18n/.
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(
    routes, //Array of route configurations
    withHashLocation(),
    withViewTransitions(),
    withInMemoryScrolling()
  ),

  provideHttpClient(withFetch(), withInterceptors([headersInterceptor, catchErrorInterceptor, loadingInterceptor])),

  importProvidersFrom(
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      defaultLanguage: "en",
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ),

  provideAnimations(), //Required animations providers
  provideToastr() //Toastr providers
]
};