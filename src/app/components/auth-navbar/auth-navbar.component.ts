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
  readonly _TranslateService = inject(TranslateService)

  selectLang(lang: string) {
      this._TranslationService.changeLang(lang)
    }
}