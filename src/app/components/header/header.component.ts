import {LocalizeRouterService} from 'localize-router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { OrderService } from '../../core/services/order.service';
import { StorageService } from '../../core/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  public count: number;
  private items: HTMLCollection;
  private readonly lang: string;

  @ViewChild('navItems')
  private navItems: ElementRef;

  constructor(private orderService: OrderService,
              private translate: TranslateService,
              private localize: LocalizeRouterService) {

    if (StorageService.getData('orders')) {
      this.count = JSON.parse(StorageService.getData('orders')).length;
    }
    this.lang = StorageService.getData('lang') ? StorageService.getData('lang') : 'en';
    translate.addLangs(['en', 'ru', 'am']);
    translate.setDefaultLang('en');
    translate.use(this.lang);
  }

  ngOnInit() {
    document.querySelector(`[data-lang=${this.lang}]`).classList.add('active');
    this.orderService.ordersCount
      .subscribe((data) => {
        this.count = data;
      });

    /*this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      console.log(event.lang);
    });*/

    /*this.router.events.subscribe((data) => {
        console.log(data);
    });*/
    console.log(this.localize.settings.cacheName);
  }

  ngAfterViewInit(): void {
    this.items = this.navItems.nativeElement.children;
  }

  public changeMenu(elem) {
    for (let i = 0; i < this.items.length; i += 1) {
      this.items[i].classList.remove('active');
    }
    elem.classList.add('active');
  }

  public switchLang(elem: HTMLLIElement) {
    const lang = elem.dataset.lang;
    const childes = elem.parentElement.children;
    this.translate.use(lang);
    this.localize.changeLanguage(lang);
    StorageService.saveItem('lang', lang);
    elem.classList.add('active');
    for (let i = 0; i < childes.length; i += 1 ) {
      if (childes[i] !== elem) {
        childes[i].classList.remove('active');
      }
    }
  }

}
