import { Component, inject } from '@angular/core';
import { TranslationService } from '../../core/services/translation.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})

export class FooterComponent {
  private readonly _TranslationService = inject(TranslationService)
  //Injects the <TranslationService> service into the current class and stores it in a private and readonly property named <_TranslationService>.
  readonly _TranslateService = inject(TranslateService)
  //Injects the <TranslateService> and stores it in a read-only property.
}