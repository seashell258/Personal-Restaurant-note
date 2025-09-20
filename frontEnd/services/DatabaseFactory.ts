import * as SQLite from 'expo-sqlite';
import type { Note,RestaurantRes } from '../../shared/types';
/*本地sqlite操作，所以這檔案在前端。並且因為在前端，即使使用了zod檢查，也能被繞過。 */
class DatabaseService {
  private db: SQLite.SQLiteDatabase | null = null;

  async initialize(): Promise<void> {
    this.db = SQLite.openDatabaseSync('restaurant_notes.db');
    await this.createTables();
    console.log('Database initialized successfully');
  }
  //#region createTables
private async createTables(): Promise<void> {
  if (!this.db) throw new Error('Database not initialized');

  const sql = `
    CREATE TABLE IF NOT EXISTS notes (
      id TEXT PRIMARY KEY,              
      cuisine TEXT,                     
      restaurant_name TEXT NOT NULL,    
      restaurant_address TEXT NOT NULL, 
      restaurant_place_id TEXT NOT NULL,
      dish_ordered TEXT,                
      lat REAL NOT NULL,                
      lng REAL NOT NULL,                
      content TEXT,                     
      rating INTEGER,                   
      created_at TEXT NOT NULL          
    );
  `;

  try {
    await this.db.execAsync(sql);
  } catch (err) {
    console.error('Failed to create tables:', err);
    throw err;
  }
}
//#endregion
//#region addNote
async addNote(note: Note): Promise<void> {
  if (!this.db) throw new Error('Database not initialized');

  

const sql = `
  INSERT INTO notes (
    id, cuisine, restaurant_name, restaurant_address, restaurant_place_id,
    dish_ordered, lat, lng, content, rating, created_at
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

const params = [
  note.id,
  note.cuisine ?? null,
  note.restaurant_name,
  note.restaurant_address,
  note.restaurant_place_id,
  note.dish_ordered ?? null,
  note.lat,
  note.lng,
  note.content ?? null,
  note.rating ?? null,
  note.created_at,
];

  try {
    const result = await this.db.runAsync(sql, params);
    // result.lastInsertRowId / result.changes 可選擇使用
  } catch (err) {
    console.error('Failed to add note:', err);
    throw err;
  }
}
//#endregion
async addNote(note: Note): Promise<void> {
  if (!this.db) throw new Error('Database not initialized');

  

const sql = `
  INSERT INTO notes (
    id, cuisine, restaurant_name, restaurant_address, restaurant_place_id,
    dish_ordered, lat, lng, content, rating, created_at
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

const params = [
  note.id,
  note.cuisine ?? null,
  note.restaurant_name,
  note.restaurant_address,
  note.restaurant_place_id,
  note.dish_ordered ?? null,
  note.lat,
  note.lng,
  note.content ?? null,
  note.rating ?? null,
  note.created_at,
];

  try {
    const result = await this.db.runAsync(sql, params);
    // result.lastInsertRowId / result.changes 可選擇使用
  } catch (err) {
    console.error('Failed to add note:', err);
    throw err;
  }
}
//#endregion
//#region deleteNote
async deleteNote(note: Note): Promise<void> {
  if (!this.db) throw new Error('Database not initialized');

  const sql = `DELETE FROM notes WHERE id = ?`;
  const params = [note.id];

  try {
    const result = await this.db.runAsync(sql, params);
     console.error('deleted. response result:', result);
    // result.changes 可檢查是否真的刪到資料
  } catch (err) {
    console.error('Failed to delete note:', err);
    throw err;
  }
}
//#endregion

//#region updateNote
async updateNote(note: Note): Promise<void> {
  if (!this.db) throw new Error('Database not initialized');

  const sql = `
    UPDATE notes
    SET cuisine = ?, restaurant_name = ?, restaurant_address = ?, restaurant_place_id = ?,
        dish_ordered = ?, lat = ?, lng = ?, content = ?, rating = ?, created_at = ?
    WHERE id = ?
  `;

  const params = [
    note.cuisine ?? null,
    note.restaurant_name,
    note.restaurant_address,
    note.restaurant_place_id,
    note.dish_ordered ?? null,
    note.lat,
    note.lng,
    note.content ?? null,
    note.rating ?? null,
    note.created_at,
    note.id,
  ];

  try {
    const result = await this.db.runAsync(sql, params);
    // result.changes 可檢查是否真的更新
  } catch (err) {
    console.error('Failed to update note:', err);
    throw err;
  }
}
//#endregion



//#region  getAllNotes
async getAllNotes(): Promise<Note[]> {
  if (!this.db) throw new Error('Database not initialized');

  try {
    const allRows = await this.db.getAllAsync('SELECT * FROM notes') as Note[];
    for (const row of allRows) {
      console.log(row.id, row.restaurant_name, row.cuisine, row.rating);
    }
    return allRows;
  } catch (err) {
    console.error('Failed to fetch notes:', err);
    throw err;
  }
}//#endregion


  async close(): Promise<void> {
    this.db = null;
    console.log('Database closed (expo-sqlite does not really close connections)');
  }
    
}

export const db = new DatabaseService();
