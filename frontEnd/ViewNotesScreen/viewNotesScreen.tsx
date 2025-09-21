import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { Menu, Button, Provider } from "react-native-paper";
import { NotesFilter } from "./NotesFilter";
import { db } from "../services/DatabaseFactory";
import { Note } from "../../shared/types";
import eventBus from "../services/events";
import { EditNote } from "./EditNotes";
import { ShowDetailedNote } from "./detailNotes";


// 單張卡片
const NoteCard = ({ note, onEdit, onDelete }) => {
  const [ExtraMenuVisible, setExtraMenuVisible] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  return (

    <View style={styles.card}>
      <TouchableOpacity onPress={() => setShowDetail(true)}>
        <Text>{note.restaurant_name}</Text>
        <Text>{note.cuisine ?? '沒填寫點過甚麼'}</Text>
        <Text>{note.rating != null ? note.rating : '沒填寫評價'}</Text>
      </TouchableOpacity>
      <Menu
        visible={ExtraMenuVisible}
        anchor={<Button onPress={() => setExtraMenuVisible(!ExtraMenuVisible)}>⋮</Button>}
        onDismiss={() => setExtraMenuVisible(false)}
      >
        <Menu.Item
          title="編輯"
          onPress={() => { setExtraMenuVisible(false); onEdit(note); }}

        />
        <Menu.Item
          title="刪除"
          onPress={() => { setExtraMenuVisible(false); onDelete(note); }}
        />
      </Menu>

      <Modal visible={showDetail} animationType="slide">
        <ShowDetailedNote note={note}
          onClose={() => setShowDetail(false)}></ShowDetailedNote>
      </Modal>
    </View >

  );
};


// 卡片列表
export const ViewNotesScreen = () => {


  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);

  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);


  const fetchNotes = async () => {
    setLoading(true); // 還沒加loading 轉圈效果
    const data = await db.getAllNotes(); // 你自己 DB service
    setNotes(data);
    setLoading(false);
    console.log('資料庫取得全部筆記:', data)
  };


  const handleApplyFilter = (filter: { filterType: "distance" | "cuisine"; value: string }) => {
    // 根據 filterType 過濾 notes
    if (filter.filterType === "cuisine") {
      console.log('filter cuisine')
      //setFilteredNotes(notes.filter(n => n.cuisine === filter.value));
    } else if (filter.filterType === "distance") {
      console.log('filter distance')  // 未來利用 setnotes 改 notes 觸發重渲染。
    }
    // 過濾完就關掉 filter
    setShowFilter(false);
  };



  useEffect(() => {
    fetchNotes()
    const handleAdd = (newNote) => setNotes(prev => [...prev, newNote]);
    const handleUpdate = (updatedNote) => setNotes(prev => prev.map(n => n.id === updatedNote.id ? updatedNote : n));
    const handleDelete = (id) => setNotes(prev => prev.filter(n => n.id !== id));

    eventBus.on('noteAdded', handleAdd);
    eventBus.on('noteUpdated', handleUpdate);
    eventBus.on('noteDeleted', handleDelete);


    return () => {
      eventBus.off('noteAdded', handleAdd);
      eventBus.off('noteUpdated', handleUpdate);
      eventBus.off('noteDeleted', handleDelete);

    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {editingNote ? (
        <EditNote note={editingNote} onClose={() => setEditingNote(null)} />
      ) : (
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
                <NoteCard
                  note={item}
                  onEdit={() => setEditingNote(item)}
                  onDelete={() => db.deleteNote(item)}
                />
              )}
            />
          </Provider>
        </View>
      )}
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
