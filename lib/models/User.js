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

  static async insert({ capitalName, email, passwordHash }) {
    try {
      const {
        rows,
      } = await pool.query(
        'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
        [capitalName, email, passwordHash]
      );
      return new User(rows[0]);
    } catch (err) {
      throw new Error('Could not signup user');
    }
  }

  static async findByEmail(email) {
    try {
      const { rows } = await pool.query('SELECT * FROM users WHERE EMAIL=$1', [
        email,
      ]);
      return new User(rows[0]);
    } catch (err) {
      throw new Error('Invalid email');
    }
  }

  static async checkEmail(email) {
    const { rows } = await pool.query('SELECT * FROM users WHERE EMAIL=$1', [
      email,
    ]);
    if (!!rows[0]) {
      throw new Error('Email already in use');
    } else {
      return;
    }
  }

  toJSON() {
    const json = { ...this };
    delete json.passwordHash;
    return json;
  }
};
