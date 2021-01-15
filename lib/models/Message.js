const pool = require('../utils/pool');

module.exports = class Message {
  id;
  chatRoomId;
  usersId;
  message_text;

  constructor(row) {
    this.id = row.id;
    this.chatRoomId = row.chat_room_id;
    this.userId = row.user_id;
    this.MessageText = row.message_text;
  }
};
