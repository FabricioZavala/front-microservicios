import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavService } from '../../../../services/nav.service';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss'],
})
export class LanguagesComponent implements OnInit {
  public language: boolean = false;

  public languages: any[] = [
    {
      language: 'English',
      code: 'en',
      type: 'US',
      icon: 'us',
    },
    {
      language: 'Español',
      code: 'es',
      icon: 'ec',
    },
    // {
    //   language: 'Français',
    //   code: 'fr',
    //   icon: 'fr',
    // },
    // {
    //   language: 'Português',
    //   code: 'pt',
    //   type: 'BR',
    //   icon: 'pt',
    // },
  ];

  public selectedLanguage: any = {
    language: 'English',
    code: 'en',
    type: 'US',
    icon: 'us',
  };

  constructor(
    public navServices: NavService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    const savedLanguageCode = localStorage.getItem('selectedLanguage');
    if (savedLanguageCode) {
      const savedLanguage = this.languages.find(
        (lang) => lang.code === savedLanguageCode
      );
      if (savedLanguage) {
        this.selectedLanguage = savedLanguage;
        this.translate.use(savedLanguage.code);
      }
    } else {
      const defaultLanguage = this.languages.find((lang) => lang.code === 'es');
      if (defaultLanguage) {
        this.selectedLanguage = defaultLanguage;
        this.translate.use(defaultLanguage.code);
        localStorage.setItem('selectedLanguage', defaultLanguage.code);
      }
    }
  }
  

  changeLanguage(lang: { code: string }) {
    this.translate.use(lang.code);
    this.selectedLanguage = lang;
    localStorage.setItem('selectedLanguage', lang.code);
  }
}
