// services/DatabaseService.ts
import SQLite from 'react-native-sqlite-storage';

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
        id TEXT PRIMARY KEY,
        restaurant_name TEXT NOT NULL,
        restaurant_address TEXT NOT NULL,
        restaurant_place_id TEXT NOT NULL,
        dish_ordered TEXT,
        lat REAL NOT NULL,
        lng REAL NOT NULL,
        content TEXT,
        rating INTEGER DEFAULT 0,
        created_at TEXT NOT NULL
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

  async close(): Promise<void> {
    if (this.db) {
      await this.db.close();
      this.db = null;
    }
  }
}

export const databaseService = new DatabaseService();