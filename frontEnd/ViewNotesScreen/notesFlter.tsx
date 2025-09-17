import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

type FilterMenuProps = {
  onApply: (filter: { filterType: "distance" | "cuisine"; value: string }) => void;
};

export const FilterMenu: React.FC<FilterMenuProps> = ({ onApply }) => {
  const [mode, setMode] = useState<"distance" | "cuisine" | null>("distance");
  const [selectedValue, setSelectedValue] = useState<string | null>("500m");

  const distanceOptions = ["500m", "1km", "2km", "3km"];
  const cuisineOptions = ["台菜", "義大利菜", "日式料理", "炸物", "甜點"];

  const handleSelect = (value: string) => {
    setSelectedValue(value);

  };

  const handleApply = () => {
    if (mode && selectedValue) { //todo 其中一個沒選 apply會失敗 要跳出指示
      onApply({ filterType: mode, value: selectedValue });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.modeButtons}>
        <TouchableOpacity
          style={[styles.modeButton, mode === "distance" && styles.activeButton]}
          onPress={() => {
            setMode("distance");
            setSelectedValue(null);
          }}
        >
          <Text style={styles.buttonText}>Distance</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.modeButton, mode === "cuisine" && styles.activeButton]}
          onPress={() => {
            setMode("cuisine");
            setSelectedValue(null);
          }}
        >
          <Text style={styles.buttonText}>Cuisine</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal contentContainerStyle={styles.optionsContainer}>
        {mode === "distance" &&
          distanceOptions.map((d) => (
            <TouchableOpacity
              key={d}
              style={[styles.optionButton, selectedValue === d && styles.selectedOption]}
              onPress={() => handleSelect(d)}
            >
              <Text>{d}</Text>
            </TouchableOpacity>
          ))}

        {mode === "cuisine" &&
          cuisineOptions.map((c) => (
            <TouchableOpacity
              key={c}
              style={[styles.optionButton, selectedValue === c && styles.selectedOption]}
              onPress={() => handleSelect(c)}
            >
              <Text>{c}</Text>
            </TouchableOpacity>
          ))}
      </ScrollView>

      <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
        <Text style={styles.applyText}>Apply</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    margin: 10,
  },
  modeButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  modeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#eee",
    borderRadius: 8,
  },
  activeButton: {
    backgroundColor: "#e0a22fff",
  },
  buttonText: {
    color: "#000",
  },
  optionsContainer: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  optionButton: {
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 8,
    marginRight: 10,
  },
  selectedOption: {
    backgroundColor: "#e0a22fff",
  },
  applyButton: {
    marginTop: 10,
    backgroundColor: "#e0a22fff",
    padding: 10,
    borderRadius: 8,
  },
  applyText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
