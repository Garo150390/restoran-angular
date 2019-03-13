import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { GalleryItem, ImageItem} from '@ngx-gallery/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import {GalleryModel, ImageModel} from '../models/';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  static readonly limit = 10;

  constructor(private http: HttpClient) { }

  public getPhotos(page): Observable<GalleryModel> {
    const offset = page !== 1 ? (page - 1) * GalleryService.limit : 0;
    const params = new HttpParams().set('offset', `${offset}`).set('limit', `${GalleryService.limit}`);
    return this.http.get<GalleryModel>(`${environment.apiEndPoint}/restaurant_image`, { params })
      .pipe(
          map(gallery => {
            gallery.data.map((item) => {
              item.name = `${environment.imagePath}${item.name}`;
              return item;
            });
            return gallery;
          },
        )
      );
  }

  public getGalleryItem(images: Array<ImageModel>): Array<ImageItem> {
    const data: Array<ImageItem> = [];
    images.map((item) => {
      data.push(new ImageItem({
        src: item.name,
        thumb: item.name,
      }));
    });
    return data;
  }
}
