const pool = require('../utils/pool');

module.exports = class Chatroom {
    id;
    name;

    constructor(row) {
        this.id = row.id;
        this.name = row.name; 
    }

    static async create({ name }) {
        const { rows, } = await pool.query('INSERT INTO chatrooms (name) VALUES ($1) RETURNING *',
        [name]
        );
        return new Chatroom(rows[0])
    }
    static async delete({ name }) {
        const { rows, } = await pool.query('DELETE FROM chatroos (name) VALUES ($1) RETURNING *',
        [name])
        return new Chatroom(rows[0])
    }
    
};