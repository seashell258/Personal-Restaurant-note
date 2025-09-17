import React, { useEffect, useState } from "react";
import { View, Button, FlatList,Text } from "react-native";
import { FilterMenu } from "./notesFlter";
import { logToFileAndConsole } from "../shared/writeLog";
import { db } from "../services/DatabaseFactory";
import { Note } from "../shared/types";

export const ViewNotesScreen = () => {
  // 控制 Filter 選單是否顯示
  const [filterVisible, setFilterVisible] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  
  // 存 filter 結果
  const [filters, setFilters] = useState<{ distance: number | null; cuisine: string | null }>({
    distance: null,
    cuisine: null,
  });

    useEffect(() => {
    // component mount 時讀取一次
    const loadNotes = async () => {
      try {
        const rows = await db.getAllNotes();
        setNotes(rows);
      } catch (err) {
        console.error("Failed to load notes:", err);
      }
    };

    loadNotes();
  }, []);

  function applyFilter(filter: { filterType: "distance" | "cuisine"; value: string; }): void {
    const { filterType, value } = filter
    try {

      logToFileAndConsole(`filtertype: ${filterType} value:${value}`)
    }
    catch {
      logToFileAndConsole(`applyFilter Failed. filtertype: ${filterType} value:${value}`)
      throw new Error("Function not implemented.");
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Button title="排序方式" onPress={() => setFilterVisible(!filterVisible)} />
      {/* FilterPage  */}
      {filterVisible && <FilterMenu onApply={applyFilter} />}

      {/* 渲染 notes */}
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 10 }}>
            <Text>{item.restaurant_name}</Text>
            <Text>{item.cuisine}</Text>
            <Text>{item.rating}</Text>
          </View>
        )}
      />
    </View>

    

  );
};
