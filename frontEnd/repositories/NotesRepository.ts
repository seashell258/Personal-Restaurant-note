// repositories/NotesRepository.ts

/* 
import { v4 as uuidv4 } from 'uuid';
import { databaseService } from '../services/DatabaseFactory';

class NotesRepository {
  async create(noteData) {
    const db = databaseService.getDatabase();
    const id = uuidv4();
    const created_at = new Date().toISOString();

    const note = {
      id,
      ...noteData,
      created_at,
    };

    const query = `
      INSERT INTO notes (
        id, restaurant_name, restaurant_address, restaurant_place_id,
        dish_ordered, lat, lng, content, rating, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      note.id,
      note.restaurant_name,
      note.restaurant_address,
      note.restaurant_place_id,
      note.dish_ordered,
      note.lat,
      note.lng,
      note.content,
      note.rating,
      note.created_at,
    ];

    await db.executeSql(query, values);
    return note;
  }

  async findAll(filter?, userLat?: number, userLng?: number) {
    const db = databaseService.getDatabase();
    let query = 'SELECT * FROM notes';
    const conditions: string[] = [];
    const values: any[] = [];

    // Build WHERE conditions
    if (filter?.searchTerm) {
      conditions.push('restaurant_name LIKE ?');
      values.push(`%${filter.searchTerm}%`);
    }

    if (filter?.dateFrom) {
      conditions.push('created_at >= ?');
      values.push(filter.dateFrom);
    }

    if (filter?.dateTo) {
      conditions.push('created_at <= ?');
      values.push(filter.dateTo);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY created_at DESC';

    const [results] = await db.executeSql(query, values);
    const notes = [];

    for (let i = 0; i < results.rows.length; i++) {
      const row = results.rows.item(i);
      notes.push(row);
    }

    // Apply distance filter if user location is provided
    if (filter?.distance && userLat !== undefined && userLng !== undefined) {
      return notes.filter(note => {
        const distance = this.calculateDistance(userLat, userLng, note.lat, note.lng);
        return distance <= filter.distance!;
      });
    }

    return notes;
  }

  async findById(id: string) {
    const db = databaseService.getDatabase();
    const query = 'SELECT * FROM notes WHERE id = ?';
    const [results] = await db.executeSql(query, [id]);

    if (results.rows.length === 0) {
      return null;
    }

    return results.rows.item(0);
  }

  async update(id: string, updateData) {
    const db = databaseService.getDatabase();
    
    const fields = Object.keys(updateData).map(key => `${key} = ?`);
    const values = Object.values(updateData);
    values.push(id);

    const query = `UPDATE notes SET ${fields.join(', ')} WHERE id = ?`;
    await db.executeSql(query, values);

    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const db = databaseService.getDatabase();
    const query = 'DELETE FROM notes WHERE id = ?';
    const [results] = await db.executeSql(query, [id]);

    return results.rowsAffected > 0;
  }

  async findByPlaceId(placeId: string): Promise<Note[]> {
    const db = databaseService.getDatabase();
    const query = 'SELECT * FROM notes WHERE restaurant_place_id = ? ORDER BY created_at DESC';
    const [results] = await db.executeSql(query, [placeId]);

    const notes= [];
    for (let i = 0; i < results.rows.length; i++) {
      notes.push(results.rows.item(i));
    }

    return notes;
  }

  // Helper method to calculate distance between two points
  private calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.degToRad(lat2 - lat1);
    const dLng = this.degToRad(lng2 - lng1);
    
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.degToRad(lat1)) * Math.cos(this.degToRad(lat2)) * 
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private degToRad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}

export const notesRepository = new NotesRepository();*/