const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { findByEmail } = require('../models/User');

module.exports = class UserService {
  static async create({ name, email, password }) {
    try {
        const passwordHash = await bcrypt.hash(
          password,
          Number(process.env.SALT_ROUNDS),
        );
        const user = await User.insert({ name, email, passwordHash });
        return user;
    } catch (err) {
      throw err;
    }
  }

  static verifyAuthToken(token) {
    const { user } = jwt.verify(token, process.env.APP_SECRET);
    return user;
  }

  static async authorize({ email, password }) {
    try {
      const user = await User.findByEmail(email);
      const passwordMatch = await bcrypt.compare(password, user.passwordHash);
      if (!passwordMatch) throw new Error('Invalid Password');
      return user;
    } catch (err) {
      throw err;
    }
  }

  static authToken(user) {
    return jwt.sign({ user: user.toJSON() }, process.env.APP_SECRET, {
      expiresIn: '24h',
    });
  }
};
