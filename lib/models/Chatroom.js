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
        const { rows, } = await pool.query('INSERT INTO chatrooms (name, user_id) VALUES ($1, $2) RETURNING *',
        [name, userId]
        );
        return new Chatroom(rows[0])
    }    
};