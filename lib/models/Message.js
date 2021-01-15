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


  static async find() {
    const { rows } = await pool.query(
      'SELECT * FROM messages'
    );

    if(!rows[0]) throw new Error('cant find any messages');
    else return rows.map(rows => new Message(rows));
  }

  static async findById(id) {
    const { rows } = await pool.query(`
    SELECT * FROM messages WHERE id=$1`,
    [id]
    );

    if(!rows[0]) throw new Error(`message ${id} not found`);
    return new Message(rows[0]);
  }

  static async delete(id { userId }) {
    const { rows } = await pool.query(
      `DELETE FROM messages WHERE id=$1, user_id=$2
       RETURNING *`,
      [id, userId]
    );

    return new Message(rows[0]);
  }

};
