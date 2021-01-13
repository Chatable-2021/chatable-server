import pool from '../utils/pool';


module.exports = class User {

    id;
    name;
    email;
    password;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.email = row.email;
        this.password = row.password;
    }
};