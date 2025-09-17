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
}
