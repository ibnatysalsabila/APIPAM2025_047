const pool = require('../config/db.config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET = process.env.JWT_SECRET || 'RAHASIA_KUAN_KLINIK_2024';

console.log('auth.controller loaded');

// =======================
// REGISTER ADMIN
// =======================
exports.register = async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.execute(
            'INSERT INTO admin (username, password) VALUES (?, ?)',
            [username, hashedPassword]
        );
        res.status(201).json({ message: 'Admin berhasil didaftarkan.' });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(400).json({ message: 'Username sudah ada.' });
        } else {
            res.status(500).json({ message: 'Server Error', error: error.message });
        }
    }
};

// =======================
// LOGIN
// =======================
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const [rows] = await pool.execute(
            'SELECT username, password FROM admin WHERE username = ?',
            [username]
        );

        if (rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Username tidak ditemukan.'
            });
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Password salah.'
            });
        }

        const token = jwt.sign(
            { username: user.username },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            success: true,
            message: 'Login Berhasil',
            token,
            user: {
                username: user.username
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server.',
            error: error.message
        });
    }
};

// =======================
// GET PROFILE
// =======================
exports.getProfile = async (req, res) => {
    const username = req.user.username;

    try {
        const [rows] = await pool.execute(
            'SELECT username FROM admin WHERE username = ?',
            [username]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: 'User tidak ditemukan.' });
        }

        res.json({
            success: true,
            data: rows[0]
        });
    } catch (error) {
        res.status(500).json({ message: 'Gagal mengambil profil.' });
    }
};
