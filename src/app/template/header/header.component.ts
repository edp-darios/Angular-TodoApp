import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'de']);
    var currentLanguage = JSON.parse(localStorage.getItem('language'));
    translate.setDefaultLang(currentLanguage);
    translate.currentLang = currentLanguage;
  }

  switchLang(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('language', JSON.stringify(lang)); 
  }

  ngOnInit(): void {
  }

}
   