const pool = require('../utils/pool');

module.exports = class Chatroom {
  id;
  name;
  userId;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.userId = row.user_id;
  }

  static async create({ name, userId }) {
    await pool.query(
      'INSERT INTO chatrooms (name, user_id) VALUES ($1, $2) RETURNING *',
      [name, userId],
    );

    const { rows } = await pool.query('SELECT * FROM chatrooms');
    return rows.map(row => new Chatroom(row));
  }

  static async getRooms() {
      try {
          const { rows } = await pool.query('SELECT * FROM chatrooms');
          if(rows.length === 0) {
              return [];
          } else {
              return rows.map(row => new Chatroom(row));
          }
      } catch(err) {
          throw new Error('Could not get rooms}')
      }
  }

  static async getById(id) {
    
  }
};
