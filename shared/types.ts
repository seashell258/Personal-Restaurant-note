// types/Note.ts
export interface Note {
  id: string;                      // UUID
  cuisine?: string | null;
  restaurant_name: string;
  restaurant_address: string;
  restaurant_place_id: string;
  dish_ordered?: string | null;
  lat: number;
  lng: number;
  content?: string | null;
  rating?: number | null;
  created_at: string;              // 程式自動生成
  updated_at: string;              // 程式自動生成，新增的時候，預設跟 createdAt 一樣。
}

export interface RestaurantRes {
    place_id: string;
    name: string;
    address: string;
    lat: number;
    lng: number;
}
