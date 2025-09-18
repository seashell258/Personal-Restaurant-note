import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Menu, Button, Provider } from "react-native-paper";
import { NotesFilter } from "./NotesFilter";
import { db } from "../services/DatabaseFactory";
import { Note } from "../shared/types";


// 單張卡片
const NoteCard = ({ note, onEdit, onDelete }) => {
  const [visible, setVisible] = useState(false);

  const toggleMenu = () => setVisible(!visible); // 按一次就切換狀態

  return (

    <View style={styles.card}>
      <Text>{note.restaurant_name}</Text>
      <Text>{note.cuisine ?? '沒填寫點過甚麼'}</Text>
      <Text>{note.rating != null ? note.rating : '沒填寫評價'}</Text>

      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)} // 點空白或點 Item 都會關閉
        anchor={<Button onPress={() => setVisible(true)}>⋮</Button>}
      >
        <Menu.Item
          onPress={() => { setVisible(false); onEdit(note); }}
          title="編輯"
        />
        <Menu.Item
          onPress={() => { setVisible(false); onDelete(note); }}
          title="刪除"
        />
      </Menu>
    </View>

  );
};


// 卡片列表
export const ViewNotesScreen = () => {
  const handleEdit = (note) => console.log("Edit", note);
  const handleDelete = (note) => console.log("Delete", note);
  const [showFilter, setShowFilter] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true); // 還沒加loading 轉圈效果
      const data = await db.getAllNotes(); // 你自己 DB service
      setNotes(data);
      setLoading(false);
      console.log('資料庫取得全部筆記:', data)
    };
    fetchNotes();
  }, []); //只根據 notes 來刷新觸發 side effect，之後新增 filter，那就要直接修改 notes 來觸發這邊的更新。

  const handleApplyFilter = (filter: { filterType: "distance" | "cuisine"; value: string }) => {
    // 根據 filterType 過濾 notes
    if (filter.filterType === "cuisine") {
      console.log('filter cuisine')
      //setFilteredNotes(notes.filter(n => n.cuisine === filter.value));
    } else if (filter.filterType === "distance") {
      console.log('filter distance')
    }
    // 過濾完就關掉 filter
    setShowFilter(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <Button mode="contained" onPress={() => setShowFilter(!showFilter)}>
        篩選條件
      </Button>
      {showFilter && < NotesFilter onApply={handleApplyFilter} />}
      <Provider>
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <NoteCard note={item} onEdit={handleEdit} onDelete={handleDelete} />
          )}
        />
      </Provider>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    backgroundColor: "#fff",
    marginVertical: 5,
    borderRadius: 8,
    elevation: 2,
  },
});
