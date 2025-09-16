import { logToFileAndConsole } from "../shared/writeLog";

import { SearchBarMap } from "./searchBarRestaurant";

export interface RestaurantRes {
    place_id: string;
    name: string;
    address?: string;
}

export const addNotesScreen = () => {
    const fetchRestaurants = async (query: string) => {
        const res = await fetch(`http://localhost:3000/api/mapSearch?query=${encodeURIComponent(query)}`);
        return res.json(); // 回傳 [{ place_id, name, address }]
    };

    const handleSelect = (restaurant: RestaurantRes) => {
        logToFileAndConsole(`選中餐廳: ${restaurant}`);
        // 可以在這裡顯示 memo 表單
    };
    return (
        <SearchBarMap fetchRestaurants={fetchRestaurants} onSelectRestaurant={handleSelect} />

    )
}