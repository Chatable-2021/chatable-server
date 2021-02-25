const pool = require('../utils/pool');

module.exports = class Message {
  id;
  chatRoomId;
  userId;
  userName;
  messageText;

  constructor(row) {
    this.id = row.id;
    this.chatRoomId = row.chat_room_id;
    this.userId = row.user_id;
    this.userName = row.user_name;
    this.messageText = row.message_text;
  }

  static async insert(chatRoomId, userId, userName, messageText) {
    const {
      rows,
    } = await pool.query(
      'INSERT INTO messages (chat_room_id, user_id, user_name, message_text) VALUES ($1, $2, $3, $4) RETURNING *',
      [chatRoomId, userId, userName, messageText]
    );
    return new Message(rows[0]);
  }

  static async findMessagesByRoomId(roomId) {
    const { rows } = await pool.query(
      `
    SELECT * 
    FROM messages
    WHERE chat_room_id=$1`,
      [roomId]
    );
    if (!rows[0]) return [];
    return rows.map(row => new Message(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
    SELECT * FROM messages WHERE id=$1`,
      [id]
    );
    if (!rows[0]) throw new Error(`message ${id} not found`);
    return new Message(rows[0]);
  }

  static async delete(id, { userId }) {
    const { rows } = await pool.query(
      `DELETE FROM messages WHERE id=$1, user_id=$2
       RETURNING *`,
      [id, userId]
    );
    return new Message(rows[0]);
  }
};
