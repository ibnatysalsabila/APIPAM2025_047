const jwt = require('jsonwebtoken');

// Pastikan secret key ini sama dengan yang ada di auth.controller.js
const JWT_SECRET = process.env.JWT_SECRET || 'RAHASIA_KUAN_KLINIK_2024';

/**
 * Middleware untuk memverifikasi JWT Token dari Android
 */
exports.verifyToken = (req, res, next) => {
    // 1. Ambil token dari header 'Authorization'
    // Format biasanya: "Bearer <token>"
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    // 2. Jika token tidak ada
    if (!token) {
        return res.status(403).json({ 
            success: false,
            message: 'Akses ditolak. Silakan login terlebih dahulu.' 
        });
    }

    try {
        // 3. Verifikasi token
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // 4. Simpan data user ke objek request agar bisa digunakan di controller
        req.user = decoded; 
        
        // 5. Lanjutkan ke proses berikutnya (Controller)
        next(); 
    } catch (error) {
        // Jika token kedaluwarsa atau salah
        return res.status(401).json({ 
            success: false,
            message: 'Sesi Anda telah berakhir atau token tidak valid. Silakan login ulang.' 
        });
    }
};

module.exports = {
    verifyToken: exports.verifyToken
};