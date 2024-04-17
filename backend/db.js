const mysql = require("mysql2") 

const options = {
    connectionLimit: 15,
    password: process.env.MYSQL_PASS,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DB,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT
}

const pool = mysql.createPool(options)

const db = {}

db.getUserById = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM user WHERE id = ?'
        const params = [id]
        pool.execute(query, params, (error, user) => {
            if (error) { return reject(error) }
            return resolve(user)
        })
    })
}

db.getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM user WHERE email = ?'
        const params = [email]
        pool.execute(query, params, (error, user) => {
            if (error) { return reject(error) }
            return resolve(user)
        })
    })
}

db.addUser = (firstName, lastName, phone, email, password) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO user (firstname, lastname, phone, email, password) VALUES (?, ?, ?, ?, ?)', [firstName, lastName, phone, email, password],
            (error, result) => {
                if (error) { return reject(error) }
                return resolve(result.insertId);
            });
    });
};


module.exports = db;