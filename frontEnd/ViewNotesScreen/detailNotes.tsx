// ShowDetailedNote.tsx
import { View, Text, Button } from "react-native";
import { Note } from "../../shared/types";

interface Props {
  note: Note;
  onClose: () => void;
}

export const ShowDetailedNote: React.FC<Props> = ({ note, onClose }) => {
  return (
    <View style={{ padding: 16 }}>
      <Text>餐廳名稱: {note.restaurant_name}</Text>
      <Text>地址: {note.restaurant_address}</Text>
      <Text>菜系: {note.cuisine ?? "沒填寫"}</Text>
      <Text>點餐: {note.dish_ordered ?? "沒填寫"}</Text>
      <Text>評價: {note.rating ?? "沒填寫"}</Text>
      <Text>內容: {note.content ?? "沒填寫"}</Text>
      <Text>建立時間: {note.created_at}</Text>
      <Text>更新時間: {note.updated_at}</Text>
      <Button title="關閉" onPress={onClose} />
    </View>
  );
};
