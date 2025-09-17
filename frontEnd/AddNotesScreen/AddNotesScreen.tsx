import { useState } from "react";
import { logToFileAndConsole } from "../shared/writeLog";

import { SearchBarMap } from "./selectRestaurant";
import { Button, Modal, TextInput, TouchableOpacity, View, Text } from "react-native";



export interface RestaurantRes {
    place_id: string;
    name: string;
    address: string;
    lat: number;
    lng: number;
}


export const addNotesScreen = () => {
    const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantRes | null>(null);
    const [content, setContent] = useState("");
    const [dishOrdered, setDishOrdered] = useState("");
    const [showSearch, setShowSearch] = useState(false);

    const handleSaveNote = () => {
        console.log({
            restaurant: selectedRestaurant,
            dishOrdered,
            content,
        });
        // 這裡呼叫 NotesRepository.addNote()
    };

    const handleSelectRestaurant = (restaurant: RestaurantRes) => {
        setSelectedRestaurant(restaurant);
        setShowSearch(false);
        logToFileAndConsole(`選中餐廳: ${restaurant}`);
    };
    return (
        <View style={{ padding: 16 }}>
            {/* 餐廳選擇欄位 */}
            <TouchableOpacity onPress={() => setShowSearch(true)}>
                <View style={{ borderBottomWidth: 1, padding: 8 }}>
                    <Text>
                        {selectedRestaurant
                            ? selectedRestaurant.name
                            : "選擇餐廳（點擊開啟搜尋）"}
                    </Text>
                </View>
            </TouchableOpacity>

            {/* 文字輸入區 */}
            <TextInput
                placeholder="描述食物..."
                value={content}
                onChangeText={setContent}
                style={{ borderBottomWidth: 1, marginVertical: 12 }}
            />

            {/* dish_ordered */}
            <TextInput
                placeholder="輸入點的菜..."
                value={dishOrdered}
                onChangeText={setDishOrdered}
                style={{ borderBottomWidth: 1, marginVertical: 12 }}
            />

            <Button title="儲存筆記" onPress={handleSaveNote} />

            {/* Modal Bottom Sheet for Search */}
            <Modal visible={showSearch} animationType="slide">
                <View style={{ flex: 1 }}>
                    <SearchBarMap

                        onSelectRestaurant={handleSelectRestaurant}
                    />
                    <Button title="取消" onPress={() => setShowSearch(false)} />
                </View>
            </Modal>
        </View>
    );
};