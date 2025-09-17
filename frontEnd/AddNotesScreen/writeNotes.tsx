import { useState } from "react";
import { db } from '../services/DatabaseFactory';


interface WriteNotesProps {
  restaurantName: string;
  restaurantPlaceId: string;
  restaurantAddress: string;
  lat: number;
  lng: number;
}

export const WriteNotes: React.FC<WriteNotesProps> = ({
  restaurantName,
  restaurantPlaceId,
  restaurantAddress,
  lat,
  lng,
}) => {
  const [dishOrdered, setDishOrdered] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState<number>(0);

const handleSubmit = async () => {
  const newNote = {
    id: crypto.randomUUID(),
    cuisine: cuisine || null,
    restaurant_name: restaurantName,
    restaurant_place_id: restaurantPlaceId,
    restaurant_address: restaurantAddress,
    dish_ordered: dishOrdered || null,
    lat,
    lng,
    content: content || null,
    rating,
    created_at: new Date().toISOString(),
  };

  try {
    await db.addNote(newNote); // await 確保資料寫入完成
    alert("筆記已儲存！");
    // 清空表單
    setDishOrdered("");
    setCuisine("");
    setContent("");
    setRating(0);
  } catch (err) {
    console.error(err);
    alert("儲存失敗！");
  }
};


  return (
    <div>
      <h2>新增餐廳筆記</h2>
      <div>
        <label>菜色：</label>
        <input
          type="text"
          value={dishOrdered}
          onChange={(e) => setDishOrdered(e.target.value)}
        />
      </div>
      <div>
        <label>料理類別（可選）：</label>
        <input
          type="text"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
        />
      </div>
      <div>
        <label>筆記內容（可選）：</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div>
        <label>評分：</label>
        <input
          type="number"
          min={0}
          max={5}
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        />
      </div>
      <button onClick={handleSubmit}>儲存筆記</button>
    </div>
  );

}