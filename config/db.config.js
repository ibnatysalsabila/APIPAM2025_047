
const mysql = require('mysql2/promise');
const dbConfig = {
    host: 'localhost', 
    user: 'root', 
    password: 'Coldplayers06', 
    database: 'kuan', 
    port: 3308,  // Sesuaikan dengan port MySQL Anda
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};
const pool = mysql.createPool(dbConfig);

module.exports = pool;