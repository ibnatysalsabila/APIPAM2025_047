
const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'Coldplayers06',
    database: 'kuan',
    port: 3308
};

app.post('/test-login', async (req, res) => {
    const { username, password } = req.body;
    console.log(`[DIAG] Attempt: ${username} / ${password}`);
    try {
        const pool = await mysql.createConnection(dbConfig);
        const [rows] = await pool.execute('SELECT * FROM admin WHERE username = ?', [username]);
        if (rows.length > 0) {
            const admin = rows[0];
            console.log(`[DIAG] Found user, stored hash: ${admin.password}`);
            const isMatch = await bcrypt.compare(password, admin.password);
            console.log(`[DIAG] Match: ${isMatch}`);
            res.json({ success: isMatch, match: isMatch });
        } else {
            console.log(`[DIAG] User not found`);
            res.json({ success: false, reason: 'notFound' });
        }
        await pool.end();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

app.listen(3001, () => console.log('Diagnostic server on 3001'));
