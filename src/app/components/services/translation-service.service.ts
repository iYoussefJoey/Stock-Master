import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationServiceService {
  private availableLanguages: string[] = ['en', 'pl']; // Add more languages if needed
  private defaultLanguage: string = 'en';
  constructor(private translateService: TranslateService) {
    this.setInitialLanguage();
  }
  setInitialLanguage() {
    const savedLanguage = localStorage.getItem('selectedLanguage');  // Stick to 'selectedLanguage' key
    const browserLang = this.translateService.getBrowserLang();

    const languageToUse = savedLanguage || (this.availableLanguages.includes(browserLang ?? this.defaultLanguage) ? browserLang : this.defaultLanguage);
    this.setLanguage(languageToUse as string);
  }

  setLanguage(lang: string) {
    this.translateService.use(lang);
    localStorage.setItem('selectedLanguage', lang);  // Consistently use 'selectedLanguage' in localStorage
  }

  getAvailableLanguages(): string[] {
    return this.availableLanguages;
  }

  getCurrentLanguage(): string {
    return this.translateService.currentLang;
  }
}
