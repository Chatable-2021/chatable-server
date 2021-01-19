const pool = require('../utils/pool');

module.exports = class User {
  id;
  name;
  email;
  passwordHash;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.email = row.email;
    this.passwordHash = row.password_hash;
  }

  static async insert({ name, email, passwordHash }) {
    const {
      rows,
    } = await pool.query(
      'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
      [name, email, passwordHash]
    );
    return new User(rows[0]);
  }

  static async findByEmail(email) {
    try {
      const { rows } = await pool.query(
        'SELECT * FROM users WHERE EMAIL=$1',
        [email]
      );
      return new User(rows[0]);
    } catch(err) {
      throw new Error(`No user with the email ${email}`);
    }
  }


  toJSON() {
    const json = { ...this };
    delete json.passwordHash;
    return json;
  }
};
