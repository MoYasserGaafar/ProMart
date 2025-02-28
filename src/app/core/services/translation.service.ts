import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})

export class TranslationService {

  constructor(private _TranslateService: TranslateService) { 
    //Get current language
    const savedLang = localStorage.getItem('lang') || 'en'
    //Checks for a saved language preference in local storage. 
    //If a language is found, it's stored in the <savedLang> variable, but if no language is found, the default language is set to <en>.

    //Set default language
    this._TranslateService.setDefaultLang(savedLang)
    //<setDefaultLang()>: Method is called to set the default language for the application. 
    //This language will be used as a fallback if a specific translation is not found.

    //Use default language
    this._TranslateService.use(savedLang)
    //<use>: Method is called to set the active language for the current application state. 
    //All subsequent translations will be fetched and displayed using this language.

    this.changeDirection()
    //Toggle the direction of the entire document based on a saved language preference
  }

  changeDirection() {
    const savedLang = localStorage.getItem('lang') || 'en'
    //Checks for a stored language preference in local storage under the key <lang>.
    //If a value is found, it's assigned to <savedLang>. If no value is found, the default language is set to <en>.
    if (savedLang == 'en') {
      document.documentElement.dir = 'ltr'
      document.documentElement.lang = 'en'
      //Sets the direction to left-to-right and sets the language attribute to <en> if <savedLang> is <en>.

    } else if (savedLang == 'ar') {
      document.documentElement.dir = 'rtl'
      document.documentElement.lang = 'ar'
      //Sets the direction to right-to-left and sets the language attribute to <ar> if <savedLang> is <ar>.
    }
  }

  changeLang(lang: string) {
  //Declares a method named <changeLang> that takes a string parameter named <lang> to change the application's language.
    this._TranslateService.setDefaultLang(lang)
    //Sets the default language for the <_TranslateService> to the specified <lang>, so if a translation is not found for the current language, the default language will be used.
    this._TranslateService.use(lang)
    //Sets the current language for the <_TranslateService> to the specified <lang> which will trigger a re-translation of the UI elements to reflect the new language.
    localStorage.setItem('lang', lang)
    //Stores the selected language in the browser's local storage which allows the application to remember the user's language preference across sessions.
    this.changeDirection()
    //Calls a method named <changeDirection> which is responsible for adjusting the text direction based on the new language.
  }
}