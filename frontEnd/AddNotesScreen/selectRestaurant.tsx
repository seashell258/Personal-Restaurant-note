import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';
import type { RestaurantRes } from "../../shared/types";


interface SearchBarProps {
  onSelectRestaurant: (restaurant: RestaurantRes) => void;

}

export const SelectRestaurant: React.FC<SearchBarProps> = ({ onSelectRestaurant }) => {
  const [query, setQuery] = useState(''); //使用者打出新的搜尋文字
  const [results, setResults] = useState<RestaurantRes[]>([]); //隨著使用者的搜尋文字增加，後端取到新的候選餐廳資料，就重渲染顯示
  const [loading, setLoading] = useState(false); //fetch 後端的時候，透過此處重渲染，會有 useeffect 的 loading效果

  
  const fetchRestaurants = async (query: string) => {
    //電腦連電腦 const res = await fetch(`http://localhost:3000/api/mapSearch?query=${encodeURIComponent(query)}`);
    const res = await fetch(`http://192.168.1.104:3000/api/mapSearch?query=${encodeURIComponent(query)}`);
    return res.json(); // 回傳 [{ place_id, name, address }]
  };

  // 防抖效果
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        if (!query.trim()) return; // 排除打了一個字，又刪掉的情況(觸發渲染，並觸發 use effect) =>空字串就不打 API
        const data = await fetchRestaurants(query);
        setResults(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 500); // 500ms 防抖

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <View style={{ padding: 10 }}>
      <TextInput
        placeholder="Search restaurants..."
        value={query}
        onChangeText={setQuery}
      />
      <FlatList
        data={results}
        keyExtractor={(item) => item.place_id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onSelectRestaurant(item)}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

    </View>
  );
};
