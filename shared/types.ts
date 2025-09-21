// types/Note.ts
export interface Note {
  id: string;                      // UUID   PK
  cuisine?: string | null;
  restaurant_place_id: string;    // 餐廳唯一 id  FK  
  dish_ordered?: string | null;
  content?: string | null;
  rating?: number | null;
  created_at: string;              // 程式自動生成
  updated_at: string;              // 程式自動生成，新增的時候，預設跟 createdAt 一樣。
  place_id: string;
  // sync_status: string;             //ˋ是否已經上傳到伺服器 成功與否。  未來再用 migration script 擴充 database 就可以了，不需要提前加好。
}

/*  */
export interface User {   // 本地創建好這表大概就不會用到了。 連網之後有更複雜的功能才會用。 
//Q 為甚麼不能把這表只放在postgre sql呢?  A 因為這樣只能用一個裝置碼來標示 notes 們是屬於誰。 
// 換裝置後。 使用者透過申請的帳號有 舊的 note 沒辦法自動跟新帳號綁在一起。
  id: string;                       // UUID PK
  server_id : string                // 伺服器提供唯一的正式 id，對應單一個使用者。
}


export interface RestaurantRes {
  place_id: string;                  // UUID   PK
  name: string;
  address: string;
  lat: number;
  lng: number;
}
