import { Request, Response } from 'express';

export const searchRestaurants = async (req: Request, res: Response) => {
    const query = req.query.query as string;
    if (!query) return res.status(400).json({ error: 'Query required' });

    try {
        //const googleRes = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=YOUR_API_KEY`);
        //const data = await googleRes.json();

        const TestData = [

            {
                "place_id": "ChIJN1t_tDeuEmsRUsoyG83frY4",
                "name": "Example Restaurant",
                "address": "123 Main St, City, Country"
            },
            {
                "place_id": "ChIJLfySpTOuEmsRsc_JfJtljdc",
                "name": "Another Restaurant",
                "address": "456 Another St, City, Country"
            }
        ]



        // 回傳簡化結果
        const results = TestData.map((item: any) => ({
            place_id: item.place_id,
            name: item.name,
            address: item.formatted_address,
        }));  // placeid 經緯度 不用顯示 但我也要回傳給前端。 它自己append到筆記裡面存起來

        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
