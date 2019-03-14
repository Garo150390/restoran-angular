import { Lightbox } from '@ngx-gallery/lightbox';
import { ActivatedRoute } from '@angular/router';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Gallery, GalleryItem, GalleryRef, ThumbnailsPosition } from '@ngx-gallery/core';

import { GalleryService } from '../../../core/services/gallery.service';
import { ImageModel } from '../../../core/models';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss',],
})
export class PhotoGalleryComponent implements OnInit {

  constructor(private galleryService: GalleryService,
              public gallery: Gallery,
              public lightbox: Lightbox,
              private route: ActivatedRoute,
              private elementReference: ElementRef,
              private overlayContainer: OverlayContainer) {

    this.p = 1;

    if (overlayContainer.getContainerElement()) {
      setTimeout(() => elementReference.nativeElement.children[2].appendChild(overlayContainer.getContainerElement()), 0);
    }
  }

  public photos: Array<ImageModel>;
  public galleryItems: Array<GalleryItem>;
  public p: number;
  public total: number;
  public lightboxGalleryRef: GalleryRef;
  public itemsPerPage = GalleryService.limit;

  public galleryId = 'myLightbox';

  ngOnInit() {
    this.photos = this.route.snapshot.data.photos.data;
    this.total = this.route.snapshot.data.photos.total;
    this.galleryItems = this.galleryService.getGalleryItem(this.photos);
    this.gallery.ref().load(this.galleryItems);
    this.lightboxGalleryRef = this.gallery.ref(this.galleryId);

    this.gallery.ref().setConfig({
      // imageSize: ImageSize.Cover,
      thumbPosition: ThumbnailsPosition.Top,
      loop: true,
      loadingStrategy: 'lazy',
      disableThumb: true,
    });
    this.lightboxGalleryRef.setConfig({
      // imageSize: ImageSize.Cover,
      thumbPosition: ThumbnailsPosition.Top,
      loop: true,
      loadingStrategy: 'lazy',
      disableThumb: true,
    });
    this.lightboxGalleryRef.load(this.galleryItems);
    const galeryRef = this.gallery.ref('gallery');

    galeryRef.itemClick.subscribe(res => {
      this.lightbox.open(res);
    });
  }


  public changePage(page: number): void {
    this.galleryService.getPhotos(page - 1)
      .subscribe((data) => {
        this.photos = data.data;
        this.p = page;
        this.lightboxGalleryRef.load(this.galleryService.getGalleryItem(data.data));
      }, (error) => {
        console.log(error);
      });
  }
}
