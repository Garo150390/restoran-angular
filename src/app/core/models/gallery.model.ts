export interface GalleryModel {
  data: [ImageModel];
  total: number;
  success: boolean;
  message: string;
  errors: false;
}

export interface ImageModel {
  name: string;
  id: number;
  title: string;
  restaurant_id: number;
  created_at: string;
  updated_at: string;
}
