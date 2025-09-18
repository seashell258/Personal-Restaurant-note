
// import SQLite from 'react-native-sqlite-storage'; //web環境不能用
import type {Note} from '../shared/types'

class DatabaseService {
  private db: SQLite.SQLiteDatabase | null = null;

  async initialize(): Promise<void> {
    try {
      this.db = await SQLite.openDatabase({
        name: 'restaurant_notes.db',
        location: 'default',
      });

      await this.createTables();
      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Database initialization failed:', error);
      throw error;
    }
  }

  private async createTables(): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    const createNotesTable = `
  CREATE TABLE IF NOT EXISTS notes (
    id TEXT PRIMARY KEY,              -- UUID
    cuisine TEXT,                     -- 可選
    restaurant_name TEXT NOT NULL,    -- fetch 取得
    restaurant_address TEXT NOT NULL, -- fetch 取得
    restaurant_place_id TEXT NOT NULL,-- fetch 取得
    dish_ordered TEXT,                -- 可選
    lat REAL NOT NULL,                -- fetch 取得
    lng REAL NOT NULL,                -- fetch 取得
    content TEXT,                     -- 可選
    rating INTEGER,                   -- 可選
    created_at TEXT NOT NULL          -- 程式自動補
  )
`;


    await this.db.executeSql(createNotesTable);
  }

  getDatabase(): SQLite.SQLiteDatabase {
    if (!this.db) {
      throw new Error('Database not initialized. Call initialize() first.');
    }
    return this.db;
  }

  async addNote(note: Note): Promise<void> {
    const sql = `
      INSERT INTO notes (
        id, restaurant_name, restaurant_address, restaurant_place_id,
        dish_ordered, lat, lng, content, rating, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      note.id,
      note.restaurant_name,
      note.restaurant_address,
      note.restaurant_place_id,
      note.dish_ordered,
      note.lat,
      note.lng,
      note.content ?? null,
      note.rating,
      note.created_at,
    ];
    await this.db.executeSql(sql, params);
  }
  async close(): Promise<void> {
    if (this.db) {
      await this.db.close();
      this.db = null;
    }
  }


}


export const db = new DatabaseService();