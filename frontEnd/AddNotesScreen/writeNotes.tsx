import { useState } from "react";

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid'; // 用 uuid 生成 id
import { Modal, TextInput, TouchableOpacity, View, Text } from "react-native";
import { Button } from "react-native-paper";
import { SelectRestaurant } from "./SelectRestaurant";
import type { RestaurantRes, Note } from "../shared/types";
import { db } from "../services/DatabaseFactory";
export const WriteNotes = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantRes | null>(null);


  const [dishOrdered, setDishOrdered] = useState("");  // 為了送出表單清空才用 usestate，調查發現 input頻繁刷新也沒啥效能損失。 trade off 小
  const [cuisine, setCuisine] = useState("");
  const [content, setContent] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [showSearch, setShowSearch] = useState(false);

  const handleSaveNote = async () => {
    if (!selectedRestaurant) { alert("請先選擇餐廳") }
    const noteData: Note = {
      id: uuidv4(),                       // UUID
      cuisine: cuisine || null,           // optional
      restaurant_name: selectedRestaurant.name,
      restaurant_address: selectedRestaurant.address,
      restaurant_place_id: selectedRestaurant.place_id,
      dish_ordered: dishOrdered || null,  // optional
      lat: selectedRestaurant.lat,
      lng: selectedRestaurant.lng,
      content: content || null,           // optional
      rating: rating || null,             // optional
      created_at: new Date().toISOString(),
    };

    console.log("組合好的 noteData:", noteData);

    try {
      await db.addNote(noteData);
      // 清空表單
      setDishOrdered("");
      setCuisine("");
      setContent("");
      setRating(0);
      console.log("筆記已儲存")
    } catch (err) {
      console.error(err);
      alert("儲存失敗！");
    }
  };


  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => setShowSearch(true)}>
        <Text>{selectedRestaurant ? selectedRestaurant.name : "選擇餐廳（點擊開啟搜尋）"}</Text>
      </TouchableOpacity>

      <Modal visible={showSearch} animationType="slide">
        <View style={{ flex: 1 }}>
          <SelectRestaurant
            onSelectRestaurant={(res) => {
              setSelectedRestaurant(res);
              setShowSearch(false); // 選完自動關閉
            }}
          />
          <Button onPress={() => setShowSearch(false)}>取消</Button>
        </View>
      </Modal>
      <TextInput
        placeholder="描述食物..."
        value={content}
        onChangeText={setContent}
        style={{ borderBottomWidth: 1, marginVertical: 12 }}
      />
      <TextInput
        placeholder="輸入點的菜..."
        value={dishOrdered}
        onChangeText={setDishOrdered}
        style={{ borderBottomWidth: 1, marginVertical: 12 }}
      />

      <Button mode='contained' onPress={handleSaveNote}>
        儲存筆記
      </Button>
    </View>
  );

}




