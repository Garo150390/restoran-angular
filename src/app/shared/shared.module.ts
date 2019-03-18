import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { BannerComponent } from './banner/banner.component';
import { LocalizeRouterModule } from 'localize-router';

@NgModule({
  declarations: [
    BannerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    LocalizeRouterModule
  ],
  exports: [BannerComponent, TranslateModule]
})
export class SharedModule { }
