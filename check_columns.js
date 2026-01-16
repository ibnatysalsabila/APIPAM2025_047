
const pool = require('./config/db.config');

async function checkColumns() {
    try {
        console.log("--- LAYANAN MEDIS ---");
        const [layanan] = await pool.execute('SELECT * FROM layananmedis LIMIT 1');
        if (layanan.length > 0) {
            console.log(Object.keys(layanan[0]));
            console.log("Sample:", layanan[0]);
        } else {
            console.log("Layanan table is empty");
        }

        console.log("\n--- RIWAYAT PEMERIKSAAN ---");
        // Use the same query as controller
        const [pemeriksaan] = await pool.execute(`
            SELECT p.*, h.NamaHewan, l.NamaLayanan 
            FROM riwayatpemeriksaan p
            LEFT JOIN hewan h ON p.IDHewan = h.IDHewan
            LEFT JOIN layananmedis l ON p.IDLayanan = l.IDLayanan
            LIMIT 1
        `);
        if (pemeriksaan.length > 0) {
            console.log(Object.keys(pemeriksaan[0]));
            console.log("Sample:", pemeriksaan[0]);
        } else {
            console.log("Pemeriksaan table is empty");
        }

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

checkColumns();
