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
//<http>: An instance of <HttpClient> is passed to the loader to make HTTP requests to fetch the translation files.
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  //<./assets/i18n/>: Specifies the base URL or path where the translation files are located. In this case, the files are expected to be in the <assets/i18n> directory.
  //<.json>: Indicates that the translation files are in JSON format.
}

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(
    routes, //Array of route configurations
    withHashLocation(),
    //Function enables hash-based location strategy, which uses the hash in the URL to represent different routes
    withViewTransitions(),
    //Function enables view transitions, providing smooth animations between routes
    withInMemoryScrolling()
    //Function enables in-memory scrolling, which preserves scroll positions when navigating between routes within the same application
  ),

  provideHttpClient(withFetch(), withInterceptors([headersInterceptor, catchErrorInterceptor, loadingInterceptor])),
  //Provides the HttpClient service for making HTTP requests to external APIs.
  //<withFetch()>: This function is used to configure the HttpClient to use the fetch API for making HTTP requests.
  //<withInterceptors([headersInterceptor])>: Adds <headersInterceptor> as an interceptor, which adds custom headers to outgoing requests, as authentication tokens or custom headers for specific APIs.

  importProvidersFrom(
    BrowserAnimationsModule,
    //Module provides browser-specific animations for Angular components.
    TranslateModule.forRoot({
    //Configures the <TranslateModule> for root level usage, meaning it's available throughout the entire application.
      defaultLanguage: "en",
      //Sets <en> as a default language.
      loader: {
      //Specifies how the translation files are loaded.
        provide: TranslateLoader,
        //Indicates that the <TranslateLoader> interface should be provided.
        useFactory: HttpLoaderFactory,
        //Specifies the <factory> function <HttpLoaderFactory> to create an instance of the <TranslateHttpLoader>.
        deps: [HttpClient]
        //Injects the <HttpClient> dependency into the <HttpLoaderFactory> function.
      }
    })
  ),

  provideAnimations(), //Required animations providers
  //Imports and provides the necessary animation providers from the <@angular/animations> module.
  provideToastr() //Toastr providers
  //Importing and providing a service related to toast notifications.
]
};