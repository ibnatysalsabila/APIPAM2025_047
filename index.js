const express = require('express');
const masterRoutes = require('./routes/master.routes');
const pool = require('./config/db.config');

const app = express();
const PORT = process.env.PORT || 3000;

// =======================
// MIDDLEWARE
// =======================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// =======================
// ROOT ENDPOINT
// =======================
app.get('/', (req, res) => {
    res.json({
        message: "Welcome to Klinik Hewan KuAn Backend API"
    });
});


// =======================
// API ROUTES
// =======================
app.use('/api', masterRoutes);


// =======================
// SERVER & DATABASE CHECK
// =======================
app.listen(PORT, async () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);

    try {
        const connection = await pool.getConnection();
        console.log("✅ Database connection successful!");

        // Cek tabel inti (opsional tapi bagus)
        await connection.execute('SELECT 1 FROM PemilikHewan LIMIT 1');
        await connection.execute('SELECT 1 FROM Hewan LIMIT 1');
        await connection.execute('SELECT 1 FROM LayananMedis LIMIT 1');
        await connection.execute('SELECT 1 FROM RiwayatPemeriksaan LIMIT 1');

        console.log("✅ Database tables verified!");
        connection.release();

    } catch (error) {
        console.error("❌ Database connection failed:");
        console.error(error.message);
        console.error("Pastikan database 'aplikasikuan' sudah dibuat dan tabel sudah di-import.");
        process.exit(1);
    }
});
