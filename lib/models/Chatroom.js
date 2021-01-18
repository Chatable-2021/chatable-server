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

    const { rows } = await pool.query('SELECT * FROM chatrooms WHERE user_id=$1', [userId]);
    return rows.map(row => new Chatroom(row));
  }

  static async getRooms(id) {
      try {
          const { rows } = await pool.query('SELECT * FROM chatrooms WHERE user_id=$1', [id]);
          if(rows.length === 0) {
              console.log('no rooms')
              return [];
          } else {
              console.log(rows, 'got the rooms yoo')
              return rows.map(row => new Chatroom(row));
          }
      } catch(err) {
          throw new Error(`no rooms with id ${id}`)
      }
  }
};
