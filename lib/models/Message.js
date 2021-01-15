const pool = require('../utils/pool');

module.exports = class Message {
  id;
  chatRoomId;
  usersId;
  messageText;

  constructor(row) {
    this.id = row.id;
    this.chatRoomId = row.chat_room_id;
    this.userId = row.user_id;
    this.messageText = row.message_text;
  }

  static async insert({ chatRoomId, userId, messageText }) {
    const {
      rows,
    } = await pool.query(
      'INSERT INTO users (chat_room_id, user_id, message_text) VALUES ($1, $2, $3) RETURNING *',
      [chatRoomId, userId, messageText]
    );
    return new Message(rows[0]);
  }

};
