const mysql = require('promise-mysql2');
const dbConfig = require('../config/dbConfig');

// Credentials for connection
const config = {
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
};

exports.callDB = async (query) => {
    return new Promise((resolve, reject) => {
        mysql.createConnection(config).then((conn) => {
            let result = conn.query(query);
            conn.end();
            return result;
        }).then(([rows, fields]) => {
            // console.log(rows);
            resolve(rows);
        }).catch(err => {
            reject(err)
        });
    });
}
