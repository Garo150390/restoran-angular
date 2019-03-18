import {
  LocalizeParser,
  LocalizeRouterModule,
  LocalizeRouterSettings
} from 'localize-router';
import { NgModule } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { LocalizeRouterHttpLoader } from 'localize-router-http-loader';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { OrderComponent } from './pages/order/order.component';
import { HomeComponent } from './pages/home/home.component';
import { TranslateService } from '@ngx-translate/core';

export function HttpLoaderFactory(translate: TranslateService,
                                  location: Location,
                                  settings: LocalizeRouterSettings,
                                  http: HttpClient) {
  return new LocalizeRouterHttpLoader(translate, location, settings, http);
}

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'order',
    component: OrderComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'restaurants',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'restaurants/:id',
    loadChildren: './pages/restaurants/restaurants.module#RestaurantsModule',
  },
  {
    path: 'gallery',
    loadChildren: './pages/photo-gallery/photo-gallery.module#PhotoGalleryModule',
  },
  {
    path: 'blog',
    loadChildren: './pages/blogs/blogs.module#BlogsModule',
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    }),
    LocalizeRouterModule.forRoot(routes, {
      parser: {
        provide: LocalizeParser,
        useFactory: HttpLoaderFactory,
        deps: [TranslateService, Location, LocalizeRouterSettings, HttpClient]
      },
      cacheName: 'restaurant-api: lang'
    })
  ],
  exports: [RouterModule, LocalizeRouterModule]
})
export class AppRoutingModule { }
