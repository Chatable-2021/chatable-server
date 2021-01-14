const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = class UserService {
    
    static async create({ name, email, password }) {
        const passwordHash = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
        const user = await User.insert({ name, email, passwordHash });
        return user;
      }

    static async verifyAuthToken(token) {
        const { user } = jwt.verify(token, process.env.APP_SECRET);
        return user;
    }
    
    static async authorize() {
        
    }

}