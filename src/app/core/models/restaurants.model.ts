import {ProductsModel} from './products.model';

export interface RestaurantsDataModel {
  success: boolean;
  message: string;
  data: [RestaurantModel];
  errors: boolean;
}

export interface SingleRestaurantDataModel {
  success: boolean;
  message: string;
  data: AllRestaurantModel;
  errors: boolean;
}

export interface AllRestaurantModel {
  id: number;
  city_id: number;
  name: string;
  type: string;
  description: string;
  avatar: string;
  address: string;
  tel: string;
  email: string;
  open_hour: string;
  close_hour: string;
  created_at: string;
  updated_at: string;
  images: [RestaurantImageModel];
  seats: [];
  products: [ProductsModel];
}

export interface RestaurantModel {
  id: number;
  city_id: number;
  name: string;
  type: string;
  description: string;
  avatar: string;
  address: string;
  tel: string;
  email: string;
  open_hour: string;
  close_hour: string;
  created_at: string;
  updated_at: string;
}

export interface RestaurantImageModel {
  id: number;
  restaurant_id: number;
  title: string;
  name: string;
  created_at: string;
  updated_at: string;
}
