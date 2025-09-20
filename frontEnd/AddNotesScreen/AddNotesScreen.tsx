import { useState } from "react";
import { logToFileAndConsole } from "../../shared/writeLog";
import { Modal, TextInput, TouchableOpacity, View, Text } from "react-native";
import type { RestaurantRes, Note } from "../../shared/types";
import { WriteNotes } from "./WriteNotes";
let userInput = {
    selectedRestaurant: null,
    dish_ordered: null,
    content: null,
    rating: null,
    cuisine: null,
};

export const AddNotesScreen = () => {

    return (
        <View style={{ flex: 1 }}>
            <WriteNotes />

        </View>
    );
};