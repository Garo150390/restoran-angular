import { NgModule } from '@angular/core';
import { GalleryModule } from '@ngx-gallery/core';
import { LightboxModule } from '@ngx-gallery/lightbox';
import { GallerizeModule } from '@ngx-gallery/gallerize';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NotFoundComponent } from './pages/not-found/not-found.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LangInterceptor } from './core/interceptor/lang.interceptor';
import { ContactComponent } from './pages/contact/contact.component';
import {
  RestaurantCardComponent
} from './pages/home/restaurant-card/restaurant-card.component';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { AppComponent } from './components/app.component';
import { MaterialModule } from './shared/material.module';
import { BlogsModule } from './pages/blogs/blogs.module';
import { OrderModule } from './pages/order/order.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    ContactComponent,
    NotFoundComponent,
    RestaurantCardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    CoreModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    SharedModule,
    BlogsModule,
    OrderModule,
    GalleryModule.withConfig({
      loadingMode: 'indeterminate',
    }),
    LightboxModule,
    GallerizeModule,
  ],
  providers: [
    /*{
      provide: HTTP_INTERCEPTORS,
      useClass: LangInterceptor,
      multi: true
    },*/
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
