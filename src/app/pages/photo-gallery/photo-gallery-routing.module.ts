import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';

import { PhotoGalleryComponent } from './photo-gallery/photo-gallery.component';
import { GalleryResolveService } from '../../core/services/gallery-resolve.service';

const routes: Routes = [
  {
    path: '',
    component: PhotoGalleryComponent,
    resolve: {
      photos: GalleryResolveService
    }
  }
];

@NgModule({
  imports: [
    LocalizeRouterModule.forChild(routes),
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule, LocalizeRouterModule]
})
export class PhotoGalleryRoutingModule { }
