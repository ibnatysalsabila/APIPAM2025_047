const pool = require('./config/db.config');

async function checkPemeriksaanStructure() {
    try {
        const [rows] = await pool.execute('DESCRIBE riwayatpemeriksaan');
        console.log('Structure of riwayatpemeriksaan:');
        rows.forEach(row => {
            console.log(`${row.Field} - ${row.Type} - ${row.Null} - ${row.Key} - ${row.Default}`);
        });
        process.exit(0);
    } catch (error) {
        console.error('Error checking riwayatpemeriksaan:', error);
        process.exit(1);
    }
}

checkPemeriksaanStructure();
