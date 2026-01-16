const pool = require('../config/db.config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'RAHASIA_KUAN_KLINIK_2024';

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const [rows] = await pool.execute(
            'SELECT * FROM admin WHERE username = ?',
            [username]
        );

        if (rows.length > 0) {
            const admin = rows[0];
            console.log(`[DEBUG] Login attempt - Username: ${username}`);
            console.log(`[DEBUG] Provided: ${password}, Stored: ${admin.password}`);
            const isMatch = await bcrypt.compare(password, admin.password);
            console.log(`[DEBUG] Result: ${isMatch}`);

            if (isMatch) {
                const token = jwt.sign(
                    { id: admin.id, username: admin.username },
                    JWT_SECRET,
                    { expiresIn: '1d' }
                );

                res.json({
                    success: true,
                    message: "Login Berhasil!",
                    token: token
                });
            } else {
                res.status(401).json({
                    success: false,
                    message: "Username atau Password salah!"
                });
            }
        } else {
            res.status(401).json({
                success: false,
                message: "Username atau Password salah!"
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Terjadi kesalahan server",
            error: error.message
        });
    }
};
