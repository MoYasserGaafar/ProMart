import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-auth-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './auth-navbar.component.html',
  styleUrl: './auth-navbar.component.scss'
})

export class AuthNavbarComponent {
  private readonly _TranslationService = inject(TranslationService)
  //Injects the <TranslationService> service into the current class and stores it in a private and readonly property named <_TranslationService>.
  readonly _TranslateService = inject(TranslateService)
  //Injects the <TranslateService> and stores it in a read-only property.

  selectLang(lang: string) {
    //Declares a public method named <selectLang> that takes a string parameter named <lang> to handle language selection.
      this._TranslationService.changeLang(lang)
      //Calls the <changeLang> method on the injected <TranslationService>, passing the selected language <lang> as an argument. 
      //This method is responsible for setting the current language and triggering a re-translation of the UI.
    }
}