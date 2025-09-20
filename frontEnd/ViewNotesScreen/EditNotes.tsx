import { useEffect, useState } from "react";

import 'react-native-get-random-values';
import { Modal, TextInput, TouchableOpacity, View, Text } from "react-native";
import { Button } from "react-native-paper";
import { SelectRestaurant } from "../AddNotesScreen/SelectRestaurant";
import type { RestaurantRes, Note } from "../../shared/types";
import { db } from "../services/DatabaseFactory";
import eventBus from "../services/events";

interface Editnotes {
  note: Note
  onClose: () => void;
}

export const EditNote: React.FC<Editnotes> = ({ note, onClose }) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantRes | null>(null);
  const [dishOrdered, setDishOrdered] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [content, setContent] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [showSearch, setShowSearch] = useState(false);

  // 初始化欄位
  useEffect(() => {
    if (note) {
      setSelectedRestaurant({
        name: note.restaurant_name,
        address: note.restaurant_address,
        place_id: note.restaurant_place_id,
        lat: note.lat,
        lng: note.lng,
      });
      setDishOrdered(note.dish_ordered || "");
      setCuisine(note.cuisine || "");
      setContent(note.content || "");
      setRating(note.rating || 0);
    }
  }, [note]);

  const handleUpdateNote = async () => {
    if (!selectedRestaurant) {
      alert("請先選擇餐廳");
      return;
    }

    const updatedNote: Note = {
      ...note,                        // 保留原 id 和 created_at
      cuisine: cuisine || null,
      restaurant_name: selectedRestaurant.name,
      restaurant_address: selectedRestaurant.address,
      restaurant_place_id: selectedRestaurant.place_id,
      dish_ordered: dishOrdered || null,
      lat: selectedRestaurant.lat,
      lng: selectedRestaurant.lng,
      content: content || null,
      rating: rating || null,
      // 如果要記錄編輯時間，可以加一個 updated_at
      updated_at: new Date().toISOString(),
    };

    try {
      await db.updateNote(updatedNote);
      onClose()
      eventBus.emit('notesChanged', 'by db.updateNote in EditNote');
      console.log("筆記已更新");
    } catch (err) {
      console.error(err);
      alert("更新失敗！");
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
              setShowSearch(false);
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

      <Button mode='contained' onPress={onClose}>
        取消
      </Button>
      
      <Button mode='contained' onPress={handleUpdateNote}>
        更新筆記
      </Button>

    </View>
  );
};